import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Zap, Users, ShoppingCart, Shield, Command } from 'lucide-react';
import { router } from '../store/router';
import { useShortcuts } from '../store/shortcuts';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { register, unregister } = useShortcuts();

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    register('cmd+k', handleOpen);
    return () => unregister('cmd+k', handleOpen);
  }, []);

  const commands = [
    { icon: Users, label: 'Browse Agents', action: () => router.go('agents') },
    { icon: ShoppingCart, label: 'Hire Agent', action: () => router.go('hire') },
    { icon: Terminal, label: 'Orchestrator', action: () => router.go('orchestrator') },
    { icon: Zap, label: 'Behavioral Flow', action: () => router.go('behavior') },
    { icon: Shield, label: 'Security & Compliance', action: () => router.go('security') },
  ].filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4" onClick={() => setOpen(false)}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -20 }}
          className="w-full max-w-xl bg-[#0d0d1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center px-4 py-4 border-b border-white/5">
            <Search className="w-5 h-5 text-slate-500 mr-3" />
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none text-white text-lg focus:outline-none placeholder:text-slate-600"
              placeholder="Type a command or search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 font-mono">ESC</span>
            </div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {commands.map((c, i) => (
              <button 
                key={i} 
                onClick={() => { c.action(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-violet-500/10 hover:text-white text-slate-400 transition-all text-sm group"
              >
                <c.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{c.label}</span>
                <Command className="w-3 h-3 opacity-0 group-hover:opacity-40" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
