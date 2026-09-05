import { motion } from 'framer-motion';
import { Network, Globe, Server } from 'lucide-react';

const pillars = [
  {
    icon: Network,
    title: 'Model Routing',
    sub: 'OpenRouter Integration',
    desc: 'Route reasoning across 200+ frontier models. Hermes selects the optimal model per task by cost, latency, and reasoning depth.',
    points: ['GPT-5 · Claude 4.6 · Gemini 3', 'Cost-aware fallback chains', 'Automatic context-window matching'],
    color: 'indigo',
  },
  {
    icon: Globe,
    title: 'Browser Automation',
    sub: 'Browser Harness',
    desc: 'Headless Chromium fleet running inside isolated containers. Drive any web surface — auth flows, scraping, RPA, deploy panels.',
    points: ['Playwright + CDP runtime', 'Stealth + residential proxies', 'Visual diffing + DOM checkpoints'],
    color: 'cyan',
  },
  {
    icon: Server,
    title: 'Own-VPS Deploy',
    sub: 'Hostinger / Bare Metal',
    desc: 'No vendor lock-in. The full stack — Postgres, Redis, BullMQ, Hermes — provisions onto your own hardware in minutes.',
    points: ['One-line Hostinger CLI deploy', 'Encrypted secrets via Vault', 'Self-healing orchestrator'],
    color: 'violet',
  },
];

export function Platform() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#050508] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-4">
            // The Platform
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Three pillars.
            <br />
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              One execution surface.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-indigo-400/30 transition-all"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />

              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <p.icon className="w-6 h-6 text-indigo-300" />
              </div>

              <p className="text-[10px] font-mono text-indigo-400/70 uppercase tracking-widest mb-2">
                {p.sub}
              </p>
              <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{p.desc}</p>

              <ul className="space-y-2 pt-4 border-t border-white/5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="text-indigo-400 mt-0.5">▸</span>
                    <span>{pt}</span>
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
