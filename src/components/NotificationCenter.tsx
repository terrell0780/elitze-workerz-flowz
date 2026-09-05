import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, Shield, Zap, X } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'info' | 'security' | 'order';
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    { id: '1', title: 'Welcome to Zevanto', desc: 'Your account setup is complete. Greet Lindy AI to start.', time: '2m ago', type: 'info' },
    { id: '2', title: 'Security Update', desc: 'New login detected from Toronto, CA.', time: '1h ago', type: 'security' },
    { id: '3', title: 'Flash Sale Live', desc: '50% off orders over $100 for your first 7 days.', time: '3h ago', type: 'order' },
  ]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 rounded-lg border border-white/8 text-slate-500 hover:text-white hover:border-white/20 transition-all relative">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0b12]" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-[#0d0d1e] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <p className="text-xs font-bold text-white uppercase tracking-widest">Notifications</p>
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white"><X className="w-3.5 h-3.5" /></button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-default">
                    <div className="flex items-start gap-3">
                      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0', 
                        n.type === 'security' ? 'bg-rose-500/10 text-rose-400' : n.type === 'order' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                      )}>
                        {n.type === 'security' ? <Shield className="w-3.5 h-3.5" /> : n.type === 'order' ? <Zap className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                        <p className="text-[9px] text-slate-600 mt-2 font-mono uppercase tracking-tighter">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 text-[10px] text-slate-500 hover:text-white font-mono uppercase tracking-[0.2em] bg-white/[0.01]">
                Clear All
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
