import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { Habit, HabitLog, HabitWithStats } from './types';

const HABITS_KEY = 'habits';
const HABIT_LOGS_KEY = 'habit_logs';

const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Morning Prayer & Gratitude', category: 'mindset', icon: '🙏', color: '#F59E0B', createdAt: new Date().toISOString(), archived: false },
  { id: '2', name: 'Deep Work (2+ Hours)', category: 'engineering', icon: '💻', color: '#3B82F6', createdAt: new Date().toISOString(), archived: false },
  { id: '3', name: 'German Study (30 mins)', category: 'german', icon: '🇩🇪', color: '#10B981', createdAt: new Date().toISOString(), archived: false },
  { id: '4', name: 'Workout / Physical Fitness', category: 'health', icon: '🏋️‍♂️', color: '#EF4444', createdAt: new Date().toISOString(), archived: false },
  { id: '5', name: 'Reading (15+ Pages)', category: 'mindset', icon: '📚', color: '#8B5CF6', createdAt: new Date().toISOString(), archived: false },
];

export class HabitService {
  static getAllHabits(): Habit[] {
    const habits = StorageAdapter.getItem<Habit[]>(HABITS_KEY, []);
    if (habits.length === 0) {
      StorageAdapter.setItem(HABITS_KEY, INITIAL_HABITS);
      return INITIAL_HABITS;
    }
    return habits.filter((h) => !h.archived);
  }

  static getLogs(): HabitLog[] {
    return StorageAdapter.getItem<HabitLog[]>(HABIT_LOGS_KEY, []);
  }

  static toggleHabitLog(habitId: string, date: string): HabitLog {
    const logs = this.getLogs();
    const existingIndex = logs.findIndex((l) => l.habitId === habitId && l.date === date);

    let isCompleted = true;
    if (existingIndex >= 0) {
      isCompleted = !logs[existingIndex].completed;
      logs[existingIndex].completed = isCompleted;
    } else {
      logs.push({
        id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
        habitId,
        date,
        completed: true,
      });
    }

    StorageAdapter.setItem(HABIT_LOGS_KEY, logs);

    if (isCompleted) {
      eventBus.emit('habit.completed', { habitId, date });
    } else {
      eventBus.emit('habit.missed', { habitId, date });
    }

    return logs.find((l) => l.habitId === habitId && l.date === date)!;
  }

  static createHabit(habit: Omit<Habit, 'id' | 'createdAt' | 'archived'>): Habit {
    const habits = StorageAdapter.getItem<Habit[]>(HABITS_KEY, []);
    const newHabit: Habit = {
      ...habit,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
      archived: false,
    };
    habits.push(newHabit);
    StorageAdapter.setItem(HABITS_KEY, habits);
    return newHabit;
  }

  static computeStreak(habitId: string, logs: HabitLog[], todayStr: string): number {
    let streak = 0;
    const date = new Date(todayStr);

    while (true) {
      const dateStr = date.toISOString().split('T')[0];
      const log = logs.find((l) => l.habitId === habitId && l.date === dateStr);

      if (log && log.completed) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else if (dateStr === todayStr) {
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  static getHabitsWithStats(todayStr: string = new Date().toISOString().split('T')[0]): HabitWithStats[] {
    const habits = this.getAllHabits();
    const logs = this.getLogs();

    return habits.map((habit) => {
      const todayLog = logs.find((l) => l.habitId === habit.id && l.date === todayStr);
      const completedToday = !!(todayLog && todayLog.completed);

      const streak = this.computeStreak(habit.id, logs, todayStr);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentLogs = logs.filter((l) => l.habitId === habit.id && new Date(l.date) >= thirtyDaysAgo && l.completed);
      const completionRate30Days = Math.round((recentLogs.length / 30) * 100);

      return {
        ...habit,
        completedToday,
        currentStreak: streak,
        completionRate30Days,
      };
    });
  }
}
