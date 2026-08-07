'use client';

import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { NotificationPopover } from './NotificationPopover';
import { UserProfileMenu } from './UserProfileMenu';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const triggerCommandPalette = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
    window.dispatchEvent(event);
  };

  return (
    <header className="h-14 bg-bg-surface border-b border-border-subtle px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile Hamburger Toggle + Breadcrumbs */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Sidebar"
          className="lg:hidden p-2 rounded-xl bg-bg-elevated border border-border-subtle text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-mint shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Center: Command Palette Search Trigger Pill */}
      <div className="hidden md:flex items-center justify-center flex-1 max-w-sm mx-4">
        <button
          onClick={triggerCommandPalette}
          aria-label="Open Command Palette Search (Ctrl+K)"
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-emerald text-text-secondary hover:text-text-primary transition-all duration-150 text-xs focus:outline-none focus:ring-2 focus:ring-accent-mint"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-text-muted" />
            <span className="font-sans">Search commands or hubs...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-subtle border border-border-subtle text-text-muted font-semibold">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Workspace Switcher + Notification Popover + Profile Menu */}
      <div className="flex items-center space-x-2.5 shrink-0">
        <WorkspaceSwitcher />
        <NotificationPopover />
        <UserProfileMenu />
      </div>
    </header>
  );
};
