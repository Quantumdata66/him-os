'use client';

import React, { useState, useEffect } from 'react';
import { StorageAdapter } from '@/core/storage/localStorageAdapter';

export type SystemTheme = 'classic_gold' | 'cyberpunk_neon' | 'clean_monochrome';

const THEME_STORAGE_KEY = 'him_os_theme';

export const ThemeSelector: React.FC = () => {
  const [theme, setTheme] = useState<SystemTheme>('classic_gold');

  useEffect(() => {
    const saved = StorageAdapter.getItem<SystemTheme>(THEME_STORAGE_KEY, 'classic_gold');
    setTheme(saved);
  }, []);

  const handleSelectTheme = (newTheme: SystemTheme) => {
    setTheme(newTheme);
    StorageAdapter.setItem(THEME_STORAGE_KEY, newTheme);

    // Dynamic root theme class injection
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <div className="bg-gray-900/80 p-2.5 rounded-lg border border-gray-800 space-y-1.5 select-none">
      <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">UI Theme Engine</span>
      <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
        <button
          onClick={() => handleSelectTheme('classic_gold')}
          className={`px-2 py-1 rounded transition-all ${
            theme === 'classic_gold'
              ? 'bg-[#C9A84C] text-gray-950 font-bold'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          Gold 👑
        </button>
        <button
          onClick={() => handleSelectTheme('cyberpunk_neon')}
          className={`px-2 py-1 rounded transition-all ${
            theme === 'cyberpunk_neon'
              ? 'bg-cyan-400 text-gray-950 font-bold'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          Neon ⚡
        </button>
        <button
          onClick={() => handleSelectTheme('clean_monochrome')}
          className={`px-2 py-1 rounded transition-all ${
            theme === 'clean_monochrome'
              ? 'bg-gray-200 text-gray-950 font-bold'
              : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          Mono 📓
        </button>
      </div>
    </div>
  );
};
