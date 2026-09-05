import { PageId } from '../store/router';

export interface PageMeta {
  title: string;
  description: string;
  crumb: string;
}

export const PAGE_META: Record<PageId, PageMeta> = {
  home: {
    title: 'Elitze One Stop Shop | AI Staffing Agency',
    description: 'Hire, rent, or buy certified AI employees supervised by Lindy AI and managed by Hermes.',
    crumb: 'Dashboard',
  },
  agents: {
    title: 'Browse 1,000 AI Employees | Elitze',
    description: 'Explore 1,000 maxed-skill AI agents across sales, support, engineering, operations, marketing, finance, legal, HR, research, and creative.',
    crumb: 'Browse Agents',
  },
  hire: {
    title: 'Hire an AI Agent | Elitze',
    description: 'Select, configure, rent, or buy an AI employee with supervised onboarding by Lindy AI.',
    crumb: 'Hire an Agent',
  },
  orchestrator: {
    title: 'Agent Orchestrator | Elitze',
    description: 'See how Elitze decomposes, routes, coordinates, verifies, and assembles complex work across specialist AI employees.',
    crumb: 'Orchestrator',
  },
  workflow: {
    title: 'Lobster Claw Workflow | Elitze',
    description: 'Understand the task flow from customer request through Lindy AI, Hermes, worker agents, audit, and delivery.',
    crumb: 'Process Map',
  },
  behavior: {
    title: 'Behavioral Flow Engine | Elitze',
    description: 'How users naturally move from task to purchase to retention inside the staffing system.',
    crumb: 'Behavioral Flow',
  },
  'hiring-guide': {
    title: 'Lindy AI Hiring Guide | Elitze',
    description: 'Use Lindy AI for recruiting, screening, interviews, integrations, and candidate workflow automation.',
    crumb: 'Hiring Guide',
  },
  trust: {
    title: 'Trust Center | Elitze',
    description: 'Security posture, compliance roadmap, privacy controls, audit retention, and enterprise trust documentation.',
    crumb: 'Trust Center',
  },
  integrations: {
    title: 'ATS & CRM Integrations | Elitze',
    description: 'System-of-record integrations for Greenhouse, Lever, Workable, Ashby, Bullhorn, Salesforce, HubSpot, and GoHighLevel.',
    crumb: 'Integrations',
  },
  analytics: {
    title: 'Analytics Dashboard | Elitze',
    description: 'Track time-to-hire, source effectiveness, conversion rates, agent utilization, satisfaction, and retention.',
    crumb: 'Analytics',
  },
  assessments: {
    title: 'Interview & Assessment Layer | Elitze',
    description: 'Structured interviews, async video screening, skill scoring, interview kits, and scorecards for AI employee evaluation.',
    crumb: 'Assessments',
  },
  onboarding: {
    title: 'Onboarding Workflow | Elitze',
    description: 'Digital forms, document collection, credential reminders, e-signatures, and activation handoff workflows.',
    crumb: 'Onboarding',
  },
  controls: {
    title: 'Manager Override Controls | Elitze',
    description: 'Manual approval, reject and approve logs, escalation history, and system-of-record ownership clarity.',
    crumb: 'Controls',
  },
  status: {
    title: 'Status & SLA | Elitze',
    description: 'Public service health, uptime, support response targets, incident history, and SLA commitments.',
    crumb: 'Status & SLA',
  },
  research: {
    title: 'DuckDuckGo Research | Elitze',
    description: 'Open private hiring and market research queries through DuckDuckGo from the Elitze workspace.',
    crumb: 'Research',
  },
  chat: {
    title: 'Lindy AI & Hermes Chat | Elitze',
    description: 'Talk with Lindy AI for customer service and hiring support, or escalate complex questions to Hermes.',
    crumb: 'Agent Services',
  },
  'eliteze-system': {
    title: 'ELITZE Agent System | Elitze',
    description: 'Intent-driven orchestration: INPUT → Classify → Route → Generate structured assets with specialized AI agents.',
    crumb: 'ELITZE System',
  },
  checkout: {
    title: 'Checkout | Elitze',
    description: 'Complete your AI employee rental or purchase with Stripe, crypto, CDN payment link, or e-transfer.',
    crumb: 'Checkout',
  },
  compare: {
    title: 'Pricing & ROI | Elitze',
    description: 'Compare AI employee cost, speed, audit trail, and scalability against traditional hiring.',
    crumb: 'Pricing',
  },
  leaderboard: {
    title: 'Top Hiring Teams | Elitze',
    description: 'See top teams by agent adoption and digital workforce scale.',
    crumb: 'Leaderboard',
  },
  security: {
    title: 'Security & Compliance | Elitze',
    description: 'Account controls, access boundaries, payment security, and audit visibility.',
    crumb: 'Security',
  },
  faq: {
    title: 'FAQ | Elitze',
    description: 'Common questions about AI employees, Lindy AI, Hermes, pricing, onboarding, and payments.',
    crumb: 'FAQ',
  },
  ecosystem: {
    title: 'Hiring Ecosystem | Elitze',
    description: 'Lindy AI, GoHighLevel, Zapier, Asana, Trello, HireVue, eVirtualAssistants, and other hiring tools.',
    crumb: 'Ecosystem',
  },
  community: {
    title: 'Community Signals | Elitze',
    description: 'Operator and hiring insights that shape the AI staffing model.',
    crumb: 'Community',
  },
  legal: {
    title: 'Legal & Payments | Elitze',
    description: 'Terms, privacy, billing, Stripe, crypto, CDN e-transfer, and payment policy details.',
    crumb: 'Legal',
  },
  admin: {
    title: 'Admin Panel | Elitze',
    description: 'Protected administration area.',
    crumb: 'Admin',
  },
  testimonials: {
    title: 'Case Studies | Elitze',
    description: 'Customer results and implementation stories from AI employee deployments.',
    crumb: 'Case Studies',
  },
};
