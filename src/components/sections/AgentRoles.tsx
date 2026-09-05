import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, DollarSign, Zap } from 'lucide-react';
import { agentRoles } from '../../data/content';

export function AgentRoles() {
  const [active, setActive] = useState(agentRoles[0].id);
  const selected = agentRoles.find((r) => r.id === active) || agentRoles[0];

  return (
    <section id="agents" className="relative py-32 px-6 lg:px-12 bg-[#050508] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-mono text-violet-400 uppercase tracking-[0.25em] mb-4">
            // Your AI Workforce
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-3xl">
            Hire the role.{' '}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Deploy in minutes.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-lg max-w-2xl leading-relaxed">
            Every agent runs inside the Elitze orchestrator — fully audited,
            memory-enabled, and recoverable. Powered by Lindy AI, OpenRouter, and your
            own VPS.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Role selector */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {agentRoles.map((role, i) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setActive(role.id)}
                className={`group w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  active === role.id
                    ? 'bg-violet-500/10 border-violet-400/40 text-white'
                    : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/15 hover:bg-white/[0.03]'
                }`}
              >
                <span className="text-2xl flex-shrink-0">{role.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm truncate">{role.title}</p>
                  <p className={`text-[11px] truncate ${active === role.id ? 'text-violet-300' : 'text-slate-600'}`}>
                    {role.category}
                  </p>
                </div>
                <span className={`text-[10px] font-mono flex-shrink-0 ${active === role.id ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {role.deployTime}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Role detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-4xl">{selected.emoji}</span>
                    <h3 className="text-3xl font-bold text-white mt-2">{selected.title}</h3>
                    <p className="text-violet-300 text-sm font-medium">{selected.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-mono text-slate-500 mb-1">Powered by</div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                      {selected.platform}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-base leading-relaxed mb-8">{selected.desc}</p>

                {/* Metrics strip */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: DollarSign, label: 'Cost', value: selected.cost, color: 'text-emerald-400' },
                    { icon: Zap, label: 'Savings', value: selected.savings, color: 'text-violet-400' },
                    { icon: Clock, label: 'Deploy', value: selected.deployTime, color: 'text-cyan-400' },
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-black/30 border border-white/5">
                      <m.icon className={`w-4 h-4 mb-2 ${m.color}`} />
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{m.label}</p>
                      <p className="text-sm font-bold text-white font-mono">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">
                    Core capabilities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs text-slate-300 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deploy button */}
                <a
                  href="#deploy"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-violet-100 transition-all"
                >
                  Deploy This Agent
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
