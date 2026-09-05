import { useState, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';
import { ALL_AGENTS, POPULAR_AGENTS } from '../data/allAgents';
import { CATEGORIES, type Agent, type AgentCategory } from '../data/agents';
import { AgentCard } from '../components/AgentCard';
import { useCart } from '../store/cart';
import { cn } from '../utils/cn';

interface AgentsPageProps { onCartOpen: () => void; }

function toCardAgent(agent: (typeof ALL_AGENTS)[number]): Agent {
  return {
    id: agent.id,
    name: agent.name,
    title: agent.title,
    category: agent.category,
    avatar: agent.avatar,
    color: agent.color,
    bio: agent.tasks,
    skills: agent.tasks.split(',').slice(0, 4).map((skill) => skill.trim()),
    languages: ['EN'],
    rating: agent.rating,
    tasksCompleted: agent.tasksCompleted,
    availability: agent.availability,
    certifications: ['Hermes AI Certified', 'Lindy AI Supervised'],
    responseTime: agent.responseTime,
    rentPerDay: agent.rentPerDay,
    buyPrice: agent.buyPrice,
  };
}

export function AgentsPage({ onCartOpen }: AgentsPageProps) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<AgentCategory | 'All' | 'Popular'>('Popular');
  const [sortBy, setSortBy] = useState<'rating' | 'tasks' | 'name'>('rating');
  const { items } = useCart();
  const [, forceUpdate] = useState(0);
  const onCartChange = useCallback(() => forceUpdate((n) => n + 1), []);

  const filtered = useMemo(() => {
    let base = cat === 'Popular' ? POPULAR_AGENTS : cat === 'All' ? ALL_AGENTS : ALL_AGENTS.filter(a => a.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter(a => a.name.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.tasks.toLowerCase().includes(q));
    }
    return [...base].sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : sortBy === 'tasks' ? b.tasksCompleted - a.tasksCompleted : a.name.localeCompare(b.name));
  }, [cat, search, sortBy]);

  return (
    <div className="min-h-screen bg-[#050508] px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-2">// 1,000 Certified Agents</p>
          <h1 className="text-3xl font-bold text-white">Browse AI Workforce</h1>
          <p className="text-slate-400 mt-1 text-sm">Every agent Hermes certified. Lindy AI supervised. Rent $49.99/day or own from $399.</p>
        </div>
        <button onClick={onCartOpen}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-400/30 bg-violet-500/10 text-violet-200 text-sm font-semibold hover:bg-violet-500/20 transition-all flex-shrink-0">
          <ShoppingCart className="w-4 h-4" /> View Cart
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-violet-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{items.length}</span>
          )}
        </button>
      </div>

        {/* Pricing strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Rent', price: '$49.99/day', sub: 'Full access', color: 'from-violet-500 to-purple-600' },
          { label: 'Buy 1', price: '$399', sub: 'Own outright', color: 'from-indigo-500 to-blue-600' },
          { label: 'Buy 3–9', price: 'from $349', sub: 'Volume discount', color: 'from-cyan-500 to-teal-600' },
          { label: 'Buy 10+', price: '$299/ea', sub: 'Maximum savings', color: 'from-emerald-500 to-green-600' },
        ].map((t) => (
          <div key={t.label} className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02] flex items-center gap-3">
            <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex-shrink-0', t.color)} />
            <div>
              <p className="text-xs font-bold text-white">{t.label} — <span className="font-mono">{t.price}</span></p>
              <p className="text-[10px] text-slate-500">{t.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents, skills..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-400 transition-colors" />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-400">
            <option value="rating">Top Rated</option>
            <option value="tasks">Most Experienced</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['Popular', 'All', ...CATEGORIES] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={cn('px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all',
              cat === c ? 'border-violet-400/40 bg-violet-500/10 text-white' : 'border-white/8 text-slate-400 hover:border-white/20 hover:text-white')}>
            {c === 'Popular' ? '🔥 Popular' : c}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-600 font-mono mb-5">
        Showing <span className="text-white">{filtered.length}</span> agents
      </p>

      {/* Grid — reuse AgentCard with hire navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((agent, i) => (
          <AgentCard key={agent.id} agent={toCardAgent(agent)} index={i} onCartChange={onCartChange} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500 text-sm">No agents match your search.</p>
        </div>
      )}
    </div>
  );
}
