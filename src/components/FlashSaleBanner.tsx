import { useState, useEffect } from 'react';
import { X, Zap, Clock } from 'lucide-react';
import { isFlashSaleActive, getCountdown, type Countdown } from '../store/flashSale';
import { motion, AnimatePresence } from 'framer-motion';

function pad(n: number) { return String(n).padStart(2, '0'); }

export function FlashSaleBanner() {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState<Countdown>(getCountdown());

  useEffect(() => {
    if (!isFlashSaleActive()) return;
    const t = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!isFlashSaleActive() || !visible || countdown.expired) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -56, opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-[200]"
        style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)', borderBottom: '1px solid rgba(148,163,184,0.18)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          {/* Left: label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-blue-300 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold text-white tracking-wide whitespace-nowrap">
              7-DAY OPENING FLASH SALE
            </span>
          </div>

          {/* Centre: deal + countdown */}
          <div className="flex items-center gap-4 flex-1 justify-center min-w-0">
            <p className="text-xs text-white/90 hidden sm:block whitespace-nowrap">
              <span className="font-bold text-blue-200">50% OFF</span> orders over $100
              {' '}+{' '}
              <span className="font-bold text-blue-200">FREE 7-Day VIP Gold</span>
            </p>
            {/* Live countdown */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Clock className="w-3 h-3 text-white/70 flex-shrink-0" />
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-white">
                <CountUnit value={pad(countdown.days)} label="d" />
                <span className="text-white/50 pb-2">:</span>
                <CountUnit value={pad(countdown.hours)} label="h" />
                <span className="text-white/50 pb-2">:</span>
                <CountUnit value={pad(countdown.minutes)} label="m" />
                <span className="text-white/50 pb-2">:</span>
                <CountUnit value={pad(countdown.seconds)} label="s" />
              </div>
            </div>
          </div>

          {/* Right: dismiss */}
          <button
            onClick={() => setVisible(false)}
            className="p-1 rounded text-white/60 hover:text-white transition-colors flex-shrink-0"
            aria-label="Dismiss flash sale banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="tabular-nums">{value}</span>
      <span className="text-[7px] text-white/50 font-normal">{label}</span>
    </div>
  );
}
