import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Zap,
  Mail,
  Calendar,
  GitBranch,
  Search,
  FileText,
  BarChart3,
  ChevronRight,
  Play,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Lock,
  RefreshCw,
  MessageSquare,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
interface AgentTrigger {
  label: string;
  icon: React.ReactNode;
}

interface AgentStep {
  action: string;
  detail: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  category: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  borderColor: string;
  bgColor: string;
  triggers: AgentTrigger[];
  steps: AgentStep[];
  skills: string[];
  integrations: string[];
  metrics: { label: string; value: string }[];
  liveLog: string[];
}

/* ─────────────────────────────────────────────────────────
   AGENT DEFINITIONS
───────────────────────────────────────────────────────── */
const AGENTS: Agent[] = [
  {
    id: 'outreach',
    name: 'Outreach Agent',
    role: 'Sales Development Representative',
    category: 'Sales',
    tagline: 'Never miss a prospect. Never send a generic email.',
    description:
      'Researches leads, writes hyper-personalized cold emails using live data from LinkedIn + company website, sends via your SMTP, tracks opens, auto-follows up after 3 days if no reply.',
    icon: <Mail className="w-5 h-5" />,
    color: 'text-violet-300',
    glowColor: 'rgba(139,92,246,0.35)',
    borderColor: 'border-violet-500/30',
    bgColor: 'from-violet-500/10',
    triggers: [
      { label: 'New CRM contact added', icon: <Database className="w-3 h-3" /> },
      { label: 'Webhook from lead form', icon: <Globe className="w-3 h-3" /> },
      { label: 'Schedule: Mon 08:00', icon: <Calendar className="w-3 h-3" /> },
    ],
    steps: [
      { action: 'Enrich lead', detail: 'Scrape LinkedIn + website · extract role, tech stack, recent news' },
      { action: 'Score lead', detail: 'ICP match score via Hermes · skip if < 65%' },
      { action: 'Draft email', detail: 'Claude 4.6 · reference specific pain point + personalized hook' },
      { action: 'Send + track', detail: 'SMTP dispatch · Pixel tracking · log to audit' },
      { action: 'Follow-up loop', detail: 'T+3d if no open · T+7d if no reply · then mark dormant' },
    ],
    skills: ['Lead enrichment', 'Personalized copywriting', 'SMTP delivery', 'CRM sync', 'Follow-up logic'],
    integrations: ['HubSpot', 'Salesforce', 'Gmail', 'Apollo', 'LinkedIn'],
    metrics: [
      { label: 'Emails sent / day', value: '340' },
      { label: 'Open rate', value: '41%' },
      { label: 'Reply rate', value: '12%' },
    ],
    liveLog: [
      '> Fetching lead: sarah.chen@acmecorp.com',
      '✔ LinkedIn enriched: VP Engineering, 320 employees',
      '✔ ICP score: 87 — qualified',
      '✔ Draft email generated (218 tokens)',
      '✔ Email sent · msg_id: <m.20240115.8821>',
      '> Watching open events...',
      '✔ Opened at 09:34 · scheduling follow-up T+3d',
    ],
  },
  {
    id: 'support',
    name: 'Support Agent',
    role: 'Tier-1 Customer Support Rep',
    category: 'Support',
    tagline: 'Instant first-line support. Escalates only when needed.',
    description:
      'Monitors your support inbox, classifies tickets by urgency and category, drafts resolutions from your knowledge base, sends replies, logs to Zendesk, escalates complex tickets to Slack.',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'text-cyan-300',
    glowColor: 'rgba(34,211,238,0.3)',
    borderColor: 'border-cyan-500/30',
    bgColor: 'from-cyan-500/10',
    triggers: [
      { label: 'New support email', icon: <Mail className="w-3 h-3" /> },
      { label: 'Zendesk ticket created', icon: <FileText className="w-3 h-3" /> },
      { label: 'Intercom message', icon: <MessageSquare className="w-3 h-3" /> },
    ],
    steps: [
      { action: 'Classify ticket', detail: 'Category + urgency (P1–P4) · NLP intent detection' },
      { action: 'Search knowledge base', detail: 'Vector search across 10k+ docs · top-3 passages' },
      { action: 'Draft resolution', detail: 'GPT-5 · empathetic tone · cite KB source' },
      { action: 'Auto-reply if confident', detail: 'Confidence ≥ 80% · send · mark resolved' },
      { action: 'Escalate if not', detail: 'Post to #support-escalations Slack · tag on-call' },
    ],
    skills: ['Ticket triage', 'Knowledge base search', 'Email drafting', 'Zendesk sync', 'Escalation routing'],
    integrations: ['Zendesk', 'Intercom', 'Gmail', 'Slack', 'Notion'],
    metrics: [
      { label: 'Tickets resolved / day', value: '210' },
      { label: 'Auto-resolve rate', value: '78%' },
      { label: 'Avg response time', value: '38s' },
    ],
    liveLog: [
      '> New ticket: "Login not working" · priority P2',
      '✔ Category: Auth issue · urgency: High',
      '✔ KB search: 3 articles matched (cosine ≥ 0.82)',
      '✔ Draft reply generated (confidence 91%)',
      '✔ Reply sent to: james@clientco.com',
      '✔ Zendesk ticket #14820 marked: Resolved',
      '> Monitoring for next ticket...',
    ],
  },
  {
    id: 'researcher',
    name: 'Research Agent',
    role: 'Market Intelligence Analyst',
    category: 'Research',
    tagline: 'Deep market intelligence, compiled while you sleep.',
    description:
      'Runs autonomous web research, synthesizes competitor intel, market trends, and news into structured briefs. Delivers a formatted Notion page + Slack digest every morning.',
    icon: <Search className="w-5 h-5" />,
    color: 'text-emerald-300',
    glowColor: 'rgba(52,211,153,0.3)',
    borderColor: 'border-emerald-500/30',
    bgColor: 'from-emerald-500/10',
    triggers: [
      { label: 'Schedule: Daily 06:00 UTC', icon: <Calendar className="w-3 h-3" /> },
      { label: 'Keyword alert triggered', icon: <Search className="w-3 h-3" /> },
      { label: 'Manual via CLI', icon: <Zap className="w-3 h-3" /> },
    ],
    steps: [
      { action: 'Define research scope', detail: 'Load topics from config · date range filter' },
      { action: 'Web crawl + scrape', detail: 'Browser harness · 25 sources · deduplicate' },
      { action: 'Synthesize findings', detail: 'Gemini 3 · structured JSON output · citation tracking' },
      { action: 'Write brief', detail: 'Executive summary + sections + competitor table' },
      { action: 'Deliver', detail: 'Notion page created · Slack digest · PDF export' },
    ],
    skills: ['Web research', 'Competitive analysis', 'Trend synthesis', 'Report writing', 'Source citation'],
    integrations: ['Notion', 'Slack', 'Google Search', 'Twitter/X', 'SEC EDGAR'],
    metrics: [
      { label: 'Sources scraped / run', value: '25+' },
      { label: 'Briefs delivered / week', value: '7' },
      { label: 'Avg synthesis time', value: '4.2 min' },
    ],
    liveLog: [
      '> Research task started: AI Agents market Q1-2026',
      '✔ Crawling 25 sources via Browser Harness',
      '✔ 847 paragraphs ingested · deduplication pass',
      '✔ Gemini 3 synthesis complete (4,120 tokens)',
      '✔ Competitor table: 12 companies mapped',
      '✔ Notion page created: /research/ai-agents-q1',
      '✔ Slack digest posted to #market-intel',
    ],
  },
  {
    id: 'scheduler',
    name: 'Scheduling Agent',
    role: 'Executive Assistant',
    category: 'Operations',
    tagline: 'Fills your calendar. Guards your focus time.',
    description:
      'Reads inbound meeting requests, checks calendar availability, proposes times respecting your focus blocks and time zones, sends calendar invites, preps a briefing doc 10 min before each call.',
    icon: <Calendar className="w-5 h-5" />,
    color: 'text-amber-300',
    glowColor: 'rgba(251,191,36,0.3)',
    borderColor: 'border-amber-500/30',
    bgColor: 'from-amber-500/10',
    triggers: [
      { label: 'Inbound email: "schedule a call"', icon: <Mail className="w-3 h-3" /> },
      { label: 'Calendly fallback link', icon: <Calendar className="w-3 h-3" /> },
      { label: 'Slack DM to @scheduler', icon: <MessageSquare className="w-3 h-3" /> },
    ],
    steps: [
      { action: 'Parse request', detail: 'Extract attendees, duration, topic, timezone' },
      { action: 'Check availability', detail: 'Google Calendar API · respect focus blocks · buffer rules' },
      { action: 'Propose slots', detail: '3 options · natural language · timezone-aware' },
      { action: 'Confirm + book', detail: 'Create GCal event · send ICS to all attendees' },
      { action: 'Prep briefing', detail: 'T-10min: pull notes, prior emails, company info → Notion doc' },
    ],
    skills: ['Calendar management', 'Timezone resolution', 'Meeting prep', 'Email parsing', 'Briefing generation'],
    integrations: ['Google Calendar', 'Outlook', 'Zoom', 'Notion', 'Slack'],
    metrics: [
      { label: 'Meetings booked / week', value: '48' },
      { label: 'Scheduling conflicts', value: '0' },
      { label: 'Briefings generated', value: '48' },
    ],
    liveLog: [
      '> Email: "Can we connect Thu or Fri?" · alex@partner.io',
      '✔ Parsed: 30min call · Thu-Fri preference · PST',
      '✔ Calendar check: Thu 14:00 PST available',
      '✔ Reply sent with 3 proposed slots',
      '✔ Confirmed: Thu 14:00 PST · event created',
      '✔ ICS sent to alex@partner.io',
      '> Briefing scheduled for T-10min...',
    ],
  },
  {
    id: 'devops',
    name: 'DevOps Agent',
    role: 'Site Reliability Engineer',
    category: 'Engineering',
    tagline: 'Self-healing infrastructure. Zero-alert fatigue.',
    description:
      'Monitors infrastructure metrics in real time, auto-scales on load spikes, diagnoses incidents by parsing logs, drafts runbooks, and pages the on-call only when self-remediation fails.',
    icon: <GitBranch className="w-5 h-5" />,
    color: 'text-rose-300',
    glowColor: 'rgba(251,113,133,0.3)',
    borderColor: 'border-rose-500/30',
    bgColor: 'from-rose-500/10',
    triggers: [
      { label: 'Prometheus alert fired', icon: <Zap className="w-3 h-3" /> },
      { label: 'Error rate spike > 2%', icon: <BarChart3 className="w-3 h-3" /> },
      { label: 'Deployment webhook', icon: <GitBranch className="w-3 h-3" /> },
    ],
    steps: [
      { action: 'Detect anomaly', detail: 'Parse Prometheus metrics · threshold breach detection' },
      { action: 'Diagnose', detail: 'Pull last 1h logs · GPT-5 root cause analysis' },
      { action: 'Remediate', detail: 'Auto-scale / restart service / rollback deploy' },
      { action: 'Verify', detail: 'Health check loop until green · max 3 attempts' },
      { action: 'Document + notify', detail: 'Write incident runbook · Slack #incidents post' },
    ],
    skills: ['Infrastructure monitoring', 'Log analysis', 'Auto-remediation', 'Incident response', 'Runbook writing'],
    integrations: ['Prometheus', 'Grafana', 'PagerDuty', 'GitHub', 'AWS / GCP'],
    metrics: [
      { label: 'Incidents auto-resolved', value: '91%' },
      { label: 'MTTR', value: '2.4 min' },
      { label: 'Pages to on-call / week', value: '3' },
    ],
    liveLog: [
      '> Alert: CPU 94% on worker-3 · sustained 5min',
      '✔ Pulling last 1h logs from worker-3',
      '✔ Root cause: memory leak in task-executor v2.1',
      '✔ Action: restart worker-3 container',
      '✔ Health check: 200 OK after 18s',
      '✔ Incident logged #INC-0042 · runbook written',
      '> No page required — auto-resolved',
    ],
  },
  {
    id: 'analyst',
    name: 'Data Analyst Agent',
    role: 'Business Intelligence Analyst',
    category: 'Analytics',
    tagline: 'Ask questions in English. Get answers in seconds.',
    description:
      'Translates natural language questions into SQL, runs them against your warehouse, generates charts, interprets results, and delivers a narrative summary to Slack or email on a schedule.',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-blue-300',
    glowColor: 'rgba(96,165,250,0.3)',
    borderColor: 'border-blue-500/30',
    bgColor: 'from-blue-500/10',
    triggers: [
      { label: 'Slack: "@analyst how did MRR grow…"', icon: <MessageSquare className="w-3 h-3" /> },
      { label: 'Schedule: Mon 08:00 KPI report', icon: <Calendar className="w-3 h-3" /> },
      { label: 'Dashboard webhook', icon: <BarChart3 className="w-3 h-3" /> },
    ],
    steps: [
      { action: 'Parse question', detail: 'Extract intent, metrics, date range, filters' },
      { action: 'Generate SQL', detail: 'GPT-5 Text-to-SQL · schema-aware · dry-run safe' },
      { action: 'Execute query', detail: 'BigQuery / Snowflake / Postgres · row limit enforced' },
      { action: 'Interpret results', detail: 'Statistical summary · anomaly detection · trend narrative' },
      { action: 'Deliver insight', detail: 'Chart PNG + Slack message + CSV attachment' },
    ],
    skills: ['Natural language to SQL', 'Data visualization', 'Statistical analysis', 'Trend detection', 'Narrative writing'],
    integrations: ['BigQuery', 'Snowflake', 'Postgres', 'Slack', 'Google Sheets'],
    metrics: [
      { label: 'Queries run / day', value: '180' },
      { label: 'SQL accuracy', value: '96%' },
      { label: 'Avg query time', value: '1.8s' },
    ],
    liveLog: [
      '> Slack query: "MRR growth last 90 days by plan?"',
      '✔ Intent parsed: MRR trend · group by plan · 90d',
      '✔ SQL generated (BigQuery dialect)',
      '✔ Query executed: 14,820 rows in 1.3s',
      '✔ Trend: Pro plan +34% · Enterprise +18% · Free -2%',
      '✔ Chart generated (PNG 800x500)',
      '✔ Slack reply posted to #analytics',
    ],
  },
];

const CATEGORIES = ['All', 'Sales', 'Support', 'Research', 'Operations', 'Engineering', 'Analytics'];

/* ─────────────────────────────────────────────────────────
   LIVE LOG TERMINAL
───────────────────────────────────────────────────────── */
function LiveTerminal({ agent, running }: { agent: Agent; running: boolean }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleLines([]);
    setLineIndex(0);
  }, [agent.id]);

  useEffect(() => {
    if (!running) return;
    if (lineIndex >= agent.liveLog.length) return;
    const delay = lineIndex === 0 ? 200 : 600 + Math.random() * 400;
    const t = setTimeout(() => {
      setVisibleLines((prev) => [...prev, agent.liveLog[lineIndex]]);
      setLineIndex((i) => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [running, lineIndex, agent.liveLog, agent.id]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLines]);

  return (
    <div className="rounded-xl border border-white/5 bg-black/70 overflow-hidden">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="w-2 h-2 rounded-full bg-rose-500" />
        <div className="w-2 h-2 rounded-full bg-amber-500" />
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="ml-2 text-[10px] font-mono text-slate-500">
          {agent.name.toLowerCase().replace(' ', '_')}.workerz · live
        </span>
        {running && (
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            RUNNING
          </span>
        )}
      </div>
      <div className="p-4 h-52 overflow-y-auto font-mono text-[11px] leading-relaxed">
        {visibleLines.length === 0 && !running && (
          <p className="text-slate-600 italic">Press Run to execute agent…</p>
        )}
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={
              line.startsWith('>')
                ? 'text-cyan-300'
                : line.startsWith('✔')
                ? 'text-emerald-400'
                : line.startsWith('!')
                ? 'text-rose-400'
                : 'text-slate-400'
            }
          >
            {line}
          </motion.div>
        ))}
        {running && lineIndex < agent.liveLog.length && (
          <span className="inline-block w-2 h-3 bg-emerald-400 animate-pulse ml-0.5" />
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   AGENT CARD (collapsed, in grid)
───────────────────────────────────────────────────────── */
function AgentCard({
  agent,
  selected,
  onSelect,
}: {
  agent: Agent;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      layout
      onClick={() => onSelect(agent.id)}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
        selected
          ? `${agent.borderColor} bg-gradient-to-b ${agent.bgColor} to-transparent`
          : 'border-white/8 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.04]'
      }`}
      style={
        selected
          ? { boxShadow: `0 0 28px -4px ${agent.glowColor}` }
          : {}
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
            selected ? agent.borderColor : 'border-white/10'
          } bg-white/5`}
          style={selected ? { boxShadow: `0 0 16px -4px ${agent.glowColor}` } : {}}
        >
          <span className={selected ? agent.color : 'text-slate-500'}>
            {agent.icon}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-bold text-sm text-white truncate">{agent.name}</p>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wide flex-shrink-0 ${
                selected
                  ? `${agent.color} bg-white/5 border ${agent.borderColor}`
                  : 'text-slate-600 bg-white/5 border border-white/5'
              }`}
            >
              {agent.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-snug line-clamp-2">
            {agent.tagline}
          </p>
        </div>
        <ChevronRight
          className={`w-4 h-4 flex-shrink-0 transition-transform ${
            selected ? `rotate-90 ${agent.color}` : 'text-slate-700'
          }`}
        />
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────
   AGENT DETAIL PANEL
───────────────────────────────────────────────────────── */
function AgentDetail({ agent }: { agent: Agent }) {
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);

  useEffect(() => {
    setRunning(false);
    setRan(false);
  }, [agent.id]);

  function handleRun() {
    setRan(false);
    setRunning(true);
    const duration = agent.liveLog.length * 800 + 800;
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, duration);
  }

  return (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
    >
      {/* Header */}
      <div
        className={`p-6 rounded-2xl border ${agent.borderColor} bg-gradient-to-br ${agent.bgColor} to-transparent`}
        style={{ boxShadow: `0 0 40px -8px ${agent.glowColor}` }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl border ${agent.borderColor} bg-black/40 flex items-center justify-center`}
              style={{ boxShadow: `0 0 24px -4px ${agent.glowColor}` }}
            >
              <span className={`${agent.color} scale-125`}>{agent.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${agent.borderColor} ${agent.color}`}>
                  {agent.category}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{agent.role}</p>
            </div>
          </div>
          <button
            onClick={handleRun}
            disabled={running}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${
              running
                ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                : ran
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            {running ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Running…
              </>
            ) : ran ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Run Again
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Agent
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{agent.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {agent.metrics.map((m) => (
            <div
              key={m.label}
              className="p-3 rounded-xl bg-black/30 border border-white/5 text-center"
            >
              <p className={`text-xl font-bold font-mono ${agent.color}`}>{m.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Triggers */}
      <div className="p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
          ⚡ Triggers
        </p>
        <div className="flex flex-wrap gap-2">
          {agent.triggers.map((t) => (
            <span
              key={t.label}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] ${agent.color}`}
            >
              {t.icon}
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Workflow steps */}
      <div className="p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
          ⚙ Workflow
        </p>
        <div className="space-y-2">
          {agent.steps.map((s, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0 ${agent.borderColor} ${agent.color}`}
                >
                  {i + 1}
                </div>
                {i < agent.steps.length - 1 && (
                  <div className="w-px flex-1 bg-white/5 mt-1" />
                )}
              </div>
              <div className="pb-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{s.action}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills + Integrations */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
            Skills
          </p>
          <ul className="space-y-1.5">
            {agent.skills.map((s) => (
              <li key={s} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className={`w-3 h-3 ${agent.color} flex-shrink-0`} />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
            Integrations
          </p>
          <div className="flex flex-wrap gap-1.5">
            {agent.integrations.map((int) => (
              <span
                key={int}
                className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/8 text-slate-400 font-mono"
              >
                {int}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Live Terminal */}
      <LiveTerminal agent={agent} running={running} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────── */
export function Agents() {
  const [selectedId, setSelectedId] = useState<string>(AGENTS[0].id);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAgents =
    activeCategory === 'All'
      ? AGENTS
      : AGENTS.filter((a) => a.category === activeCategory);

  const selectedAgent = AGENTS.find((a) => a.id === selectedId) ?? AGENTS[0];

  function handleSelect(id: string) {
    setSelectedId(id);
  }

  return (
    <section
      id="agents"
      className="relative py-28 px-6 lg:px-12 bg-[#050508] overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-violet-600/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Lindy AI badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/25 bg-violet-500/8 mb-6">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-violet-300 tracking-wide">
              Powered by Lindy AI · Best for Custom AI Agent Employees
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                Your workforce,{' '}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  automated.
                </span>
              </h2>
              <p className="text-slate-400 text-lg mt-4 max-w-2xl leading-relaxed">
                Deploy AI agent employees that handle real business functions —
                sales, support, research, scheduling, engineering, analytics —
                each running autonomously 24/7 on your own infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
              {[
                { icon: <Bot className="w-4 h-4" />, label: '6 Agent types' },
                { icon: <Zap className="w-4 h-4" />, label: 'Event-driven' },
                { icon: <Lock className="w-4 h-4" />, label: 'Self-hosted' },
                { icon: <Cpu className="w-4 h-4" />, label: 'Audit-logged' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/8 bg-white/[0.03] text-xs text-slate-400"
                >
                  <span className="text-violet-400">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (cat !== 'All') {
                  const first = AGENTS.find((a) => a.category === cat);
                  if (first) setSelectedId(first.id);
                } else {
                  setSelectedId(AGENTS[0].id);
                }
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Main split layout ── */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Left: agent cards list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  selected={selectedId === agent.id}
                  onSelect={handleSelect}
                />
              ))}
            </AnimatePresence>

            {filteredAgents.length === 0 && (
              <div className="p-8 text-center text-slate-600">
                No agents in this category
              </div>
            )}
          </motion.div>

          {/* Right: detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-8rem)] pr-1"
          >
            <AnimatePresence mode="wait">
              <AgentDetail key={selectedAgent.id} agent={selectedAgent} />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/8 to-fuchsia-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-bold text-xl">
              Build your own agent employee
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Define triggers, tools, memory, and guardrails in config. Deploy in
              minutes on your own VPS.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="#deploy"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-violet-100 transition-all"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#platform"
              className="px-6 py-3 border border-white/15 rounded-xl font-medium text-sm text-white hover:bg-white/5 transition-all"
            >
              View Docs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
