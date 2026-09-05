import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface Toast {
  id: string;
  msg: string;
  type: 'hire' | 'rent' | 'vip';
}

const NAMES = [
  'StratosGroup','NovaTech','PeakOps','VaultRunners','SyncStream',
  'ClearBridge','OrbitalBiz','DeltaForge','ArcPrime','CorePulse',
  'BlueSky Inc','ZenithCo','MeritX','DataBridge','Fulgent LLC',
];
const AGENT_TITLES = [
  'SDR Agent','EA Agent','Full-Stack Dev Agent','Support Agent',
  'Recruiter Agent','Bookkeeping Agent','Content Agent','QA Agent',
  'DevOps Agent','Compliance Agent',
];

let _toastQueue: Toast[] = [];
let _listeners: Array<() => void> = [];
let _started = false;

function notify() { _listeners.forEach((l) => l()); }

function pushToast(t: Toast) {
  _toastQueue = [t, ..._toastQueue].slice(0, 3);
  notify();
}

function startToasts() {
  if (_started) return;
  _started = true;
  const generate = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const agent = AGENT_TITLES[Math.floor(Math.random() * AGENT_TITLES.length)];
    const r = Math.random();
    let msg: string;
    let type: Toast['type'];
    if (r < 0.45) {
      msg = `${name} just hired a ${agent}`;
      type = 'hire';
    } else if (r < 0.75) {
      msg = `${name} rented a ${agent} for ${Math.ceil(Math.random() * 7)} days`;
      type = 'rent';
    } else {
      msg = `${name} upgraded to Gold VIP`;
      type = 'vip';
    }
    pushToast({ id: `${Date.now()}-${Math.random()}`, msg, type });
    setTimeout(generate, 6000 + Math.random() * 8000);
  };
  setTimeout(generate, 3000);
}

startToasts();

export function ToastLeaderboard() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const sync = useCallback(() => setToasts([..._toastQueue]), []);

  useEffect(() => {
    const unsub = (() => {
      _listeners.push(sync);
      return () => { _listeners = _listeners.filter((l) => l !== sync); };
    })();
    return unsub;
  }, [sync]);

  return (
    <div className="fixed bottom-28 left-4 z-[85] flex flex-col gap-2 pointer-events-none" style={{ maxWidth: 280 }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#0d0d1e]/95 backdrop-blur-md shadow-xl"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
              t.type === 'hire' ? 'bg-violet-500/20' : t.type === 'rent' ? 'bg-blue-500/20' : 'bg-amber-500/20'
            }`}>
              {t.type === 'hire' ? '🤖' : t.type === 'rent' ? '📅' : '👑'}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-white font-medium leading-tight">{t.msg}</p>
              <p className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5" /> Just now
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
