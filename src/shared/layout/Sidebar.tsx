'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  Calendar,
  Flame,
  Trophy,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Cpu,
  Wallet,
  Building2,
  BookOpen,
  Network,
  Scale,
  FileText,
  Settings,
  Menu,
  X,
  Sparkles,
  Search,
} from 'lucide-react';
import { ThemeSelector } from '../ui/ThemeSelector';

interface NavGroup {
  groupName: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Core',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    groupName: 'Execution',
    items: [
      { name: 'Daily Planner', href: '/execution/daily', icon: Target },
      { name: 'Weekly Sprint', href: '/execution/weekly', icon: Calendar },
      { name: 'Monthly Review', href: '/execution/monthly', icon: Calendar },
      { name: 'Habits', href: '/execution/habits', icon: Flame },
      { name: 'Achievements', href: '/achievements', icon: Trophy, badge: 'XP' },
    ],
  },
  {
    groupName: 'Planning & Projects',
    items: [
      { name: 'Goals', href: '/planning/goals', icon: Target },
      { name: 'Projects', href: '/planning/projects', icon: FolderGit2 },
    ],
  },
  {
    groupName: 'Engineering & Career',
    items: [
      { name: 'Career Engine', href: '/career', icon: Briefcase, badge: 'Flagship' },
      { name: 'Skills Matrix', href: '/skills', icon: Cpu },
      { name: 'MLOps Command', href: '/mlops', icon: Sparkles },
    ],
  },
  {
    groupName: 'Growth & Finance',
    items: [
      { name: 'Learning', href: '/learning', icon: GraduationCap },
      { name: 'Financial OS', href: '/finance', icon: Wallet },
      { name: 'Businesses', href: '/businesses', icon: Building2 },
    ],
  },
  {
    groupName: 'Knowledge',
    items: [
      { name: 'Workspace Studio', href: '/workspace', icon: BookOpen },
      { name: 'Knowledge Graph', href: '/workspace/graph', icon: Network },
      { name: 'Decisions', href: '/decisions', icon: Scale },
      { name: 'Notes', href: '/notes', icon: FileText },
    ],
  },
  {
    groupName: 'System',
    items: [
      { name: 'Settings & Auth', href: '/auth/login', icon: Settings },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Navigation Groups */}
          <nav className="space-y-5">
            {NAV_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="px-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">
                  {group.groupName}
                </span>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/workspace' && pathname.startsWith(item.href + '/'));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                          isActive
                            ? 'bg-[#C9A84C]/15 text-[#C9A84C] border-l-2 border-[#C9A84C]'
                            : 'text-gray-400 hover:text-gray-100 hover:bg-gray-900/60'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A84C]' : 'text-gray-400'}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                              item.badge === 'Flagship'
                                ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
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
            ))}
          </nav>
        </div>

        {/* Footer Profile & Theme Selector */}
        <div className="pt-4 border-t border-gray-800/80 px-2 space-y-3">
          <ThemeSelector />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-200">
                ENG
              </div>
              <div>
                <p className="text-xs font-medium text-gray-200">Engineer HQ</p>
                <p className="text-[9px] text-gray-500 font-mono">Cloud Synced</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        </div>
      </aside>
    </>
  );
};
