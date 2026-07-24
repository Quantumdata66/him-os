import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { LearningItem, LearningNote } from './types';

const ITEMS_KEY = 'learning_items';
const NOTES_KEY = 'learning_notes';

const INITIAL_ITEMS: LearningItem[] = [
  {
    id: 'l-1',
    type: 'book',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    status: 'in_progress',
    pagesTotal: 560,
    pagesRead: 340,
    rating: 5,
    startedAt: '2026-06-01',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'l-2',
    type: 'course',
    title: 'FastAPI Production Microservices with Docker & Postgres',
    author: 'TestDriven.io',
    status: 'completed',
    rating: 5,
    startedAt: '2026-06-15',
    completedAt: '2026-07-10',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'l-3',
    type: 'certification',
    title: 'AWS Certified Solutions Architect — Associate',
    author: 'Amazon Web Services',
    status: 'in_progress',
    startedAt: '2026-07-01',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'l-4',
    type: 'flashcard_deck',
    title: 'Goethe B1 German Vocabulary (2000 Words)',
    author: 'Anki Deck',
    status: 'in_progress',
    pagesTotal: 2000,
    pagesRead: 1250,
    rating: 5,
    startedAt: '2026-05-01',
    createdAt: new Date().toISOString(),
  },
];

export class LearningService {
  static getItems(): LearningItem[] {
    const items = StorageAdapter.getItem<LearningItem[]>(ITEMS_KEY, []);
    if (items.length === 0) {
      StorageAdapter.setItem(ITEMS_KEY, INITIAL_ITEMS);
      return INITIAL_ITEMS;
    }
    return items;
  }

  static getNotes(): LearningNote[] {
    return StorageAdapter.getItem<LearningNote[]>(NOTES_KEY, []);
  }

  static updateProgress(id: string, pagesRead: number): LearningItem {
    const items = this.getItems();
    const item = items.find((i) => i.id === id);
    if (!item) throw new Error('Item not found');

    item.pagesRead = pagesRead;
    if (item.pagesTotal && pagesRead >= item.pagesTotal && item.status !== 'completed') {
      item.status = 'completed';
      item.completedAt = new Date().toISOString().split('T')[0];

      if (item.type === 'book') {
        eventBus.emit('book.finished', { learningItemId: item.id });
      } else if (item.type === 'certification') {
        eventBus.emit('cert.earned', { learningItemId: item.id, skillId: '' });
      }
    }

    StorageAdapter.setItem(ITEMS_KEY, items);
    return item;
  }

  static addItem(item: Omit<LearningItem, 'id' | 'createdAt'>): LearningItem {
    const items = this.getItems();
    const newItem: LearningItem = {
      ...item,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    items.unshift(newItem);
    StorageAdapter.setItem(ITEMS_KEY, items);
    return newItem;
  }
}
