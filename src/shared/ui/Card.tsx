'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'intel' | 'gold';
  glow?: boolean;
  goldBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  glow = false,
  goldBorder = false,
  ...props
}) => {
  const baseStyles = 'rounded-[18px] border transition-all duration-150 p-4 font-sans';

  const effectiveVariant = goldBorder ? 'gold' : variant;

  let variantStyles = 'bg-bg-elevated border-border-subtle hover:border-accent-emerald';
  if (effectiveVariant === 'elevated') {
    variantStyles = 'bg-bg-elevated border-border-subtle hover:border-accent-mint';
  } else if (effectiveVariant === 'intel') {
    variantStyles = 'bg-bg-elevated border-border-subtle hover:border-intel-steel';
  } else if (effectiveVariant === 'gold') {
    variantStyles = 'bg-bg-elevated border-accent-gold/40 hover:border-accent-gold';
  }

  let glowStyles = '';
  if (glow || goldBorder) {
    if (effectiveVariant === 'intel') glowStyles = 'intel-glow';
    else if (effectiveVariant === 'gold') glowStyles = 'gold-glow';
    else glowStyles = 'forest-glow';
  }

  return (
    <div className={`${baseStyles} ${variantStyles} ${glowStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
