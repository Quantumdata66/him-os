export interface DailyPlan {
  id: string;
  date: string; // YYYY-MM-DD
  morningIntention: string;
  mit1: string;
  mit1Done: boolean;
  mit2: string;
  mit2Done: boolean;
  mit3: string;
  mit3Done: boolean;
  reflection: string;
  gratitude: string;
  blockers: string;
  tomorrowPlan: string;
  createdAt: string;
  updatedAt: string;
}
