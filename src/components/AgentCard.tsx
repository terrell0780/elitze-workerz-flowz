import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, CalendarDays, BadgeCheck, X, Plus, Minus } from 'lucide-react';
import { Agent, getBuyPrice } from '../data/agents';
import { cartStore } from '../store/cart';
import { cn } from '../utils/cn';

interface AgentCardProps {
  agent: Agent;
  onCartChange?: () => void;
  index?: number;
}

export function AgentCard({ agent, onCartChange, index = 0 }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<'rent' | 'buy'>('rent');
  const [days, setDays] = useState(1);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unitBuyPrice = getBuyPrice(qty);
  const rentTotal = Number((49.99 * days).toFixed(2));
  const buyTotal = unitBuyPrice * qty;

  const availColor = {
    'Available': 'bg-emerald-400',
    'Busy': 'bg-amber-400',
    'On Task': 'bg-blue-400',
  }[agent.availability];

  function addToCart() {
    if (mode === 'rent') {
      cartStore.addItem({
        agentId: agent.id,
        agentName: `${agent.name} · ${agent.title}`,
        mode: 'rent',
        days,
        unitPrice: 49.99,
        total: rentTotal,
      });
    } else {
      cartStore.addItem({
        agentId: agent.id,
        agentName: `${agent.name} · ${agent.title}`,
        mode: 'buy',
        qty,
        unitPrice: unitBuyPrice,
        total: buyTotal,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    onCartChange?.();
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: (index % 8) * 0.05 }}
        onClick={() => setExpanded(true)}
        className="group relative p-5 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer"
      >
        {/* Availability dot */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <div className={cn('w-1.5 h-1.5 rounded-full', availColor)} />
          <span className="text-[10px] text-slate-500">{agent.availability}</span>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-3 mb-4">
          <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0', agent.color)}>
            {agent.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm truncate">{agent.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{agent.title}</p>
          </div>
        </div>

        {/* Category chip */}
        <div className="mb-3">
          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r bg-clip-text text-transparent', agent.color)}>
            {agent.category.toUpperCase()}
          </span>
        </div>

        {/* Rating + tasks */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs text-white font-mono">{agent.rating}</span>
          </div>
          <span className="text-[10px] text-slate-500">{agent.tasksCompleted.toLocaleString()} tasks</span>
          <span className="text-[10px] text-slate-600">⚡ {agent.responseTime}</span>
        </div>

        {/* Cert badge */}
        <div className="flex items-center gap-1.5 mb-4">
          <BadgeCheck className="w-3 h-3 text-violet-400" />
          <span className="text-[10px] text-violet-300 truncate">{agent.certifications[0]}</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <div className="text-[10px] text-slate-500 mb-0.5">Rent / day</div>
            <div className="text-base font-bold text-white font-mono">$49.99</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-500 mb-0.5">Buy</div>
            <div className="text-base font-bold text-white font-mono">$399</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-400/20 text-[10px] font-bold text-violet-300 group-hover:bg-violet-500/20 transition-colors">
            View &amp; Hire
          </div>
        </div>
      </motion.div>

      {/* Detail / Hire drawer */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c1a] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={cn('p-6 bg-gradient-to-r relative', agent.color.replace('from-', 'from-').replace('to-', 'to-'))}>
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl flex-shrink-0', agent.color)}>
                      {agent.avatar}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                      <p className="text-white/70 text-sm">{agent.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={cn('w-1.5 h-1.5 rounded-full', availColor)} />
                        <span className="text-xs text-white/60">{agent.availability}</span>
                        <span className="text-white/30">·</span>
                        <span className="text-xs text-white/60">⚡ {agent.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(false)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Bio */}
                <p className="text-slate-300 text-sm leading-relaxed">{agent.bio}</p>

                {/* Skills */}
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-2">Capabilities</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certs */}
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-2">Certifications</p>
                  <div className="space-y-1.5">
                    {agent.certifications.map((c) => (
                      <div key={c} className="flex items-center gap-2 text-xs">
                        <BadgeCheck className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                        <span className="text-slate-300">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Rating', value: String(agent.rating) },
                    { label: 'Tasks Done', value: agent.tasksCompleted.toLocaleString() },
                    { label: 'Languages', value: agent.languages.join(', ') },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                      <p className="text-xs font-bold text-white">{s.value}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mode toggle */}
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">Hire Mode</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(['rent', 'buy'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={cn(
                          'py-3 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2',
                          mode === m
                            ? 'border-violet-400/40 bg-violet-500/10 text-white'
                            : 'border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/15'
                        )}
                      >
                        {m === 'rent' ? <CalendarDays className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                        {m === 'rent' ? 'Rent by Day' : 'Buy Agent'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rent controls */}
                {mode === 'rent' && (
                  <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Days to rent</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setDays(Math.max(1, days - 1))} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-white">{days}</span>
                        <button onClick={() => setDays(days + 1)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-slate-500">$49.99/day × {days} day{days !== 1 ? 's' : ''}</span>
                      <span className="text-xl font-bold text-white font-mono">${rentTotal}</span>
                    </div>
                  </div>
                )}

                {/* Buy controls */}
                {mode === 'buy' && (
                  <div className="p-4 rounded-xl border border-white/8 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-white">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">${unitBuyPrice}/agent × {qty}</span>
                      <span className="text-xl font-bold text-white font-mono">${buyTotal}</span>
                    </div>
                    {qty >= 3 && (
                      <div className="text-[10px] text-emerald-300 bg-emerald-500/8 border border-emerald-500/15 px-3 py-1.5 rounded-lg">
                        🎉 Volume discount applied — ${unitBuyPrice}/agent
                      </div>
                    )}
                  </div>
                )}

                {/* Add to cart */}
                <button
                  onClick={addToCart}
                  className={cn(
                    'w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm',
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-black hover:bg-violet-100'
                  )}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {added ? '✓ Added to Cart' : `Add to Cart — $${mode === 'rent' ? rentTotal : buyTotal}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
