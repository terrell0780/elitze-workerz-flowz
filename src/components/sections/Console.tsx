import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, GitBranch, Brain, Circle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Mode = 'deploy' | 'route' | 'learn';

const outputs: Record<Mode, string[]> = {
  deploy: [
    '$ hermes deploy --target prod',
    '⏳ Provisioning hostinger://kvm-2/us-east-1...',
    '✔ VPS online · IP: 145.79.32.18',
    '⏳ Pulling elitze:2.4.1-prod ...',
    '✔ Containers booted (postgres, redis, hermes, worker)',
    '⏳ Migrating audit_logs schema ...',
    '✔ Schema synced',
    '⏳ Starting BullMQ worker pool [4 workers] ...',
    '✔ Workers ready',
    '✔ Deploy completed in 47.2s',
    '$ _',
  ],
  route: [
    '$ hermes route "summarize the Q4 board memo"',
    '🧠 Hermes reasoning ...',
    '   intent     = SUMMARIZE',
    '   tokens_in  = 8,420',
    '   risk_score = 0.12',
    '✔ Decision: route → openrouter/anthropic/claude-opus-4.6',
    '   reason: deep reasoning + 200k context',
    '   fallback: openai/gpt-5-pro',
    '⏳ Streaming completion ...',
    '✔ 312 tokens · 1.84s · $0.0042',
    '✔ Result logged → audit_logs#9842',
    '$ _',
  ],
  learn: [
    '$ hermes memory recall --topic "deploy failures"',
    '🔍 Querying vector memory ...',
    '✔ 7 embeddings matched (cosine > 0.78)',
    '',
    '  #4421 · railway port collision · resolved',
    '  #4502 · OOM during migration · resolved',
    '  #4673 · OpenRouter rate limit  · escalated',
    '',
    '🧠 Pattern detected: 3 incidents tied to t=18:00 UTC',
    '✔ Autoinjecting prevention rule into orchestrator',
    '✔ Memory updated · 1.2M vectors · 384d',
    '$ _',
  ],
};

const tabs: { id: Mode; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'deploy', label: 'deploy', icon: Rocket, color: 'text-cyan-300' },
  { id: 'route', label: 'route', icon: GitBranch, color: 'text-indigo-300' },
  { id: 'learn', label: 'learn', icon: Brain, color: 'text-violet-300' },
];

const models = [
  { name: 'claude-opus-4.6', task: 'deep reasoning · 200k ctx', color: 'bg-orange-400' },
  { name: 'gpt-5-pro', task: 'general · 1M ctx', color: 'bg-emerald-400' },
  { name: 'gemini-3-thinking', task: 'multimodal · long horizon', color: 'bg-blue-400' },
  { name: 'deepseek-v3.2', task: 'code · cost-optimal', color: 'bg-violet-400' },
  { name: 'llama-4-405b', task: 'self-hosted · OSS', color: 'bg-pink-400' },
];

export function Console() {
  const [mode, setMode] = useState<Mode>('deploy');

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#050508] overflow-hidden">
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-violet-600/15 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-4">
              // The Console
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-2xl">
              Talk to your{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                infrastructure.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md">
            A single CLI surface across deploys, routing decisions, and the memory
            loop. Audit-logged, replayable, deterministic.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Terminal */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/60 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setMode(t.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-xs font-mono border-r border-white/5 transition-all ${
                    mode === t.id
                      ? 'bg-white/[0.04] text-white'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                  }`}
                >
                  <t.icon className={`w-3.5 h-3.5 ${mode === t.id ? t.color : ''}`} />
                  hermes {t.label}
                  {mode === t.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-indigo-400"
                    />
                  )}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-1.5 px-4">
                <Circle className="w-2 h-2 fill-rose-500 text-rose-500" />
                <Circle className="w-2 h-2 fill-amber-500 text-amber-500" />
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
              </div>
            </div>

            {/* Output */}
            <div className="p-6 font-mono text-[12px] min-h-[420px] leading-relaxed">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {outputs[mode].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={
                        line.startsWith('$')
                          ? 'text-cyan-300'
                          : line.startsWith('✔')
                          ? 'text-emerald-400'
                          : line.startsWith('⏳')
                          ? 'text-amber-300'
                          : line.startsWith('🧠') || line.startsWith('🔍')
                          ? 'text-violet-300'
                          : 'text-slate-400'
                      }
                    >
                      {line || '\u00A0'}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Routing reference */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">
              Model Routing Reference
            </p>
            <div className="space-y-3">
              {models.map((m) => (
                <div
                  key={m.name}
                  className="p-3 rounded-lg border border-white/5 bg-black/30 hover:border-indigo-400/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${m.color}`} />
                    <p className="text-xs font-mono text-white">{m.name}</p>
                  </div>
                  <p className="text-[10px] text-slate-500 ml-3.5">{m.task}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Hermes selects from <span className="text-indigo-300">200+ models</span>{' '}
                via OpenRouter — optimizing for cost, latency, and reasoning depth on
                every request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
