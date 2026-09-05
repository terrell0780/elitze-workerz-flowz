import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What exactly is an Elitze AI agent?',
    a: 'An AI agent is a purpose-built, autonomous software entity that executes a specific job function — like handling customer support, qualifying leads, or managing your calendar. Each agent is Hermes AI certified and runs inside our orchestration platform. You interact with it through Lindy AI (our customer service supervisor) or directly via the platform dashboard.',
  },
  {
    q: 'How does renting vs buying work?',
    a: 'Renting gives you access to an agent for a fixed number of days at $35/day — ideal for projects, trials, or peak periods. Buying means you own the agent outright (from $450 for one, cheaper at volume). Owned agents are yours permanently and can be redeployed across unlimited tasks.',
  },
  {
    q: 'What happens after I hire an agent?',
    a: "Lindy AI, our customer service supervisor, personally oversees your onboarding. She'll confirm the agent is deployed, brief you on how to interact with it, and check in within 24 hours. Hermes routes every task in the background — you'll never see the machinery, just the results.",
  },
  {
    q: 'Can agents talk to each other?',
    a: 'No — not unless explicitly controlled by a Lobster pipeline step. This is a deliberate architectural decision. Agents are isolated execution units. Only Hermes can route a task from one agent to another, and every such handoff is logged in the audit trail.',
  },
  {
    q: 'Who is Hermes and can I contact him?',
    a: "Hermes is our Head of Intelligence — he knows every trade, every workflow, every integration inside and out. That's why people call him The Brain. For complex situations that need deep expertise, you can reach Hermes directly through the chat window. He handles the cases Lindy AI escalates and brings strategic depth to any problem.",
  },
  {
    q: 'Who is Lindy AI?',
    a: "Lindy AI is your dedicated customer service supervisor. She's your first point of contact for everything — hiring, billing, troubleshooting, deal negotiation, and day-to-day operations. She's online 24/7 and manages all agent activity on your behalf.",
  },
  {
    q: 'Is there a free tier or trial?',
    a: 'During your first 7 days, the Flash Sale gives you 50% off orders over $100 and a free VIP upgrade. There is no ongoing free tier, but the entry point (renting a single agent for one day) is $35 — which is the lowest-risk way to test the platform.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards via Stripe, Crypto payment coordination, and CDN E-Transfer. VIP members can also access invoice-based billing and volume payment terms.',
  },
  {
    q: 'How secure is the platform?',
    a: 'Every agent runs in an isolated container with no access to other agents or your external accounts unless explicitly granted. All actions are logged to an immutable audit trail. The admin panel is PIN-protected. We follow SOC2-aligned practices across the entire stack.',
  },
  {
    q: 'What is the VIP program?',
    a: 'VIP Silver ($49/mo) gives you 10% off and priority support. VIP Gold ($149/mo) gives you 25% off, exclusive deal negotiations with Lindy AI, and first access to new agents. Partner tier is custom-priced and includes white-label rights and a revenue share program.',
  },
  {
    q: 'Can I make an offer or negotiate pricing?',
    a: "Yes — VIP members have access to our negotiation desk. Gold VIP members can submit counter-offers directly in the chat with Lindy AI. For volume purchases (10+ agents), we always consider custom pricing proposals. Reach out to Lindy AI or Hermes in the chat.",
  },
  {
    q: 'Do employees need to log in?',
    a: 'Employees have their own login portal with role-based access. Customers do not need to create an account — they can browse and hire as guests. VIP members can optionally create an account to access their exclusive dashboard, deal history, and saved agents.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 px-6 lg:px-12 bg-[#050508] overflow-hidden">
      <div className="relative max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs font-mono text-violet-400 uppercase tracking-[0.25em] mb-4">// FAQs</p>
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Common questions,{' '}
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">straight answers.</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-medium text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <p className="text-sm text-slate-500">
            Still have questions?{' '}
            <a href="mailto:terrell0780@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              Contact Terrell Hall directly →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
