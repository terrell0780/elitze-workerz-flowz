import { motion } from 'framer-motion';
import { MessageSquare, Brain, Sparkles, GitBranch, Users, Database, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; }

const layers = [
  { id: 'customer', title: 'Customer Interface', icon: MessageSquare, color: 'indigo', desc: 'All communication channels' },
  { id: 'lindy', title: 'Lindy AI — Frontline', icon: Brain, color: 'violet', desc: 'Human-facing AI conversation layer', badge: 'Only Human-Facing' },
  { id: 'orchestration', title: 'Orchestration Intelligence', icon: Sparkles, color: 'amber', desc: 'Hermes + ChatGPT 5.5 decision engine', badge: 'Hidden' },
  { id: 'automation', title: 'Automation & Workflow', icon: GitBranch, color: 'emerald', desc: 'LangGraph, n8n, GoHighLevel' },
  { id: 'workforce', title: 'Execution Workforce', icon: Users, color: 'cyan', desc: '1,000 AI employees across 6 tiers', badge: 'No Customer Chat' },
  { id: 'data', title: 'Data & Feedback Loop', icon: Database, color: 'rose', desc: 'Revenue, funnel, satisfaction metrics' },
];

const gradientMap: Record<string, string> = {
  indigo: 'from-indigo-500 to-blue-500',
  violet: 'from-violet-500 to-purple-500',
  amber: 'from-amber-500 to-orange-500',
  emerald: 'from-emerald-500 to-teal-500',
  cyan: 'from-cyan-500 to-blue-500',
  rose: 'from-rose-500 to-pink-500',
};

export default function ArchitecturePage({ isDark }: Props) {
  const seo = pageSEO.architecture;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="min-h-screen p-8">
      <PageHeader title="System Architecture" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

      {/* Status Bar */}
      <div className={`flex items-center gap-6 p-4 rounded-xl mb-8 ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-100'}`}>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" /><span className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>All Systems Operational</span></div>
        <span className={textS}>•</span><span className={`text-sm ${textS}`}>1,000 active workers</span>
        <span className={textS}>•</span><span className={`text-sm ${textS}`}>99.97% uptime</span>
        <span className={textS}>•</span><span className={`text-sm ${textS}`}>12ms response</span>
      </div>

      {/* Architecture Flow */}
      <div className="relative">
        <div className={`absolute left-14 top-0 bottom-0 w-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
        <div className="space-y-5">
          {layers.map((layer, index) => (
            <motion.div key={layer.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} className="relative">
              <div className="absolute -left-14 top-1/2 -translate-y-1/2"><ArrowRight className={`w-5 h-5 -rotate-90 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} /></div>
              <div className={`ml-10 p-5 rounded-xl border ${card}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientMap[layer.color]} flex items-center justify-center shadow-lg`}><layer.icon className="w-6 h-6 text-white" /></div>
                    <div><h3 className={`font-bold ${textP}`}>{layer.title}</h3><p className={`text-sm ${textS}`}>{layer.desc}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {layer.badge && <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{layer.badge}</span>}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Active</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tier System */}
      <motion.div className={`mt-10 p-6 rounded-xl border ${card}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h3 className={`font-bold mb-4 ${textP}`}>Workforce Tier System</h3>
        <div className="grid grid-cols-6 gap-4">
          {[{ t: 1, n: 'Data', d: 'Scraping', c: 'indigo' }, { t: 2, n: 'Support', d: 'Ops', c: 'violet' }, { t: 3, n: 'Marketing', d: 'SEO', c: 'amber' }, { t: 4, n: 'Strategy', d: 'Execute', c: 'emerald' }, { t: 5, n: 'Business', d: 'Manage', c: 'cyan' }, { t: 6, n: 'Autonomous', d: 'Units', c: 'rose' }].map((t) => (
            <div key={t.t} className={`text-center p-4 rounded-xl ${isDark ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientMap[t.c]} flex items-center justify-center text-white font-bold text-sm mx-auto mb-2 shadow-lg`}>T{t.t}</div>
              <div className={`text-sm font-semibold ${textP}`}>{t.n}</div>
              <div className={`text-xs ${textS} mt-1`}>{t.d}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}