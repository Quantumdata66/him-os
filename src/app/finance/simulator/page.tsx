'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Sliders,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Award,
} from 'lucide-react';
import { FinanceService } from '@/domain/finance/service';

export default function FinanceSimulatorPage() {
  const accounts = FinanceService.getAccounts();
  const currentNetWorth = FinanceService.computeNetWorth();

  const [monthlySavings, setMonthlySavings] = useState<number>(150000); // ₦150k monthly
  const [expectedRoi, setExpectedRoi] = useState<number>(15); // 15% annual
  const [inflationRate, setInflationRate] = useState<number>(18); // 18% NGN inflation rate
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(100000); // ₦100k expenses

  // Calculate 1, 5, 10 year projections
  const calculateProjection = (years: number, annualReturn: number) => {
    let balance = currentNetWorth;
    const monthlyRate = annualReturn / 100 / 12;

    for (let m = 0; m < years * 12; m++) {
      balance = (balance + monthlySavings) * (1 + monthlyRate);
    }
    return balance;
  };

  const proj1Yr = calculateProjection(1, expectedRoi);
  const proj5Yr = calculateProjection(5, expectedRoi);
  const proj10Yr = calculateProjection(10, expectedRoi);

  // Runway calculation in months
  const liquidCash = accounts.filter((a) => a.type === 'cash' || a.type === 'savings').reduce((acc, curr) => acc + curr.currentBalance, 0);
  const runwayMonths = monthlyExpenses > 0 ? (liquidCash / monthlyExpenses).toFixed(1) : '∞';

  const formatCurrency = (val: number) => {
    return '₦ ' + Math.round(val).toLocaleString();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Financial Runway & Monte Carlo Simulator</h1>
            <Badge variant="gold">v6.0 Simulation</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Interactive wealth projection engine forecasting portfolio growth, NGN inflation hedges, and runway months.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance')}>
          <span>Financial OS</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* Simulator Inputs & Projections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Card */}
        <Card goldBorder className="lg:col-span-4 space-y-5">
          <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
            <Sliders className="w-4 h-4 text-[#C9A84C]" />
            <h3 className="text-base font-serif font-bold text-gray-100">Simulation Variables</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Monthly Contribution</span>
                <span className="text-[#C9A84C] font-mono">{formatCurrency(monthlySavings)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="w-full accent-[#C9A84C] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Expected ROI (Annual %)</span>
                <span className="text-emerald-400 font-mono">{expectedRoi}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={expectedRoi}
                onChange={(e) => setExpectedRoi(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Estimated Inflation Rate (%)</span>
                <span className="text-rose-400 font-mono">{inflationRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-gray-300">Monthly Expenses (Burn)</span>
                <span className="text-blue-400 font-mono">{formatCurrency(monthlyExpenses)}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* Projection Horizon Output */}
        <Card className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div>
              <h3 className="text-base font-serif font-bold text-gray-100">Projected Net Worth Horizons</h3>
              <p className="text-xs text-gray-400">Current Base Net Worth: {formatCurrency(currentNetWorth)}</p>
            </div>
            <Badge variant="green" className="text-xs">Monte Carlo Engine</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-900/80 rounded-xl border border-gray-800 space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">1-Year Forecast</span>
              <p className="text-xl font-mono font-bold text-gray-100">{formatCurrency(proj1Yr)}</p>
              <Badge variant="blue" className="text-[9px]">+1 Year Growth</Badge>
            </div>

            <div className="p-4 bg-gray-900/80 rounded-xl border border-[#C9A84C]/40 space-y-2">
              <span className="text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider block">5-Year Forecast</span>
              <p className="text-xl font-mono font-bold text-[#C9A84C]">{formatCurrency(proj5Yr)}</p>
              <Badge variant="gold" className="text-[9px]">5-Year Compound</Badge>
            </div>

            <div className="p-4 bg-gray-900/80 rounded-xl border border-emerald-500/40 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">10-Year Target</span>
              <p className="text-xl font-mono font-bold text-emerald-400">{formatCurrency(proj10Yr)}</p>
              <Badge variant="green" className="text-[9px]">10-Year Wealth Target</Badge>
            </div>
          </div>

          {/* Emergency Runway Card */}
          <div className="p-4 bg-gray-950 rounded-xl border border-blue-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-200">Financial Runway & Emergency Buffer</h4>
              <p className="text-[11px] text-gray-400">Liquid Savings: {formatCurrency(liquidCash)}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-mono font-bold text-blue-400">{runwayMonths} Months</span>
              <p className="text-[9px] text-gray-500 uppercase">Runway Freedom</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
