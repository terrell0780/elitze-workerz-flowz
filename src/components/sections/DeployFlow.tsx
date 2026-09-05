import { motion } from 'framer-motion';
import { Activity, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    n: '01',
    title: 'Provision your VPS',
    desc: 'Spin up infrastructure on Hostinger or any KVM provider in 30 seconds.',
    code: `$ hostinger vps create --plan kvm-2 \\
    --image ubuntu-22.04 \\
    --label elitze-prod`,
  },
  {
    n: '02',
    title: 'Set OpenRouter key',
    desc: 'Hermes uses OpenRouter to route reasoning across 200+ models.',
    code: `$ export OPENROUTER_API_KEY=sk-or-v1-...
$ workerz config set router openrouter`,
  },
  {
    n: '03',
    title: 'Set Browser Harness key',
    desc: 'Connect Browserless for automated headless Chrome workflows.',
    code: `$ export BROWSERLESS_API_KEY=bls_xxx
$ workerz config set browser harness@v2`,
  },
  {
    n: '04',
    title: 'Run Hermes',
    desc: 'The orchestrator boots, reasoning loop online, audit log streaming.',
    code: `$ hermes run --mode prod
✔ Postgres connected
✔ Redis online
✔ Hermes reasoning loop ENGAGED`,
  },
];

export function DeployFlow() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-4">
            // Deploy Flow
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-3xl">
            From zero to autonomous in{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              four steps.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex gap-6 p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-indigo-400/30 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-300">
                    {s.n}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{s.desc}</p>
                  <pre className="bg-black/60 border border-white/5 rounded-lg p-4 text-[12px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{s.code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Stack Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/5 to-transparent p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Live Stack</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Configuration
                </p>
                {[
                  ['Region', 'us-east-1'],
                  ['Router', 'openrouter@v1'],
                  ['Browser', 'harness@v2'],
                  ['Database', 'postgres-15'],
                  ['Queue', 'bullmq + redis'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">{k}</span>
                    <span className="text-slate-200">{v}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Live Metrics
                </p>
                {[
                  ['CPU', '32%', 32],
                  ['Memory', '58%', 58],
                  ['Queue Depth', '14 jobs', 18],
                ].map(([k, v, p]) => (
                  <div key={k as string}>
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-slate-500">{k}</span>
                      <span className="text-indigo-300">{v}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400 pt-4 border-t border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-mono">All systems nominal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
