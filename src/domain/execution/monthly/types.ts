export interface MonthlyReview {
  id: string;
  month: number; // 1-12
  year: number;
  wins: string;
  failures: string;
  lessons: string;
  goalsNextMonth: string;
  booksReadCount: number;
  coursesCompletedCount: number;
  createdAt: string;
  updatedAt: string;
}
