'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Briefcase, BookOpen, Cpu, Check } from 'lucide-react';

export type WorkspaceContext = 'Personal' | 'Business' | 'Research' | 'Development';

interface WorkspaceOption {
  id: WorkspaceContext;
  label: string;
  icon: React.ElementType;
  description: string;
}

const WORKSPACES: WorkspaceOption[] = [
  { id: 'Personal', label: 'Personal', icon: User, description: 'Life goals, health & daily routines' },
  { id: 'Business', label: 'Business', icon: Briefcase, description: 'Venture P&L, clients & revenue' },
  { id: 'Research', label: 'Research', icon: BookOpen, description: 'Anki decks, book notes & deep study' },
  { id: 'Development', label: 'Development', icon: Cpu, description: 'Engineering, repos & MLOps' },
];

export const WorkspaceSwitcher: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceContext>('Personal');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = WORKSPACES.find((w) => w.id === activeWorkspace) || WORKSPACES[0];
  const ActiveIcon = activeOption.icon;

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

  const handleSelect = (id: WorkspaceContext) => {
    setActiveWorkspace(id);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Operational Workspace Context"
        className="flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-emerald text-text-primary transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-mint"
      >
        <ActiveIcon className="w-3.5 h-3.5 text-accent-mint" />
        <span className="text-xs font-semibold font-sans tracking-wide">{activeOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Workspace Contexts"
          className="absolute right-0 mt-2 w-64 bg-bg-surface border border-border-subtle rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-150 space-y-1"
        >
          <div className="px-2 py-1 border-b border-border-subtle mb-1">
            <span className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider block">
              Executive Context
            </span>
          </div>

          {WORKSPACES.map((w) => {
            const Icon = w.icon;
            const isSelected = w.id === activeWorkspace;

            return (
              <button
                key={w.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(w.id)}
                className={`w-full flex items-start space-x-2.5 p-2 rounded-lg text-left transition-all duration-150 ${
                  isSelected
                    ? 'bg-bg-subtle text-accent-mint font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-accent-mint' : 'text-text-muted'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium font-sans">{w.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-accent-mint" />}
                  </div>
                  <p className="text-[10px] text-text-muted truncate font-sans">{w.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
