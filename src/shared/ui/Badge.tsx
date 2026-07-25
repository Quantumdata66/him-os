import React from 'react';
import { cn } from './cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'blue' | 'purple' | 'gray' | 'red';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors select-none';

  const variants = {
    gold: 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    gray: 'bg-gray-800 text-gray-300 border border-gray-700/60',
    red: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};
