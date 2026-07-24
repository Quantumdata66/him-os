export interface ScoreMetric {
  name: string;
  score: number; // 0 - 100
  weight: number; // percentage
  status: 'optimal' | 'good' | 'needs_attention' | 'critical';
  details: string;
}

export interface SystemAnalyticsReport {
  overallLifeOSScore: number; // 0 - 100
  consistencyScore: ScoreMetric;
  engineerScore: ScoreMetric;
  healthScore: ScoreMetric;
  learningScore: ScoreMetric;
  careerScore: ScoreMetric;
  financialScore: ScoreMetric;
  businessScore: ScoreMetric;
  computedAt: string;
}
