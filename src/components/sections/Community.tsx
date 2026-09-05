import { motion } from 'framer-motion';
import { MessageSquareQuote, Star } from 'lucide-react';
import { communityVoices } from '../../data/content';

export function Community() {
  // Split into two columns for the infinite marquee look
  const col1 = communityVoices.slice(0, 5);
  const col2 = communityVoices.slice(5, 10);

  return (
    <section id="community" className="relative py-32 px-6 lg:px-12 bg-[#050508] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-4">
            // The Community
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            What developers{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              actually say.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
            Real voices from builders and operators shaping how the world hires in 2026.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Column 1 */}
          <div className="space-y-5">
            {col1.map((voice, i) => (
              <VoiceCard key={voice.name} voice={voice} delay={i * 0.08} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-5 md:mt-10">
            {col2.map((voice, i) => (
              <VoiceCard key={voice.name} voice={voice} delay={i * 0.08 + 0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VoiceCard({
  voice,
  delay,
}: {
  voice: (typeof communityVoices)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay }}
      className="group p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03] transition-all"
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className={`w-3 h-3 ${j < voice.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
        ))}
      </div>

      {/* Quote icon */}
      <MessageSquareQuote className="w-4 h-4 text-indigo-400/60 mb-4" />

      {/* Quote */}
      <p className="text-slate-300 text-sm leading-relaxed mb-5">
        &ldquo;{voice.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${voice.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        >
          {voice.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{voice.name}</p>
          <p className="text-[11px] text-slate-500 truncate">{voice.role}</p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/20 text-emerald-400">
            {voice.result}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
