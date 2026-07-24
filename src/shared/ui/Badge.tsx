import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'blue' | 'purple' | 'red' | 'gray';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const variants = {
    gold: 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    red: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    gray: 'bg-gray-800 text-gray-400 border border-gray-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
