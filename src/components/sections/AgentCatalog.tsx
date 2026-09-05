import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { AGENTS, CATEGORIES, type AgentCategory } from '../../data/agents';
import { AgentCard } from '../AgentCard';
import { useCart } from '../../store/cart';
import { cn } from '../../utils/cn';

interface AgentCatalogProps {
  onOpenCart: () => void;
}

export function AgentCatalog({ onOpenCart }: AgentCatalogProps) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<AgentCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'tasks' | 'name'>('rating');
  const { items } = useCart();
  const [, forceUpdate] = useState(0);
  const onCartChange = useCallback(() => forceUpdate((n) => n + 1), []);

  const filtered = AGENTS
    .filter((a) => {
      const matchCat = cat === 'All' || a.category === cat;
      const matchSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'tasks') return b.tasksCompleted - a.tasksCompleted;
      return a.name.localeCompare(b.name);
    });

  const cartCount = items.length;

  return (
    <section id="agents" className="relative py-24 px-6 lg:px-12 bg-[#050508]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-mono text-violet-400 uppercase tracking-[0.25em] mb-3">
              // 1,000 Certified Agents — Live
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Meet your{' '}
              <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                AI workforce.
              </span>
            </h2>
            <p className="text-slate-400 mt-3 text-base max-w-xl leading-relaxed">
              Every agent is Hermes AI certified and ready to work. Interact, rent, or own.
              Lindy AI, your customer service supervisor, manages all day-to-day operations after you hire.
            </p>
          </div>

          {/* Cart button */}
          <button
            onClick={onOpenCart}
            className="flex-shrink-0 relative flex items-center gap-2 px-5 py-3 border border-violet-400/30 rounded-xl bg-violet-500/5 hover:bg-violet-500/10 text-white font-semibold text-sm transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            View Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </motion.div>

        {/* Pricing banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
        >
          {[
            { label: 'Rent', price: '$49.99 / day', sub: 'Any agent · cancel anytime', color: 'from-violet-500 to-purple-600' },
            { label: 'Buy 1', price: '$399 / agent', sub: 'Own it outright · lifetime', color: 'from-indigo-500 to-blue-600' },
            { label: 'Buy 3–4', price: '$375 / agent', sub: 'Save $24 per agent', color: 'from-cyan-500 to-teal-600' },
            { label: 'Buy 10+', price: '$299 / agent', sub: 'Maximum savings', color: 'from-emerald-500 to-green-600' },
          ].map((tier) => (
            <div
              key={tier.label}
              className="p-4 rounded-xl border border-white/8 bg-white/[0.02] flex items-center gap-3"
            >
              <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex-shrink-0', tier.color)} />
              <div>
                <p className="text-xs font-bold text-white">{tier.label} — <span className="font-mono">{tier.price}</span></p>
                <p className="text-[10px] text-slate-500">{tier.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search agents, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/20 transition-colors"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-400 cursor-pointer"
            >
              <option value="rating">Top Rated</option>
              <option value="tasks">Most Experienced</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(['All', ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                'px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all',
                cat === c
                  ? 'border-violet-400/40 bg-violet-500/10 text-white'
                  : 'border-white/8 text-slate-400 hover:border-white/20 hover:text-white'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-500 font-mono">
            Showing <span className="text-white">{filtered.length}</span> agents
            {cat !== 'All' && <span className="text-violet-400"> in {cat}</span>}
          </p>
          {cartCount > 0 && (
            <button onClick={onOpenCart} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-mono">
              {cartCount} in cart — checkout →
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((agent, i) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={i}
              onCartChange={onCartChange}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-sm">No agents match your search. Try a different skill or category.</p>
          </div>
        )}

        {/* Lindy AI CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              LA
            </div>
            <div>
              <p className="font-bold text-white text-lg">Meet Lindy AI — Your Customer Service Supervisor</p>
              <p className="text-sm text-slate-400 max-w-md">
                Lindy AI is our customer service supervisor. After every hire, she handles onboarding and 
                day-to-day operations, ensuring you talk only to the best candidates while 
                integrating with over 7,000 tools.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Lindy AI is online
          </div>
        </motion.div>
      </div>
    </section>
  );
}
