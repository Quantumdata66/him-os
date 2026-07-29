import { VentureService } from '../businesses/venturesService';
import { FinanceService } from './service';

export interface TaxAuditReport {
  annualGrossIncome: number;
  personalIncomeTax: number; // Graduated ~15% avg
  corporateVatTax: number; // 7.5% on taxable sales
  capitalGainsTax: number; // 10% on investment gains
  totalTaxLiability: number;
  effectiveTaxRatePct: number;
  jurisdiction: string;
}

export class TaxService {
  static computeTaxAudit(jurisdiction: 'NG' | 'US' | 'EU' = 'NG'): TaxAuditReport {
    const ventures = VentureService.computePortfolioTotals();
    const netWorth = FinanceService.computeNetWorth();

    const annualGrossIncome = ventures.totalRevenue * 12;
    const personalIncomeTax = annualGrossIncome * 0.15;
    const corporateVatTax = (annualGrossIncome * 0.075);
    const capitalGainsTax = (netWorth * 0.05) * 0.10; // 10% CGT on estimated 5% yield
    const totalTaxLiability = personalIncomeTax + corporateVatTax + capitalGainsTax;
    const effectiveTaxRatePct = annualGrossIncome > 0 ? Math.round((totalTaxLiability / annualGrossIncome) * 100) : 0;

    const jurisdictionNames: Record<string, string> = {
      NG: 'Nigeria Federal Inland Revenue Service (FIRS)',
      US: 'United States Internal Revenue Service (IRS)',
      EU: 'European Union Tax Authority (EU VAT/PIT)',
    };

    return {
      annualGrossIncome,
      personalIncomeTax,
      corporateVatTax,
      capitalGainsTax,
      totalTaxLiability,
      effectiveTaxRatePct,
      jurisdiction: jurisdictionNames[jurisdiction] || jurisdictionNames.NG,
    };
  }
}
