export interface Business {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'closed';
  createdAt: string;
}

export interface BusinessEntry {
  id: string;
  businessId: string;
  type: 'revenue' | 'expense' | 'order';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface BusinessKPI {
  id: string;
  businessId: string;
  name: string;
  value: number;
  date: string;
}
