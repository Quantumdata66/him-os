'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { TrendingUp, Sliders, FileText, Globe, Scale, ShieldCheck, Wallet, Landmark } from 'lucide-react';
import { FinanceService } from '@/domain/finance/service';
import { AssetAccount, AccountType } from '@/domain/finance/types';

export default function FinancePage() {
  const [accounts, setAccounts] = useState<AssetAccount[]>([]);
  const [netWorth, setNetWorth] = useState<number>(0);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>('brokerage');
  const [institution, setInstitution] = useState('');
  const [balance, setBalance] = useState<number>(500000);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAccounts(FinanceService.getAccounts());
    setNetWorth(FinanceService.computeNetWorth());
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    FinanceService.createAccount({
      name,
      type,
      currency: 'NGN',
      institution: institution || 'Financial Institution',
      currentBalance: balance,
    });

    setName('');
    setInstitution('');
    setShowAdd(false);
    loadData();
  };

  const handleUpdateBalance = (accountId: string, newBalance: number) => {
    FinanceService.logSnapshot(accountId, newBalance);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Financial Operating System</h1>
            <Badge variant="gold">Generic Asset Accounts (NGN ₦)</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Net worth is computed from live account balance snapshots — never hardcoded to specific platforms.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance/hedging')}>
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Currency Hedging</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance/tax')}>
            <Scale className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Tax Auditor</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance/global')}>
            <Globe className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Global Currency Map</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance/invoices')}>
            <FileText className="w-3.5 h-3.5 mr-1" />
            <span>Invoices & Billing</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance/simulator')}>
            <Sliders className="w-3.5 h-3.5 mr-1" />
            <span>Runway Simulator</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? 'Cancel' : '+ Add Asset Account'}
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Net Worth"
          value={FinanceService.formatCurrencyNGN(netWorth)}
          badgeText="Live Aggregated"
          badgeVariant="gold"
          icon={Wallet}
          trend="up"
          trendValue="+12.4%"
          subtext={`Calculated dynamically across ${accounts.length} asset accounts.`}
        />
        <MetricCard
          label="Emergency Reserve"
          value="6 Months"
          badgeText="Capital Buffer"
          badgeVariant="green"
          icon={Landmark}
          trend="up"
          trendValue="Protected"
          subtext="Liquid runway reserve allocated in yield savings."
        />
        <MetricCard
          label="Active Accounts"
          value={accounts.length}
          badgeText="Portfolio"
          badgeVariant="blue"
          icon={TrendingUp}
          trend="neutral"
          trendValue="Balanced"
          subtext="Stocks, savings, crypto, cash, and real estate."
        />
        <MetricCard
          label="Base Currency"
          value="NGN (₦)"
          badgeText="v9.0 Hedged"
          badgeVariant="purple"
          icon={Globe}
          trend="up"
          trendValue="USD/EUR Hedged"
          subtext="Multi-currency conversion engine active."
        />
      </div>

      {/* New Account Form */}
      {showAdd && (
        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Register Asset Account</h3>
          <form onSubmit={handleAddAccount} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Account Name (e.g. VOO, PiggyVest)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />
            <select
              value={type}
              onChange={(e: any) => setType(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            >
              <option value="brokerage">Brokerage / Stocks</option>
              <option value="savings">Savings / Yield</option>
              <option value="cash">Cash Reserve</option>
              <option value="crypto">Crypto</option>
              <option value="real_estate">Real Estate</option>
            </select>
            <input
              type="number"
              placeholder="Initial Balance (NGN)"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="primary" size="sm">
              Save Account
            </Button>
          </form>
        </Card>
      )}

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <Card key={acc.id} className="space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="blue" className="uppercase text-[9px]">
                  {acc.type}
                </Badge>
                <span className="text-[10px] text-gray-500">{acc.institution}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-200">{acc.name}</h3>
              <p className="text-2xl font-mono font-bold text-[#C9A84C] mt-1">
                {FinanceService.formatCurrencyNGN(acc.currentBalance)}
              </p>
            </div>

            <div className="border-t border-gray-800/80 pt-3">
              <label className="text-[10px] text-gray-500 block mb-1">Update Snapshot Balance (NGN):</label>
              <input
                type="number"
                value={acc.currentBalance}
                onChange={(e) => handleUpdateBalance(acc.id, Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-800 rounded px-2.5 py-1 text-xs text-gray-100 font-mono focus:outline-none focus:border-[#C9A84C]"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
