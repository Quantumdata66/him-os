'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ShieldCheck, TrendingUp, DollarSign, Globe, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { HedgingEngineService, HedgingReport } from '@/core/finance/hedgingEngine';

export default function HedgingPage() {
  const [report, setReport] = useState<HedgingReport | null>(null);

  useEffect(() => {
    setReport(HedgingEngineService.computeHedgingReport());
  }, []);

  if (!report) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Currency Hedging & Risk Engine</h1>
            <Badge variant="gold">v10.0 Enterprise</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Multi-currency inflation hedging recommendations, foreign exchange exposure allocation, and capital protection.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance')}>
            <span>Finance Hub</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => window.location.assign('/finance/global')}>
            <Globe className="w-3.5 h-3.5 mr-1" />
            <span>Global Asset Map</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Hedge Quality Rating</span>
          <p className="text-2xl font-mono font-bold text-[#C9A84C]">{report.hedgingScorePct}%</p>
          <Badge variant="gold" className="text-[9px]">Optimal Protection</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Inflation Risk Exposure</span>
          <p className="text-2xl font-mono font-bold text-emerald-400">{report.inflationRiskLevel}</p>
          <Badge variant="green" className="text-[9px]">Controlled</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">USD Portfolio Equivalent</span>
          <p className="text-2xl font-mono font-bold text-blue-400">${report.totalPortfolioUsd.toLocaleString()}</p>
          <Badge variant="blue" className="text-[9px]">Hedged Value</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Total Portfolio (NGN)</span>
          <p className="text-2xl font-mono font-bold text-purple-400">₦{report.totalPortfolioNgn.toLocaleString()}</p>
          <Badge variant="purple" className="text-[9px]">Base Currency</Badge>
        </Card>
      </div>

      {/* Hedging Allocation Recommendations */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="text-lg font-serif font-semibold text-gray-100">Multi-Currency Hedging Recommendations</h3>
          </div>
          <Badge variant="gold">{report.recommendations.length} Active Target Currencies</Badge>
        </div>

        <div className="space-y-3">
          {report.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold font-mono text-gray-100">{rec.currency}</span>
                  <Badge
                    variant={rec.hedgingAction === 'ACCUMULATE' ? 'green' : rec.hedgingAction === 'HOLD' ? 'gold' : 'blue'}
                    className="text-[9px]"
                  >
                    {rec.hedgingAction}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Current Allocation: {rec.currentExposurePct}% • Recommended Allocation: {rec.recommendedExposurePct}%
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-400">${rec.hedgedAmountUsd.toLocaleString()}</span>
                <p className="text-[9px] text-gray-500 uppercase">Target Capital Reserve</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
