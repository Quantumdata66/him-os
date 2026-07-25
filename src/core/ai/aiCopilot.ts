import { AnalyticsAggregator } from '../analytics/analyticsAggregator';
import { CareerPipeline } from '@/domain/career/pipelines/careerPipeline';
import { DailyPlanService } from '@/domain/execution/daily/service';

export interface AiSuggestion {
  id: string;
  category: 'focus' | 'skill' | 'habit' | 'career';
  title: string;
  recommendation: string;
  impactScore: number; // 1-10
  actionUrl?: string;
}

export interface AiCopilotAnalysis {
  greeting: string;
  overallAssessment: string;
  suggestions: AiSuggestion[];
  focusPromptToday: string;
}

export class AiCopilotService {
  static generateAnalysis(): AiCopilotAnalysis {
    const analytics = AnalyticsAggregator.generateReport();
    const careerReport = CareerPipeline.computeMarketReadiness();
    const todayStr = DailyPlanService.getTodayDateString();
    const dailyPlan = DailyPlanService.getPlanByDate(todayStr);

    const score = analytics.overallLifeOSScore;

    let greeting = `Good day, Engineer. System score is at ${score}%.`;
    let overallAssessment = `Your overall execution velocity is high. All 7 analytics engines are reporting healthy metrics.`;

    if (score < 60) {
      overallAssessment = `Execution consistency needs attention today. Focus on completing your 3 MITs and logging Deep Work.`;
    }

    const suggestions: AiSuggestion[] = [
      {
        id: 'sug-1',
        category: 'focus',
        title: 'Deep Work Velocity Block',
        recommendation: `Log a 90-minute Deep Work session on your FastAPI microservices backend to unlock the "Deep Work Specialist" trophy.`,
        impactScore: 9,
        actionUrl: '/dashboard',
      },
      {
        id: 'sug-2',
        category: 'skill',
        title: 'Docker & Kubernetes Verification',
        recommendation: `Add project evidence for Docker containerization in the Skills Matrix to increase Market Readiness above ${careerReport.overallScorePct}%.`,
        impactScore: 8,
        actionUrl: '/skills',
      },
      {
        id: 'sug-3',
        category: 'habit',
        title: 'German B1 Flashcard Streak',
        recommendation: `Complete today's German Anki deck to maintain your 7-day learning habit streak.`,
        impactScore: 7,
        actionUrl: '/execution/habits',
      },
    ];

    const focusPromptToday = dailyPlan.mit1
      ? `Primary Focus: "${dailyPlan.mit1}". Clear all distractions and complete this MIT before noon.`
      : `Primary Focus: Set your 3 Most Important Tasks (MITs) for today in the Daily Execution Planner.`;

    return {
      greeting,
      overallAssessment,
      suggestions,
      focusPromptToday,
    };
  }
}
