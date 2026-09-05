import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Search, Star, Zap, TrendingUp, ShoppingCart,
} from 'lucide-react';
import { ALL_AGENTS, POPULAR_AGENTS, type FullAgent } from '../data/allAgents';
import { type AgentCategory, CATEGORIES } from '../data/agents';
import { cartStore } from '../store/cart';
import { getBuyPrice } from '../data/agents';
import { cn } from '../utils/cn';

interface HoverCardProps {
  agent: FullAgent;
  onAddCart: (agent: FullAgent, mode: 'rent' | 'buy') => void;
}

function HoverCard({ agent, onAddCart }: HoverCardProps) {
  const avColor = {
    Available: 'bg-emerald-400',
    Busy: 'bg-amber-400',
    'On Task': 'bg-blue-400',
  }[agent.availability];

  return (
    <motion.div
      initial={{ opacity: 0, x: 10, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 10, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute left-full top-0 ml-2 z-[200] w-72 rounded-2xl border border-white/12 bg-[#0d0d1e] shadow-2xl p-5 pointer-events-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0', agent.color)}>
          {agent.avatar}
        </div>
        <div>
          <p className="font-bold text-white text-sm">{agent.name}</p>
          <p className="text-[11px] text-slate-400">{agent.title}</p>
        </div>
        <div className={cn('w-2 h-2 rounded-full ml-auto flex-shrink-0', avColor)} />
      </div>

      {/* Task description */}
      <p className="text-xs text-slate-300 leading-relaxed mb-4">{agent.tasks}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: Star, val: String(agent.rating), label: 'Rating' },
          { icon: Zap, val: `${agent.tasksCompleted.toLocaleString()}`, label: 'Tasks' },
          { icon: TrendingUp, val: agent.responseTime, label: 'Response' },
        ].map((s) => (
          <div key={s.label} className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <s.icon className="w-3 h-3 text-violet-400 mx-auto mb-1" />
            <p className="text-[10px] font-bold text-white font-mono">{s.val}</p>
            <p className="text-[9px] text-slate-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onAddCart(agent, 'rent')}
          className="py-2 rounded-lg bg-violet-500/15 border border-violet-400/25 text-xs font-bold text-violet-200 hover:bg-violet-500/25 transition-colors"
        >
          Rent $49.99/day
        </button>
        <button
          onClick={() => onAddCart(agent, 'buy')}
          className="py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-violet-100 transition-colors"
        >
          Buy ${getBuyPrice(1)}
        </button>
      </div>
    </motion.div>
  );
}

interface AgentRowProps {
  agent: FullAgent;
  onAddCart: (agent: FullAgent, mode: 'rent' | 'buy') => void;
  isPopular?: boolean;
}

function AgentRow({ agent, onAddCart, isPopular }: AgentRowProps) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const avColor = {
    Available: 'text-emerald-400',
    Busy: 'text-amber-400',
    'On Task': 'text-blue-400',
  }[agent.availability];

  return (
    <div
      ref={rowRef}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors cursor-default">
        {/* Avatar dot */}
        <div className={cn('w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0', agent.color)}>
          {agent.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
            {isPopular && (
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/20 flex-shrink-0">
                HOT
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 truncate">{agent.title}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={cn('text-[9px] font-mono', avColor)}>
            {agent.availability}
          </span>
          <span className="text-[9px] text-slate-600 font-mono">
            ★{agent.rating}
          </span>
        </div>
      </div>

      {/* Hover card */}
      <AnimatePresence>
        {hovered && (
          <HoverCard agent={agent} onAddCart={onAddCart} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface AgentDropdownProps {
  onOpenCart: () => void;
}

export function AgentDropdown({ onOpenCart }: AgentDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<AgentCategory | 'All' | 'Popular'>('Popular');
  const [added, setAdded] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 100);
  }, [open]);

  const filtered = useMemo(() => {
    let base =
      cat === 'Popular'
        ? POPULAR_AGENTS
        : cat === 'All'
        ? ALL_AGENTS
        : ALL_AGENTS.filter((a) => a.category === cat);

    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.title.toLowerCase().includes(q) ||
          a.tasks.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    return base.slice(0, 80); // render cap for performance
  }, [cat, search]);

  function handleAddCart(agent: FullAgent, mode: 'rent' | 'buy') {
    const qty = 1;
    const unitPrice = mode === 'rent' ? 49.99 : getBuyPrice(qty);
    const total = mode === 'rent' ? 49.99 : unitPrice;
    cartStore.addItem({
      agentId: agent.id,
      agentName: `${agent.name} · ${agent.title}`,
      mode,
      days: mode === 'rent' ? 1 : undefined,
      qty: mode === 'buy' ? 1 : undefined,
      unitPrice,
      total,
    });
    setAdded(agent.id);
    setTimeout(() => setAdded(null), 2000);
    onOpenCart();
  }

  return (
    <div ref={dropRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all',
          open
            ? 'border-violet-400/40 bg-violet-500/10 text-white'
            : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
        )}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        All 1,000 Agents
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 z-[150] w-[380px] rounded-2xl border border-white/10 bg-[#0b0b18] shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '72vh' }}
          >
            {/* Search */}
            <div className="px-3 pt-3 pb-2 border-b border-white/5 flex-shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search agents, titles, skills…"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.04] border border-white/8 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400/40"
                />
              </div>
            </div>

            {/* Category tabs */}
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-none border-b border-white/5">
              {(['Popular', 'All', ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    'px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0',
                    cat === c
                      ? 'bg-violet-500/20 text-violet-200 border border-violet-400/30'
                      : 'text-slate-500 hover:text-white border border-transparent hover:border-white/10'
                  )}
                >
                  {c === 'Popular' ? '🔥 Popular' : c}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="px-4 py-1.5 flex-shrink-0">
              <p className="text-[9px] text-slate-600 font-mono">
                {filtered.length} agents shown
                {search && ` matching "${search}"`}
                {filtered.length === 80 && ' — scroll or refine search'}
              </p>
            </div>

            {/* Agent list */}
            <div className="overflow-y-auto flex-1 min-h-0 divide-y divide-white/[0.04]">
              {cat === 'Popular' && !search && (
                <div className="px-4 pt-2 pb-1">
                  <p className="text-[9px] font-mono text-amber-400 uppercase tracking-widest">
                    🔥 Most Popular — By Hire Volume
                  </p>
                </div>
              )}
              {filtered.map((agent) => (
                <AgentRow
                  key={agent.id}
                  agent={agent}
                  isPopular={agent.popular}
                  onAddCart={handleAddCart}
                />
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-xs text-slate-600">No agents match your search.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 px-4 py-3 flex-shrink-0 flex items-center justify-between">
              <p className="text-[9px] text-slate-600 font-mono">
                1,000 certified agents · Hermes AI orchestrated
              </p>
              {added && (
                <span className="text-[9px] text-emerald-400 font-mono animate-pulse">
                  ✓ Added to cart
                </span>
              )}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-1 text-[10px] text-violet-400 hover:text-violet-200 transition-colors"
              >
                <ShoppingCart className="w-3 h-3" />
                Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
