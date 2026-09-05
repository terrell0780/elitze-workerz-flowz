import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, Zap, Sparkles, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';
import { api } from '../lib/api';
import { useResource } from '../lib/hooks';
import { DEPARTMENT_FILTERS, generateEmployees, sortEmployees } from '../data';
import type { AIEmployee } from '@shared/types';
import type { PageCandidate } from '../lib/deployTypes';

interface Props {
  onNavigate: (page: 'dashboard' | 'analytics' | 'employees') => void;
  isDark: boolean;
}

/** Offline fallback: the highest-rated employees from the shared catalogue. */
const LOCAL_RECOMMENDATIONS = sortEmployees(generateEmployees(), 'rating', 'desc').slice(0, 6);

export default function DeployPage({ onNavigate, isDark }: Props) {
  const seo = pageSEO.deploy;

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<AIEmployee | null>(null);
  const [dept, setDept] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);

  const redirectTimer = useRef<number | null>(null);

  const fallback = useMemo(() => ({ data: LOCAL_RECOMMENDATIONS, page: 1, pageSize: 6, total: LOCAL_RECOMMENDATIONS.length, totalPages: 1 }), []);
  const fetchRecommendations = useCallback(
    () => api.listEmployees({ sort: 'rating', order: 'desc', pageSize: 6, status: 'available' }),
    [],
  );
  const { data, degraded, error } = useResource(fetchRecommendations, [], fallback);

  const recommendations: PageCandidate[] = (data?.data ?? []).map((employee) => ({
    ...employee,
    match: Math.round(employee.rating * 20),
    reason: `Top rated in ${employee.department}`,
  }));

  // Clear any pending redirect when the component unmounts so we never call
  // `onNavigate` after teardown.
  useEffect(
    () => () => {
      if (redirectTimer.current !== null) window.clearTimeout(redirectTimer.current);
    },
    [],
  );

  const handleDeploy = useCallback(async () => {
    if (!selected) return;
    setSubmitting(true);
    setDeployError(null);

    try {
      await api.createDeployment({
        employeeId: selected.id,
        department: dept || selected.department,
        status: 'active',
      });
      setSuccess(true);
      redirectTimer.current = window.setTimeout(() => onNavigate('analytics'), 2000);
    } catch (err) {
      setDeployError(err instanceof Error ? err.message : 'Deployment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [selected, dept, onNavigate]);

  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const inputCls = isDark
    ? 'bg-[#12121e] border-slate-700 text-white placeholder-slate-500'
    : 'bg-slate-50 border-slate-200 text-slate-700';

  const steps = [
    { id: 1, title: 'Select' },
    { id: 2, title: 'Configure' },
    { id: 3, title: 'Review' },
  ];

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div className="text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <motion.div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-2xl shadow-emerald-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <Check className="h-12 w-12 text-white" />
          </motion.div>
          <h2 className={`text-3xl font-bold ${textP}`}>Deployed!</h2>
          <p className={`mt-2 text-lg ${textS}`}>
            {selected?.name} is now active in {dept || selected?.department}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <PageHeader title="Deploy Employee" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

        {degraded && (
          <div
            role="status"
            className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
              isDark ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-700'
            }`}
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Offline mode — recommendations come from the local catalogue.
          </div>
        )}

        <div className="mb-10 flex items-center justify-center gap-4">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  step > s.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : step === s.id
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                      : isDark
                        ? 'border border-slate-700 bg-slate-800 text-slate-500'
                        : 'bg-slate-100 text-slate-400'
                }`}
                aria-current={step === s.id ? 'step' : undefined}
              >
                {step > s.id ? <Check className="h-5 w-5" /> : s.id}
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= s.id ? textP : textS}`}>{s.title}</span>
              {i < steps.length - 1 && <div className={`mx-4 h-px w-16 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                <span className={`text-sm font-medium ${textS}`}>AI Recommendations</span>
              </div>

              {recommendations.map((emp) => (
                <motion.button
                  key={emp.id}
                  type="button"
                  onClick={() => setSelected(emp)}
                  aria-pressed={selected?.id === emp.id}
                  className={`w-full rounded-xl border-2 p-5 text-left transition-all ${
                    selected?.id === emp.id
                      ? isDark
                        ? 'border-indigo-500/50 bg-indigo-500/10'
                        : 'border-indigo-300 bg-indigo-50'
                      : card
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 font-bold text-white shadow-lg shadow-indigo-500/15"
                        aria-hidden="true"
                      >
                        {emp.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className={`font-bold ${textP}`}>{emp.name}</div>
                        <div className={`text-sm ${textS}`}>{emp.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${textP}`}>
                        ${emp.dailyRate.toFixed(2)}
                        <span className={`text-sm font-normal ${textS}`}>/day</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                        <TrendingUp className="h-3 w-3" />
                        {emp.match}% match
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mt-3 border-t pt-3 text-xs ${
                      isDark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    💡 {emp.reason}
                  </div>
                </motion.button>
              ))}

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => selected && setStep(2)}
                  disabled={!selected}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" className="space-y-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div>
                <label htmlFor="deployment-name" className={`mb-2 block text-sm font-semibold ${textP}`}>
                  Deployment Name
                </label>
                <input
                  id="deployment-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g., Support Team Alpha"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${inputCls}`}
                />
              </div>

              <div>
                <span className={`mb-2 block text-sm font-semibold ${textP}`}>Department</span>
                <div className="grid grid-cols-2 gap-2">
                  {DEPARTMENT_FILTERS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={dept === d}
                      onClick={() => setDept(d)}
                      className={`rounded-xl p-3 text-sm font-medium transition-all ${
                        dept === d ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' : `${card} ${textS}`
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setStep(1)} className={`flex items-center gap-1 ${textS}`}>
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => name.trim() && dept && setStep(3)}
                  disabled={!name.trim() || !dept}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div
                className={`mb-6 rounded-xl border p-5 ${
                  isDark ? 'border-indigo-500/20 bg-indigo-500/10' : 'border-indigo-100 bg-indigo-50'
                }`}
              >
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className={textS}>Employee</dt>
                    <dd className={`font-semibold ${textP}`}>{selected?.name}</dd>
                  </div>
                  <div>
                    <dt className={textS}>Role</dt>
                    <dd className={`font-semibold ${textP}`}>{selected?.role}</dd>
                  </div>
                  <div>
                    <dt className={textS}>Deployment</dt>
                    <dd className={`font-semibold ${textP}`}>{name}</dd>
                  </div>
                  <div>
                    <dt className={textS}>Department</dt>
                    <dd className={`font-semibold ${textP}`}>{dept}</dd>
                  </div>
                  <div>
                    <dt className={textS}>Daily Cost</dt>
                    <dd className={`font-semibold ${textP}`}>${selected?.dailyRate.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>

              <div
                className={`mb-6 rounded-xl p-4 ${
                  isDark ? 'border border-emerald-500/20 bg-emerald-500/10' : 'border border-emerald-100 bg-emerald-50'
                }`}
              >
                <p className="flex items-center gap-2 font-semibold text-emerald-400">
                  <Check className="h-5 w-5" /> Ready to deploy
                </p>
              </div>

              {deployError && (
                <p role="alert" className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {deployError}
                </p>
              )}

              {error && !degraded && (
                <p role="alert" className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error.message}
                </p>
              )}

              <div className="flex justify-between">
                <button type="button" onClick={() => setStep(2)} className={`flex items-center gap-1 ${textS}`}>
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <motion.button
                  type="button"
                  onClick={() => void handleDeploy()}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                  {submitting ? 'Deploying…' : 'Deploy Now'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
