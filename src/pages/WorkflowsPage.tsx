import { motion } from 'framer-motion';
import { Play, Pause, GitBranch, Plus, Clock, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; }

export default function WorkflowsPage({ isDark }: Props) {
  const seo = pageSEO.workflows;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';

  const workflows = [
    { name: 'Customer Onboarding', status: 'active' as const, runs: 234, success: 98, lastRun: '5 min ago' },
    { name: 'Lead Qualification', status: 'active' as const, runs: 156, success: 94, lastRun: '12 min ago' },
    { name: 'Support Escalation', status: 'paused' as const, runs: 89, success: 97, lastRun: '1 hour ago' },
    { name: 'Report Generation', status: 'active' as const, runs: 45, success: 100, lastRun: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen p-8">
      <PageHeader title="Workflows" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark}
        action={<motion.button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20" whileHover={{ scale: 1.02 }}><Plus className="w-4 h-4" /> Create</motion.button>}
      />
      <div className="grid grid-cols-2 gap-5">
        {workflows.map((wf, i) => (
          <motion.div key={wf.name} className={`p-6 rounded-xl border ${card}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? 'bg-violet-500/15' : 'bg-violet-50'}`}><GitBranch className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} /></div>
                <div><h3 className={`font-bold ${textP}`}>{wf.name}</h3><span className={`text-xs font-medium ${wf.status === 'active' ? 'text-emerald-400' : 'text-amber-400'}`}>● {wf.status}</span></div>
              </div>
              <button className={`p-2.5 rounded-xl ${wf.status === 'active' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{wf.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>
            </div>
            <div className={`grid grid-cols-3 gap-4 pt-4 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-100'}`}>
              <div><div className={`text-xl font-bold ${textP}`}>{wf.runs}</div><div className={`text-xs ${textS}`}>Runs</div></div>
              <div><div className="flex items-center gap-1 text-emerald-400 text-xl font-bold"><CheckCircle2 className="w-4 h-4" /> {wf.success}%</div><div className={`text-xs ${textS}`}>Success</div></div>
              <div><div className="flex items-center gap-1 text-sm"><Clock className={`w-3 h-3 ${textS}`} /><span className={textS}>{wf.lastRun}</span></div><div className={`text-xs ${textS}`}>Last Run</div></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}