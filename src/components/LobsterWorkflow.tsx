import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Lobster Claw Workflow — Core Architecture ─────────────────────────────────
//
// The Lobster Claw pattern (from OpenClaw/Lobster spec) is a two-arm deterministic
// pipeline where:
//   LEFT CLAW  = INTAKE  arm → User → Lindy AI → Lobster JSON Spec → Hermes Gate
//   RIGHT CLAW = DELIVER arm → Hermes Gate → Worker → Audit → Lindy AI → Customer
//   CENTRE     = Hermes Approval Gate — SILENT ENGINE — routes, never speaks
//
// Communication rules:
//   Lindy AI → customer service supervisor (speaks to customer)
//   Hermes → SILENT engine (routes, approves, logs — never speaks)
//   Workers → Task output only (no conversation, scoped execution)
//   Lobster → Controlled JSON pipeline (no agent-to-agent chat unless pipeline routes it)
// ─────────────────────────────────────────────────────────────────────────────

const LEFT_STEPS = [
  {
    label: 'Customer',
    sub: 'Sends request via chat or catalog',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.4)',
    icon: '👤',
    detail: 'Customer interacts with Lindy AI for service and hiring support. Hermes handles complex escalation.',
  },
  {
    label: 'Lindy AI Receives',
    sub: 'Classifies intent, structures task brief',
    color: '#9333ea',
    glow: 'rgba(147,51,234,0.35)',
    icon: '👩‍💼',
    detail: 'Lindy AI is the customer service supervisor. She translates customer language into a structured task spec.',
  },
  {
    label: 'Lobster Pipeline',
    sub: 'Formats JSON spec with approval gates',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.35)',
    icon: '🦞',
    detail: 'Lobster wraps the task in a typed JSON pipeline with approval checkpoints and resume tokens.',
  },
  {
    label: 'Hermes Intake',
    sub: 'Classifies, risk-scores, queues',
    color: '#4f46e5',
    glow: 'rgba(79,70,229,0.35)',
    icon: '⚙️',
    detail: 'Hermes silently evaluates the task, assigns risk score, selects optimal worker agent class.',
  },
];

const RIGHT_STEPS = [
  {
    label: 'Worker Executes',
    sub: 'Scoped, isolated, time-bounded',
    color: '#0891b2',
    glow: 'rgba(8,145,178,0.35)',
    icon: '🤖',
    detail: 'Worker agent runs the task in an isolated environment. No access to other agents or customer data.',
  },
  {
    label: 'Lobster Verifies',
    sub: 'Checks output against rubric',
    color: '#059669',
    glow: 'rgba(5,150,105,0.35)',
    icon: '🔍',
    detail: 'Lobster pipeline validates worker output. Approval gate fires if result needs human sign-off.',
  },
  {
    label: 'Audit Logged',
    sub: 'Immutable record to Postgres',
    color: '#65a30d',
    glow: 'rgba(101,163,13,0.35)',
    icon: '📋',
    detail: 'Every action, output, and decision is written to the immutable audit log. Fully replayable.',
  },
  {
    label: 'Lindy AI Delivers',
    sub: 'Presents clean result to customer',
    color: '#d97706',
    glow: 'rgba(217,119,6,0.35)',
    icon: '✅',
    detail: 'Lindy AI receives the verified result and presents it to the customer. No internals exposed.',
  },
];

const CORE_MODULES = [
  {
    name: 'hermes',
    label: 'Hermes (Manager)',
    sub: 'The Brain of the Agency',
    icon: '⚙️',
    color: '#6366f1',
    border: 'border-indigo-500/25',
    bg: 'from-indigo-500/8',
    desc: 'Agency Manager. Deals with complex situations and strategic depth. He oversees the workforce and handles escalations from Lindy AI.',
    badge: 'MANAGER / BRAIN',
    badgeColor: 'text-indigo-300 bg-indigo-500/10 border-indigo-400/20',
  },
  {
    name: 'lobster',
    label: 'Lobster Pipeline',
    sub: 'JSON pipes + Approval gates',
    icon: '🦞',
    color: '#06b6d4',
    border: 'border-cyan-500/25',
    bg: 'from-cyan-500/8',
    desc: 'Wraps every task in a typed, deterministic pipeline. Approval gates pause side-effects. Resume tokens allow safe continuation. No improvised actions.',
    badge: 'DETERMINISTIC',
    badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-400/20',
  },
  {
    name: 'linda',
    label: 'Lindy AI Interface',
    sub: 'Lead Supervisor',
    icon: '👩‍💼',
    color: '#ec4899',
    border: 'border-pink-500/25',
    bg: 'from-pink-500/8',
    desc: 'Lead Supervisor. Your primary human interface. Maxed-out in customer service and operations to ensure every hire and task is managed perfectly.',
    badge: 'LEAD SUPERVISOR',
    badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-400/20',
  },
  {
    name: 'workers',
    label: 'Worker Agents',
    sub: 'Isolated execution units',
    icon: '🤖',
    color: '#3b82f6',
    border: 'border-blue-500/25',
    bg: 'from-blue-500/8',
    desc: '1,000 certified agents, each maxed-out in their tasked skills. Standardized response units for deterministic output.',
    badge: 'MAXED-SKILL AGENTS',
    badgeColor: 'text-blue-300 bg-blue-500/10 border-blue-400/20',
  },
];

function PipelineStep({
  step,
  index,
  direction,
  delay,
}: {
  step: (typeof LEFT_STEPS)[0];
  index: number;
  direction: 'left' | 'right';
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay + index * 0.1, duration: 0.4 }}
      className={`relative flex items-start gap-3 p-3.5 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all group cursor-default w-full ${direction === 'right' ? 'flex-row-reverse text-right' : ''}`}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${step.color}18`, border: `1px solid ${step.color}35`, boxShadow: `0 0 16px ${step.glow}` }}
      >
        {step.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white">{step.label}</p>
        <p className="text-[10px] text-slate-500 leading-tight">{step.sub}</p>
        {/* Tooltip on hover */}
        <p className="text-[10px] text-slate-600 leading-tight mt-1 opacity-0 group-hover:opacity-100 transition-opacity max-h-0 group-hover:max-h-10 overflow-hidden">
          {step.detail}
        </p>
      </div>
      {/* Step connector */}
      {index < (direction === 'left' ? LEFT_STEPS : RIGHT_STEPS).length - 1 && (
        <div
          className={`absolute ${direction === 'left' ? 'left-8' : 'right-8'} -bottom-3 w-px h-3`}
          style={{ background: `linear-gradient(to bottom, ${step.color}60, transparent)` }}
        />
      )}
    </motion.div>
  );
}

export function LobsterWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="workflow" ref={ref} className="relative py-28 px-6 lg:px-12 bg-[#050508] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-indigo-600/6 blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 mb-5">
            <span className="text-base">🦞</span>
            <span className="text-[11px] font-mono text-cyan-300 tracking-wider uppercase">
              Lobster Claw Workflow · Core Architecture
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Deterministic by design.{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Zero improvisation.
            </span>
          </h2>
          <p className="text-slate-400 mt-5 text-base max-w-2xl mx-auto leading-relaxed">
            Every task flows through a typed, two-arm JSON pipeline with approval gates.
            No agent speaks unless routed. No side-effect fires without explicit sign-off.
            Fully audited. Fully replayable.
          </p>
        </motion.div>

        {/* ── The Claw Diagram ── */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-6 mb-20">

          {/* LEFT CLAW — Intake */}
          <div className="w-full lg:w-[260px] flex flex-col gap-3">
            <p className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-1 text-center lg:text-left">
              ← Intake Claw
            </p>
            {LEFT_STEPS.map((step, i) => (
              <PipelineStep key={step.label} step={step} index={i} direction="left" delay={0.1} />
            ))}
          </div>

          {/* CENTRE — Hermes Gate */}
          <div className="flex flex-col items-center justify-start gap-3 flex-shrink-0 pt-6 lg:pt-8">
            {/* Top connector */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:block w-px h-20 origin-top"
              style={{ background: 'linear-gradient(to bottom, #4f46e5, #6366f1)' }}
            />

            {/* Gate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.45 }}
              className="relative flex flex-col items-center"
            >
              <div className="absolute -inset-6 rounded-full bg-indigo-500/12 blur-2xl animate-pulse" />
              <div
                className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 40% 35%, #1e1b4b, #0a0a18)',
                  border: '1.5px solid rgba(99,102,241,0.4)',
                  boxShadow: '0 0 50px rgba(99,102,241,0.25), inset 0 0 30px rgba(0,0,0,0.5)',
                }}
              >
                <span className="text-2xl mb-1">⚙️</span>
                <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest text-center leading-tight">
                  Hermes<br />Approval Gate
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <p className="text-[8px] text-indigo-500 font-mono tracking-wider">SILENT</p>
                </div>
              </div>
              <div className="mt-2 text-[8px] font-mono text-slate-600 text-center">
                routes · approves · logs<br />never speaks
              </div>
            </motion.div>

            {/* Bottom connector */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="hidden lg:block w-px h-20 mt-1 origin-bottom"
              style={{ background: 'linear-gradient(to bottom, #0891b2, #059669)' }}
            />
          </div>

          {/* RIGHT CLAW — Deliver */}
          <div className="w-full lg:w-[260px] flex flex-col gap-3">
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1 text-center lg:text-right">
              Deliver Claw →
            </p>
            {RIGHT_STEPS.map((step, i) => (
              <PipelineStep key={step.label} step={step} index={i} direction="right" delay={0.3} />
            ))}
          </div>
        </div>

        {/* ── Core Module Cards ── */}
        <div className="border-t border-white/5 pt-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-8"
          >
            // Core System Modules
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_MODULES.map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-2xl border ${mod.border} bg-gradient-to-b ${mod.bg} to-transparent hover:border-white/20 transition-all group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{mod.icon}</span>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{mod.label}</h3>
                <p className="text-[10px] font-mono mb-3" style={{ color: mod.color }}>{mod.sub}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Lobster Code Spec ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-white/8 bg-black/60 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-sm">🦞</span>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                lobster.pipeline.json — Live Example
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400">RUNNING</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
            <pre className="p-5 text-[11px] font-mono leading-relaxed overflow-x-auto">
<span className="text-slate-500">{'// INTAKE ARM — Customer → Lindy AI → Hermes\n'}</span>
<span className="text-cyan-300">{'{\n'}</span>
<span className="text-white">{'  "action": "run",\n'}</span>
<span className="text-white">{'  "pipeline":\n'}</span>
<span className="text-emerald-300">{'    lindy.classify --intent-json\n'}</span>
<span className="text-emerald-300">{'    | hermes.route --worker-class\n'}</span>
<span className="text-emerald-300">{'    | approve --gate human_required\n'}</span>
<span className="text-emerald-300">{'    | worker.exec --scoped --isolated\n'}</span>
<span className="text-cyan-300">{'}'}</span>
            </pre>
            <pre className="p-5 text-[11px] font-mono leading-relaxed overflow-x-auto">
<span className="text-slate-500">{'// DELIVER ARM — Worker → Audit → Lindy AI\n'}</span>
<span className="text-cyan-300">{'{\n'}</span>
<span className="text-white">{'  "action": "resume",\n'}</span>
<span className="text-white">{'  "token": "<resume_token>",\n'}</span>
<span className="text-white">{'  "pipeline":\n'}</span>
<span className="text-emerald-300">{'    lobster.verify --rubric\n'}</span>
<span className="text-emerald-300">{'    | audit.log --immutable\n'}</span>
<span className="text-emerald-300">{'    | lindy.deliver --clean-output\n'}</span>
<span className="text-amber-300">{'  // ✔ No raw worker output to customer\n'}</span>
<span className="text-cyan-300">{'}'}</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
