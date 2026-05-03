import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Key } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { pageSEO } from '../data/seo';

interface Props { isDark: boolean; onOpenAdmin: () => void; }

export default function SettingsPage({ isDark, onOpenAdmin }: Props) {
  const seo = pageSEO.settings;
  const card = isDark ? 'bg-[#12121e] border-slate-800/60' : 'bg-white border-slate-200/60 shadow-sm';
  const textP = isDark ? 'text-white' : 'text-slate-900';
  const textS = isDark ? 'text-slate-400' : 'text-slate-500';

  const sections = [
    { icon: User, title: 'Profile', desc: 'Manage your account details' },
    { icon: Bell, title: 'Notifications', desc: 'Configure alerts and updates' },
    { icon: Shield, title: 'Security', desc: 'Two-factor authentication' },
    { icon: Palette, title: 'Appearance', desc: 'Theme and display options' },
    { icon: Globe, title: 'Language', desc: 'Preferred language settings' },
    { icon: Key, title: 'API Keys', desc: 'Manage API access tokens' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader title="Settings" description={seo.description} breadcrumbs={seo.breadcrumbs} isDark={isDark} />

        <motion.button onClick={onOpenAdmin} className={`w-full flex items-center gap-4 p-5 rounded-xl border mb-6 transition-all ${isDark ? 'bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/15' : 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100'}`} whileHover={{ x: 4 }}>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}><Key className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} /></div>
          <div className="flex-1 text-left"><h3 className={`font-bold ${textP}`}>Admin Panel Access</h3><p className={`text-sm ${textS}`}>Enter PIN to access admin settings</p></div>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>Locked</span>
        </motion.button>

        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.button key={section.title} className={`w-full flex items-center gap-4 p-4 rounded-xl border ${card} text-left`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}><section.icon className={`w-5 h-5 ${textS}`} /></div>
              <div><h3 className={`font-semibold ${textP}`}>{section.title}</h3><p className={`text-sm ${textS}`}>{section.desc}</p></div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}