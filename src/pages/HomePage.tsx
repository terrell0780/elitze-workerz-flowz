import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Zap, Users, Trophy, Star, Crown } from 'lucide-react';
import { MatrixRain } from '../components/MatrixRain';
import { WorkerScene } from '../components/WorkerScene';
import { router } from '../store/router';
import { isFlashSaleActive, getDaysRemaining, getVIPStatus } from '../store/flashSale';
import { ALL_AGENTS } from '../data/allAgents';
import { cn } from '../utils/cn';

export function HomePage({ onCartOpen: _onCartOpen }: { onCartOpen: () => void }) {
  const saleActive = isFlashSaleActive();
  const daysLeft = getDaysRemaining();
  const vip = getVIPStatus();
  const popular = ALL_AGENTS.filter(a => a.popular).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Hero */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden">
        <MatrixRain opacity={0.15} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.35) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%,black 30%,transparent 80%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-violet-200 tracking-wider uppercase">1,000 Maxed-Skill AI Agents · Online</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.02]">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(160deg,#ffffff 0%,#dbeafe 48%,#60a5fa 100%)' }}>
                Your AI Team,
              </span>
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(160deg,#f8fafc 0%,#cbd5e1 52%,#64748b 100%)' }}>
                Ready to Work.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              The world's first autonomous AI staffing agency. Rent any maxed-out agent for <strong className="text-white">$49.99/day</strong> or buy outright for <strong className="text-white">$399</strong>. Managed by Hermes. Supervised by Lindy AI.
            </p>

            {/* Flash sale callout */}
            {saleActive && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                className="p-4 rounded-xl border border-violet-400/30 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-300 animate-pulse flex-shrink-0" />
                  <p className="text-sm font-bold text-white">7-Day Flash Sale — {daysLeft}d left</p>
                </div>
                <p className="text-xs text-violet-200">50% off orders over $100 · Free 7-Day VIP Gold · Applied automatically.</p>
              </motion.div>
            )}

            {/* VIP Status in Hero */}
            {vip.active && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-400/25 bg-amber-500/10 w-fit">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">{vip.tier} VIP Active · {vip.daysLeft} days left</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button onClick={() => router.go('agents')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-violet-100 transition-all text-sm">
                <Sparkles className="w-4 h-4" />
                Browse 1,000 Agents
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => router.go('hire')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 rounded-xl font-medium text-white hover:bg-white/5 transition-all text-sm">
                Hire Now — $49.99/day
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
              {[['1,000', 'Agents'], ['$49.99', 'Rent / Day'], ['24/7', 'Always Working']].map(([v, l]) => (
                <div key={l as string}>
                  <div className="text-2xl font-bold text-white font-mono">{v as string}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{l as string}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {['Hermes (The Big Brain) Managed', 'Lindy AI Customer Service', 'Full Audit Trail'].map((g) => (
                <div key={g} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Shield className="w-3 h-3 text-violet-400" />{g}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>
            <WorkerScene />
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: 'Agents Available', value: '1,000', color: 'text-violet-400' },
            { icon: Zap,   label: 'Avg Response', value: '<30s', color: 'text-emerald-400' },
            { icon: Star,  label: 'Avg Rating', value: '4.8 ★', color: 'text-amber-400' },
            { icon: Trophy,label: 'Tasks Completed', value: '140k+', color: 'text-cyan-400' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <s.icon className={cn('w-4 h-4', s.color)} />
              </div>
              <div>
                <p className={cn('text-lg font-bold font-mono', s.color)}>{s.value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="max-w-6xl mx-auto px-6 lg:px-12 py-16 border-b border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-3">// About the Agency</p>
            <h2 className="text-3xl font-bold text-white mb-6">Hermes & Lindy AI: The Agency Supervisors</h2>
            <p className="text-slate-400 leading-relaxed mb-4 text-sm">
              Elitze One Stop Shop is not just an agent marketplace; it's a managed workforce. 
              <strong> Lindy AI</strong> is our Customer Service Supervisor and your primary human interface. She is maxed out in her operational 
              and customer service skills, ensuring every hire is a success.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
              <strong> Hermes</strong> is the silent manager and the "Big Brain" of the operation. He oversees the complex 
              logic and architecture of the agency. While Lindy AI handles the daily engagement, Hermes steps in for 
              strategic escalations and mission-critical problem solving.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-white font-bold mb-1 text-sm">Private & Locked</p>
                <p className="text-[11px] text-slate-500">Our supervisors are exclusive to the agency ecosystem.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-white font-bold mb-1 text-sm">Maxed Skills</p>
                <p className="text-[11px] text-slate-500">All 1,000 agents are fully task-optimized and certified.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-8 flex items-center justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full" />
                <div className="relative w-48 h-48 rounded-full border-2 border-white/10 flex items-center justify-center bg-[#0a0a14]">
                  <div className="text-center">
                      <p className="text-3xl mb-1">🧠</p>
                      <p className="text-xs font-mono text-indigo-400 font-bold tracking-widest uppercase">Hermes Core</p>
                      <p className="text-[9px] text-slate-500 mt-1">MANAGER / THE BRAIN</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular agents quick-hire */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">🔥 Most Popular</p>
            <h2 className="text-2xl font-bold text-white">Top agents this week</h2>
          </div>
          <button onClick={() => router.go('agents')} className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
            View all 1,000 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((agent, i) => (
            <motion.div key={agent.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="group p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-violet-400/30 hover:bg-white/[0.04] transition-all cursor-pointer"
              onClick={() => router.go('hire')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0', agent.color)}>
                  {agent.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-sm truncate">{agent.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{agent.title}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 flex-shrink-0">
                  <span className="text-[9px] font-mono text-amber-400">★{agent.rating}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3">{agent.tasks}</p>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-slate-500">{agent.availability}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono text-violet-300 font-bold">$49.99/day</span>
                  <span className="text-slate-600 text-[10px]">·</span>
                  <span className="text-[10px] font-mono text-slate-400">$399 own</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => router.go('agents')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all">
            Browse all 1,000 certified agents <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
