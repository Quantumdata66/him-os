'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Shield, LogOut } from 'lucide-react';

export const UserProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User Profile Menu"
        aria-expanded={isOpen}
        className="flex items-center space-x-2.5 p-1 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-emerald transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-mint"
      >
        <div className="w-7 h-7 rounded-lg bg-accent-emerald/20 border border-accent-emerald/50 flex items-center justify-center text-accent-mint font-bold text-xs">
          A
        </div>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="User Account Settings"
          className="absolute right-0 mt-2 w-56 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-2"
        >
          <div className="px-2 py-2 border-b border-border-subtle space-y-0.5">
            <h4 className="text-xs font-bold font-sans text-text-primary">Abdulazeez Adedotun</h4>
            <p className="text-[10px] font-mono text-accent-mint">Executive Engineer • Owner</p>
          </div>

          <div className="space-y-1">
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-sans text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
            >
              <Settings className="w-3.5 h-3.5 text-text-muted" />
              <span>Settings & Security</span>
            </Link>

            <Link
              href="/auth/audit"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-sans text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
            >
              <Shield className="w-3.5 h-3.5 text-text-muted" />
              <span>Security Audit Log</span>
            </Link>
          </div>

          <div className="pt-1 border-t border-border-subtle">
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-sans text-red-400 hover:bg-red-950/30 transition-colors duration-150"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
