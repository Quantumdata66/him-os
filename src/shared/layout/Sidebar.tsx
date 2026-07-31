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
  Menu,
  X,
  Settings,
  Wifi,
} from 'lucide-react';
import { ThemeSelector } from '../ui/ThemeSelector';
import { RealtimeSyncEngine, RealtimeSyncStatus } from '@/core/database/realtimeSync';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  description: string;
}

const CANONICAL_DESTINATIONS: NavItem[] = [
  { name: 'HOME', href: '/dashboard', icon: Home, badge: 'Command', description: "What deserves attention right now?" },
  { name: 'TODAY', href: '/today', icon: CalendarDays, badge: 'Focus', description: "Daily execution ONLY" },
  { name: 'BUILD', href: '/build', icon: Hammer, badge: 'Projects', description: "Projects, Career, Portfolio" },
  { name: 'LEARN', href: '/learn', icon: GraduationCap, badge: 'German B1', description: "Books, Courses, Research" },
  { name: 'GROW', href: '/grow', icon: TrendingUp, badge: 'Capital', description: "Finance, Net Worth, Ventures" },
  { name: 'THINK', href: '/think', icon: Brain, badge: '2nd Brain', description: "Workspace, Graph, Decisions" },
  { name: 'REVIEW', href: '/review', icon: RotateCcw, badge: 'Rituals', description: "Reviews, Rollover, XP" },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<RealtimeSyncStatus>('offline_fallback');

  useEffect(() => {
    const unsubscribe = RealtimeSyncEngine.initializeRealtimeSync(setSyncStatus);
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-[#163526] border border-[#2B4D3E] text-gray-200 hover:text-white focus:outline-none shadow-md"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Canonical HPS Sidebar Navigation */}
      <aside
        className={`w-64 bg-[#071A12] border-r border-[#2B4D3E] min-h-screen flex flex-col justify-between p-4 select-none fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="px-2 py-3 flex items-center justify-between border-b border-[#2B4D3E] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/50 flex items-center justify-center text-[#4ADE80] font-bold text-base shadow-sm">
                H
              </div>
              <div>
                <h1 className="font-serif text-base font-bold text-gray-100 tracking-wide">HIM OS</h1>
                <p className="text-[10px] text-gray-400 font-mono">Personal Operating System</p>
              </div>
            </div>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="p-1.5 rounded-lg bg-[#0F2D20] border border-[#2B4D3E] text-gray-400 hover:text-[#4ADE80]"
              title="Search Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 7 Canonical HPS Top-Level Destinations */}
          <nav className="space-y-2">
            <span className="px-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-2">
              Life Destinations (HPS IA)
            </span>

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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#22C55E]/20 text-[#4ADE80] border-l-4 border-[#22C55E] font-bold'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-[#0F2D20]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#4ADE80]' : 'text-gray-500'}`} />
                    <span className="font-serif tracking-wide">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                        isActive
                          ? 'bg-[#22C55E]/30 text-[#4ADE80]'
                          : 'bg-[#1D4735] text-gray-400'
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
        <div className="pt-4 border-t border-[#2B4D3E] px-2 space-y-3">
          <ThemeSelector />

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 text-xs text-gray-400 hover:text-[#4ADE80]"
            >
              <Settings className="w-3.5 h-3.5 text-gray-500" />
              <span>Settings & Security</span>
            </Link>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online & Realtime Synced" />
          </div>
        </div>
      </aside>
    </>
  );
};
