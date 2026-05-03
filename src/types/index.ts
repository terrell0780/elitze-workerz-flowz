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
  status: 'available' | 'busy' | 'enterprise-only';
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
