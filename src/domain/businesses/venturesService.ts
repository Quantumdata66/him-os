import { StorageAdapter } from '@/core/storage/localStorageAdapter';

export interface Venture {
  id: string;
  name: string;
  category: 'e-commerce' | 'saas' | 'consulting' | 'media' | 'real-estate';
  monthlyRevenue: number;
  monthlyExpenses: number;
  activeClientsCount: number;
  status: 'active' | 'scaling' | 'dormant';
  notes: string;
}

const VENTURES_KEY = 'him_os_ventures';

const INITIAL_VENTURES: Venture[] = [
  {
    id: 'v-1',
    name: 'HIM SaaS Operating System',
    category: 'saas',
    monthlyRevenue: 8500000,
    monthlyExpenses: 1200000,
    activeClientsCount: 42,
    status: 'scaling',
    notes: 'Enterprise personal productivity & AI Copilot SaaS engine.',
  },
  {
    id: 'v-2',
    name: 'Quantum Jersey E-Commerce',
    category: 'e-commerce',
    monthlyRevenue: 4200000,
    monthlyExpenses: 1800000,
    activeClientsCount: 150,
    status: 'active',
    notes: 'Premium athletic apparel & customization store.',
  },
  {
    id: 'v-3',
    name: 'Cloud & MLOps Architecture Advisory',
    category: 'consulting',
    monthlyRevenue: 12000000,
    monthlyExpenses: 2000000,
    activeClientsCount: 6,
    status: 'active',
    notes: 'High-availability backend & microservice architecture consulting.',
  },
];

export class VentureService {
  static getVentures(): Venture[] {
    const data = StorageAdapter.getItem<Venture[]>(VENTURES_KEY, []);
    if (data.length === 0) {
      StorageAdapter.setItem(VENTURES_KEY, INITIAL_VENTURES);
      return INITIAL_VENTURES;
    }
    return data;
  }

  static addVenture(venture: Omit<Venture, 'id'>): Venture {
    const list = this.getVentures();
    const newVenture: Venture = {
      ...venture,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
    };
    list.unshift(newVenture);
    StorageAdapter.setItem(VENTURES_KEY, list);
    return newVenture;
  }

  static computePortfolioTotals() {
    const ventures = this.getVentures();
    const totalRevenue = ventures.reduce((acc, v) => acc + v.monthlyRevenue, 0);
    const totalExpenses = ventures.reduce((acc, v) => acc + v.monthlyExpenses, 0);
    const netProfit = totalRevenue - totalExpenses;
    const marginPct = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      marginPct,
      ventureCount: ventures.length,
    };
  }
}
