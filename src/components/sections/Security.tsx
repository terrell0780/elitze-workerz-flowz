import { motion } from 'framer-motion';
import { ShieldCheck, KeyRound, Database } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Isolated Runtime',
    desc: 'Every agent executes inside its own ephemeral container with seccomp profiles and read-only filesystem layers. No agent can read another agent\'s secrets, memory, or sockets.',
    points: ['gVisor sandboxing', 'Network egress allowlist', 'Per-task resource caps'],
  },
  {
    icon: KeyRound,
    title: 'Permission Controls',
    desc: 'Every action is authorized through scoped capability tokens. Hermes cannot deploy, email, or transact without an explicit grant — and grants expire.',
    points: ['Capability-based auth', 'Time-bound grants (TTL)', 'Per-resource scoping'],
  },
  {
    icon: Database,
    title: 'Operational Memory',
    desc: 'A vector + relational memory store records every decision, outcome, and rationale. The system learns from its own audit trail — without leaking PII downstream.',
    points: ['384-d embeddings (pgvector)', 'PII redaction on ingest', 'Replayable decision graph'],
  },
];

export function Security() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-xs font-mono text-emerald-400 uppercase tracking-[0.25em] mb-4">
            // Security Posture
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Built like the{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              banks should be.
            </span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg leading-relaxed">
            Autonomy without containment is a liability. Elitze ships with
            isolation, permissions, and an immutable memory by default — not as
            an enterprise add-on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-emerald-400/30 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <it.icon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{it.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{it.desc}</p>
              <ul className="space-y-2 pt-4 border-t border-white/5">
                {it.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-slate-500 font-mono">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
