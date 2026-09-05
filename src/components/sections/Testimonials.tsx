import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Derek O.',
    role: 'Founder, StratosGroup',
    avatar: 'DO',
    color: 'from-violet-500 to-purple-600',
    stars: 5,
    text: "We deployed a Support Agent and an SDR Agent on the same afternoon. By the next morning they had handled 40+ tickets and booked 3 demos. The onboarding was straightforward and Lindy AI walked us through everything.",
    result: '40+ tickets resolved · 3 demos booked · Day 1',
  },
  {
    name: 'Priya M.',
    role: 'Head of Ops, NovaTech LLC',
    avatar: 'PM',
    color: 'from-blue-500 to-indigo-600',
    stars: 5,
    text: "The Executive Assistant agent manages our CEO's calendar better than our last two human hires. It never double-books, always sends prep briefs, and the audit trail means we can replay any decision.",
    result: '100% meeting accuracy · Zero double-bookings',
  },
  {
    name: 'Marcus T.',
    role: 'CTO, PeakOps Co.',
    avatar: 'MT',
    color: 'from-cyan-500 to-teal-600',
    stars: 5,
    text: "I was sceptical but the QA Automation agent found a regression that our internal team had missed for two weeks. It filed the bug report with a full video reproduction. Genuinely impressed.",
    result: 'Critical regression found · 2-week bug caught',
  },
  {
    name: 'Aisha R.',
    role: 'Sales Director, VaultRunners',
    avatar: 'AR',
    color: 'from-emerald-500 to-teal-600',
    stars: 5,
    text: "The SDR agent runs our entire outbound motion. We went from 10 to 60 qualified leads per week without adding headcount. The Hermes system routes tasks cleanly — nothing falls through the cracks.",
    result: '6× lead volume · Zero extra headcount',
  },
  {
    name: 'James C.',
    role: 'CFO, SyncStream',
    avatar: 'JC',
    color: 'from-pink-500 to-rose-600',
    stars: 4,
    text: "The Bookkeeping Agent reconciles our accounts daily and flags anomalies before I even open my laptop. Setup took about 20 minutes. Worth every dollar of the subscription.",
    result: 'Daily reconciliation · Anomalies flagged proactively',
  },
  {
    name: 'Sophie L.',
    role: 'Marketing Lead, ClearBridge',
    avatar: 'SL',
    color: 'from-fuchsia-500 to-violet-600',
    stars: 5,
    text: "Content agent publishes three articles a week, manages our social calendar, and sends a weekly analytics digest. Our organic traffic is up 40% since we deployed it. Lindy AI was incredibly helpful getting us set up.",
    result: '40% organic traffic increase · 3 articles/week',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/6 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs font-mono text-violet-400 uppercase tracking-[0.25em] mb-4">// Client Results</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Real teams.{' '}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">Real results.</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base max-w-xl mx-auto">
            What clients actually say after deploying Elitze agents — no exaggeration, just outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < t.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-emerald-300 font-mono">
                ✓ {t.result}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
