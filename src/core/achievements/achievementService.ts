import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { Achievement, AchievementStats } from './types';
import { INITIAL_ACHIEVEMENTS } from './achievementRules';

const STORAGE_KEY = 'achievements';

export class AchievementService {
  static getAchievements(): Achievement[] {
    const stored = StorageAdapter.getItem<Achievement[]>(STORAGE_KEY, []);
    if (stored.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_ACHIEVEMENTS);
      return INITIAL_ACHIEVEMENTS;
    }
    return stored;
  }

  static getStats(): AchievementStats {
    const achievements = this.getAchievements();
    const unlocked = achievements.filter((a) => a.unlocked);
    const totalPoints = unlocked.reduce((sum, a) => sum + a.points, 0);
    const unlockedCount = unlocked.length;
    const totalCount = achievements.length;
    const completionPct = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    return {
      totalPoints,
      unlockedCount,
      totalCount,
      completionPct,
    };
  }

  static unlockAchievement(id: string): Achievement | null {
    const achievements = this.getAchievements();
    const achievement = achievements.find((a) => a.id === id);

    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString().split('T')[0];
      StorageAdapter.setItem(STORAGE_KEY, achievements);
      return achievement;
    }

    return null;
  }

  /**
   * Initializes real-time event listeners on eventBus for automatic achievement unlocks
   */
  static initAutoUnlockListeners(): void {
    if (typeof window === 'undefined') return;

    eventBus.subscribe('deep_work.completed', (event) => {
      const duration = (event.payload as any)?.durationMins || 0;
      if (duration >= 90) {
        this.unlockAchievement('ach-2');
      }
    });

    eventBus.subscribe('habit.completed', () => {
      this.unlockAchievement('ach-4');
    });

    eventBus.subscribe('decision.reviewed', () => {
      this.unlockAchievement('ach-9');
    });
  }
}
