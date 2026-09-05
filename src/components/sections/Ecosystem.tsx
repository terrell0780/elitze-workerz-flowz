import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Network, Sparkles, Bot, Users, Workflow, Zap, Globe2 } from 'lucide-react';
import { ecosystemPlatforms } from '../../data/content';

const lindyFeatures = [
  { icon: Users, label: '4,000+ app integrations', detail: 'Gmail · HubSpot · Slack · Calendar · Salesforce' },
  { icon: Workflow, label: 'No-code agent builder', detail: 'Plain-English instructions · 1,000+ templates' },
  { icon: Bot, label: 'Autopilot virtual computer', detail: 'Browse · click · update sheets autonomously' },
  { icon: Sparkles, label: 'Knowledge base + RAG', detail: 'Upload docs, agents reason over your data' },
  { icon: Zap, label: 'Human-in-the-loop escalation', detail: 'Hand off complex cases seamlessly' },
  { icon: Globe2, label: 'End-to-end encryption', detail: 'SOC2-aligned · your data stays yours' },
];

export function Ecosystem() {
  const nonFeatured = ecosystemPlatforms.filter((p) => !p.featured);

  return (
    <section id="ecosystem" className="relative py-32 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-xs font-mono text-violet-400 uppercase tracking-[0.25em] mb-4">
            // The Ecosystem
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Hire your first{' '}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              AI employee.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-lg leading-relaxed max-w-2xl">
            Elitze orchestrates everything. Bring the tools you love — or
            discover new ones. Every action is audited, every decision replayable.
          </p>
        </motion.div>

        {/* ── Featured: Lindy ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-violet-500/40 via-fuchsia-500/30 to-emerald-500/30 blur-md opacity-50" />
          <div className="relative rounded-3xl border border-violet-400/25 bg-gradient-to-br from-[#0c0916] via-[#0a0a14] to-[#08110d] overflow-hidden">
            {/* Grid bg */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(168,85,247,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative grid lg:grid-cols-5 gap-10 p-10 md:p-14">
              {/* Left */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold tracking-wider">
                    ★ FEATURED PARTNER
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-widest">LIVE INTEGRATION</span>
                </div>

                <div className="flex items-center gap-3">
                  <LindyLogo />
                  <div>
                    <h3 className="text-4xl font-bold text-white tracking-tight">Lindy AI</h3>
                    <p className="text-sm text-violet-300 font-medium">Best for custom AI agent employees</p>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  Describe your AI employee in plain English. Lindy AI builds and
                  deploys it in minutes — then Elitze wraps every execution
                  in audit logging, vector memory, and failure recovery.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.lindy.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-semibold text-sm hover:bg-violet-100 transition-all"
                  >
                    Visit Lindy.ai
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href="#deploy"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-violet-400/30 rounded-lg font-medium text-violet-200 hover:bg-violet-500/10 text-sm transition-all"
                  >
                    <Network className="w-3.5 h-3.5" />
                    Connect via Hermes
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/5">
                  {[['4,000+', 'Apps'], ['1,000+', 'Templates'], ['$0', 'Free Tier']].map(([v, l]) => (
                    <div key={l}>
                      <div className="text-2xl font-bold text-white font-mono">{v}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: feature grid + code */}
              <div className="lg:col-span-3 space-y-5">
                <p className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-widest">
                  // Why teams ship with Lindy AI
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {lindyFeatures.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-violet-400/30 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <f.icon className="w-3.5 h-3.5 text-violet-300" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white mb-0.5">{f.label}</p>
                          <p className="text-[10px] text-slate-500 leading-relaxed">{f.detail}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Code snippet */}
                <div className="rounded-xl border border-white/8 bg-black/60 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">hermes.config.ts</p>
                    <span className="text-[10px] font-mono text-emerald-400">● connected</span>
                  </div>
                  <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-violet-300">import</span>
                      <span className="text-slate-200"> {'{ lindy }'} </span>
                      <span className="text-violet-300">from</span>
                      <span className="text-emerald-300"> '@workerz/agents/lindy'</span>
                      {'\n'}
                      {'\n'}
                      <span className="text-slate-500">{'// Hire your AI employee'}</span>
                      {'\n'}
                      <span className="text-violet-300">const</span>
                      <span className="text-cyan-300"> sales</span>
                      <span className="text-slate-400"> = </span>
                      <span className="text-cyan-300">lindy</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-amber-300">agent</span>
                      <span className="text-slate-400">(</span>
                      <span className="text-emerald-300">'sdr-outbound'</span>
                      <span className="text-slate-400">)</span>
                      {'\n'}
                      <span className="text-cyan-300">hermes</span>
                      <span className="text-slate-400">.</span>
                      <span className="text-amber-300">register</span>
                      <span className="text-slate-400">(sales)</span>
                      {'\n'}
                      <span className="text-emerald-400">{'// ✔ Agent deployed, audit trail active'}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Non-featured platforms */}
        <p className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-widest mt-16 mb-5">
          // Also in the ecosystem
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {nonFeatured.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.02] to-transparent hover:border-white/20 transition-all block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold tracking-widest bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
                  {p.tag}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{p.bestFor}</p>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.desc}</p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 pt-3 border-t border-white/5">
                <Check className="w-3 h-3" />
                Native Hermes integration
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LindyLogo() {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
      style={{ background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 50%, #f472b6 100%)' }}
    >
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="8" width="22" height="18" rx="6" fill="#fff" />
        <circle cx="12" cy="17" r="2.2" fill="#a855f7" />
        <circle cx="20" cy="17" r="2.2" fill="#a855f7" />
        <path d="M12 22 Q16 24 20 22" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M16 4 V8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="16" cy="3.5" r="1.2" fill="#fff" />
      </svg>
    </div>
  );
}
