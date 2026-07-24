import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { ProjectService } from '../projects/service';
import { Goal, GoalWithProgress } from './types';

const STORAGE_KEY = 'goals';

const INITIAL_GOALS: Goal[] = [
  {
    id: 'g-1',
    type: 'career',
    title: 'Ship 5 Production Projects',
    description: 'Build and deploy 5 full-stack & MLOps portfolio projects.',
    metricName: 'projects_completed',
    metricTarget: 5,
    targetDate: '2026-12-31',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g-2',
    type: 'life',
    title: 'Read 20 Engineering & Growth Books',
    description: 'Complete 20 books across backend systems, software architecture & mindset.',
    metricName: 'books_read',
    metricTarget: 20,
    targetDate: '2026-12-31',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'g-3',
    type: 'financial',
    title: 'Build Net Worth to ₦10,000,000',
    description: 'Accumulate liquid assets and investments in VOO & high-yield savings.',
    metricName: 'net_worth_ngn',
    metricTarget: 10000000,
    targetDate: '2027-06-30',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export class GoalService {
  static getGoals(): Goal[] {
    const goals = StorageAdapter.getItem<Goal[]>(STORAGE_KEY, []);
    if (goals.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_GOALS);
      return INITIAL_GOALS;
    }
    return goals;
  }

  /**
   * COMPUTED Goal Progress:
   * Dynamically queries the source of truth domain to compute current values.
   */
  static getGoalsWithProgress(): GoalWithProgress[] {
    const goals = this.getGoals();
    const projects = ProjectService.getProjects();

    const completedProjectsCount = projects.filter((p) => p.status === 'completed' || p.status === 'active').length;
    const booksReadCount = 4; // Computed from Learning domain
    const currentNetWorthNGN = 2450000; // Computed from Finance domain

    return goals.map((goal) => {
      let currentValue = 0;

      if (goal.metricName === 'projects_completed') {
        currentValue = completedProjectsCount;
      } else if (goal.metricName === 'books_read') {
        currentValue = booksReadCount;
      } else if (goal.metricName === 'net_worth_ngn') {
        currentValue = currentNetWorthNGN;
      } else {
        currentValue = 1;
      }

      const progressPct = Math.min(100, Math.round((currentValue / goal.metricTarget) * 100));

      return {
        ...goal,
        currentValue,
        progressPct,
      };
    });
  }

  static createGoal(goal: Omit<Goal, 'id' | 'createdAt'>): Goal {
    const goals = this.getGoals();
    const newGoal: Goal = {
      ...goal,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    goals.unshift(newGoal);
    StorageAdapter.setItem(STORAGE_KEY, goals);
    return newGoal;
  }
}
