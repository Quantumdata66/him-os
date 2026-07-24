export type HimEventType =
  | 'habit.completed'
  | 'habit.missed'
  | 'deep_work.completed'
  | 'daily_plan.completed'
  | 'project.completed'
  | 'milestone.completed'
  | 'book.finished'
  | 'cert.earned'
  | 'application.submitted'
  | 'transaction.created'
  | 'decision.recorded'
  | 'decision.reviewed';

export interface HimEvent<T = Record<string, unknown>> {
  id: string;
  type: HimEventType;
  payload: T;
  timestamp: string;
}

type EventCallback<T = Record<string, unknown>> = (event: HimEvent<T>) => void;

class EventBus {
  private listeners: Map<string, Set<EventCallback<any>>> = new Map();

  subscribe<T = Record<string, unknown>>(type: HimEventType | '*', callback: EventCallback<T>): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  emit<T = Record<string, unknown>>(type: HimEventType, payload: T): HimEvent<T> {
    const event: HimEvent<T> = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    try {
      if (typeof window !== 'undefined') {
        const storedLogs = localStorage.getItem('him_events_log');
        const logs = storedLogs ? JSON.parse(storedLogs) : [];
        logs.unshift(event);
        localStorage.setItem('him_events_log', JSON.stringify(logs.slice(0, 500)));
      }
    } catch (e) {
      console.error('Failed to log event', e);
    }

    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      typeListeners.forEach((cb) => cb(event));
    }

    const wildcardListeners = this.listeners.get('*');
    if (wildcardListeners) {
      wildcardListeners.forEach((cb) => cb(event));
    }

    return event;
  }
}

export const eventBus = new EventBus();
