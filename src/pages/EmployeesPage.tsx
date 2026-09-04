import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Users, AlertTriangle, Loader2, Check } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';
import { api } from '../lib/api';
import { useDebouncedValue, useResource } from '../lib/hooks';
import { DEPARTMENT_FILTERS, filterEmployees, generateEmployees } from '../data';
import type { AIEmployee } from '@shared/types';

interface Props {
  isDark: boolean;
}

const PAGE_SIZE = 12;

/**
 * Local fallback used when the API is unreachable, so the catalogue still
 * works offline. It uses the exact same shared data module as the server.
 */
const LOCAL_ROSTER = generateEmployees();

export default function EmployeesPage({ isDark }: Props) {
  const seo = pageSEO.employees;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [deployedId, setDeployedId] = useState<string | null>(null);
  const [deployError, setDeployError] = useState<string | null>(null);

  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const department = activeDept === 'All' ? undefined : activeDept;

  const fallback = useMemo(
    () => ({
      data: filterEmployees(LOCAL_ROSTER, { q: debouncedQuery, department: activeDept }).slice(0, visibleCount),
      page: 1,
      pageSize: visibleCount,
      total: filterEmployees(LOCAL_ROSTER, { q: debouncedQuery, department: activeDept }).length,
      totalPages: 1,
    }),
    [debouncedQuery, activeDept, visibleCount],
  );

  const fetchEmployees = useCallback(
    () => api.listEmployees({ q: debouncedQuery, department, pageSize: visibleCount, sort: 'rating', order: 'desc' }),
    [debouncedQuery, department, visibleCount],
  );

  const { data, error, loading, degraded } = useResource(fetchEmployees, [debouncedQuery, department, visibleCount], fallback);

  const employees = data?.data ?? [];
  const total = data?.total ?? 0;

  const deploy = useCallback(async (employee: AIEmployee) => {
    setDeployError(null);
    try {
      await api.createDeployment({ employeeId: employee.id, department: employee.department, status: 'active' });
      setDeployedId(employee.id);
      window.setTimeout(() => setDeployedId((current) => (current === employee.id ? null : current)), 2500);
    } catch (err) {
      setDeployError(err instanceof Error ? err.message : 'Could not deploy this employee');
    }
  }, []);

  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const inputCls = isDark
    ? 'bg-[#12121e] border-slate-700 text-white placeholder-slate-500'
    : 'bg-slate-50 border-slate-200 text-slate-700';

  return (
    <div className="min-h-screen p-8">
      <PageHeader
        title="AI Employees"
        description={seo.description}
        breadcrumbs={seo.breadcrumbs}
        isDark={isDark}
        action={
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 ${
              isDark ? 'bg-indigo-500/15 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
            }`}
          >
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{(total || LOCAL_ROSTER.length).toLocaleString()} Available</span>
          </div>
        }
      />

      {degraded && (
        <div
          role="status"
          className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            isDark ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Showing offline catalogue — the API is unreachable ({error?.message}).
        </div>
      )}

      {error && !degraded && (
        <div
          role="alert"
          className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            isDark ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error.message}
        </div>
      )}

      {deployError && (
        <p role="alert" className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {deployError}
        </p>
      )}

      <div className={`mb-6 rounded-xl border p-5 ${card}`}>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search by name, role or department…"
              aria-label="Search employees"
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${inputCls}`}
            />
          </div>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-indigo-400" aria-label="Loading" />}
        </div>

        {/* Filters are derived from the shared catalogue, so every department in
            the data is reachable and every chip actually matches records. */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {['All', ...DEPARTMENT_FILTERS].map((dept) => (
            <button
              key={dept}
              type="button"
              aria-pressed={activeDept === dept}
              onClick={() => {
                setActiveDept(dept);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                activeDept === dept
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                  : isDark
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {employees.length === 0 && !loading && (
        <div className={`rounded-xl border p-12 text-center ${card}`}>
          <p className={`text-sm ${textS}`}>No employees match those filters.</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-5">
        <AnimatePresence initial={false}>
          {employees.map((emp, i) => (
            <motion.div
              key={emp.id}
              className={`group relative overflow-hidden rounded-xl border p-5 transition-all hover:border-indigo-500/30 ${card}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(i, 11) * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/15"
                    aria-hidden="true"
                  >
                    {emp.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textP}`}>{emp.name}</h3>
                    <p className={`text-xs ${textS}`}>{emp.role}</p>
                  </div>
                </div>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    emp.status === 'available' ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-amber-400'
                  }`}
                  title={emp.status}
                />
              </div>

              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {emp.department}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                  {emp.rating.toFixed(1)}
                </span>
              </div>

              <div
                className={`flex items-center justify-between border-t pt-4 ${
                  isDark ? 'border-slate-800/60' : 'border-slate-100'
                }`}
              >
                <div>
                  <span className={`text-lg font-bold ${textP}`}>${emp.dailyRate.toFixed(2)}</span>
                  <span className={`text-sm ${textS}`}>/day</span>
                </div>
                <motion.button
                  type="button"
                  onClick={() => void deploy(emp)}
                  disabled={deployedId === emp.id}
                  aria-label={`Deploy ${emp.name}`}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg shadow-indigo-500/20 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 disabled:opacity-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {deployedId === emp.id ? (
                    <>
                      <Check className="h-4 w-4" /> Deployed
                    </>
                  ) : (
                    'Deploy'
                  )}
                </motion.button>
              </div>

              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-4 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0 ${
                  isDark ? 'border-t border-slate-800/60 bg-[#0f1020]/95' : 'border-t border-slate-100 bg-white/95'
                }`}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">Capabilities</p>
                <p className={`text-xs leading-5 ${textS}`}>{emp.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {emp.capabilities.slice(0, 3).map((cap) => (
                    <span
                      key={cap}
                      className={`rounded-full px-2 py-1 text-[10px] font-medium ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < total && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className={`rounded-xl px-5 py-3 font-semibold ${
              isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Load more employees
          </button>
        </div>
      )}
    </div>
  );
}
