import { DashboardService } from '@/domain/dashboard/service';
import { AnalyticsAggregator } from '../analytics/analyticsAggregator';
import { FinanceService } from '@/domain/finance/service';
import { SkillService } from '@/domain/skills/service';

export interface AgentMeshInsight {
  agentName: 'Career Agent' | 'Financial Agent' | 'Productivity Agent';
  status: 'active' | 'evaluating' | 'warning';
  primaryRecommendation: string;
  metricLabel: string;
  metricValue: string;
}

export interface AgentMeshReport {
  meshStatus: 'synchronized' | 'recalibrating';
  activeAgentsCount: number;
  insights: AgentMeshInsight[];
  timestamp: string;
}

export class AgentMeshService {
  static generateMeshReport(): AgentMeshReport {
    const dto = DashboardService.getDashboardDTO();
    const analytics = AnalyticsAggregator.generateReport();
    const netWorth = FinanceService.computeNetWorth();
    const skills = SkillService.getSkills();

    const careerInsight: AgentMeshInsight = {
      agentName: 'Career Agent',
      status: analytics.careerScore.score >= 80 ? 'active' : 'warning',
      primaryRecommendation: `Market readiness rating is at ${analytics.careerScore.score}%. Focus on building 1 new verified evidence project in Backend / MLOps.`,
      metricLabel: 'Skill Coverage',
      metricValue: `${skills.length} Tracked Skills`,
    };

    const financialInsight: AgentMeshInsight = {
      agentName: 'Financial Agent',
      status: netWorth >= 1000000 ? 'active' : 'warning',
      primaryRecommendation: `Net Worth at ₦ ${netWorth.toLocaleString()}. Emergency buffer is healthy across liquid cash & yield savings.`,
      metricLabel: 'Net Worth',
      metricValue: `₦ ${netWorth.toLocaleString()}`,
    };

    const productivityInsight: AgentMeshInsight = {
      agentName: 'Productivity Agent',
      status: analytics.consistencyScore.score >= 80 ? 'active' : 'warning',
      primaryRecommendation: `Consistency score is ${analytics.consistencyScore.score}%. Daily MIT completion velocity is optimal.`,
      metricLabel: 'Consistency',
      metricValue: `${analytics.consistencyScore.score}%`,
    };

    return {
      meshStatus: 'synchronized',
      activeAgentsCount: 3,
      insights: [careerInsight, financialInsight, productivityInsight],
      timestamp: new Date().toISOString(),
    };
  }
}
