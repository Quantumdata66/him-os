'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, CalendarDays, Hammer, GraduationCap, TrendingUp, Brain, RotateCcw, Search } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  icon: React.ElementType;
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
      id: 'cmd-home',
      title: 'Go to HOME (Daily Command Center)',
      category: 'HPS Destination',
      shortcut: 'Ctrl+H',
      icon: Home,
      action: () => {
        router.push('/dashboard');
        setOpen(false);
      },
    },
    {
      id: 'cmd-today',
      title: 'Go to TODAY (Execution Hub)',
      category: 'HPS Destination',
      shortcut: 'Ctrl+T',
      icon: CalendarDays,
      action: () => {
        router.push('/today');
        setOpen(false);
      },
    },
    {
      id: 'cmd-build',
      title: 'Go to BUILD (Creation & Career)',
      category: 'HPS Destination',
      shortcut: 'Ctrl+B',
      icon: Hammer,
      action: () => {
        router.push('/build');
        setOpen(false);
      },
    },
    {
      id: 'cmd-learn',
      title: 'Go to LEARN (Ecosystem & German B1)',
      category: 'HPS Destination',
      shortcut: 'Ctrl+L',
      icon: GraduationCap,
      action: () => {
        router.push('/learn');
        setOpen(false);
      },
    },
    {
      id: 'cmd-grow',
      title: 'Go to GROW (Net Worth, Finance & Ventures)',
      category: 'HPS Destination',
      shortcut: 'Ctrl+G',
      icon: TrendingUp,
      action: () => {
        router.push('/grow');
        setOpen(false);
      },
    },
    {
      id: 'cmd-think',
      title: 'Go to THINK (Second Brain & Graph)',
      category: 'HPS Destination',
      icon: Brain,
      action: () => {
        router.push('/think');
        setOpen(false);
      },
    },
    {
      id: 'cmd-review',
      title: 'Go to REVIEW (Rituals & Rollover)',
      category: 'HPS Destination',
      shortcut: 'Ctrl+R',
      icon: RotateCcw,
      action: () => {
        router.push('/review');
        setOpen(false);
      },
    },
  ];

  const filteredCommands =
    search.trim() === ''
      ? commands
      : commands.filter(
          (cmd) =>
            cmd.title.toLowerCase().includes(search.toLowerCase()) ||
            cmd.category.toLowerCase().includes(search.toLowerCase())
        );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4 select-none">
      <div className="bg-[#163526] border border-[#2B4D3E] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#2B4D3E] bg-[#071A12]/80">
          <Search className="w-4 h-4 text-[#4ADE80] mr-3" />
          <input
            type="text"
            placeholder="Search HIM OS (Ctrl+K)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-[#F9FAFB] placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <span className="text-[10px] bg-[#1D4735] text-gray-400 px-2 py-0.5 rounded font-mono border border-[#2B4D3E]">
            ESC
          </span>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-200 hover:bg-[#22C55E]/20 hover:text-[#4ADE80] cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-[#22C55E]" />
                    <div>
                      <p className="font-serif">{cmd.title}</p>
                      <p className="text-[10px] text-gray-400 font-sans">{cmd.category}</p>
                    </div>
                  </div>
                  {cmd.shortcut && (
                    <span className="text-[10px] font-mono text-gray-400 bg-[#071A12] px-2 py-0.5 rounded border border-[#2B4D3E]">
                      {cmd.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-gray-400">No matching destinations found.</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[#2B4D3E] bg-[#071A12]/60 flex justify-between items-center text-[10px] text-gray-400 font-mono">
          <span>HPS Spotlight Search</span>
          <span>Use ↑↓ to navigate, Enter to select</span>
        </div>
      </div>
    </div>
  );
};
