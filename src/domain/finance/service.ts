import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { AssetAccount, AssetSnapshot, Transaction } from './types';

const ACCOUNTS_KEY = 'finance_accounts';
const SNAPSHOTS_KEY = 'finance_snapshots';
const TRANSACTIONS_KEY = 'finance_transactions';

const INITIAL_ACCOUNTS: AssetAccount[] = [
  {
    id: 'acc-1',
    name: 'Vanguard VOO Index Fund',
    type: 'brokerage',
    currency: 'NGN',
    institution: 'Vanguard / Brokerage',
    currentBalance: 1200000,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'acc-2',
    name: 'PiggyVest High Yield Savings',
    type: 'savings',
    currency: 'NGN',
    institution: 'PiggyVest',
    currentBalance: 850000,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'acc-3',
    name: 'Operating Cash Reserve',
    type: 'cash',
    currency: 'NGN',
    institution: 'Commercial Bank',
    currentBalance: 400000,
    createdAt: new Date().toISOString(),
  },
];

export class FinanceService {
  static getAccounts(): AssetAccount[] {
    const accounts = StorageAdapter.getItem<AssetAccount[]>(ACCOUNTS_KEY, []);
    if (accounts.length === 0) {
      StorageAdapter.setItem(ACCOUNTS_KEY, INITIAL_ACCOUNTS);
      return INITIAL_ACCOUNTS;
    }
    return accounts;
  }

  static getSnapshots(): AssetSnapshot[] {
    return StorageAdapter.getItem<AssetSnapshot[]>(SNAPSHOTS_KEY, []);
  }

  static getTransactions(): Transaction[] {
    return StorageAdapter.getItem<Transaction[]>(TRANSACTIONS_KEY, []);
  }

  /**
   * COMPUTED Net Worth: SUM of all asset account current balances.
   */
  static computeNetWorth(): number {
    const accounts = this.getAccounts();
    return accounts.reduce((sum, acc) => sum + acc.currentBalance, 0);
  }

  static formatCurrencyNGN(amount: number): string {
    return `₦ ${amount.toLocaleString()}`;
  }

  static createAccount(account: Omit<AssetAccount, 'id' | 'createdAt'>): AssetAccount {
    const accounts = this.getAccounts();
    const newAccount: AssetAccount = {
      ...account,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    accounts.push(newAccount);
    StorageAdapter.setItem(ACCOUNTS_KEY, accounts);
    return newAccount;
  }

  static logSnapshot(accountId: string, balance: number, date: string = new Date().toISOString().split('T')[0]): AssetSnapshot {
    const accounts = this.getAccounts();
    const account = accounts.find((a) => a.id === accountId);
    if (!account) throw new Error('Account not found');

    account.currentBalance = balance;
    StorageAdapter.setItem(ACCOUNTS_KEY, accounts);

    const snapshots = this.getSnapshots();
    const snapshot: AssetSnapshot = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      accountId,
      date,
      balance,
    };

    snapshots.unshift(snapshot);
    StorageAdapter.setItem(SNAPSHOTS_KEY, snapshots);
    return snapshot;
  }

  static createTransaction(tx: Omit<Transaction, 'id'>): Transaction {
    const transactions = this.getTransactions();
    const newTx: Transaction = {
      ...tx,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
    };

    transactions.unshift(newTx);
    StorageAdapter.setItem(TRANSACTIONS_KEY, transactions);

    eventBus.emit('transaction.created', {
      transactionId: newTx.id,
      type: newTx.type,
      amount: newTx.amount,
    });

    return newTx;
  }
}
