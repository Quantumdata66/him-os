'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  CalendarDays,
  Hammer,
  GraduationCap,
  TrendingUp,
  Brain,
  RotateCcw,
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut: string;
  href: string;
  icon: React.ElementType;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: 'c1', title: 'Go to HOME (Dashboard)', category: 'Canonical Hub', shortcut: 'Alt+1', href: '/dashboard', icon: Home },
  { id: 'c2', title: 'Go to TODAY Focus', category: 'Canonical Hub', shortcut: 'Alt+2', href: '/today', icon: CalendarDays },
  { id: 'c3', title: 'Go to BUILD Engine', category: 'Canonical Hub', shortcut: 'Alt+3', href: '/build', icon: Hammer },
  { id: 'c4', title: 'Go to LEARN System', category: 'Canonical Hub', shortcut: 'Alt+4', href: '/learn', icon: GraduationCap },
  { id: 'c5', title: 'Go to GROW Finance', category: 'Canonical Hub', shortcut: 'Alt+5', href: '/grow', icon: TrendingUp },
  { id: 'c6', title: 'Go to THINK Brain', category: 'Canonical Hub', shortcut: 'Alt+6', href: '/think', icon: Brain },
  { id: 'c7', title: 'Go to REVIEW Rituals', category: 'Canonical Hub', shortcut: 'Alt+7', href: '/review', icon: RotateCcw },
];

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = COMMAND_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 select-none font-sans">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-150"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-bg-surface border border-border-subtle rounded-[18px] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 space-y-2 p-2">
        <div className="flex items-center space-x-3 px-3 py-2 border-b border-border-subtle">
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search hub destinations..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
            className="w-full bg-transparent text-text-primary placeholder:text-text-muted text-xs sm:text-sm focus:outline-none"
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-subtle text-text-muted border border-border-subtle">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1 p-1">
          {filteredItems.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-6 font-sans">No matching commands found.</p>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-bg-elevated text-accent-mint font-semibold border border-accent-emerald/30'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-accent-mint' : 'text-text-muted'}`} />
                    <span className="text-xs truncate">{item.title}</span>
                  </div>
                  <kbd className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-bg-subtle border border-border-subtle shrink-0">
                    {item.shortcut}
                  </kbd>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
