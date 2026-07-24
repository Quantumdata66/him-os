export type GoalType = 'life' | 'career' | 'financial' | 'health' | 'business';

export interface Goal {
  id: string;
  type: GoalType;
  title: string;
  description: string;
  metricName: string; // e.g. "projects_completed" | "books_read" | "net_worth"
  metricTarget: number; // e.g. 5
  targetDate: string;
  status: 'active' | 'completed' | 'paused' | 'abandoned';
  createdAt: string;
}

export interface GoalWithProgress extends Goal {
  currentValue: number;
  progressPct: number; // 0 to 100 COMPUTED
}
