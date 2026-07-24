import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { WeeklySprint } from './types';

const STORAGE_KEY = 'weekly_sprints';

export class WeeklySprintService {
  static getCurrentWeekStart(): string {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(d.setDate(diff));
    return monday.toISOString().split('T')[0];
  }

  static getSprintByWeek(weekStart: string = this.getCurrentWeekStart()): WeeklySprint {
    const sprints = StorageAdapter.getItem<Record<string, WeeklySprint>>(STORAGE_KEY, {});
    if (sprints[weekStart]) {
      return sprints[weekStart];
    }

    return {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      weekStart,
      sprintGoal: 'Complete Project HIM OS v1.0 & Deploy to Vercel',
      deliverables: [
        { id: 'd-1', title: 'Implement Domain-Driven Architecture', completed: true },
        { id: 'd-2', title: 'Build Dashboard Single DTO', completed: true },
        { id: 'd-3', title: 'Complete Weekly Sprint & Monthly Engine', completed: true },
      ],
      hoursPlanned: 25,
      hoursCompleted: 20,
      wins: 'Decoupled domain logic cleanly from framework layer.',
      lessons: 'Plan execution daily and track blockers early.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  static saveSprint(sprint: WeeklySprint): WeeklySprint {
    const sprints = StorageAdapter.getItem<Record<string, WeeklySprint>>(STORAGE_KEY, {});
    const updated = {
      ...sprint,
      updatedAt: new Date().toISOString(),
    };
    sprints[sprint.weekStart] = updated;
    StorageAdapter.setItem(STORAGE_KEY, sprints);
    return updated;
  }
}
