import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';
import { MatrixRain } from '../MatrixRain';
import { WorkerScene } from '../WorkerScene';

interface HeroProps {
  onOpenCart: () => void;
}

export function Hero({ onOpenCart }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050508]">
      <MatrixRain opacity={0.18} />

      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: 'linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center w-full pt-24 pb-16">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-purple-200 tracking-wider uppercase">
              1,000 Certified Agents · Live Now
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #f0e7ff 0%, #c084fc 60%, #7e22ce 100%)' }}>
              Your AI Team,
            </span>
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #d4ffe6 0%, #4ade80 60%, #15803d 100%)' }}>
              Ready to Work.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Elitze is the world's first autonomous AI staffing agency. Browse 1,000
            certified AI agent employees — rent for a day or own outright. Hermes AI
            orchestrates every task. Lindy AI, your customer service supervisor, handles everything else.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#agents"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-purple-100 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Browse 1,000 Agents
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 rounded-xl font-medium text-white hover:bg-white/5 transition-all"
            >
              View Cart
            </button>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-5 pt-6 border-t border-white/5">
            {[
              { v: '1,000', l: 'Certified Agents' },
              { v: '$35', l: 'Rent / Day' },
              { v: '24/7', l: 'Always Working' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-bold text-white font-mono">{s.v}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap gap-4">
            {[
              'Hermes AI Orchestrated',
              'Full Audit Trail',
              'Lindy AI Customer Service Included',
            ].map((g) => (
              <div key={g} className="flex items-center gap-1.5 text-xs text-slate-400">
                <Shield className="w-3 h-3 text-violet-400" />
                {g}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <WorkerScene />
        </motion.div>
      </div>
    </section>
  );
}
