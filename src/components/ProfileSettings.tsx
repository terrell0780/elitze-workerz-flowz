import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Mail, Globe, Key, Download, Settings, LogOut, CreditCard } from 'lucide-react';
import { authStore } from '../store/auth';

export function ProfileSettings() {
  const [open, setOpen] = useState(false);
  const user = authStore.getUser();

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="p-2 rounded-lg border border-white/8 text-slate-500 hover:text-white hover:border-white/20 transition-all">
        <User className="w-4 h-4" />
      </button>
    );
  }

  const exportData = () => {
    const data = { user, audit: '...' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zevanto-profile-export.json`;
    a.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setOpen(false)}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-2xl bg-[#0b0c16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white">Profile & Settings</h3>
            <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <div className="grid md:grid-cols-5 h-[500px]">
            <div className="col-span-2 border-r border-white/5 bg-white/[0.01] p-6 space-y-2">
              {[
                { label: 'General', icon: User },
                { label: 'Security', icon: Key },
                { label: 'Billing', icon: CreditCard },
                { label: 'API & Keys', icon: Settings },
                { label: 'Data', icon: Download },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all text-left">
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5">
                 <button onClick={() => authStore.signOut()} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-all text-left">
                   <LogOut className="w-4 h-4" /> Sign Out
                 </button>
              </div>
            </div>

            <div className="col-span-3 p-8 overflow-y-auto space-y-8">
              <section>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Identity</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name.slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{user?.name || 'Guest User'}</h4>
                    <p className="text-sm text-slate-500">{user?.email || 'Not signed in'}</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                       <Mail className="w-4 h-4 text-slate-500" />
                       <span className="text-xs text-slate-300">Email Notifications</span>
                    </div>
                    <div className="w-8 h-4 rounded-full bg-violet-600 relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" /></div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                       <Globe className="w-4 h-4 text-slate-500" />
                       <span className="text-xs text-slate-300">Language</span>
                    </div>
                    <span className="text-xs text-slate-500">English</span>
                  </div>
                </div>
              </section>

              <section>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Account Data</p>
                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
                   <p className="text-xs text-slate-400 mb-4 leading-relaxed">Download a complete archive of your hire history, task logs, and payment records.</p>
                   <button onClick={exportData} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs text-white hover:bg-white/5 transition-all">
                     <Download className="w-4 h-4 text-slate-400" /> Export JSON
                   </button>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
