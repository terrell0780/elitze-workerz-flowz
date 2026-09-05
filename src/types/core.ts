import { LucideIcon } from 'lucide-react';
import { PageId } from '../store/router';

export interface AuditLog {
  id: string | number;
  userId: string;
  action: 'API_CALL' | 'TASK_EXECUTED' | 'TASK_SUCCESS' | 'TASK_FAIL' | 'SYSTEM_RECOVERY';
  resource: string;
  metadata: Record<string, unknown>;
  ip: string;
  created_at: string | Date;
}

export interface Task {
  id: string;
  type: 'github' | 'deploy' | 'email' | 'generic';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  payload: Record<string, unknown>;
  priority: number;
}

export interface SystemStats {
  activeJobs: number;
  completedJobs: number;
  failedJobs: number;
  throughput: number;
  uptime: number;
}

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
  avatar: string;
  color: string;
  bio: string;
  skills: string[];
  languages: string[];
  rating: number;
  tasksCompleted: number;
  availability: 'Available' | 'Busy' | 'On Task';
  certifications: string[];
  responseTime: string;
  rentPerDay: number;
  buyPrice: number;
}

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  badgeColor?: string;
  dividerBefore?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  color: string;
  stars: number;
  text: string;
  result: string;
}
