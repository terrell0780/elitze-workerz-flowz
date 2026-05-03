import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; }

export default function IntegrationsPage({ isDark }: Props) {
  const seo = pageSEO.integrations;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';

  const integrations = [
    { name: 'Slack', category: 'Communication', status: 'connected' as const, icon: '💬' },
    { name: 'Salesforce', category: 'CRM', status: 'connected' as const, icon: '☁️' },
    { name: 'HubSpot', category: 'Marketing', status: 'available' as const, icon: '🧡' },
    { name: 'Zendesk', category: 'Support', status: 'connected' as const, icon: '🎧' },
    { name: 'Jira', category: 'Project Management', status: 'available' as const, icon: '📋' },
    { name: 'GitHub', category: 'Development', status: 'connected' as const, icon: '🐙' },
    { name: 'Stripe', category: 'Payments', status: 'connected' as const, icon: '💳' },
    { name: 'Notion', category: 'Documentation', status: 'available' as const, icon: '📝' },
    { name: 'Google Workspace', category: 'Productivity', status: 'available' as const, icon: '🔵' },
  ];

  return (
    <div className="min-h-screen p-8">
      <PageHeader title="Integrations" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />
      <div className="grid grid-cols-3 gap-5">
        {integrations.map((int, i) => (
          <motion.div key={int.name} className={`p-5 rounded-xl border ${card}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -3 }}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>{int.icon}</div>
              {int.status === 'connected' && <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold"><Check className="w-3 h-3" /> Connected</span>}
            </div>
            <h3 className={`font-bold ${textP}`}>{int.name}</h3>
            <p className={`text-xs ${textS} mb-4`}>{int.category}</p>
            <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${int.status === 'connected' ? isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'}`}>{int.status === 'connected' ? 'Manage' : 'Connect'}</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}