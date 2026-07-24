import { HabitService } from '@/domain/execution/habits/service';
import { DailyPlanService } from '@/domain/execution/daily/service';
import { ScoreMetric } from './types';

export class ConsistencyEngine {
  static calculate(): ScoreMetric {
    const todayStr = DailyPlanService.getTodayDateString();
    const habits = HabitService.getHabitsWithStats(todayStr);
    const dailyPlan = DailyPlanService.getPlanByDate(todayStr);

    // Calculate Habit completion 30-day average
    const avgHabitCompletion = habits.length > 0
      ? Math.round(habits.reduce((acc, h) => acc + h.completionRate30Days, 0) / habits.length)
      : 80;

    // Calculate MIT execution score
    const mitsDone = [dailyPlan.mit1Done, dailyPlan.mit2Done, dailyPlan.mit3Done].filter(Boolean).length;
    const mitScore = Math.round((mitsDone / 3) * 100);

    const score = Math.round(avgHabitCompletion * 0.6 + mitScore * 0.4);

    let status: ScoreMetric['status'] = 'good';
    if (score >= 85) status = 'optimal';
    else if (score < 60) status = 'needs_attention';

    return {
      name: 'Execution Consistency',
      score,
      weight: 20,
      status,
      details: `${avgHabitCompletion}% habit rate • ${mitsDone}/3 MITs completed today`,
    };
  }
}
