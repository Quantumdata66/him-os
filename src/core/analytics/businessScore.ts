import { BusinessService } from '@/domain/business/service';
import { ScoreMetric } from './types';

export class BusinessScoreEngine {
  static calculate(): ScoreMetric {
    const businesses = BusinessService.getBusinesses();
    const activeBiz = businesses.filter((b) => b.status === 'active');

    let totalRev = 0;
    activeBiz.forEach((b) => {
      totalRev += BusinessService.getMonthlyRevenue(b.id);
    });

    // Monthly revenue target: 2,000,000 NGN
    const revScore = Math.min(100, Math.round((totalRev / 2000000) * 100));
    const entityScore = Math.min(100, activeBiz.length * 50);

    const score = Math.round(revScore * 0.7 + entityScore * 0.3);

    let status: ScoreMetric['status'] = 'good';
    if (score >= 80) status = 'optimal';
    else if (score < 40) status = 'needs_attention';

    return {
      name: 'Business Momentum',
      score,
      weight: 10,
      status,
      details: `₦ ${totalRev.toLocaleString()}/mo Revenue • ${activeBiz.length} Active Ventures`,
    };
  }
}
