import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { DailyPlan } from './types';

const STORAGE_KEY = 'daily_plans';

export class DailyPlanService {
  static getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  static getPlanByDate(date: string = this.getTodayDateString()): DailyPlan {
    const plans = StorageAdapter.getItem<Record<string, DailyPlan>>(STORAGE_KEY, {});
    if (plans[date]) {
      return plans[date];
    }

    return {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      date,
      morningIntention: '',
      mit1: '',
      mit1Done: false,
      mit2: '',
      mit2Done: false,
      mit3: '',
      mit3Done: false,
      reflection: '',
      gratitude: '',
      blockers: '',
      tomorrowPlan: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  static savePlan(plan: DailyPlan): DailyPlan {
    const plans = StorageAdapter.getItem<Record<string, DailyPlan>>(STORAGE_KEY, {});
    const updatedPlan = {
      ...plan,
      updatedAt: new Date().toISOString(),
    };
    plans[plan.date] = updatedPlan;
    StorageAdapter.setItem(STORAGE_KEY, plans);

    const completedCount = [plan.mit1Done, plan.mit2Done, plan.mit3Done].filter(Boolean).length;
    eventBus.emit('daily_plan.completed', {
      planId: plan.id,
      date: plan.date,
      mitsCompleted: completedCount,
    });

    return updatedPlan;
  }

  static toggleMit(date: string, mitNumber: 1 | 2 | 3): DailyPlan {
    const plan = this.getPlanByDate(date);
    if (mitNumber === 1) plan.mit1Done = !plan.mit1Done;
    if (mitNumber === 2) plan.mit2Done = !plan.mit2Done;
    if (mitNumber === 3) plan.mit3Done = !plan.mit3Done;
    return this.savePlan(plan);
  }
}
