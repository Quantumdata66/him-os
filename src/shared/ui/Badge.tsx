'use client';

import React from 'react';

export type BadgeVariant =
  | 'default'
  | 'emerald'
  | 'mint'
  | 'intel'
  | 'gold'
  | 'warning'
  | 'danger'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray'
  | 'red';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'sm',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-semibold rounded-md uppercase tracking-wider select-none';

  const sizeStyles = {
    sm: 'px-1.5 py-0.5 text-[9px]',
    md: 'px-2 py-1 text-[10px]',
  };

  // Map legacy color variant aliases
  let effectiveVariant = variant;
  if (variant === 'green') effectiveVariant = 'emerald';
  if (variant === 'blue' || variant === 'purple') effectiveVariant = 'intel';
  if (variant === 'gray') effectiveVariant = 'default';
  if (variant === 'red') effectiveVariant = 'danger';

  const variantStyles = {
    default: 'bg-bg-subtle text-text-secondary border border-border-subtle',
    emerald: 'bg-accent-emerald/20 text-accent-mint border border-accent-emerald/30',
    mint: 'bg-accent-mint/20 text-accent-mint border border-accent-mint/30',
    intel: 'bg-intel-sapphire/20 text-intel-slate border border-intel-sapphire/30',
    gold: 'bg-accent-gold/20 text-accent-gold border border-accent-gold/40',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    green: 'bg-accent-emerald/20 text-accent-mint border border-accent-emerald/30',
    blue: 'bg-intel-sapphire/20 text-intel-slate border border-intel-sapphire/30',
    purple: 'bg-intel-sapphire/20 text-intel-slate border border-intel-sapphire/30',
    gray: 'bg-bg-subtle text-text-secondary border border-border-subtle',
    red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[effectiveVariant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
