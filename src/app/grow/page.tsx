'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { TrendingUp, Wallet, Building2, Globe, Scale, ShieldCheck, FileText, ArrowUpRight, Landmark } from 'lucide-react';
import { FinanceService } from '@/domain/finance/service';

export default function GrowWorkspacePage() {
  const [netWorth, setNetWorth] = useState<number>(0);

  useEffect(() => {
    setNetWorth(FinanceService.computeNetWorth());
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Grow Workspace</h1>
            <Badge variant="gold">Capital & Venture Progress</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Multi-currency financial net worth, venture P&L, currency risk hedging, and tax compliance auditing.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance/hedging')}>
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Hedging Engine</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => window.location.assign('/finance')}>
            <Wallet className="w-3.5 h-3.5 mr-1" />
            <span>Financial OS</span>
          </Button>
        </div>
      </div>

      {/* Grow KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Net Worth"
          value={FinanceService.formatCurrencyNGN(netWorth)}
          badgeText="Live Snapshot"
          badgeVariant="gold"
          icon={Wallet}
          trend="up"
          trendValue="+12.4%"
          subtext="Aggregated from live asset balances."
        />
        <MetricCard
          label="Emergency Reserve"
          value="6 Months"
          badgeText="Capital Buffer"
          badgeVariant="green"
          icon={Landmark}
          trend="up"
          trendValue="Protected"
          subtext="Liquid cash & yield savings buffer."
        />
        <MetricCard
          label="Hedge Rating"
          value="82%"
          badgeText="v10.0 FX Hedge"
          badgeVariant="blue"
          icon={ShieldCheck}
          trend="up"
          trendValue="USD/EUR"
          subtext="Multi-currency risk mitigation."
        />
        <MetricCard
          label="Tax Status"
          value="Compliant"
          badgeText="v9.0 Tax Ops"
          badgeVariant="purple"
          icon={Scale}
          trend="neutral"
          trendValue="Audit Ready"
          subtext="Nigeria FIRS & US IRS compliance."
        />
      </div>

      {/* Grow Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial OS */}
        <Card goldBorder className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                <Wallet className="w-5 h-5" />
              </div>
              <Badge variant="gold">Financial Hub</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Financial Operating System</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Manage generic asset accounts (Stocks, Savings, Crypto, Cash, Real Estate) and log balance snapshots.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/finance')}>
            <span>Open Financial OS</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Multi-Tenant Venture Hub */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <Badge variant="blue">v8.0 Ventures</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Multi-Tenant Venture Hub</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Monitor venture P&L, monthly recurring revenue (MRR), and profit margin unit economics.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/businesses/ventures')}>
            <span>Open Venture Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Currency Hedging & Risk Engine */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <Badge variant="purple">v10.0 FX Engine</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Currency Hedging & FX Engine</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Foreign exchange risk mitigation, inflation protection metrics, and target asset allocation for USD, EUR, and GBP.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/finance/hedging')}>
            <span>Open Currency Hedging</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Invoices & Billing */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <Badge variant="green">v8.0 Billing</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Invoices & Client Billing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generate client proposals, log payments, and export printable professional invoices.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/finance/invoices')}>
            <span>Open Invoices & Billing</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
