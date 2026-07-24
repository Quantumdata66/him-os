import { DailyPlan } from '../execution/daily/types';
import { HabitWithStats } from '../execution/habits/types';

export interface DashboardDTO {
  user: {
    name: string;
    motto: string;
    version: string;
  };
  todayDate: string;
  dailyPlan: DailyPlan;
  habits: HabitWithStats[];
  stats: {
    deepWorkMinutesToday: number;
    activeProjectsCount: number;
    skillsTrackedCount: number;
    booksReadCount: number;
    netWorthFormatted: string;
    unreviewedDecisionsCount: number;
  };
}
