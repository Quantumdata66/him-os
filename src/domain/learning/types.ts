export type LearningType =
  | 'book'
  | 'course'
  | 'video'
  | 'paper'
  | 'certification'
  | 'exercise'
  | 'flashcard_deck';

export interface LearningItem {
  id: string;
  type: LearningType;
  title: string;
  author: string;
  url?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'abandoned';
  pagesTotal?: number;
  pagesRead?: number;
  rating?: number; // 1-5
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface LearningNote {
  id: string;
  learningItemId: string;
  contentMd: string;
  noteType: 'note' | 'highlight' | 'summary' | 'question';
  pageRef?: string;
  createdAt: string;
}
