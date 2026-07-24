export class StorageAdapter {
  static getItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(`him_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return fallback;
    }
  }

  static setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`him_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to storage:`, error);
    }
  }

  static removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(`him_${key}`);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  }
}
