'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '⚡' },
  { name: 'Workspace Studio', href: '/workspace', icon: '📓', badge: 'v3.0' },
  { name: 'Knowledge Graph', href: '/workspace/graph', icon: '🕸️' },
  { name: 'Achievements', href: '/achievements', icon: '🏆', badge: 'v2.0' },
  { name: 'Daily Execution', href: '/execution/daily', icon: '🎯', badge: 'Core' },
  { name: 'Weekly Sprint', href: '/execution/weekly', icon: '🏃' },
  { name: 'Monthly Review', href: '/execution/monthly', icon: '📅' },
  { name: 'Habits', href: '/execution/habits', icon: '🔥' },
  { name: 'Goals', href: '/planning/goals', icon: '🏆' },
  { name: 'Projects', href: '/planning/projects', icon: '💻' },
  { name: 'Career Engine', href: '/career', icon: '⭐', badge: 'Flagship' },
  { name: 'Skills Matrix', href: '/skills', icon: '🧠' },
  { name: 'Learning Engine', href: '/learning', icon: '📚' },
  { name: 'Financial OS', href: '/finance', icon: '💰' },
  { name: 'Businesses', href: '/businesses', icon: '🏢' },
  { name: 'Decision Journal', href: '/decisions', icon: '⚖️' },
  { name: 'Notes', href: '/notes', icon: '📝' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0A0E1A] border-r border-gray-800/60 min-h-screen flex flex-col justify-between p-4 select-none">
      <div>
        {/* Brand Header */}
        <div className="px-3 py-4 mb-6 border-b border-gray-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C] font-bold text-lg">
              H
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-gray-100 tracking-wide">HIM OS</h1>
              <p className="text-[10px] text-[#C9A84C] font-medium uppercase tracking-widest">v3.0 • NGN</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-gray-400 italic">"Prototype Today. Legacy Tomorrow."</p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/workspace' && pathname.startsWith(item.href + '/'));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#C9A84C]/15 text-[#C9A84C] border-l-2 border-[#C9A84C]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                      item.badge === 'Flagship'
                        ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30'
                        : item.badge === 'v3.0'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-500/20 text-purple-400'
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

      {/* Footer Profile */}
      <div className="pt-4 border-t border-gray-800/60 px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-200">
              ENG
            </div>
            <div>
              <p className="text-xs font-medium text-gray-200">Engineer Profile</p>
              <p className="text-[10px] text-gray-500">Cloud Sync Ready (NGN)</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="System Active"></span>
        </div>
      </div>
    </aside>
  );
};
