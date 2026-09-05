import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#050508]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden p-12 md:p-20"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(217,70,239,0.12) 50%, rgba(34,211,238,0.14) 100%)',
          border: '1px solid rgba(168,85,247,0.25)',
        }}
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-500/25 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-400/15 blur-[100px] rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-xs font-mono text-violet-300 uppercase tracking-[0.25em] mb-6">
            // Start hiring today
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            Your AI workforce{' '}
            <span className="bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text text-transparent">
              is ready to deploy.
            </span>
          </h2>
          <p className="text-lg text-slate-300/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Free tier available. Bring your own VPS, your own keys, your own data.
            Zero lock-in. Full audit trail from day one.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#agents"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-violet-100 transition-all"
            >
              Deploy Your First Agent
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-to-hire"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-xl font-medium text-white hover:bg-white/5 backdrop-blur-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Read the Hiring Guide
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-xs font-mono text-slate-400">
            <span>★ MIT licensed core</span>
            <span>★ Self-hosted on your VPS</span>
            <span>★ No vendor lock-in</span>
            <span>★ SOC2-ready posture</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
