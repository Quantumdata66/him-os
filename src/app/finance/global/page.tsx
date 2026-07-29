'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Globe, DollarSign, RefreshCw, ArrowRightLeft, ShieldCheck, MapPin } from 'lucide-react';
import { FinanceService } from '@/domain/finance/service';
import { CurrencyEngine, SupportedCurrency } from '@/core/finance/currencyEngine';

export default function GlobalAssetMapPage() {
  const netWorthNgn = FinanceService.computeNetWorth();
  const [calcAmount, setCalcAmount] = useState<number>(1000000);
  const [targetCurr, setTargetCurr] = useState<SupportedCurrency>('USD');

  const regions = [
    { name: 'Africa (Nigeria)', percentage: 65, accounts: 'PiggyVest, Local Cash, Real Estate', color: 'text-emerald-400' },
    { name: 'North America (US)', percentage: 25, accounts: 'Brokerage (VOO, Tech Stocks)', color: 'text-blue-400' },
    { name: 'Europe (Germany / EU)', percentage: 10, accounts: 'EUR Yield Reserves', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Global Asset Map & Multi-Currency Engine</h1>
            <Badge variant="gold">v9.0 Global Cloud</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Real-time currency converter and geographic asset diversification breakdown.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance')}>
          <span>Finance Hub</span>
        </Button>
      </div>

      {/* Multi-Currency Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">NGN Portfolio (Base)</span>
          <p className="text-xl font-mono font-bold text-[#C9A84C]">
            {CurrencyEngine.format(netWorthNgn, 'NGN')}
          </p>
          <Badge variant="gold" className="text-[9px]">Nigerian Naira</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">USD Equivalent</span>
          <p className="text-xl font-mono font-bold text-blue-400">
            {CurrencyEngine.format(CurrencyEngine.convert(netWorthNgn, 'USD'), 'USD')}
          </p>
          <Badge variant="blue" className="text-[9px]">US Dollar</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">EUR Equivalent</span>
          <p className="text-xl font-mono font-bold text-purple-400">
            {CurrencyEngine.format(CurrencyEngine.convert(netWorthNgn, 'EUR'), 'EUR')}
          </p>
          <Badge variant="purple" className="text-[9px]">Euro</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">GBP Equivalent</span>
          <p className="text-xl font-mono font-bold text-emerald-400">
            {CurrencyEngine.format(CurrencyEngine.convert(netWorthNgn, 'GBP'), 'GBP')}
          </p>
          <Badge variant="green" className="text-[9px]">British Pound</Badge>
        </Card>
      </div>

      {/* Geographic Asset Allocation & Currency Converter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regional Allocation Cards */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
            <Globe className="w-4 h-4 text-[#C9A84C]" />
            <h3 className="text-base font-serif font-bold text-gray-100">Geographic Asset Distribution</h3>
          </div>

          <div className="space-y-3">
            {regions.map((reg, idx) => (
              <div key={idx} className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span className="font-bold text-gray-200">{reg.name}</span>
                  </div>
                  <span className={`font-mono font-bold ${reg.color}`}>{reg.percentage}%</span>
                </div>
                <p className="text-[11px] text-gray-400">{reg.accounts}</p>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full bg-current ${reg.color}`} style={{ width: `${reg.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Currency Conversion Calculator */}
        <Card goldBorder className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
            <ArrowRightLeft className="w-4 h-4 text-[#C9A84C]" />
            <h3 className="text-base font-serif font-bold text-gray-100">Instant Currency Conversion</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Amount in NGN (₦)</label>
              <input
                type="number"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-gray-100 font-mono focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-300 font-semibold">Target Currency</label>
              <select
                value={targetCurr}
                onChange={(e: any) => setTargetCurr(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
              >
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>

            <div className="p-4 bg-gray-900/80 rounded-xl border border-gray-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase">Converted Result</span>
              <p className="text-2xl font-mono font-bold text-[#C9A84C]">
                {CurrencyEngine.format(CurrencyEngine.convert(calcAmount, targetCurr), targetCurr)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
