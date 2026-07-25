import { SupabaseClient } from './supabaseClient';
import { eventBus, HimEventType } from '../events/eventBus';

export type RealtimeSyncStatus = 'connected' | 'reconnecting' | 'offline_fallback';

export interface RealtimeMessage {
  table: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  newPayload: Record<string, unknown>;
  timestamp: string;
}

export class RealtimeSyncEngine {
  private static status: RealtimeSyncStatus = 'offline_fallback';
  private static listenersCount = 0;

  static initializeRealtimeSync(onStatusChange?: (status: RealtimeSyncStatus) => void): () => void {
    const config = SupabaseClient.getConfig();

    if (!config.isConfigured || typeof window === 'undefined') {
      this.status = 'offline_fallback';
      onStatusChange?.(this.status);
      return () => {};
    }

    try {
      this.status = 'connected';
      this.listenersCount += 1;
      onStatusChange?.(this.status);

      // Simulating Supabase Realtime Channel Subscription listener
      const channelId = `him_os_realtime_${Math.random().toString(36).substring(2, 7)}`;

      const handleRemoteChange = (table: string, action: 'INSERT' | 'UPDATE' | 'DELETE', payload: Record<string, unknown>) => {
        const msg: RealtimeMessage = {
          table,
          eventType: action,
          newPayload: payload,
          timestamp: new Date().toISOString(),
        };

        // Dispatch on EventBus
        let busEvent: HimEventType = 'daily_plan.completed';
        if (table === 'habits') busEvent = 'habit.completed';
        else if (table === 'projects') busEvent = 'project.completed';

        eventBus.emit(busEvent, msg);
      };

      // Return cleanup unsubscribe function
      return () => {
        this.listenersCount = Math.max(0, this.listenersCount - 1);
        if (this.listenersCount === 0) {
          this.status = 'offline_fallback';
          onStatusChange?.(this.status);
        }
      };
    } catch {
      this.status = 'offline_fallback';
      onStatusChange?.(this.status);
      return () => {};
    }
  }

  static getStatus(): RealtimeSyncStatus {
    return this.status;
  }
}
