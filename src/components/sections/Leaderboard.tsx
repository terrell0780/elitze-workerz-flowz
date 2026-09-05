import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';
import { leaderboardStore, type LeaderEntry } from '../../store/leaderboard';

export function Leaderboard() {
  const [data, setData] = useState<LeaderEntry[]>(leaderboardStore.get());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const unsub = leaderboardStore.subscribe(() => {
      setData([...leaderboardStore.get()]);
      setUpdated(true);
      setTimeout(() => setUpdated(false), 1500);
    });
    return unsub;
  }, []);

  return (
    <section id="leaderboard" className="relative py-28 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-500/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-[0.25em] mb-4">// Live Leaderboard</p>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Top hiring teams.{' '}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">Updated live.</span>
            </h2>
            <p className="text-slate-400 mt-3 text-sm">Rankings refresh every 8 seconds. Climb the board to unlock exclusive partner benefits.</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${updated ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-white/8 bg-white/[0.02]'}`}>
            <Zap className={`w-3.5 h-3.5 ${updated ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className={`text-[10px] font-mono ${updated ? 'text-emerald-300' : 'text-slate-500'}`}>
              {updated ? 'Just updated' : 'Live updates every 8s'}
            </span>
          </div>
        </motion.div>

        <div className="rounded-2xl border border-white/8 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 px-5 py-3 bg-white/[0.02] border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Team</div>
            <div className="col-span-3 text-center">Agents Hired</div>
            <div className="col-span-3 text-right">Total Spent</div>
          </div>

          {data.map((entry, i) => (
            <motion.div
              key={entry.name}
              layout
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-12 px-5 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.02] transition-colors ${i === 0 ? 'bg-amber-500/5' : ''}`}
            >
              <div className="col-span-1">
                {entry.badge ? (
                  <span className="text-lg">{entry.badge}</span>
                ) : (
                  <span className="text-sm font-mono text-slate-500">#{entry.rank}</span>
                )}
              </div>
              <div className="col-span-5">
                <p className="text-sm font-bold text-white">{entry.name}</p>
                {i < 3 && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-[9px] text-emerald-400 font-mono">Top Performer</span>
                  </div>
                )}
              </div>
              <div className="col-span-3 text-center">
                <motion.span
                  key={entry.agents}
                  initial={{ scale: 1.2, color: '#4ade80' }}
                  animate={{ scale: 1, color: '#e2e8f0' }}
                  className="text-sm font-bold font-mono"
                >
                  {entry.agents}
                </motion.span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-sm font-mono text-emerald-400 font-bold">
                  ${entry.spent.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 p-5 rounded-2xl border border-amber-400/20 bg-amber-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white">Want to climb the board?</p>
            <p className="text-xs text-slate-500 mt-1">Hire 5+ agents to unlock Partner tier and exclusive volume pricing.</p>
          </div>
          <a href="#agents" className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-amber-100 transition-colors">
            Start Hiring
          </a>
        </motion.div>
      </div>
    </section>
  );
}
