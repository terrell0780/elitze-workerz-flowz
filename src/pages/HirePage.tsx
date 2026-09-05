import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Zap, BadgeCheck, Plus, Minus, ShoppingCart, CheckCircle2, Lock } from 'lucide-react';
import { ALL_AGENTS } from '../data/allAgents';
import { type FullAgent } from '../data/allAgents';
import { getBuyPrice } from '../data/agents';
import { cartStore } from '../store/cart';
import { authStore } from '../store/auth';
import { router } from '../store/router';
import { cn } from '../utils/cn';

interface HirePageProps { onCartOpen: () => void; }

export function HirePage({ onCartOpen }: HirePageProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<FullAgent | null>(null);
  const [mode, setMode] = useState<'rent' | 'buy'>('rent');
  const [days, setDays] = useState(1);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState('');

  const visible = ALL_AGENTS.filter(a => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.tasks.toLowerCase().includes(q);
  }).slice(0, 60);

  const unitBuy = getBuyPrice(qty);
  const rentTotal = Number((49.99 * days).toFixed(2));
  const buyTotal = unitBuy * qty;

  function addToCart(agent: FullAgent) {
    if (!authStore.isAuthenticated()) {
      setAuthMessage('Sign in first, then continue through Lindy AI to authorize your hire.');
      setTimeout(() => setAuthMessage(''), 4000);
      router.go('chat');
      return;
    }

    if (mode === 'rent') {
      cartStore.addItem({ agentId: agent.id, agentName: `${agent.name} · ${agent.title}`, mode: 'rent', days, unitPrice: 49.99, total: rentTotal });
    } else {
      cartStore.addItem({ agentId: agent.id, agentName: `${agent.name} · ${agent.title}`, mode: 'buy', qty, unitPrice: unitBuy, total: buyTotal });
    }
    setJustAdded(agent.id);
    setTimeout(() => setJustAdded(null), 2000);
  }

  const avColor = { Available: 'bg-emerald-400', Busy: 'bg-amber-400', 'On Task': 'bg-blue-400' };

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Page header */}
      <div className="border-b border-white/8 bg-[#050508] px-6 lg:px-10 py-8">
        <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-2">// Hire an Agent</p>
        <h1 className="text-3xl font-bold text-white mb-1">Select · Configure · Deploy</h1>
        <p className="text-slate-400 text-sm">Pick an agent, set rent days or buy quantity, add to cart. Lindy AI handles onboarding after payment.</p>
        {!authStore.isAuthenticated() && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            Renting or purchasing requires login and Lindy AI authorization.
          </div>
        )}
        {authMessage && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-500/20 bg-blue-500/10 text-xs text-blue-200">
            {authMessage}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-140px)]">
        {/* LEFT: Agent list */}
        <div className="lg:w-80 xl:w-96 border-r border-white/8 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400 transition-colors" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
            {visible.map((agent) => (
              <button key={agent.id} onClick={() => setSelected(agent)}
                className={cn('w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.03] transition-colors',
                  selected?.id === agent.id && 'bg-violet-500/8 border-l-2 border-violet-400')}>
                <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xs flex-shrink-0', agent.color)}>
                  {agent.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">{agent.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{agent.title}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <div className={cn('w-1.5 h-1.5 rounded-full', avColor[agent.availability])} />
                    <span className="text-[9px] text-slate-500">{agent.availability}</span>
                  </div>
                  {justAdded === agent.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Detail + hire panel */}
        <div className="flex-1 p-6 lg:p-10">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center py-20">
                <p className="text-5xl mb-4">👈</p>
                <p className="text-slate-400 text-sm">Select an agent from the list to view their profile and hire them.</p>
              </motion.div>
            ) : (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="max-w-2xl">
                {/* Agent header */}
                <div className={cn('p-7 rounded-2xl bg-gradient-to-br mb-6 relative overflow-hidden', selected.color)}>
                  <div className="absolute inset-0 bg-black/55" />
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn('w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-2xl flex-shrink-0', selected.color)}>
                        {selected.avatar}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
                        <p className="text-white/70 text-sm mt-0.5">{selected.title}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-white/60">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{selected.rating}</span>
                          <span>·</span>
                          <span>{selected.tasksCompleted.toLocaleString()} tasks</span>
                          <span>·</span>
                          <Zap className="w-3 h-3 text-emerald-300" />
                          <span>{selected.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10">
                      <div className={cn('w-1.5 h-1.5 rounded-full', avColor[selected.availability])} />
                      <span className="text-xs text-white">{selected.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-2">Job Description</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{selected.tasks}</p>
                </div>

                {/* Certifications */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {['Hermes AI Certified', `${selected.category} Specialist`, 'Audit Logged', 'Lobster Pipeline'].map((c) => (
                    <div key={c} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-[10px] text-violet-300">
                      <BadgeCheck className="w-3 h-3" />{c}
                    </div>
                  ))}
                </div>

                {/* Hire mode */}
                <div className="mb-5">
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">Hire Mode</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(['rent', 'buy'] as const).map((m) => (
                      <button key={m} onClick={() => setMode(m)}
                        className={cn('py-3 rounded-xl border font-bold text-sm transition-all',
                          mode === m ? 'border-violet-400/40 bg-violet-500/10 text-white' : 'border-white/8 text-slate-400 hover:border-white/15')}>
                        {m === 'rent' ? '📅 Rent by Day' : '💼 Buy Agent'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rent controls */}
                {mode === 'rent' && (
                  <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-300">Days to rent</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setDays(Math.max(1, days - 1))} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-white text-lg">{days}</span>
                        <button onClick={() => setDays(days + 1)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-500">$49.99/day × {days} day{days !== 1 ? 's' : ''}</span>
                      <span className="text-2xl font-bold text-white font-mono">${rentTotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Buy controls */}
                {mode === 'buy' && (
                  <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-300">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-white text-lg">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-500">${unitBuy}/agent × {qty}</span>
                      <span className="text-2xl font-bold text-white font-mono">${buyTotal}</span>
                    </div>
                    {qty >= 3 && (
                      <p className="text-xs text-emerald-300 mt-2 bg-emerald-500/8 px-3 py-1.5 rounded-lg border border-emerald-500/15">
                        🎉 Volume discount applied — ${unitBuy}/agent (standard $399)
                      </p>
                    )}
                  </div>
                )}

                {/* Add to cart */}
                <div className="flex gap-3">
                  <button onClick={() => addToCart(selected)}
                    className={cn('flex-1 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all',
                      justAdded === selected.id ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-violet-100')}>
                    <ShoppingCart className="w-4 h-4" />
                    {justAdded === selected.id ? '✓ Added to Cart' : `Add to Cart — $${mode === 'rent' ? rentTotal : buyTotal}`}
                  </button>
                  {justAdded === selected.id && (
                    <button onClick={onCartOpen}
                      className="px-5 py-4 rounded-xl border border-violet-400/30 bg-violet-500/10 text-violet-200 font-bold text-sm hover:bg-violet-500/20 transition-colors">
                      Checkout →
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
