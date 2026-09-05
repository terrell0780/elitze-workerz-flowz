// ── Agent Orchestrator Skill — Full Data Layer ─────────────────────────────
// Based on the completed Agent Orchestrator Skill spec:
// Break → Assign → Coordinate → Verify → Assemble
// The orchestrator NEVER solves everything itself. It routes, delegates, plans.

export type AgentType =
  | 'dev-agent'
  | 'design-agent'
  | 'data-agent'
  | 'writer-agent'
  | 'workflow-agent'
  | 'qa-agent'
  | 'deployment-agent'
  | 'integration-agent'
  | 'architecture-agent'
  | 'security-agent'
  | 'aggregator';

export type ExecutionMode = 'sequential' | 'parallel' | 'hybrid';
export type TaskStatus = 'pending' | 'running' | 'done' | 'blocked' | 'failed';

export interface OrchestratorTask {
  id: number;
  name: string;
  agent: AgentType;
  dependencies: number[];
  status: TaskStatus;
  duration: number; // estimated execution duration in milliseconds
  output?: string;
}

export interface OrchestratorPlan {
  goal: string;
  tasks: OrchestratorTask[];
  execution_mode: ExecutionMode;
  final_step: AgentType;
}

// ── Agent routing map (from spec: agent-routing-map.md) ──────────────────────
export const AGENT_ROUTING_MAP: Record<AgentType, { label: string; color: string; icon: string; desc: string }> = {
  'architecture-agent': { label: 'Architecture', color: '#6366f1', icon: '🏗️', desc: 'System design, tech stack decisions, service topology' },
  'dev-agent':          { label: 'Dev Agent',    color: '#f97316', icon: '⚙️', desc: 'Code generation, APIs, backend logic, PRs' },
  'design-agent':       { label: 'Design Agent', color: '#ec4899', icon: '🎨', desc: 'UI/UX wireframes, component design, brand consistency' },
  'data-agent':         { label: 'Data Agent',   color: '#06b6d4', icon: '📊', desc: 'Data pipelines, ingestion, transformation, analytics' },
  'writer-agent':       { label: 'Writer Agent', color: '#a855f7', icon: '✍️', desc: 'Copy, docs, content strategy, SEO articles' },
  'workflow-agent':     { label: 'Workflow Agent',color: '#10b981', icon: '🔄', desc: 'Automation flows, n8n/Zapier, scheduling' },
  'integration-agent':  { label: 'Integration',  color: '#3b82f6', icon: '🔌', desc: 'API connections, webhooks, third-party systems' },
  'qa-agent':           { label: 'QA Agent',     color: '#eab308', icon: '🔍', desc: 'Test suites, validation, regression, bug reports' },
  'deployment-agent':   { label: 'Deploy Agent', color: '#84cc16', icon: '🚀', desc: 'CI/CD pipelines, cloud infra, production release' },
  'security-agent':     { label: 'Security Agent',color: '#ef4444',icon: '🛡️', desc: 'Vulnerability scanning, compliance, access control' },
  'aggregator':         { label: 'Aggregator',   color: '#d97706', icon: '🧩', desc: 'Combines all agent outputs into a final coherent result' },
};

// ── Pre-built example plans (from spec examples) ─────────────────────────────
export const EXAMPLE_PLANS: OrchestratorPlan[] = [
  {
    goal: 'Build an AI-powered SEO dashboard with real-time analytics',
    execution_mode: 'hybrid',
    final_step: 'aggregator',
    tasks: [
      { id: 1, name: 'System architecture & API design',    agent: 'architecture-agent', dependencies: [],     status: 'pending', duration: 1800, output: 'Microservice topology defined. Redis cache + Postgres. REST + WebSocket.' },
      { id: 2, name: 'SEO ranking data ingestion pipeline', agent: 'data-agent',         dependencies: [1],    status: 'pending', duration: 2200, output: 'Connectors built for Ahrefs + Google Search Console. 15-min refresh cycle.' },
      { id: 3, name: 'Backend API + auth system',           agent: 'dev-agent',          dependencies: [1],    status: 'pending', duration: 2600, output: 'FastAPI backend deployed. JWT auth. /rankings, /traffic, /keywords endpoints.' },
      { id: 4, name: 'Dashboard UI components',             agent: 'design-agent',       dependencies: [1],    status: 'pending', duration: 2000, output: 'Figma components exported. Dark theme. Chart library: Recharts.' },
      { id: 5, name: 'Frontend React integration',          agent: 'dev-agent',          dependencies: [3, 4], status: 'pending', duration: 2400, output: 'Next.js app connected to API. WebSocket live updates running.' },
      { id: 6, name: 'Third-party tool connections',        agent: 'integration-agent',  dependencies: [3],    status: 'pending', duration: 1600, output: 'Slack alerts wired. GA4 pipeline live. Semrush API bridged.' },
      { id: 7, name: 'QA — validation & regression',        agent: 'qa-agent',           dependencies: [5, 6], status: 'pending', duration: 1400, output: 'Playwright E2E suite: 47 tests passing. 0 regressions.' },
      { id: 8, name: 'Production deployment pipeline',      agent: 'deployment-agent',   dependencies: [7],    status: 'pending', duration: 1200, output: 'GitHub Actions CI/CD. Deployed to Vercel + Railway. Uptime monitoring on.' },
      { id: 9, name: 'Final assembly & handoff report',     agent: 'aggregator',         dependencies: [8],    status: 'pending', duration: 800,  output: 'Project delivered. Full README, API docs, runbook, and Loom walkthrough.' },
    ],
  },
  {
    goal: 'Build a SaaS B2B onboarding automation system',
    execution_mode: 'sequential',
    final_step: 'aggregator',
    tasks: [
      { id: 1, name: 'Define onboarding workflow & decision tree', agent: 'architecture-agent', dependencies: [],     status: 'pending', duration: 1600 },
      { id: 2, name: 'Build email + Slack trigger sequences',       agent: 'workflow-agent',     dependencies: [1],    status: 'pending', duration: 2000 },
      { id: 3, name: 'Write onboarding copy & in-app messages',     agent: 'writer-agent',       dependencies: [1],    status: 'pending', duration: 1400 },
      { id: 4, name: 'Build CRM integration + data sync',           agent: 'integration-agent',  dependencies: [2],    status: 'pending', duration: 1800 },
      { id: 5, name: 'QA — test all trigger conditions',            agent: 'qa-agent',           dependencies: [3, 4], status: 'pending', duration: 1200 },
      { id: 6, name: 'Deploy & monitor',                            agent: 'deployment-agent',   dependencies: [5],    status: 'pending', duration: 1000 },
      { id: 7, name: 'Aggregate final deliverables',                agent: 'aggregator',         dependencies: [6],    status: 'pending', duration: 600  },
    ],
  },
  {
    goal: 'Create a full content marketing engine with SEO, social & analytics',
    execution_mode: 'parallel',
    final_step: 'aggregator',
    tasks: [
      { id: 1, name: 'Content strategy & keyword research',      agent: 'writer-agent',    dependencies: [],     status: 'pending', duration: 1400 },
      { id: 2, name: 'SEO data pipeline & rank tracking',        agent: 'data-agent',      dependencies: [1],    status: 'pending', duration: 1800 },
      { id: 3, name: 'Blog & social copy production',            agent: 'writer-agent',    dependencies: [1],    status: 'pending', duration: 1600 },
      { id: 4, name: 'Scheduling automation & publishing flows', agent: 'workflow-agent',  dependencies: [3],    status: 'pending', duration: 1400 },
      { id: 5, name: 'Analytics dashboard build',                agent: 'data-agent',      dependencies: [2],    status: 'pending', duration: 2000 },
      { id: 6, name: 'QA — content accuracy & link validation',  agent: 'qa-agent',        dependencies: [4, 5], status: 'pending', duration: 1000 },
      { id: 7, name: 'Final report & delivery',                  agent: 'aggregator',      dependencies: [6],    status: 'pending', duration: 600  },
    ],
  },
];

// ── Decision tree questions (Step 1–4 from spec) ─────────────────────────────
export interface DecisionNode {
  question: string;
  sub: string;
  yesPath: string;
  noPath: string;
}

export const DECISION_TREE: DecisionNode[] = [
  {
    question: 'Is this a single-step task?',
    sub: 'Can it be completed by one agent in one operation?',
    yesPath: 'Pass through directly to the correct specialist',
    noPath: 'Continue decomposition →',
  },
  {
    question: 'Does it require multiple skill domains?',
    sub: 'Does it span code + design + writing + data etc.?',
    yesPath: 'Multi-agent orchestration required',
    noPath: 'Single specialist agent — route directly',
  },
  {
    question: 'Does execution require ordering?',
    sub: 'Do some tasks depend on the output of others?',
    yesPath: 'Build dependency graph — sequential/hybrid execution',
    noPath: 'Parallel execution allowed — all tasks run simultaneously',
  },
  {
    question: 'Does the final output need synthesis?',
    sub: 'Must multiple agent outputs be combined into one result?',
    yesPath: 'Aggregator agent runs final assembly pass',
    noPath: 'Return raw agent outputs directly',
  },
];
