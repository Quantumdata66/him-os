'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Hammer,
  Zap,
  TrendingUp,
  Brain,
  Search,
  Menu,
  X,
  Wifi,
  LayoutDashboard,
  Briefcase,
  Cpu,
  Presentation,
  Target,
  Calendar,
  Flame,
  Wallet,
  Building2,
  Scale,
  BookOpen,
  Network,
  FileText,
  Settings,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { ThemeSelector } from '../ui/ThemeSelector';
import { RealtimeSyncEngine, RealtimeSyncStatus } from '@/core/database/realtimeSync';

interface NavGroup {
  workspaceName: string;
  workspacePath: string;
  icon: React.ElementType;
  description: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const WORKSPACES: NavGroup[] = [
  {
    workspaceName: 'Home',
    workspacePath: '/dashboard',
    icon: Home,
    description: 'Daily Command Center',
    items: [
      { name: 'Daily Command Room', href: '/dashboard', icon: LayoutDashboard, badge: 'Core' },
      { name: 'Swarm Telemetry', href: '/dashboard/mesh', icon: Activity, badge: 'v10.0' },
    ],
  },
  {
    workspaceName: 'Build',
    workspacePath: '/career',
    icon: Hammer,
    description: 'Creation & Career Elevation',
    items: [
      { name: 'Career Engine', href: '/career', icon: Briefcase, badge: 'Flagship' },
      { name: 'Projects Hub', href: '/planning/projects', icon: Target },
      { name: 'Skills Matrix & Radar', href: '/skills/radar', icon: Cpu, badge: 'v6.0' },
      { name: 'Employer Showcase', href: '/demo', icon: Presentation, badge: 'v5.0' },
    ],
  },
  {
    workspaceName: 'Execute',
    workspacePath: '/execution/daily',
    icon: Zap,
    description: 'Operational Execution',
    items: [
      { name: 'Daily Planner', href: '/execution/daily', icon: Target },
      { name: 'Weekly Sprint', href: '/execution/weekly', icon: Calendar },
      { name: 'Habit Execution', href: '/execution/habits', icon: Flame },
      { name: 'Goals Alignment', href: '/planning/goals', icon: Scale },
    ],
  },
  {
    workspaceName: 'Grow',
    workspacePath: '/finance',
    icon: TrendingUp,
    description: 'Capital & Venture Progress',
    items: [
      { name: 'Financial OS', href: '/finance', icon: Wallet },
      { name: 'Venture Hub (P&L)', href: '/businesses/ventures', icon: Building2, badge: 'v8.0' },
      { name: 'Currency Risk Hedging', href: '/finance/hedging', icon: ShieldCheck, badge: 'v10.0' },
      { name: 'Tax Compliance Auditor', href: '/finance/tax', icon: Scale, badge: 'v9.0' },
    ],
  },
  {
    workspaceName: 'Think',
    workspacePath: '/workspace',
    icon: Brain,
    description: 'External Brain & Knowledge',
    items: [
      { name: 'Workspace Studio', href: '/workspace', icon: BookOpen },
      { name: 'Knowledge Graph', href: '/workspace/graph', icon: Network },
      { name: 'Decision Vault', href: '/decisions', icon: Scale },
      { name: 'Notes & Ideas', href: '/notes', icon: FileText },
    ],
  },
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
          className="p-2.5 rounded-lg bg-[#111827] border border-gray-800 text-gray-200 hover:text-white focus:outline-none shadow-md"
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

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 bg-[#09090B] border-r border-gray-800/80 min-h-screen flex flex-col justify-between p-4 select-none fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Brand Header */}
          <div className="px-2 py-3 flex items-center justify-between border-b border-gray-800/80 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C] font-bold text-base">
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
              className="p-1.5 rounded-md bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200"
              title="Search Command Palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5 Core Workspaces Navigation */}
          <nav className="space-y-6">
            {WORKSPACES.map((ws, wIdx) => {
              const WorkspaceIcon = ws.icon;
              const isWorkspaceActive = pathname.startsWith(ws.workspacePath);

              return (
                <div key={wIdx} className="space-y-1.5">
                  <div className="flex items-center space-x-2 px-2 text-gray-400">
                    <WorkspaceIcon className={`w-3.5 h-3.5 ${isWorkspaceActive ? 'text-[#C9A84C]' : 'text-gray-500'}`} />
                    <span className="text-[11px] font-serif font-bold tracking-wide uppercase text-gray-300">
                      {ws.workspaceName}
                    </span>
                  </div>

                  <div className="space-y-0.5 pl-2 border-l border-gray-800/80 ml-3">
                    {ws.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href || (item.href !== '/workspace' && item.href !== '/career' && item.href !== '/finance' && pathname.startsWith(item.href + '/'));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                            isActive
                              ? 'bg-[#C9A84C]/15 text-[#C9A84C] border-l-2 border-[#C9A84C]'
                              : 'text-gray-400 hover:text-gray-100 hover:bg-gray-900/60'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C9A84C]' : 'text-gray-500'}`} />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[8px] px-1 py-0.5 rounded font-semibold uppercase ${
                                item.badge === 'Flagship' || item.badge === 'Core'
                                  ? 'bg-[#C9A84C]/20 text-[#C9A84C]'
                                  : 'bg-purple-500/20 text-purple-400'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Settings & Real-Time Sync Indicator */}
        <div className="pt-4 border-t border-gray-800/80 px-2 space-y-3">
          <ThemeSelector />

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 text-xs text-gray-400 hover:text-gray-100"
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
