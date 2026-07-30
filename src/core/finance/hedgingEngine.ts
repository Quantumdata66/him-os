import { FinanceService } from '../../domain/finance/service';
import { CurrencyEngine } from './currencyEngine';

export interface HedgingRecommendation {
  currency: 'USD' | 'EUR' | 'GBP';
  currentExposurePct: number;
  recommendedExposurePct: number;
  hedgingAction: 'ACCUMULATE' | 'HOLD' | 'REBALANCE';
  hedgedAmountUsd: number;
}

export interface HedgingReport {
  totalPortfolioNgn: number;
  totalPortfolioUsd: number;
  inflationRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  hedgingScorePct: number;
  recommendations: HedgingRecommendation[];
}

export class HedgingEngineService {
  static computeHedgingReport(): HedgingReport {
    const netWorthNgn = FinanceService.computeNetWorth();
    const totalPortfolioUsd = CurrencyEngine.convert(netWorthNgn, 'USD');

    const recommendations: HedgingRecommendation[] = [
      {
        currency: 'USD',
        currentExposurePct: 45,
        recommendedExposurePct: 60,
        hedgingAction: 'ACCUMULATE',
        hedgedAmountUsd: Math.round(totalPortfolioUsd * 0.6),
      },
      {
        currency: 'EUR',
        currentExposurePct: 20,
        recommendedExposurePct: 25,
        hedgingAction: 'HOLD',
        hedgedAmountUsd: Math.round(totalPortfolioUsd * 0.25),
      },
      {
        currency: 'GBP',
        currentExposurePct: 10,
        recommendedExposurePct: 15,
        hedgingAction: 'REBALANCE',
        hedgedAmountUsd: Math.round(totalPortfolioUsd * 0.15),
      },
    ];

    return {
      totalPortfolioNgn: netWorthNgn,
      totalPortfolioUsd,
      inflationRiskLevel: 'MODERATE',
      hedgingScorePct: 82,
      recommendations,
    };
  }
}
