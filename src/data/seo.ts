export interface PageSEO {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string; active?: boolean }[];
  keywords: string;
}

export const pageSEO: Record<string, PageSEO> = {
  dashboard: {
    title: 'Dashboard — WorkerzNow',
    description: 'Monitor your AI workforce performance, track deployments, and manage your autonomous business operating system (ABOS) from the WorkerzNow command center.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Dashboard', active: true }],
    keywords: 'WorkerzNow, AI workforce dashboard, AI employee management, workforce monitoring, ABOS dashboard, agentic control'
  },
  chat: {
    title: 'Command Center — ChatGPT 5.5, Lindy & Hermes Chat | WorkerzNow',
    description: 'Operate your workforce using the WorkerzNow Command Center. Full Claude/ChatGPT-style threaded chat system with models ChatGPT 5.5, Lindy AI, and Hermes AI, featuring LangGraph tool execution and automation dispatch.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Command Center', active: true }],
    keywords: 'AI chat system, Hermes chat, Lindy chat, ChatGPT 5.5, conversational command center, AI assistant, chat GPT, Claude style chat'
  },
  'lindy-tools': {
    title: 'Lindy Workbench — Agentic Workflows & Workspace Tools | WorkerzNow',
    description: 'Access the Lindy AI Tools Workbench on WorkerzNow. Leverage agentic workflows, email automation, Google Docs creation, CRM syncing, and calendar booking managed by frontline AI.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Lindy Tools', active: true }],
    keywords: 'Lindy AI tools, agentic workflows, email automation, Google Workspace, CRM sync, document automation, augmented workflows'
  },
  employees: {
    title: 'AI Employees — Browse 1,000 Deployable Workers | WorkerzNow',
    description: 'Browse and hire from a roster of 1,000 specialized AI employees on WorkerzNow. Filter across 8 operational departments: customer support, sales, marketing, operations, engineering, finance, and HR.',
    breadcrumbs: [{ label: 'Home' }, { label: 'AI Employees', active: true }],
    keywords: 'WorkerzNow employees, deployable AI workers, AI staffing agency, digital workforce, AI recruitment, 1,000 AI employees, LangGraph agents'
  },
  deploy: {
    title: 'Deploy AI Employee — Hire Workers in 3 Steps | WorkerzNow',
    description: 'Deploy a new autonomous AI employee to your operational pipelines in 3 simple steps on WorkerzNow. Receive recommendations based on real-time business needs.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Deploy', active: true }],
    keywords: 'deploy AI employee, AI workforce deployment, hire AI worker, autonomous employee, hiring agency'
  },
  workflows: {
    title: 'Workflows — LangGraph & n8n Automations | WorkerzNow',
    description: 'Create, manage, and monitor automated workflows across your AI workforce on WorkerzNow. Orchestrate multi-step, stateful processes with LangGraph and n8n.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Workflows', active: true }],
    keywords: 'AI workflows, workflow automation, AI orchestration, LangGraph, n8n automation, agentic pipelines'
  },
  analytics: {
    title: 'Analytics — Workforce Performance & Success | WorkerzNow',
    description: 'Track your AI workforce ROI with real-time WorkerzNow analytics. Monitor tasks completed, response latency, customer satisfaction, and cost per task.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Analytics', active: true }],
    keywords: 'AI workforce analytics, performance metrics, AI employee KPIs, workforce dashboard, ROI tracker'
  },
  integrations: {
    title: 'Integrations — Connect Workspace & CRMs | WorkerzNow',
    description: 'Connect your business tools directly to your WorkerzNow AI workforce. Integrate Slack, Salesforce, HubSpot, Zendesk, Jira, GitHub, Google Workspace, and Stripe.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Integrations', active: true }],
    keywords: 'AI integrations, workforce platform integrations, Slack, Salesforce, HubSpot, Zendesk, Google Workspace'
  },
  architecture: {
    title: 'System Architecture — 6-Layer AI Infrastructure | WorkerzNow',
    description: 'Explore the 6-layer architecture powering WorkerzNow: Customer Interface, Lindy AI Frontline, Orchestration Intelligence, Automation, Execution Workforce, and Data Feedback Loops.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Architecture', active: true }],
    keywords: 'AI architecture, workforce infrastructure, Lindy AI, ChatGPT, Hermes AI, ABOS architecture, LangGraph nodes'
  },
  billing: {
    title: 'Billing — Plans, Usage & Subscription | WorkerzNow',
    description: 'Manage your WorkerzNow subscription. View usage details, manage rental plans starting at $39.99/day, edit payment methods, and download past invoices.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Billing', active: true }],
    keywords: 'AI workforce pricing, subscription management, AI employee billing, enterprise pricing, rental rates'
  },
  settings: {
    title: 'Settings — Account Preferences & API | WorkerzNow',
    description: 'Configure your WorkerzNow account preferences, notification alerts, two-factor security, light/dark appearance, language parameters, and developer API keys.',
    breadcrumbs: [{ label: 'Home' }, { label: 'Settings', active: true }],
    keywords: 'AI workforce settings, account management, API keys, security settings, dark mode'
  }
};
