import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { comparisonRows } from '../../data/content';

export function Comparison() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/8 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-[0.25em] mb-4">
            // The ROI Case
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            AI hire vs.{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              traditional hire.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-lg max-w-xl mx-auto leading-relaxed">
            Real numbers from a 2026 ROI study. AI agents cost 90% less and deploy
            in minutes — with a full audit trail baked in.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.03] border-b border-white/10">
            <div className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
              Attribute
            </div>
            <div className="p-5 text-center border-l border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="text-xs font-bold text-violet-300">AI Agent</span>
              </div>
            </div>
            <div className="p-5 text-center border-l border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="text-xs font-bold text-slate-400">Human Hire</span>
              </div>
            </div>
          </div>

          {comparisonRows.map((row, i) => (
            <motion.div
              key={row.attr}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`grid grid-cols-3 border-b border-white/5 last:border-0 ${
                i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
              }`}
            >
              <div className="p-5 flex items-center">
                <span className="text-sm text-slate-300 font-medium">{row.attr}</span>
              </div>
              <div
                className={`p-5 border-l border-white/5 flex items-center justify-center gap-2 ${
                  row.winner === 'ai' ? 'bg-violet-500/5' : ''
                }`}
              >
                {row.winner === 'ai' && (
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                )}
                {row.winner === 'human' && (
                  <Minus className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                )}
                <span
                  className={`text-sm font-mono text-center ${
                    row.winner === 'ai' ? 'text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  {row.ai}
                </span>
              </div>
              <div
                className={`p-5 border-l border-white/5 flex items-center justify-center gap-2 ${
                  row.winner === 'human' ? 'bg-slate-500/5' : ''
                }`}
              >
                {row.winner === 'human' && (
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                )}
                {row.winner === 'ai' && (
                  <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                )}
                <span
                  className={`text-sm font-mono text-center ${
                    row.winner === 'human' ? 'text-white font-bold' : 'text-slate-500'
                  }`}
                >
                  {row.human}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Source note */}
        <p className="text-center text-xs text-slate-600 mt-5 font-mono">
          Data: ClearSky 2100 Ventures · NoimosAI ROI Report 2026 · Lindy AI pricing
        </p>

        {/* Summary callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid md:grid-cols-3 gap-4"
        >
          {[
            { num: '90%', label: 'Cost reduction for routine tasks', color: 'text-emerald-400' },
            { num: '$0.25', label: 'Per AI interaction vs $3–8 human', color: 'text-violet-400' },
            { num: '<15min', label: 'From zero to deployed agent', color: 'text-cyan-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] text-center"
            >
              <div className={`text-4xl font-bold font-mono mb-2 ${s.color}`}>{s.num}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
