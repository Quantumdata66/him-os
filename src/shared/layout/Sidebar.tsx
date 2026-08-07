'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  CalendarDays,
  Hammer,
  GraduationCap,
  TrendingUp,
  Brain,
  RotateCcw,
  Search,
  X,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { ThemeSelector } from '../ui/ThemeSelector';
import { RealtimeSyncEngine, RealtimeSyncStatus } from '@/core/database/realtimeSync';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  shortcut: string;
  description: string;
}

const CANONICAL_DESTINATIONS: NavItem[] = [
  { name: 'HOME', href: '/dashboard', icon: Home, badge: 'Command', shortcut: 'Alt+1', description: "What deserves attention right now?" },
  { name: 'TODAY', href: '/today', icon: CalendarDays, badge: 'Focus', shortcut: 'Alt+2', description: "Daily execution ONLY" },
  { name: 'BUILD', href: '/build', icon: Hammer, badge: 'Projects', shortcut: 'Alt+3', description: "Projects, Career, Portfolio" },
  { name: 'LEARN', href: '/learn', icon: GraduationCap, badge: 'German B1', shortcut: 'Alt+4', description: "Books, Courses, Research" },
  { name: 'GROW', href: '/grow', icon: TrendingUp, badge: 'Capital', shortcut: 'Alt+5', description: "Finance, Net Worth, Ventures" },
  { name: 'THINK', href: '/think', icon: Brain, badge: '2nd Brain', shortcut: 'Alt+6', description: "Workspace, Graph, Decisions" },
  { name: 'REVIEW', href: '/review', icon: RotateCcw, badge: 'Rituals', shortcut: 'Alt+7', description: "Reviews, Rollover, XP" },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [syncStatus, setSyncStatus] = useState<RealtimeSyncStatus>('offline_fallback');

  useEffect(() => {
    const unsubscribe = RealtimeSyncEngine.initializeRealtimeSync(setSyncStatus);
    return () => unsubscribe();
  }, []);

  // Keyboard shortcut listener for '[' to toggle sidebar collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '[' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerCommandPalette = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm transition-opacity duration-200"
        />
      )}

      {/* Canonical HPS Sidebar Navigation */}
      <aside
        className={`bg-bg-primary border-r border-border-subtle h-screen flex flex-col justify-between p-3 select-none fixed lg:sticky top-0 left-0 z-40 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="space-y-4 overflow-y-auto pr-0.5">
          {/* Brand Header */}
          <div className="px-2 py-2 flex items-center justify-between border-b border-border-subtle pb-3">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-accent-emerald/20 border border-accent-emerald/50 flex items-center justify-center text-accent-mint font-bold text-base shadow-sm shrink-0">
                H
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <h1 className="font-sans text-sm font-bold text-text-primary tracking-wide leading-tight">HIM OS</h1>
                  <p className="text-[10px] text-text-muted font-mono">Personal OS</p>
                </div>
              )}
            </div>

            {/* Desktop Sidebar Collapse Toggle */}
            <div className="flex items-center space-x-1">
              {!collapsed && (
                <button
                  onClick={triggerCommandPalette}
                  aria-label="Open Command Search (Ctrl+K)"
                  className="hidden lg:block p-1.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-muted hover:text-accent-mint transition-colors"
                  title="Search (Ctrl+K)"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="hidden lg:block p-1.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-muted hover:text-text-primary transition-colors"
                title={collapsed ? "Expand sidebar ([)" : "Collapse sidebar ([)"}
              >
                {collapsed ? <PanelLeftOpen className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close mobile navigation menu"
                className="lg:hidden p-1.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 7 Canonical HPS Top-Level Destinations */}
          <nav className="space-y-1" aria-label="Main Navigation">
            {!collapsed && (
              <span className="px-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider block mb-2 font-mono">
                Canonical Hubs
              </span>
            )}

            {CANONICAL_DESTINATIONS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={`${item.name} (${item.shortcut}) — ${item.description}`}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium font-sans transition-all duration-150 ${
                    isActive
                      ? 'bg-accent-emerald/20 text-accent-mint border-l-4 border-accent-emerald font-bold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent-mint' : 'text-text-muted'}`} />
                    {!collapsed && <span className="tracking-wide font-sans">{item.name}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded font-semibold font-mono uppercase shrink-0 ${
                        isActive
                          ? 'bg-accent-emerald/30 text-accent-mint'
                          : 'bg-bg-subtle text-text-muted'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Settings & Real-Time Sync Indicator */}
        <div className="pt-3 border-t border-border-subtle px-1 space-y-2">
          {!collapsed && <ThemeSelector />}

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 text-xs text-text-muted hover:text-accent-mint transition-colors"
              title="Settings & Security"
            >
              <Settings className="w-3.5 h-3.5 text-text-muted shrink-0" />
              {!collapsed && <span className="font-sans text-xs">Settings</span>}
            </Link>
            <span
              className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse shrink-0"
              title={`System Online & Synced (${syncStatus})`}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
