import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, DollarSign, CheckCircle2, Sparkles, Zap, AlertTriangle, Loader2 } from 'lucide-react';

import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';
import { api } from '../lib/api';
import { useResource } from '../lib/hooks';
import { generateEmployees } from '../data';
import type { MetricsSummary } from '@shared/types';

interface DashboardPageProps {
  onNavigate: (page: 'deploy' | 'employees' | 'analytics') => void;
  isDark: boolean;
}

const flowSteps = [
  { step: 1, title: 'Discover', status: 'complete' as const },
  { step: 2, title: 'Select', status: 'complete' as const },
  { step: 3, title: 'Deploy', status: 'current' as const },
  { step: 4, title: 'Monitor', status: 'upcoming' as const },
  { step: 5, title: 'Scale', status: 'upcoming' as const },
];

/** Offline fallback derived from the shared roster (previously hard-coded). */
const LOCAL_METRICS: MetricsSummary = (() => {
  const roster = generateEmployees();
  const avgRating = roster.reduce((sum, employee) => sum + employee.rating, 0) / roster.length;
  return {
    activeEmployees: 24,
    tasksCompleted: 1247,
    hoursSaved: 342,
    monthlySpend: 2450,
    totalEmployees: roster.length,
    departments: new Set(roster.map((employee) => employee.department)).size,
    efficiency: 94,
    avgRating: Math.round(avgRating * 10) / 10,
    recentActivity: [
      { id: 'local-1', employee: 'Nova Pro', action: 'Resolved 12 tickets', createdAt: new Date().toISOString() },
      { id: 'local-2', employee: 'Atlas Elite', action: 'Closed 3 deals', createdAt: new Date().toISOString() },
      { id: 'local-3', employee: 'Echo Core', action: 'Created content', createdAt: new Date().toISOString() },
    ],
  };
})();

function relativeTime(iso: string): string {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

/**
 * Tailwind scans source text for class names, so palette variants must be
 * written out statically rather than composed at runtime.
 */
const statTile = {
  indigo: { bg: { dark: 'bg-indigo-500/10', light: 'bg-indigo-50' }, text: 'text-indigo-400' },
  emerald: { bg: { dark: 'bg-emerald-500/10', light: 'bg-emerald-50' }, text: 'text-emerald-400' },
  violet: { bg: { dark: 'bg-violet-500/10', light: 'bg-violet-50' }, text: 'text-violet-400' },
  amber: { bg: { dark: 'bg-amber-500/10', light: 'bg-amber-50' }, text: 'text-amber-400' },
} as const;

export default function DashboardPage({ onNavigate, isDark }: DashboardPageProps) {
  const seo = pageSEO.dashboard;

  const { data: metrics, loading, degraded, error } = useResource(() => api.getMetrics(), [], LOCAL_METRICS);
  const m = metrics ?? LOCAL_METRICS;

  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const textM = isDark ? 'text-slate-500' : 'text-slate-400';
  const border = isDark ? 'border-slate-800/60' : 'border-slate-100';

  const metricsCards = [
    { label: 'Active Employees', value: m.activeEmployees.toLocaleString(), change: `${m.departments} depts`, icon: Users, accent: 'indigo' },
    { label: 'Tasks Completed', value: m.tasksCompleted.toLocaleString(), change: '+12%', icon: CheckCircle2, accent: 'emerald' },
    { label: 'Hours Saved', value: `${m.hoursSaved}h`, change: '+28h', icon: Clock, accent: 'violet' },
    { label: 'Monthly Spend', value: `$${m.monthlySpend.toLocaleString()}`, change: '-5%', icon: DollarSign, accent: 'amber' },
  ];

  const accentStyles: Record<string, { icon: string; bg: string; text: string }> = {
    indigo: isDark
      ? { icon: 'text-indigo-400', bg: 'bg-indigo-500/10', text: 'text-indigo-400' }
      : { icon: 'text-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-600' },
    emerald: isDark
      ? { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400' }
      : { icon: 'text-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    violet: isDark
      ? { icon: 'text-violet-400', bg: 'bg-violet-500/10', text: 'text-violet-400' }
      : { icon: 'text-violet-600', bg: 'bg-violet-50', text: 'text-violet-600' },
    amber: isDark
      ? { icon: 'text-amber-400', bg: 'bg-amber-500/10', text: 'text-amber-400' }
      : { icon: 'text-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
  };

  return (
    <div className="min-h-screen p-8">
      <PageHeader title={seo.title.split('—')[0].trim()} description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

      {degraded && (
        <div
          role="status"
          className={`mb-8 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            isDark ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Live metrics unavailable — showing offline figures ({error?.message}).
        </div>
      )}

      <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
          <span className={`text-sm font-medium ${textS}`}>Behavioral Flow Engine</span>
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" aria-label="Refreshing metrics" />}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {flowSteps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <span
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  step.status === 'complete'
                    ? isDark
                      ? 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                      : 'border border-emerald-200 bg-emerald-50 text-emerald-600'
                    : step.status === 'current'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                      : isDark
                        ? 'border border-slate-700 bg-slate-800/80 text-slate-500'
                        : 'border border-slate-200 bg-slate-100 text-slate-400'
                }`}
              >
                {step.status === 'complete' && <CheckCircle2 className="h-4 w-4" />}
                {step.title}
              </span>
              {index < flowSteps.length - 1 && <span className={`mx-1 h-px w-6 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="mb-10 grid grid-cols-3 gap-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <motion.button
          type="button"
          onClick={() => onNavigate('deploy')}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-left text-white shadow-xl shadow-indigo-500/20"
          whileHover={{ scale: 1.02, y: -3 }}
        >
          <span className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <span className="relative block">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Zap className="h-6 w-6" />
            </span>
            <span className="block text-lg font-bold">Deploy Employee</span>
            <span className="mt-1 block text-sm text-white/60">Add a new AI employee to your team</span>
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => onNavigate('employees')}
          className={`group rounded-2xl border p-6 text-left ${card}`}
          whileHover={{ scale: 1.02, y: -3 }}
        >
          <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}>
            <Users className={`h-6 w-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </span>
          <span className={`block text-lg font-bold ${textP}`}>Browse Employees</span>
          <span className={`mt-1 block text-sm ${textS}`}>Explore {m.totalEmployees.toLocaleString()} AI employees</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => onNavigate('analytics')}
          className={`group rounded-2xl border p-6 text-left ${card}`}
          whileHover={{ scale: 1.02, y: -3 }}
        >
          <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-violet-500/15' : 'bg-violet-50'}`}>
            <TrendingUp className={`h-6 w-6 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
          </span>
          <span className={`block text-lg font-bold ${textP}`}>View Analytics</span>
          <span className={`mt-1 block text-sm ${textS}`}>Track performance metrics</span>
        </motion.button>
      </motion.div>

      <motion.div className="mb-10 grid grid-cols-4 gap-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        {metricsCards.map((metric) => (
          <div key={metric.label} className={`rounded-xl border p-5 ${card}`}>
            <div className="mb-3 flex items-center justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentStyles[metric.accent].bg}`}>
                <metric.icon className={`h-5 w-5 ${accentStyles[metric.accent].icon}`} />
              </span>
              <span className={`text-sm font-semibold ${accentStyles[metric.accent].text}`}>{metric.change}</span>
            </div>
            <div className={`text-2xl font-bold ${textP}`}>{metric.value}</div>
            <div className={`mt-1 text-sm ${textS}`}>{metric.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <section className={`rounded-xl border p-6 ${card}`}>
          <h2 className={`mb-4 font-bold ${textP}`}>Recent Activity</h2>
          <div className="space-y-3">
            {m.recentActivity.map((item, i) => (
              <div key={item.id} className={`flex items-center gap-3 py-2 ${i > 0 ? `border-t ${border}` : ''}`}>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white"
                  aria-hidden="true"
                >
                  {item.employee
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <span className="flex-1">
                  <span className={`block text-sm font-medium ${textP}`}>{item.employee}</span>
                  <span className={`block text-xs ${textM}`}>{item.action}</span>
                </span>
                <span className={`text-xs ${textM}`}>{relativeTime(item.createdAt)}</span>
              </div>
            ))}
            {m.recentActivity.length === 0 && <p className={`text-sm ${textM}`}>No activity yet.</p>}
          </div>
        </section>

        <section className={`rounded-xl border p-6 ${card}`}>
          <h2 className={`mb-4 font-bold ${textP}`}>Workforce Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: m.totalEmployees.toLocaleString(), label: 'Total Employees', tone: 'indigo' as const },
              { value: String(m.departments), label: 'Departments', tone: 'emerald' as const },
              { value: `${m.efficiency}%`, label: 'Efficiency', tone: 'violet' as const },
              { value: m.avgRating.toFixed(1), label: 'Avg Rating', tone: 'amber' as const },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-xl p-4 ${statTile[stat.tone].bg[isDark ? 'dark' : 'light']}`}>
                <div className={`text-2xl font-bold ${statTile[stat.tone].text}`}>{stat.value}</div>
                <div className={`mt-1 text-xs ${textS}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
