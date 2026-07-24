export type AchievementCategory = 'engineering' | 'habits' | 'career' | 'learning' | 'financial' | 'business';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  requirementDetails: string;
}

export interface AchievementStats {
  totalPoints: number;
  unlockedCount: number;
  totalCount: number;
  completionPct: number;
}
