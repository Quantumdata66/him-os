import { ConsistencyEngine } from './consistencyEngine';
import { EngineerScoreEngine } from './engineerScore';
import { HealthScoreEngine } from './healthScore';
import { LearningScoreEngine } from './learningScore';
import { CareerScoreEngine } from './careerScore';
import { FinancialScoreEngine } from './financialScore';
import { BusinessScoreEngine } from './businessScore';
import { SystemAnalyticsReport } from './types';

export class AnalyticsAggregator {
  static generateReport(): SystemAnalyticsReport {
    const consistencyScore = ConsistencyEngine.calculate();
    const engineerScore = EngineerScoreEngine.calculate();
    const healthScore = HealthScoreEngine.calculate();
    const learningScore = LearningScoreEngine.calculate();
    const careerScore = CareerScoreEngine.calculate();
    const financialScore = FinancialScoreEngine.calculate();
    const businessScore = BusinessScoreEngine.calculate();

    const metrics = [
      consistencyScore,
      engineerScore,
      healthScore,
      learningScore,
      careerScore,
      financialScore,
      businessScore,
    ];

    // Compute overall weighted Life OS score
    const totalWeightedScore = metrics.reduce(
      (sum, m) => sum + (m.score * m.weight) / 100,
      0
    );

    const overallLifeOSScore = Math.round(totalWeightedScore);

    return {
      overallLifeOSScore,
      consistencyScore,
      engineerScore,
      healthScore,
      learningScore,
      careerScore,
      financialScore,
      businessScore,
      computedAt: new Date().toISOString(),
    };
  }
}
