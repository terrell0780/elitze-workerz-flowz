import { AIEmployee, ExecutiveAI, PricingTier, Department } from '../types';

export const executiveAIs: ExecutiveAI[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    role: 'Strategic Intelligence Consultant',
    description: 'Advanced reasoning and strategic planning. The brain behind complex decision-making, analysis, LangGraph flow design, and creative problem-solving.',
    capabilities: [
      'Strategic Planning',
      'Complex Analysis',
      'Creative Problem Solving',
      'Research & Synthesis',
      'Communication Strategy'
    ],
    icon: 'brain'
  },
  {
    id: 'lindy',
    name: 'Lindy',
    provider: 'Lindy AI',
    role: 'Frontline Agent & Operations Consultant',
    description: 'Intelligent human-facing orchestration for chat, email, CRM, and document tasks. Lindy coordinates customer conversations and operational follow-through with precision.',
    capabilities: [
      'Workflow Orchestration',
      'Customer Operations',
      'Process Automation',
      'Calendar Management',
      'Email Intelligence'
    ],
    icon: 'workflow'
  },
  {
    id: 'hermes',
    name: 'Hermes',
    provider: 'Hermes AI',
    role: 'Autonomous Execution Consultant',
    description: 'Persistent autonomous agents that execute tasks end-to-end. Hermes turns LangGraph plans into real execution without supervision.',
    capabilities: [
      'Autonomous Task Execution',
      'Persistent Memory',
      'Tool Integration',
      'Multi-step Workflows',
      'Real-time Adaptation'
    ],
    icon: 'execute'
  }
];

const departmentNames = [
  'Customer Support',
  'Sales',
  'Operations',
  'Administration',
  'Marketing',
  'Finance',
  'HR',
  'Engineering'
];

const roles: Record<string, string[]> = {
  'Customer Support': ['Support Agent', 'Technical Support', 'Success Manager', 'Onboarding Specialist', 'Help Desk'],
  'Sales': ['Sales Representative', 'Account Executive', 'Lead Qualifier', 'SDR Agent', 'Closing Agent'],
  'Operations': ['Operations Manager', 'Project Coordinator', 'Process Optimizer', 'Logistics Agent', 'Quality Assurance'],
  'Administration': ['Executive Assistant', 'Data Entry Specialist', 'Document Processor', 'Scheduler', 'Administrative Coordinator'],
  'Marketing': ['Content Creator', 'SEO Specialist', 'Social Media Manager', 'Campaign Manager', 'Analytics Agent'],
  'Finance': ['Financial Analyst', 'Bookkeeper', 'Invoice Processor', 'Budget Tracker', 'Compliance Monitor'],
  'HR': ['Recruiter', 'Onboarding Agent', 'Benefits Coordinator', 'Employee Relations', 'Training Specialist'],
  'Engineering': ['Code Reviewer', 'DevOps Agent', 'QA Tester', 'Documentation Writer', 'Integration Specialist']
};

const employeeCapabilities: Record<string, string[]> = {
  'Customer Support': ['24/7 Availability', 'Multi-language', 'Ticket Management', 'Live Chat', 'Knowledge Base'],
  'Sales': ['Lead Scoring', 'CRM Integration', 'Email Sequences', 'Call Scheduling', 'Pipeline Management'],
  'Operations': ['Workflow Automation', 'Reporting', 'Resource Allocation', 'Deadline Tracking', 'Process Documentation'],
  'Administration': ['Calendar Management', 'Email Handling', 'Document Creation', 'Data Organization', 'Meeting Coordination'],
  'Marketing': ['Content Generation', 'SEO Optimization', 'Analytics Tracking', 'A/B Testing', 'Campaign Analytics'],
  'Finance': ['Invoice Processing', 'Reconciliation', 'Budget Forecasting', 'Expense Tracking', 'Financial Reporting'],
  'HR': ['Resume Screening', 'Interview Scheduling', 'Onboarding Flows', 'Policy Compliance', 'Performance Tracking'],
  'Engineering': ['Code Review', 'CI/CD Integration', 'Test Automation', 'Documentation', 'API Integration']
};

const avatarColors = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-green-500 to-emerald-400',
  'from-orange-500 to-amber-400',
  'from-red-500 to-rose-400',
  'from-indigo-500 to-violet-400',
  'from-teal-500 to-cyan-400',
  'from-fuchsia-500 to-pink-400'
];

function generateEmployeeId(index: number): string {
  return `EMP-${String(index).padStart(4, '0')}`;
}

function generateEmployeeName(index: number): string {
  const prefixes = ['Nova', 'Orion', 'Atlas', 'Echo', 'Pulse', 'Vertex', 'Nexus', 'Cipher', 'Axiom', 'Prism'];
  const suffixes = ['Pro', 'Plus', 'Elite', 'Prime', 'Core', 'Edge', 'Flow', 'Sync', 'Link', 'Hub'];
  
  const prefix = prefixes[index % prefixes.length];
  const suffix = suffixes[Math.floor(index / prefixes.length) % suffixes.length];
  
  return `${prefix} ${suffix}`;
}

export function generateEmployees(): AIEmployee[] {
  const employees: AIEmployee[] = [];
  let index = 1;
  const totalEmployees = 1000;
  
  for (const deptName of departmentNames) {
    const deptRoles = roles[deptName];
    const deptCapabilities = employeeCapabilities[deptName];
    const colorIndex = departmentNames.indexOf(deptName);
    
    for (let i = 0; i < Math.ceil(totalEmployees / departmentNames.length); i++) {
      if (employees.length >= totalEmployees) break;
      
      const role = deptRoles[i % deptRoles.length];
      const dailyRate = 39.99 + (Math.floor(index / 10) % 6) * 10;
      const ownershipPrice = Math.floor(dailyRate * 20 + Math.random() * 500);
      
      employees.push({
        id: generateEmployeeId(index),
        name: generateEmployeeName(index),
        role,
        department: deptName,
        description: `LangGraph-orchestrated ${role.toLowerCase()} trained for ${deptName.toLowerCase()} operations, supervised by Lindy and executed by Hermes.`,
        capabilities: ['LangGraph orchestration', ...deptCapabilities].slice(0, 4 + (index % 2)),
        dailyRate,
        ownershipPrice,
        deployed: Math.floor(Math.random() * 500) + 50,
        rating: 4.5 + Math.random() * 0.5,
        avatar: avatarColors[colorIndex],
        status: index % 20 === 0 ? 'enterprise-only' : index % 7 === 0 ? 'busy' : 'available'
      });
      
      index++;
    }
  }
  
  return employees;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'rental',
    name: 'Employee Rental',
    description: 'Deploy AI employees on-demand for daily operations',
    price: '$39.99',
    priceDetail: 'per employee / day',
    features: [
      'Access to 1,000 AI employees',
      'Daily operational deployment',
      'Executive layer supervision',
      'Real-time task monitoring',
      'Performance analytics',
      '24/7 availability'
    ],
    cta: 'Start Renting'
  },
  {
    id: 'ownership',
    name: 'Employee Ownership',
    description: 'Permanently own and customize your AI workforce',
    price: '$199.99',
    priceDetail: 'starting price / permanent',
    features: [
      'Permanent deployment rights',
      'Full customization access',
      'Private instance option',
      'Priority executive support',
      'Training & fine-tuning',
      'White-label available'
    ],
    highlighted: true,
    cta: 'Explore Ownership'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Contracts',
    description: 'Custom infrastructure for large-scale operations',
    price: 'Custom',
    priceDetail: 'tailored to your needs',
    features: [
      'Unlimited employee deployment',
      'Private infrastructure',
      'Dedicated executive layer',
      'Custom integration',
      'SLA guarantees',
      'White-label licensing'
    ],
    cta: 'Contact Sales'
  }
];

export const departments: Department[] = [
  { id: 'customer-support', name: 'Customer Support', icon: '🎧', employeeCount: 125, description: '24/7 support agents, technical specialists, and success managers' },
  { id: 'sales', name: 'Sales', icon: '📈', employeeCount: 125, description: 'Lead qualifiers, closers, and revenue operations specialists' },
  { id: 'operations', name: 'Operations', icon: '⚙️', employeeCount: 125, description: 'Process optimizers, coordinators, and logistics agents' },
  { id: 'administration', name: 'Administration', icon: '📋', employeeCount: 125, description: 'Executive assistants, schedulers, and document processors' },
  { id: 'marketing', name: 'Marketing', icon: '🚀', employeeCount: 125, description: 'Content creators, SEO specialists, and campaign managers' },
  { id: 'finance', name: 'Finance', icon: '💰', employeeCount: 125, description: 'Financial analysts, bookkeepers, and compliance monitors' },
  { id: 'hr', name: 'Human Resources', icon: '👥', employeeCount: 125, description: 'Recruiters, onboarding agents, and training specialists' },
  { id: 'engineering', name: 'Engineering', icon: '💻', employeeCount: 125, description: 'Code reviewers, DevOps agents, and integration specialists' }
];

export const stats = [
  { label: 'AI Employees', value: '1,000', suffix: '' },
  { label: 'Departments', value: '8', suffix: '' },
  { label: 'Deployments', value: '50K+', suffix: '' },
  { label: 'Enterprises', value: '200+', suffix: '' }
];
