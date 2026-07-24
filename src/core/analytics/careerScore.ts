import { CareerPipeline } from '@/domain/career/pipelines/careerPipeline';
import { ScoreMetric } from './types';

export class CareerScoreEngine {
  static calculate(): ScoreMetric {
    const report = CareerPipeline.computeMarketReadiness();
    const score = report.overallScorePct;

    let status: ScoreMetric['status'] = 'good';
    if (score >= 80) status = 'optimal';
    else if (score < 60) status = 'needs_attention';

    return {
      name: 'Career & Market Readiness',
      score,
      weight: 15,
      status,
      details: `${report.topVerifiedSkills.length} Verified Master Skills • Pipeline Score: ${score}%`,
    };
  }
}
