export type AgentCategory =
  | 'Sales'
  | 'Support'
  | 'Engineering'
  | 'Operations'
  | 'Marketing'
  | 'Finance'
  | 'Legal'
  | 'HR'
  | 'Research'
  | 'Creative';

export interface Agent {
  id: string;
  name: string;
  title: string;
  category: AgentCategory;
  avatar: string; // initials
  color: string;  // gradient
  bio: string;
  skills: string[];
  languages: string[];
  rating: number;
  tasksCompleted: number;
  availability: 'Available' | 'Busy' | 'On Task';
  certifications: string[];
  responseTime: string;
  rentPerDay: number;   // always 49.99
  buyPrice: number;     // always 399 (1 unit)
}

// 1,000 certified agents — we display a rich catalog of 24 featured ones
// with realistic personas across every category
export const AGENTS: Agent[] = [
  // ── SALES ──
  {
    id: 'ag-001', name: 'Aria V.', title: 'SDR — Outbound Sales', category: 'Sales',
    avatar: 'AV', color: 'from-violet-500 to-purple-600',
    bio: 'Qualifies inbound leads, runs 6-touch email sequences, syncs every interaction to your CRM in real time.',
    skills: ['Lead scoring', 'Cold outreach', 'HubSpot', 'Salesforce', 'A/B subject lines'],
    languages: ['English', 'Spanish'],
    rating: 4.9, tasksCompleted: 12840, availability: 'Available',
    certifications: ['Hermes AI Certified', 'HubSpot Sales Pro', 'GPT-5 Reasoning'],
    responseTime: '< 30 sec', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-002', name: 'Max R.', title: 'Account Executive Agent', category: 'Sales',
    avatar: 'MR', color: 'from-blue-500 to-indigo-600',
    bio: 'Handles discovery calls, prepares proposals, manages the deal room, and pushes pipeline forward autonomously.',
    skills: ['Deal management', 'Proposal writing', 'Pipedrive', 'DocuSign', 'Forecasting'],
    languages: ['English', 'French'],
    rating: 4.8, tasksCompleted: 9210, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Salesforce AE', 'Lindy Verified'],
    responseTime: '< 45 sec', rentPerDay: 35, buyPrice: 450,
  },
  // ── SUPPORT ──
  {
    id: 'ag-003', name: 'Lena C.', title: 'Customer Success Agent', category: 'Support',
    avatar: 'LC', color: 'from-emerald-500 to-teal-600',
    bio: 'Triages tickets, drafts replies, resolves tier-1 issues, escalates complex cases to humans with full context.',
    skills: ['Zendesk', 'Intercom', 'Sentiment analysis', 'CSAT tracking', 'Escalation routing'],
    languages: ['English', 'German', 'Spanish'],
    rating: 4.9, tasksCompleted: 28400, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Lindy Verified', 'ITIL Foundation'],
    responseTime: '< 15 sec', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-004', name: 'Omar S.', title: 'Live Chat Support Agent', category: 'Support',
    avatar: 'OS', color: 'from-cyan-500 to-blue-600',
    bio: 'Handles live chat 24/7 across Intercom, Drift, and Zendesk. Resolves 85% of issues without escalation.',
    skills: ['Live chat', 'FAQ automation', 'Drift', 'Intercom', 'Resolution scripts'],
    languages: ['English', 'Arabic', 'French'],
    rating: 4.7, tasksCompleted: 44200, availability: 'On Task',
    certifications: ['Hermes AI Certified', 'Zendesk Expert'],
    responseTime: '< 8 sec', rentPerDay: 35, buyPrice: 450,
  },
  // ── ENGINEERING ──
  {
    id: 'ag-005', name: 'Dev X1', title: 'Full-Stack Dev Agent', category: 'Engineering',
    avatar: 'DX', color: 'from-orange-500 to-red-600',
    bio: 'Writes production code, opens PRs, runs tests, fixes CI pipelines. Operates under human review gate.',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GitHub Actions'],
    languages: ['English'],
    rating: 4.8, tasksCompleted: 6720, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Devin-class Verified', 'OpenRouter Pro'],
    responseTime: '< 2 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-006', name: 'Kai P.', title: 'QA Automation Agent', category: 'Engineering',
    avatar: 'KP', color: 'from-yellow-500 to-orange-500',
    bio: 'Writes and runs E2E test suites, reports failures with reproduction steps, and monitors regression on every deploy.',
    skills: ['Playwright', 'Jest', 'Cypress', 'CI/CD', 'Bug reporting'],
    languages: ['English', 'Japanese'],
    rating: 4.9, tasksCompleted: 8100, availability: 'Available',
    certifications: ['Hermes AI Certified', 'ISTQB Aligned'],
    responseTime: '< 1 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── OPERATIONS ──
  {
    id: 'ag-007', name: 'Lindy A.', title: 'Executive Assistant Agent', category: 'Operations',
    avatar: 'LA', color: 'from-pink-500 to-rose-600',
    bio: 'Manages calendars, books meetings, summarises calls, chases deliverables, and handles executive inbox triage.',
    skills: ['Google Calendar', 'Notion', 'Slack', 'Meeting summaries', 'Email triage'],
    languages: ['English', 'Spanish', 'Portuguese'],
    rating: 4.9, tasksCompleted: 31000, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Lindy EA Pro', 'GPT-5 Reasoning'],
    responseTime: '< 20 sec', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-008', name: 'Sam W.', title: 'Project Manager Agent', category: 'Operations',
    avatar: 'SW', color: 'from-indigo-500 to-blue-600',
    bio: 'Tracks sprints, updates Jira, flags blockers, runs standups, and delivers weekly progress reports automatically.',
    skills: ['Jira', 'Asana', 'Notion', 'Sprint planning', 'Risk flagging'],
    languages: ['English', 'Hindi'],
    rating: 4.7, tasksCompleted: 5900, availability: 'Available',
    certifications: ['Hermes AI Certified', 'PMP-Aligned'],
    responseTime: '< 1 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── MARKETING ──
  {
    id: 'ag-009', name: 'Nova M.', title: 'Content Marketing Agent', category: 'Marketing',
    avatar: 'NM', color: 'from-fuchsia-500 to-pink-600',
    bio: 'Researches keywords, drafts SEO articles, writes social copy, and schedules across all channels on autopilot.',
    skills: ['SEO writing', 'Ahrefs', 'Buffer', 'Blog drafts', 'Social copy'],
    languages: ['English', 'Spanish'],
    rating: 4.8, tasksCompleted: 14200, availability: 'Available',
    certifications: ['Hermes AI Certified', 'HubSpot Content'],
    responseTime: '< 3 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-010', name: 'Echo A.', title: 'Paid Ads Agent', category: 'Marketing',
    avatar: 'EA', color: 'from-amber-500 to-yellow-600',
    bio: 'Manages Google and Meta ad campaigns, A/B tests creatives, adjusts bids, and reports ROAS daily.',
    skills: ['Google Ads', 'Meta Ads', 'A/B testing', 'ROAS optimization', 'Campaign analytics'],
    languages: ['English', 'French'],
    rating: 4.6, tasksCompleted: 3200, availability: 'Busy',
    certifications: ['Hermes AI Certified', 'Google Ads Certified'],
    responseTime: '< 5 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── FINANCE ──
  {
    id: 'ag-011', name: 'Fenn B.', title: 'Bookkeeping Agent', category: 'Finance',
    avatar: 'FB', color: 'from-green-500 to-emerald-600',
    bio: 'Reconciles transactions, categorises expenses, prepares monthly P&L summaries, and flags anomalies.',
    skills: ['QuickBooks', 'Xero', 'Reconciliation', 'Expense tracking', 'P&L reporting'],
    languages: ['English'],
    rating: 4.9, tasksCompleted: 7800, availability: 'Available',
    certifications: ['Hermes AI Certified', 'QuickBooks ProAdvisor'],
    responseTime: '< 2 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-012', name: 'Vera L.', title: 'Financial Analyst Agent', category: 'Finance',
    avatar: 'VL', color: 'from-teal-500 to-cyan-600',
    bio: 'Builds financial models, runs scenario analysis, and delivers board-ready dashboards on a weekly cadence.',
    skills: ['Excel modeling', 'Tableau', 'Scenario analysis', 'Board reporting', 'Forecasting'],
    languages: ['English', 'Mandarin'],
    rating: 4.8, tasksCompleted: 2100, availability: 'Available',
    certifications: ['Hermes AI Certified', 'CFA Level 1 Aligned'],
    responseTime: '< 10 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── LEGAL ──
  {
    id: 'ag-013', name: 'Lex D.', title: 'Contract Review Agent', category: 'Legal',
    avatar: 'LD', color: 'from-slate-500 to-gray-600',
    bio: 'Reviews NDAs, SaaS agreements, and vendor contracts. Flags risk clauses, suggests redlines, never advises.',
    skills: ['NDA review', 'SaaS contracts', 'Risk flagging', 'Redlining', 'Clause extraction'],
    languages: ['English'],
    rating: 4.7, tasksCompleted: 1850, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Legal AI Verified'],
    responseTime: '< 15 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── HR ──
  {
    id: 'ag-014', name: 'Rosa H.', title: 'Recruiter Agent', category: 'HR',
    avatar: 'RH', color: 'from-rose-500 to-pink-600',
    bio: 'Sources candidates from LinkedIn, GitHub, and Arc.dev. Screens resumes, schedules interviews, sends offers.',
    skills: ['LinkedIn sourcing', 'GitHub talent', 'ATS management', 'Interview scheduling', 'Offer letters'],
    languages: ['English', 'Spanish'],
    rating: 4.8, tasksCompleted: 3400, availability: 'Available',
    certifications: ['Hermes AI Certified', 'SHRM Aligned'],
    responseTime: '< 2 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── RESEARCH ──
  {
    id: 'ag-015', name: 'Scout R.', title: 'Market Research Agent', category: 'Research',
    avatar: 'SR', color: 'from-blue-500 to-violet-600',
    bio: 'Maps markets, benchmarks competitors, tracks news mentions, and delivers structured intelligence briefs weekly.',
    skills: ['Competitor mapping', 'Web scraping', 'News monitoring', 'Report writing', 'SWOT analysis'],
    languages: ['English', 'German'],
    rating: 4.9, tasksCompleted: 6200, availability: 'Available',
    certifications: ['Hermes AI Certified', 'OpenRouter Pro'],
    responseTime: '< 5 min', rentPerDay: 35, buyPrice: 450,
  },
  // ── CREATIVE ──
  {
    id: 'ag-016', name: 'Iris C.', title: 'Visual Design Agent', category: 'Creative',
    avatar: 'IC', color: 'from-fuchsia-500 to-violet-600',
    bio: 'Creates social graphics, decks, and brand assets using Figma and Canva. Consistent with your brand kit.',
    skills: ['Figma', 'Canva', 'Brand design', 'Social graphics', 'Deck design'],
    languages: ['English', 'Portuguese'],
    rating: 4.7, tasksCompleted: 4100, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Figma Expert'],
    responseTime: '< 10 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-017', name: 'Reel V.', title: 'Video Script Agent', category: 'Creative',
    avatar: 'RV', color: 'from-red-500 to-rose-600',
    bio: 'Writes YouTube, TikTok, and ad scripts. Hooks, retention arcs, CTAs — tailored to your audience.',
    skills: ['YouTube scripts', 'TikTok hooks', 'Ad copywriting', 'Retention optimization', 'SEO titles'],
    languages: ['English', 'Spanish'],
    rating: 4.8, tasksCompleted: 2900, availability: 'Available',
    certifications: ['Hermes AI Certified'],
    responseTime: '< 5 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-018', name: 'Flux D.', title: 'Data Analyst Agent', category: 'Research',
    avatar: 'FD', color: 'from-cyan-500 to-teal-600',
    bio: 'Cleans datasets, runs SQL queries, builds Looker dashboards, and answers data questions in plain English.',
    skills: ['SQL', 'Python', 'Looker', 'Data cleaning', 'Dashboard building'],
    languages: ['English'],
    rating: 4.9, tasksCompleted: 5600, availability: 'Available',
    certifications: ['Hermes AI Certified', 'dbt Certified'],
    responseTime: '< 3 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-019', name: 'Pulse P.', title: 'PR & Comms Agent', category: 'Marketing',
    avatar: 'PP', color: 'from-indigo-500 to-violet-600',
    bio: 'Writes press releases, monitors media mentions, drafts executive thought-leadership, pitches journalists.',
    skills: ['Press releases', 'Media monitoring', 'Thought leadership', 'Journalist outreach', 'Crisis comms'],
    languages: ['English', 'French'],
    rating: 4.6, tasksCompleted: 1400, availability: 'Available',
    certifications: ['Hermes AI Certified'],
    responseTime: '< 8 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-020', name: 'Ops Z.', title: 'DevOps & Infra Agent', category: 'Engineering',
    avatar: 'OZ', color: 'from-orange-500 to-amber-600',
    bio: 'Manages cloud infra, monitors uptime, runs deployments, auto-scales resources, and alerts on anomalies.',
    skills: ['AWS', 'Docker', 'Terraform', 'CI/CD', 'Uptime monitoring'],
    languages: ['English'],
    rating: 4.8, tasksCompleted: 4300, availability: 'Available',
    certifications: ['Hermes AI Certified', 'AWS Solutions Architect'],
    responseTime: '< 1 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-021', name: 'Trust S.', title: 'Compliance & Audit Agent', category: 'Legal',
    avatar: 'TS', color: 'from-green-500 to-teal-600',
    bio: 'Monitors regulatory changes, runs internal audit logs, flags compliance gaps, prepares SOC2 evidence packages.',
    skills: ['SOC2', 'GDPR', 'Audit logging', 'Policy review', 'Risk assessment'],
    languages: ['English', 'German'],
    rating: 4.9, tasksCompleted: 980, availability: 'Available',
    certifications: ['Hermes AI Certified', 'ISO 27001 Aligned'],
    responseTime: '< 5 min', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-022', name: 'Onboard F.', title: 'Employee Onboarding Agent', category: 'HR',
    avatar: 'OF', color: 'from-sky-500 to-blue-600',
    bio: 'Guides new hires through onboarding checklists, sends welcome kits, books intro calls, and tracks completion.',
    skills: ['Onboarding flows', 'Notion', 'Slack automation', 'Task tracking', 'HR systems'],
    languages: ['English', 'Spanish'],
    rating: 4.7, tasksCompleted: 2200, availability: 'Available',
    certifications: ['Hermes AI Certified', 'Lindy Verified'],
    responseTime: '< 30 sec', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-023', name: 'Patch N.', title: 'Cybersecurity Monitor Agent', category: 'Engineering',
    avatar: 'PN', color: 'from-red-600 to-rose-700',
    bio: 'Monitors endpoints, scans for vulnerabilities, alerts on anomalous access patterns, and patches known CVEs.',
    skills: ['Vulnerability scanning', 'SIEM monitoring', 'Patch management', 'CVE tracking', 'Incident response'],
    languages: ['English'],
    rating: 4.9, tasksCompleted: 3800, availability: 'Available',
    certifications: ['Hermes AI Certified', 'CISSP Aligned', 'SOC2 Ready'],
    responseTime: '< 30 sec', rentPerDay: 35, buyPrice: 450,
  },
  {
    id: 'ag-024', name: 'Supply C.', title: 'Supply Chain Agent', category: 'Operations',
    avatar: 'SC', color: 'from-lime-500 to-green-600',
    bio: 'Tracks inventory, monitors supplier delivery windows, flags stock-outs, and generates purchase orders.',
    skills: ['Inventory tracking', 'Supplier management', 'PO generation', 'Demand forecasting', 'ERP sync'],
    languages: ['English', 'Mandarin'],
    rating: 4.6, tasksCompleted: 1600, availability: 'Available',
    certifications: ['Hermes AI Certified', 'APICS Aligned'],
    responseTime: '< 2 min', rentPerDay: 35, buyPrice: 450,
  },
];

export const CATEGORIES: AgentCategory[] = [
  'Sales', 'Support', 'Engineering', 'Operations', 'Marketing',
  'Finance', 'Legal', 'HR', 'Research', 'Creative',
];

export function getBuyPrice(qty: number): number {
  if (qty >= 10) return 299;
  if (qty >= 5)  return 349;
  if (qty >= 3)  return 375;
  return 399;
}

export function getRentLabel(days: number): string {
  return `$${49.99 * days}`;
}
