/**
 * Domain + API contract types shared by the web client and the API server.
 *
 * This module is the single source of truth for the data contract. It must stay
 * free of React / Node specific imports so both bundles can consume it.
 */

export type EmployeeStatus = 'available' | 'busy' | 'enterprise-only';

export type DeploymentStatus = 'provisioning' | 'active' | 'paused' | 'retired';

export interface AIEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  capabilities: string[];
  dailyRate: number;
  ownershipPrice: number;
  deployed: number;
  rating: number;
  avatar: string;
  status: EmployeeStatus;
}

export interface ExecutiveAI {
  id: string;
  name: string;
  provider: string;
  role: string;
  description: string;
  capabilities: string[];
  icon: 'brain' | 'workflow' | 'execute';
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  employeeCount: number;
  description: string;
}

export interface Deployment {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  dailyRate: number;
  status: DeploymentStatus;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  employee: string;
  action: string;
  createdAt: string;
}

export interface MetricsSummary {
  activeEmployees: number;
  tasksCompleted: number;
  hoursSaved: number;
  monthlySpend: number;
  totalEmployees: number;
  departments: number;
  efficiency: number;
  avgRating: number;
  recentActivity: ActivityEvent[];
}

export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface HealthResponse {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  environment: string;
  uptimeSeconds: number;
  timestamp: string;
}

export interface ReadinessResponse extends HealthResponse {
  checks: { database: 'up' | 'down' };
}

export interface AuthSuccess {
  token: string;
  expiresAt: string;
}

/** Error envelope returned by every non-2xx API response. */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
}

export interface EmployeeQuery {
  q?: string;
  department?: string;
  status?: EmployeeStatus;
  minRating?: number;
  sort?: 'name' | 'rating' | 'dailyRate' | 'deployed';
  order?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
