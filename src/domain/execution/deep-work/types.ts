export interface DeepWorkSession {
  id: string;
  projectId?: string;
  projectName?: string;
  date: string; // YYYY-MM-DD
  durationMins: number;
  focusRating: 1 | 2 | 3 | 4 | 5;
  notes: string;
  createdAt: string;
}
