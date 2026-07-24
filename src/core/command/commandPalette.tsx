'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  icon: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      id: 'cmd-dashboard',
      title: 'Go to Dashboard',
      category: 'Navigation',
      shortcut: 'Ctrl+D',
      icon: '⚡',
      action: () => {
        router.push('/dashboard');
        setOpen(false);
      },
    },
    {
      id: 'cmd-workspace',
      title: 'Open Notion/Obsidian Workspace',
      category: 'Workspace',
      shortcut: 'Ctrl+W',
      icon: '📓',
      action: () => {
        router.push('/workspace');
        setOpen(false);
      },
    },
    {
      id: 'cmd-achievements',
      title: 'View Achievement Trophy Room',
      category: 'Gamification',
      shortcut: 'Ctrl+A',
      icon: '🏆',
      action: () => {
        router.push('/achievements');
        setOpen(false);
      },
    },
    {
      id: 'cmd-career',
      title: 'Open Career Engine Flagship',
      category: 'Career',
      icon: '⭐',
      action: () => {
        router.push('/career');
        setOpen(false);
      },
    },
    {
      id: 'cmd-daily',
      title: 'Daily Execution Planner',
      category: 'Execution',
      icon: '🎯',
      action: () => {
        router.push('/execution/daily');
        setOpen(false);
      },
    },
    {
      id: 'cmd-habits',
      title: 'Habit Execution Tracker',
      category: 'Execution',
      icon: '🔥',
      action: () => {
        router.push('/execution/habits');
        setOpen(false);
      },
    },
    {
      id: 'cmd-[#projects]',
      title: 'Projects Portfolio',
      category: 'Planning',
      icon: '💻',
      action: () => {
        router.push('/planning/projects');
        setOpen(false);
      },
    },
  ];

  const filteredCommands = search.trim() === ''
    ? commands
    : commands.filter((cmd) =>
        cmd.title.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase())
      );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4 select-none">
      <div className="bg-[#111827] border border-[#C9A84C]/40 rounded-xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-gray-900/50">
          <span className="text-gray-400 mr-3 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Type a command or search workspace (Ctrl+K)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded font-mono">ESC</span>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <div
                key={cmd.id}
                onClick={cmd.action}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-[#C9A84C]/15 hover:text-[#C9A84C] cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">{cmd.icon}</span>
                  <div>
                    <p className="font-semibold">{cmd.title}</p>
                    <p className="text-[10px] text-gray-500">{cmd.category}</p>
                  </div>
                </div>
                {cmd.shortcut && (
                  <span className="text-[10px] font-mono text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
                    {cmd.shortcut}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-gray-500">No matching commands found.</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-800 bg-gray-900/30 flex justify-between items-center text-[10px] text-gray-500">
          <span>Project HIM OS Spotlight</span>
          <span>Use ↑↓ to navigate, Enter to select</span>
        </div>
      </div>
    </div>
  );
};
