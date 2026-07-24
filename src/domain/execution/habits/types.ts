export interface Habit {
  id: string;
  name: string;
  category: 'health' | 'engineering' | 'mindset' | 'german' | 'business' | 'other';
  icon: string;
  color: string;
  createdAt: string;
  archived: boolean;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export interface HabitWithStats extends Habit {
  completedToday: boolean;
  currentStreak: number;
  completionRate30Days: number;
}
