export type AccountType =
  | 'brokerage'
  | 'savings'
  | 'crypto'
  | 'real_estate'
  | 'cash'
  | 'retirement'
  | 'other';

export interface AssetAccount {
  id: string;
  name: string;
  type: AccountType;
  currency: string; // NGN (₦)
  institution: string;
  currentBalance: number;
  createdAt: string;
}

export interface AssetSnapshot {
  id: string;
  accountId: string;
  date: string; // YYYY-MM-DD
  balance: number;
}

export interface Transaction {
  id: string;
  accountId?: string;
  type: 'income' | 'expense' | 'transfer' | 'investment';
  amount: number;
  category: string;
  description: string;
  date: string;
}
