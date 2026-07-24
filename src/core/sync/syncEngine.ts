import { StorageAdapter } from '../storage/localStorageAdapter';
import { eventBus, HimEvent } from '../events/eventBus';

const QUEUE_KEY = 'pending_sync_events';

export class SyncEngine {
  static getPendingQueue(): HimEvent[] {
    return StorageAdapter.getItem<HimEvent[]>(QUEUE_KEY, []);
  }

  static initOfflineQueueListener(): void {
    if (typeof window === 'undefined') return;

    eventBus.subscribe('*', (event) => {
      const isOnline = navigator.onLine;
      if (!isOnline) {
        const queue = this.getPendingQueue();
        queue.push(event);
        StorageAdapter.setItem(QUEUE_KEY, queue);
        console.log(`[SyncEngine] Queued offline event: ${event.type}`);
      }
    });

    window.addEventListener('online', () => {
      this.processQueue();
    });
  }

  static async processQueue(): Promise<number> {
    const queue = this.getPendingQueue();
    if (queue.length === 0) return 0;

    console.log(`[SyncEngine] Processing ${queue.length} queued events...`);
    StorageAdapter.setItem(QUEUE_KEY, []);
    return queue.length;
  }
}
