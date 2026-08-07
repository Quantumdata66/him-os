'use client';

import React, { useState } from 'react';
import { Moon, Monitor } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');

  return (
    <div className="flex items-center space-x-1 p-1 bg-bg-surface border border-border-subtle rounded-xl text-xs select-none">
      <button
        onClick={() => setTheme('dark')}
        className={`flex-1 flex items-center justify-center space-x-1 py-1 rounded-lg transition-colors ${
          theme === 'dark' ? 'bg-bg-elevated text-accent-mint font-semibold' : 'text-text-muted hover:text-text-primary'
        }`}
        title="Dark Theme (Executive Standard)"
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono">Dark</span>
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`flex-1 flex items-center justify-center space-x-1 py-1 rounded-lg transition-colors ${
          theme === 'system' ? 'bg-bg-elevated text-accent-mint font-semibold' : 'text-text-muted hover:text-text-primary'
        }`}
        title="System Preference"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono">System</span>
      </button>
    </div>
  );
};
