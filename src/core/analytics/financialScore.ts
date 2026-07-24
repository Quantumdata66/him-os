import { FinanceService } from '@/domain/finance/service';
import { ScoreMetric } from './types';

export class FinancialScoreEngine {
  static calculate(): ScoreMetric {
    const netWorth = FinanceService.computeNetWorth();
    const accounts = FinanceService.getAccounts();

    // Target net worth: 10,000,000 NGN
    const target = 10000000;
    const progressPct = Math.min(100, Math.round((netWorth / target) * 100));

    // Diversification score (having accounts across savings, brokerage, cash)
    const uniqueTypes = new Set(accounts.map((a) => a.type)).size;
    const divScore = Math.min(100, uniqueTypes * 33);

    const score = Math.round(progressPct * 0.7 + divScore * 0.3);

    let status: ScoreMetric['status'] = 'good';
    if (score >= 80) status = 'optimal';
    else if (score < 40) status = 'needs_attention';

    return {
      name: 'Financial Health',
      score,
      weight: 10,
      status,
      details: `${FinanceService.formatCurrencyNGN(netWorth)} Net Worth • ${accounts.length} Asset Accounts`,
    };
  }
}
