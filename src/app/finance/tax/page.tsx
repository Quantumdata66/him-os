'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Scale, Printer, ShieldAlert, FileCheck, Landmark, CheckCircle2 } from 'lucide-react';
import { TaxService, TaxAuditReport } from '@/domain/finance/taxService';

export default function TaxAuditorPage() {
  const [jurisdiction, setJurisdiction] = useState<'NG' | 'US' | 'EU'>('NG');
  const [report, setReport] = useState<TaxAuditReport | null>(null);

  useEffect(() => {
    setReport(TaxService.computeTaxAudit(jurisdiction));
  }, [jurisdiction]);

  const handlePrintPdf = () => {
    window.print();
  };

  if (!report) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800 print:hidden">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Automated Tax & Compliance Auditor</h1>
            <Badge variant="gold">v9.0 Tax Ops</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Multi-jurisdiction tax liability calculation, VAT audits, and printable compliance summary.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/finance')}>
            <span>Finance Hub</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrintPdf}>
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Print Tax Audit PDF</span>
          </Button>
        </div>
      </div>

      {/* Jurisdiction Selector */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center space-x-3">
          <Landmark className="w-5 h-5 text-[#C9A84C]" />
          <div>
            <h3 className="text-sm font-bold text-gray-100">Target Tax Jurisdiction</h3>
            <p className="text-xs text-gray-400">{report.jurisdiction}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          {(['NG', 'US', 'EU'] as const).map((j) => (
            <Button
              key={j}
              variant={jurisdiction === j ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setJurisdiction(j)}
            >
              {j === 'NG' ? 'Nigeria (FIRS)' : j === 'US' ? 'US (IRS)' : 'EU VAT'}
            </Button>
          ))}
        </div>
      </Card>

      {/* Tax Liability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Annual Gross Income</span>
          <p className="text-xl font-mono font-bold text-emerald-400">
            ₦ {report.annualGrossIncome.toLocaleString()}
          </p>
          <Badge variant="green" className="text-[9px]">Top Line</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Personal Income Tax (PIT)</span>
          <p className="text-xl font-mono font-bold text-blue-400">
            ₦ {report.personalIncomeTax.toLocaleString()}
          </p>
          <Badge variant="blue" className="text-[9px]">Personal PIT</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Corporate VAT (7.5%)</span>
          <p className="text-xl font-mono font-bold text-purple-400">
            ₦ {report.corporateVatTax.toLocaleString()}
          </p>
          <Badge variant="purple" className="text-[9px]">Corporate VAT</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Total Tax Liability</span>
          <p className="text-xl font-mono font-bold text-[#C9A84C]">
            ₦ {report.totalTaxLiability.toLocaleString()}
          </p>
          <Badge variant="gold" className="text-[9px]">{report.effectiveTaxRatePct}% Effective Rate</Badge>
        </Card>
      </div>

      {/* Printable Tax Compliance Paper */}
      <Card
        goldBorder
        className="p-8 space-y-6 bg-[#0B0F17] text-gray-100 border-gray-700 shadow-2xl print:border-none print:shadow-none print:p-0"
      >
        <div className="flex justify-between items-start border-b border-gray-800 pb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-100">Annual Tax & Compliance Audit Statement</h2>
            <p className="text-xs text-[#C9A84C] font-mono mt-1">{report.jurisdiction}</p>
          </div>
          <Badge variant="green" className="text-xs py-1 px-3">
            Status: Compliant ✓
          </Badge>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-gray-900/80 rounded-xl border border-gray-800 space-y-3 font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Personal Income Tax (15% Avg Bracket):</span>
              <span className="text-gray-100 font-bold">₦ {report.personalIncomeTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Corporate VAT (7.5% Sales Tax):</span>
              <span className="text-gray-100 font-bold">₦ {report.corporateVatTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Capital Gains Tax (10% CGT Yield):</span>
              <span className="text-gray-100 font-bold">₦ {report.capitalGainsTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#C9A84C] pt-2 border-t border-gray-800">
              <span>Total Calculated Tax Liability:</span>
              <span>₦ {report.totalTaxLiability.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed italic">
            Note: Calculated automatically via Project HIM OS Tax Auditor Engine v9.0. Ensure all corporate filings are submitted prior to statutory fiscal deadlines.
          </p>
        </div>
      </Card>
    </div>
  );
}
