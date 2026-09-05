import { motion } from 'framer-motion';
import { 
  Compass, 
  CreditCard, 
  ShieldCheck, 
  Repeat, 
  ArrowRight,
  BarChart3,
  Bot
} from 'lucide-react';

const behavioralSteps = [
  {
    phase: 'DISCOVERY',
    title: 'Intent Mapping',
    desc: 'Users interact with Lindy AI to define a mission. Hermes silently routes the request through the Lobster pipeline to find the exact agent match.',
    icon: Compass,
    color: '#60a5fa',
    meta: 'Frictionless entry'
  },
  {
    phase: 'CONVERSION',
    title: 'Value-First Placement',
    desc: 'The Rent-to-Own model allows immediate deployment. Flash Sale triggers create urgency while VIP Gold provides instant tiered value.',
    icon: CreditCard,
    color: '#34d399',
    meta: '90% Cost reduction'
  },
  {
    phase: 'RETENTION',
    title: 'Managed Growth',
    desc: 'Lindy AI supervises daily ops, while the Audit Trail builds trust. Users scale from 1 agent to a 1,000-agent digital workforce.',
    icon: Repeat,
    color: '#818cf8',
    meta: 'Lifetime ownership'
  }
];

const lifecycleRules = [
  { label: 'Trust Layer', value: 'Every action is verified by the Lobster gate before the user sees it.' },
  { label: 'Escalation Path', value: 'Complex tasks automatically trigger "The Brain" (Hermes) for oversight.' },
  { label: 'Learning Loop', value: 'The system remembers successful patterns and applies them to future tasks.' }
];

export function BehavioralFlow() {
  return (
    <section id="behavioral-flow" className="relative py-28 px-6 lg:px-12 bg-[#050608] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-20"
        >
          <p className="text-xs font-mono text-blue-400 uppercase tracking-[0.25em] mb-4">// System Intelligence</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Behavioral Flow{' '}
            <span className="bg-gradient-to-r from-blue-300 to-slate-500 bg-clip-text text-transparent">Engine.</span>
          </h2>
          <p className="text-slate-400 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
            How the Elitze ecosystem converts raw user intent into 
            autonomous production and long-term retention.
          </p>
        </motion.div>

        {/* The Engine Diagram */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {behavioralSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl border border-white/5 bg-slate-900/10 flex flex-col group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <step.icon className="w-24 h-24" />
              </div>
              
              <div className="mb-4">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20 px-2 py-1 rounded-md">
                  {step.phase}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                {step.title}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">
                {step.desc}
              </p>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase">{step.meta}</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </div>
              </div>

              {i < 2 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                   <div className="w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Engine Mechanics */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white">Engine Mechanics</h4>
            <div className="space-y-4">
              {lifecycleRules.map((rule) => (
                <div key={rule.label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">{rule.label}</p>
                  <p className="text-sm text-slate-400">{rule.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative p-8 rounded-3xl border border-white/10 bg-black/40 overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-400" />
               </div>
               <p className="text-sm font-bold text-white mb-2">Automated Retention Loop</p>
               <p className="text-xs text-slate-500 max-w-xs mb-6">
                 Lindy AI monitors hire performance. If satisfaction dips, she triggers a 
                 re-training pulse or suggests a specialized "Hermes Escalation."
               </p>
               <div className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 text-[10px] font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Lindy AI Supervisor</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <BarChart3 className="w-3 h-3" />
                    <span>99.4% LTV</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
