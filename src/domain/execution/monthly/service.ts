import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { MonthlyReview } from './types';

const STORAGE_KEY = 'monthly_reviews';

export class MonthlyReviewService {
  static getReview(month: number = new Date().getMonth() + 1, year: number = new Date().getFullYear()): MonthlyReview {
    const key = `${year}-${month}`;
    const reviews = StorageAdapter.getItem<Record<string, MonthlyReview>>(STORAGE_KEY, {});
    if (reviews[key]) {
      return reviews[key];
    }

    return {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      month,
      year,
      wins: 'Shipped Project HIM OS v1.0 & Quantum Jersey Storefront catalog.',
      failures: 'Could have dedicated more structured hours to German B1 listening.',
      lessons: 'Systems beat pure motivation. Daily execution momentum compounds rapidly.',
      goalsNextMonth: 'Complete FastAPI microservice migration and launch Docker container deployment.',
      booksReadCount: 2,
      coursesCompletedCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  static saveReview(review: MonthlyReview): MonthlyReview {
    const key = `${review.year}-${review.month}`;
    const reviews = StorageAdapter.getItem<Record<string, MonthlyReview>>(STORAGE_KEY, {});
    const updated = {
      ...review,
      updatedAt: new Date().toISOString(),
    };
    reviews[key] = updated;
    StorageAdapter.setItem(STORAGE_KEY, reviews);
    return updated;
  }
}
