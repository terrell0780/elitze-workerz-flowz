import { motion } from 'framer-motion';
import { Rocket, Target, ShieldCheck } from 'lucide-react';

const bestPractices = [
  {
    icon: Rocket,
    title: 'Top-of-Funnel Efficiency',
    desc: 'Use the Lindy AI Recruiting Assistant to handle top-of-funnel tasks so you only talk to the best candidates.',
    bullets: [
      'Automated Screening: Set Lindy AI to analyze resumes using NLP to match specific skills against requirements.',
      'Initial Interviews: Lindy AI conducts preliminary screening interviews via chat or video with standardized scoring.',
      'Workflow Integration: Connects to 7,000+ tools (Slack, Airtable, GCal) to log updates in real-time.',
      'Bias Reduction: Use blind resume screening to evaluate candidates solely on qualifications.',
    ],
  },
];

const toolPairings = [
  { category: 'Sourcing', platform: 'eVirtualAssistants', why: 'Uses AI-driven matching to find qualified VAs up to 73% faster.' },
  { category: 'Interviewing', platform: 'HireVue', why: 'Excellent for AI-powered video interview analysis and skill assessments.' },
  { category: 'Management', platform: 'Asana or Trello', why: 'Keeps virtual staff organized with clear task lists and deadlines.' },
  { category: 'Automation', platform: 'Zapier', why: 'Acts as the "translator" between AI hiring tools and your CRM/HR software.' },
];

export function HiringGuide() {
  return (
    <section id="hiring-guide" className="relative py-28 px-6 lg:px-12 bg-[#050608] overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-4">// Hiring Strategy</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            The best way to use{' '}
            <span className="bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">Lindy AI for Hiring.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Main Guide */}
          <div className="lg:col-span-3 space-y-8">
            {bestPractices.map((group) => (
              <div key={group.title} className="p-8 rounded-3xl border border-white/5 bg-slate-900/20 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <group.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{group.title}</h3>
                </div>
                <p className="text-slate-400 mb-8 leading-relaxed">{group.desc}</p>
                <div className="grid gap-4">
                  {group.bullets.map((bullet, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="mt-1 text-blue-400 font-bold font-mono text-sm">0{i + 1}</div>
                      <p className="text-sm text-slate-300 leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tool Pairings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Top Tool Pairings
              </h4>
              <div className="space-y-4">
                {toolPairings.map((tool) => (
                  <div key={tool.platform} className="p-4 rounded-xl border border-white/5 bg-black/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{tool.category}</span>
                      <span className="text-xs font-bold text-blue-300">{tool.platform}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{tool.why}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Once hired, these platforms ensure your maxed-out AI employees are organized with clear task lists and deadlines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
