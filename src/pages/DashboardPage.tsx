import { motion } from 'framer-motion';
import { PageType } from '../App';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';
import { TrendingUp, Users, Clock, DollarSign, CheckCircle2, Sparkles, Zap } from 'lucide-react';

interface DashboardPageProps { onNavigate: (page: PageType) => void; isDark: boolean; }

const flowSteps = [
  { step: 1, title: 'Discover', status: 'complete' as const },
  { step: 2, title: 'Select', status: 'complete' as const },
  { step: 3, title: 'Deploy', status: 'current' as const },
  { step: 4, title: 'Monitor', status: 'upcoming' as const },
  { step: 5, title: 'Scale', status: 'upcoming' as const },
];

const metrics = [
  { label: 'Active Employees', value: '24', change: '+3', icon: Users, accent: 'indigo' },
  { label: 'Tasks Completed', value: '1,247', change: '+12%', icon: CheckCircle2, accent: 'emerald' },
  { label: 'Hours Saved', value: '342h', change: '+28h', icon: Clock, accent: 'violet' },
  { label: 'Monthly Spend', value: '$2,450', change: '-5%', icon: DollarSign, accent: 'amber' },
];

const accentStyles: Record<string, { icon: string; bg: string; text: string }> = {
  indigo: { icon: 'text-indigo-400', bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  violet: { icon: 'text-violet-400', bg: 'bg-violet-500/10', text: 'text-violet-400' },
  amber: { icon: 'text-amber-400', bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

const accentStylesLight: Record<string, { icon: string; bg: string; text: string }> = {
  indigo: { icon: 'text-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  emerald: { icon: 'text-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  violet: { icon: 'text-violet-600', bg: 'bg-violet-50', text: 'text-violet-600' },
  amber: { icon: 'text-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
};

export default function DashboardPage({ onNavigate, isDark }: DashboardPageProps) {
  const seo = pageSEO.dashboard;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const textM = isDark ? 'text-slate-500' : 'text-slate-400';
  const border = isDark ? 'border-slate-800/60' : 'border-slate-100';
  const accents = isDark ? accentStyles : accentStylesLight;

  return (
    <div className="min-h-screen p-8">
      {/* Page Header with Breadcrumbs */}
      <PageHeader
        title={seo.title.split('—')[0].trim()}
        description={seo.description}
        breadcrumbs={seo.breadcrumbs}
        isDark={isDark}
      />

      {/* Journey Tracker */}
      <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
          <span className={`text-sm font-medium ${textS}`}>Behavioral Flow Engine</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {flowSteps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <motion.button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  step.status === 'complete'
                    ? isDark ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : step.status === 'current'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                    : isDark ? 'bg-slate-800/80 text-slate-500 border border-slate-700' : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
                whileHover={{ scale: 1.03 }}
              >
                {step.status === 'complete' && <CheckCircle2 className="w-4 h-4" />}
                {step.title}
              </motion.button>
              {index < flowSteps.length - 1 && <div className={`w-6 h-px mx-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="grid grid-cols-3 gap-5 mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <motion.button onClick={() => onNavigate('deploy')} className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-left relative overflow-hidden shadow-xl shadow-indigo-500/20" whileHover={{ scale: 1.02, y: -3 }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4"><Zap className="w-6 h-6" /></div>
            <h3 className="text-lg font-bold">Deploy Employee</h3>
            <p className="text-white/60 text-sm mt-1">Add a new AI employee to your team</p>
          </div>
        </motion.button>
        <motion.button onClick={() => onNavigate('employees')} className={`group p-6 rounded-2xl border text-left ${card}`} whileHover={{ scale: 1.02, y: -3 }}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}><Users className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} /></div>
          <h3 className={`text-lg font-bold ${textP}`}>Browse Employees</h3>
            <p className={`text-sm mt-1 ${textS}`}>Explore 1,000 AI employees</p>
        </motion.button>
        <motion.button onClick={() => onNavigate('analytics')} className={`group p-6 rounded-2xl border text-left ${card}`} whileHover={{ scale: 1.02, y: -3 }}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-violet-500/15' : 'bg-violet-50'}`}><TrendingUp className={`w-6 h-6 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} /></div>
          <h3 className={`text-lg font-bold ${textP}`}>View Analytics</h3>
          <p className={`text-sm mt-1 ${textS}`}>Track performance metrics</p>
        </motion.button>
      </motion.div>

      {/* Metrics */}
      <motion.div className="grid grid-cols-4 gap-5 mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        {metrics.map((metric) => (
          <motion.div key={metric.label} className={`p-5 rounded-xl border ${card}`} whileHover={{ y: -3 }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accents[metric.accent].bg}`}><metric.icon className={`w-5 h-5 ${accents[metric.accent].icon}`} /></div>
              <span className={`text-sm font-semibold ${accents[metric.accent].text}`}>{metric.change}</span>
            </div>
            <div className={`text-2xl font-bold ${textP}`}>{metric.value}</div>
            <div className={`text-sm mt-1 ${textS}`}>{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Row */}
      <motion.div className="grid grid-cols-2 gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className={`p-6 rounded-xl border ${card}`}>
          <h3 className={`font-bold mb-4 ${textP}`}>Recent Activity</h3>
          <div className="space-y-3">
            {[
              { employee: 'Nova Pro', action: 'Resolved 12 tickets', time: '2m ago' },
              { employee: 'Atlas Elite', action: 'Closed 3 deals', time: '15m ago' },
              { employee: 'Echo Core', action: 'Created content', time: '32m ago' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 py-2 ${i > 0 ? `border-t ${border}` : ''}`}>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">{item.employee.split(' ').map(n => n[0]).join('')}</div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${textP}`}>{item.employee}</div>
                  <div className={`text-xs ${textM}`}>{item.action}</div>
                </div>
                <span className={`text-xs ${textM}`}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${card}`}>
          <h3 className={`font-bold mb-4 ${textP}`}>Workforce Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}><div className="text-2xl font-bold text-indigo-400">1,000</div><div className={`text-xs mt-1 ${textS}`}>Total Employees</div></div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}><div className="text-2xl font-bold text-emerald-400">8</div><div className={`text-xs mt-1 ${textS}`}>Departments</div></div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}><div className="text-2xl font-bold text-violet-400">94%</div><div className={`text-xs mt-1 ${textS}`}>Efficiency</div></div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}><div className="text-2xl font-bold text-amber-400">4.8</div><div className={`text-xs mt-1 ${textS}`}>Avg Rating</div></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}