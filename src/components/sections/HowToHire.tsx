import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    n: '01',
    title: 'Define the role',
    desc: 'Write what you need in plain English. Not a job description — a mission. "Handle all inbound support tickets under 2 min SLA" is enough.',
    tip: 'From the community: Write posts that sound like a developer wrote them. Real problems, real stack.',
    code: `# Define your agent's mission
mission: "Qualify all inbound leads, update CRM, 
         send follow-up sequence within 5 minutes"
trigger: email_received
escalate_if: deal_size > $50,000`,
  },
  {
    n: '02',
    title: 'Choose: AI agent or human hire',
    desc: 'Routine tasks under 40% of your time? Deploy an AI agent in minutes. Requires empathy, creativity, or strategy? Hire a human from our vetted ecosystem.',
    tip: 'Pro tip: AI for busywork, humans for relationships. The winning teams run both.',
    code: `if task.type in [ROUTINE, HIGH_VOLUME]:
    deploy → lindy.agent(role)
elif task.requires_empathy:
    route  → toptal | pearl_talent | arc.dev
else:
    hybrid → ai_assist + human_review`,
  },
  {
    n: '03',
    title: 'Connect your stack',
    desc: 'Link Gmail, HubSpot, Slack, Notion, your CRM — 4,000+ integrations via Lindy AI. Or connect your own tools via the Hermes API.',
    tip: 'Developers say: always set deadlines and confirm in how many hours you expect tasks done. Never leave it open.',
    code: `hermes config set integrations:
  - gmail: connected
  - hubspot: connected  
  - slack:  connected
  - notion: connected
✔ 4,000+ apps available via Lindy AI`,
  },
  {
    n: '04',
    title: 'Set permissions and audit rules',
    desc: 'Every action is scoped. The agent cannot email, transact, or deploy without an explicit grant. All actions logged to the immutable audit trail.',
    tip: 'Community rule: always have a contract / permission boundary. Especially when they have access to sensitive accounts.',
    code: `permissions:
  email_send:  allowed (internal only)
  crm_update:  allowed
  payment:     REQUIRE_HUMAN_APPROVAL
  deploy:      REQUIRE_HUMAN_APPROVAL
audit: all_actions → postgres://audit_logs`,
  },
  {
    n: '05',
    title: 'Launch and learn',
    desc: 'Your agent runs 24/7. Every decision is logged and fed back into the memory loop. The system gets smarter the longer it runs.',
    tip: 'From real operators: monitor the first 50 tasks manually, then automate the review gate.',
    code: `$ hermes run --agent sdr-outreach
✔ Agent online · 24/7 execution
✔ Memory loop: ENABLED
✔ Audit trail: STREAMING
✔ Human escalation: CONFIGURED
Tasks completed today: 847`,
  },
];

export function HowToHire() {
  return (
    <section id="how-to-hire" className="relative py-32 px-6 lg:px-12 bg-[#070710] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-4">
            // The Elitze Way
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            How to hire{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              the right way.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
            Five steps that the best remote hiring teams use — whether they're
            deploying AI agents or onboarding elite human talent.
          </p>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06 }}
              className="grid lg:grid-cols-5 gap-6 p-7 rounded-2xl border border-white/8 bg-gradient-to-r from-white/[0.02] to-transparent hover:border-white/15 transition-all"
            >
              {/* Left: step number + text */}
              <div className="lg:col-span-3 flex gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-300 text-lg">
                    {step.n}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                  {/* Community tip */}
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/15">
                    <span className="text-indigo-300 text-xs mt-0.5 flex-shrink-0">💬</span>
                    <p className="text-xs text-indigo-200/70 leading-relaxed italic">{step.tip}</p>
                  </div>
                </div>
              </div>

              {/* Right: code */}
              <div className="lg:col-span-2">
                <pre className="bg-black/60 border border-white/5 rounded-xl p-4 text-[11px] font-mono leading-relaxed overflow-x-auto h-full">
                  <code className="text-emerald-300/90">{step.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#agents"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-violet-100 transition-all"
          >
            Browse AI Agent Roles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 rounded-xl font-medium text-white hover:bg-white/5 transition-all"
          >
            Explore Human Talent Platforms
          </a>
        </motion.div>
      </div>
    </section>
  );
}
