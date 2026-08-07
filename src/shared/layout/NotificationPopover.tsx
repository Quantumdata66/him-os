'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, Clock, Target, CheckCircle2, Shield } from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'Ritual' | 'Deadline' | 'Goal' | 'System';
  title: string;
  subtext: string;
  timestamp: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'Ritual',
    title: 'Evening Reflection Due',
    subtext: '8:00 PM Daily Review ritual is ready for rollover.',
    timestamp: '10m ago',
    unread: true,
  },
  {
    id: 'n2',
    category: 'Deadline',
    title: 'Executive Architecture Audit',
    subtext: 'High-priority task due in Phase 2 milestone.',
    timestamp: '1h ago',
    unread: true,
  },
  {
    id: 'n3',
    category: 'Goal',
    title: 'Goethe German B1 Anki Deck',
    subtext: '35 cards remaining for today target.',
    timestamp: '2h ago',
    unread: false,
  },
];

export const NotificationPopover: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'Ritual':
        return Calendar;
      case 'Deadline':
        return Clock;
      case 'Goal':
        return Target;
      default:
        return Shield;
    }
  };

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications ${unreadCount > 0 ? `${unreadCount} unread` : ''}`}
        aria-expanded={isOpen}
        className="p-2 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-emerald text-text-secondary hover:text-text-primary transition-all duration-150 relative focus:outline-none focus:ring-2 focus:ring-accent-mint"
      >
        <Bell className="w-4 h-4 text-text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Executive Notifications"
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl p-3 z-50 animate-in fade-in duration-150 space-y-3"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-accent-mint" />
              <h3 className="text-xs font-semibold font-sans text-text-primary">Executive Alerts</h3>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] font-mono text-accent-mint hover:underline focus:outline-none"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <p className="text-xs text-text-muted text-center py-4 font-sans">No new executive notifications</p>
            ) : (
              notifications.map((n) => {
                const Icon = getCategoryIcon(n.category);
                return (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border transition-all duration-150 flex items-start space-x-3 ${
                      n.unread
                        ? 'bg-bg-elevated border-border-subtle'
                        : 'bg-bg-primary/50 border-transparent opacity-75'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-bg-subtle text-accent-mint shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold font-sans text-text-primary truncate">{n.title}</span>
                        <span className="text-[9px] font-mono text-text-muted shrink-0 ml-2">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-text-secondary leading-snug font-sans mt-0.5">{n.subtext}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
