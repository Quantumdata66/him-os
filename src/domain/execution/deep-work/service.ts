import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { DeepWorkSession } from './types';

const STORAGE_KEY = 'deep_work_sessions';

const INITIAL_SESSIONS: DeepWorkSession[] = [
  {
    id: 'dw-1',
    projectId: 'p-1',
    projectName: 'Project HIM OS',
    date: new Date().toISOString().split('T')[0],
    durationMins: 90,
    focusRating: 5,
    notes: 'Configured EventBus and Domain-driven architecture.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dw-2',
    projectId: 'p-2',
    projectName: 'Quantum Jersey E-Commerce',
    date: new Date().toISOString().split('T')[0],
    durationMins: 45,
    focusRating: 4,
    notes: 'Catalog page performance optimization.',
    createdAt: new Date().toISOString(),
  },
];

export class DeepWorkService {
  static getSessions(): DeepWorkSession[] {
    const sessions = StorageAdapter.getItem<DeepWorkSession[]>(STORAGE_KEY, []);
    if (sessions.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_SESSIONS);
      return INITIAL_SESSIONS;
    }
    return sessions;
  }

  static getSessionsToday(): DeepWorkSession[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getSessions().filter((s) => s.date === today);
  }

  static getTotalMinutesToday(): number {
    return this.getSessionsToday().reduce((sum, s) => sum + s.durationMins, 0);
  }

  static logSession(session: Omit<DeepWorkSession, 'id' | 'createdAt'>): DeepWorkSession {
    const sessions = this.getSessions();
    const newSession: DeepWorkSession = {
      ...session,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    sessions.unshift(newSession);
    StorageAdapter.setItem(STORAGE_KEY, sessions);

    eventBus.emit('deep_work.completed', {
      sessionId: newSession.id,
      projectId: newSession.projectId || '',
      durationMins: newSession.durationMins,
    });

    return newSession;
  }
}
