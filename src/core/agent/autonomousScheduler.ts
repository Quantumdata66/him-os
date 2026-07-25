import { DashboardService } from '@/domain/dashboard/service';
import { AnalyticsAggregator } from '../analytics/analyticsAggregator';

export interface ScheduleTimeBlock {
  id: string;
  timeSlot: string;
  activity: string;
  category: 'deep_work' | 'mit_execution' | 'learning' | 'review';
  isCompleted: boolean;
  priorityScore: number;
}

export interface AutonomousAgentPlan {
  agentStatus: 'optimal' | 'recalibrating' | 'idle';
  recommendationReason: string;
  suggestedMitOrder: string[];
  optimalFocusHours: string;
  timelineBlocks: ScheduleTimeBlock[];
  timestamp: string;
}

export class AutonomousSchedulerAgent {
  static generateAgentPlan(): AutonomousAgentPlan {
    const dto = DashboardService.getDashboardDTO();
    const analytics = AnalyticsAggregator.generateReport();

    const mits = [
      { text: dto.dailyPlan.mit1 || 'Configure System Settings', done: dto.dailyPlan.mit1Done, p: 95 },
      { text: dto.dailyPlan.mit2 || 'Verify Build Pipeline', done: dto.dailyPlan.mit2Done, p: 85 },
      { text: dto.dailyPlan.mit3 || 'German Practice', done: dto.dailyPlan.mit3Done, p: 75 },
    ];

    // Sort uncompleted MITs first by priority score
    const sortedMits = mits.sort((a, b) => (b.done ? -1 : b.p) - (a.done ? -1 : a.p));

    const timelineBlocks: ScheduleTimeBlock[] = [
      {
        id: 'tb-1',
        timeSlot: '08:30 - 09:00',
        activity: 'Morning Weather & System Diagnostics Check',
        category: 'review',
        isCompleted: true,
        priorityScore: 80,
      },
      {
        id: 'tb-2',
        timeSlot: '09:00 - 11:30',
        activity: `Deep Work: ${sortedMits[0]?.text || 'Core Engineering Task'}`,
        category: 'deep_work',
        isCompleted: sortedMits[0]?.done || false,
        priorityScore: 95,
      },
      {
        id: 'tb-3',
        timeSlot: '11:30 - 13:00',
        activity: `Execution: ${sortedMits[1]?.text || 'Secondary MIT Execution'}`,
        category: 'mit_execution',
        isCompleted: sortedMits[1]?.done || false,
        priorityScore: 85,
      },
      {
        id: 'tb-4',
        timeSlot: '14:00 - 15:30',
        activity: `Growth: ${sortedMits[2]?.text || 'German Anki Practice & Book Reading'}`,
        category: 'learning',
        isCompleted: sortedMits[2]?.done || false,
        priorityScore: 75,
      },
      {
        id: 'tb-5',
        timeSlot: '16:30 - 17:30',
        activity: 'GitHub Commit Auto-Sync & MLOps Telemetry Audit',
        category: 'review',
        isCompleted: false,
        priorityScore: 90,
      },
    ];

    const uncompletedCount = mits.filter((m) => !m.done).length;

    return {
      agentStatus: uncompletedCount === 0 ? 'optimal' : 'recalibrating',
      recommendationReason:
        uncompletedCount === 0
          ? 'All Daily MITs completed! Agent recommends starting 90m learning sprint.'
          : `Agent auto-prioritized ${uncompletedCount} pending MITs for maximum consistency score (${analytics.consistencyScore.score}%).`,
      suggestedMitOrder: sortedMits.map((m) => m.text),
      optimalFocusHours: '09:00 AM - 11:30 AM (Peak Focus Window)',
      timelineBlocks,
      timestamp: new Date().toISOString(),
    };
  }
}
