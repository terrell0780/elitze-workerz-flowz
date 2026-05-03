import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Users, DollarSign } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; }

const metrics = [
  { label: 'Tasks Completed', value: '12,847', change: '+15%', icon: CheckCircle2, accent: 'indigo' },
  { label: 'Avg Response', value: '1.2s', change: '-23%', icon: Clock, accent: 'emerald' },
  { label: 'Satisfaction', value: '94.2%', change: '+4.2%', icon: Users, accent: 'violet' },
  { label: 'Cost/Task', value: '$0.42', change: '-18%', icon: DollarSign, accent: 'amber' },
];

const departments = [
  { name: 'Support', tasks: 4234, efficiency: 94 },
  { name: 'Sales', tasks: 2847, efficiency: 89 },
  { name: 'Marketing', tasks: 1923, efficiency: 91 },
  { name: 'Operations', tasks: 2156, efficiency: 87 },
];

const barColors = ['bg-indigo-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500'];
const barColorsLight = ['bg-indigo-400', 'bg-emerald-400', 'bg-violet-400', 'bg-amber-400'];

export default function AnalyticsPage({ isDark }: Props) {
  const seo = pageSEO.analytics;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';
  const bars = isDark ? barColors : barColorsLight;

  return (
    <div className="min-h-screen p-8">
      <PageHeader title="Analytics" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

      <div className="grid grid-cols-4 gap-5 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={m.label} className={`p-5 rounded-xl border ${card}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex items-center justify-between mb-2"><m.icon className={`w-5 h-5 ${textS}`} /><span className="text-sm font-semibold text-emerald-400">{m.change}</span></div>
            <div className={`text-2xl font-bold ${textP}`}>{m.value}</div>
            <div className={`text-sm mt-1 ${textS}`}>{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div className={`col-span-2 p-6 rounded-xl border ${card}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className={`font-bold mb-6 ${textP}`}>Performance Overview</h3>
          <div className="h-48 flex items-end justify-between gap-3">
            {[65, 78, 82, 71, 89, 94, 88, 76, 92, 85, 79, 96].map((h, i) => (
              <motion.div key={i} className={`flex-1 rounded-t-md ${bars[i % 4]}`} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.03 }} />
            ))}
          </div>
          <div className={`flex justify-between mt-3 text-xs ${textS}`}>{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}</div>
        </motion.div>

        <motion.div className={`p-6 rounded-xl border ${card}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h3 className={`font-bold mb-4 ${textP}`}>By Department</h3>
          <div className="space-y-4">
            {departments.map((d, i) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1"><span className={textS}>{d.name}</span><span className={`font-semibold ${textP}`}>{d.efficiency}%</span></div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <motion.div className={`h-full rounded-full ${bars[i]}`} initial={{ width: 0 }} animate={{ width: `${d.efficiency}%` }} transition={{ delay: 0.5 + i * 0.1 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}