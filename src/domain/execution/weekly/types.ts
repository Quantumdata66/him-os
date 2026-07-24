export interface Deliverable {
  id: string;
  title: string;
  completed: boolean;
}

export interface WeeklySprint {
  id: string;
  weekStart: string; // YYYY-MM-DD (Monday)
  sprintGoal: string;
  deliverables: Deliverable[];
  hoursPlanned: number;
  hoursCompleted: number;
  wins: string;
  lessons: string;
  createdAt: string;
  updatedAt: string;
}
