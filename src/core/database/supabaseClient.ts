import { StorageAdapter } from '../storage/localStorageAdapter';

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConfigured: boolean;
}

export class SupabaseClient {
  static getConfig(): SupabaseConfig {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    return {
      supabaseUrl: url,
      supabaseAnonKey: key,
      isConfigured: Boolean(url && key),
    };
  }

  static async testConnection(): Promise<boolean> {
    const config = this.getConfig();
    if (!config.isConfigured) return false;

    try {
      const res = await fetch(`${config.supabaseUrl}/rest/v1/profiles?select=count`, {
        headers: {
          apikey: config.supabaseAnonKey,
          Authorization: `Bearer ${config.supabaseAnonKey}`,
        },
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
