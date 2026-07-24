import { HabitService } from '@/domain/execution/habits/service';
import { ScoreMetric } from './types';

export class HealthScoreEngine {
  static calculate(): ScoreMetric {
    const habits = HabitService.getHabitsWithStats();
    const workoutHabit = habits.find((h) => h.category === 'health' || h.name.toLowerCase().includes('workout'));

    const workoutCompletion = workoutHabit ? workoutHabit.completionRate30Days : 80;
    const streak = workoutHabit ? workoutHabit.currentStreak : 5;

    const score = Math.min(100, Math.round(workoutCompletion * 0.7 + Math.min(30, streak * 5)));

    let status: ScoreMetric['status'] = 'good';
    if (score >= 80) status = 'optimal';
    else if (score < 50) status = 'needs_attention';

    return {
      name: 'Health & Vitality',
      score,
      weight: 10,
      status,
      details: `${workoutCompletion}% workout rate • ${streak} day active streak`,
    };
  }
}
