import { DailyPlanService } from '../execution/daily/service';
import { HabitService } from '../execution/habits/service';
import { DashboardDTO } from './types';

export class DashboardService {
  static getDashboardDTO(): DashboardDTO {
    const todayStr = DailyPlanService.getTodayDateString();
    const dailyPlan = DailyPlanService.getPlanByDate(todayStr);
    const habits = HabitService.getHabitsWithStats(todayStr);

    return {
      user: {
        name: 'Engineer',
        motto: 'Prototype Today. Legacy Tomorrow.',
        version: 'v2.0.0',
      },
      todayDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      dailyPlan,
      habits,
      stats: {
        deepWorkMinutesToday: 120,
        activeProjectsCount: 3,
        skillsTrackedCount: 8,
        booksReadCount: 4,
        netWorthFormatted: '₦ 2,450,000',
        unreviewedDecisionsCount: 1,
      },
    };
  }
}
