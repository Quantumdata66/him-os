import { LearningService } from '@/domain/learning/service';
import { ScoreMetric } from './types';

export class LearningScoreEngine {
  static calculate(): ScoreMetric {
    const items = LearningService.getItems();

    const completed = items.filter((i) => i.status === 'completed').length;
    const inProgress = items.filter((i) => i.status === 'in_progress').length;

    // Calculate total pages/units progress
    let totalProgressPct = 0;
    let itemsWithPages = 0;

    items.forEach((item) => {
      if (item.pagesTotal && item.pagesTotal > 0) {
        itemsWithPages++;
        totalProgressPct += Math.min(100, Math.round(((item.pagesRead || 0) / item.pagesTotal) * 100));
      }
    });

    const avgPageProgress = itemsWithPages > 0 ? Math.round(totalProgressPct / itemsWithPages) : 70;
    const score = Math.min(100, Math.round(avgPageProgress * 0.6 + completed * 10 + inProgress * 5));

    let status: ScoreMetric['status'] = 'good';
    if (score >= 80) status = 'optimal';
    else if (score < 50) status = 'needs_attention';

    return {
      name: 'Learning Velocity',
      score,
      weight: 15,
      status,
      details: `${completed} Completed • ${inProgress} In Progress • ${avgPageProgress}% Reading Rate`,
    };
  }
}
