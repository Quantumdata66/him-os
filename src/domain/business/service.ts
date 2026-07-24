import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { Business, BusinessEntry } from './types';

const BIZ_KEY = 'businesses';
const BIZ_ENTRIES_KEY = 'business_entries';

const INITIAL_BIZ: Business[] = [
  {
    id: 'biz-1',
    name: 'Quantum Jersey',
    description: 'Premium Sportswear & Apparel Brand',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'biz-2',
    name: 'Quantum Software SaaS',
    description: 'Enterprise Operations & MLOps Infrastructure Platform',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_ENTRIES: BusinessEntry[] = [
  {
    id: 'be-1',
    businessId: 'biz-1',
    type: 'revenue',
    amount: 850000,
    category: 'Sales',
    description: 'July Jersey Batch Sales',
    date: '2026-07-20',
  },
  {
    id: 'be-2',
    businessId: 'biz-1',
    type: 'order',
    amount: 42,
    category: 'Orders',
    description: 'Total Orders Shipped',
    date: '2026-07-20',
  },
];

export class BusinessService {
  static getBusinesses(): Business[] {
    const biz = StorageAdapter.getItem<Business[]>(BIZ_KEY, []);
    if (biz.length === 0) {
      StorageAdapter.setItem(BIZ_KEY, INITIAL_BIZ);
      return INITIAL_BIZ;
    }
    return biz;
  }

  static getEntries(): BusinessEntry[] {
    const entries = StorageAdapter.getItem<BusinessEntry[]>(BIZ_ENTRIES_KEY, []);
    if (entries.length === 0) {
      StorageAdapter.setItem(BIZ_ENTRIES_KEY, INITIAL_ENTRIES);
      return INITIAL_ENTRIES;
    }
    return entries;
  }

  static getMonthlyRevenue(businessId: string): number {
    const entries = this.getEntries();
    return entries
      .filter((e) => e.businessId === businessId && e.type === 'revenue')
      .reduce((sum, e) => sum + e.amount, 0);
  }

  static createBusiness(biz: Omit<Business, 'id' | 'createdAt'>): Business {
    const list = this.getBusinesses();
    const newBiz: Business = {
      ...biz,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    list.push(newBiz);
    StorageAdapter.setItem(BIZ_KEY, list);
    return newBiz;
  }

  static logEntry(entry: Omit<BusinessEntry, 'id'>): BusinessEntry {
    const entries = this.getEntries();
    const newEntry: BusinessEntry = {
      ...entry,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
    };

    entries.unshift(newEntry);
    StorageAdapter.setItem(BIZ_ENTRIES_KEY, entries);
    return newEntry;
  }
}
