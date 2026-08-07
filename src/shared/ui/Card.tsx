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

  let variantStyles = 'bg-bg-elevated border-border-subtle hover:border-bg-subtle';
  if (effectiveVariant === 'elevated') {
    variantStyles = 'bg-bg-elevated border-border-subtle hover:border-bg-subtle';
  } else if (effectiveVariant === 'intel') {
    variantStyles = 'bg-bg-elevated border-intel-sapphire/30 hover:border-intel-slate/50';
  } else if (effectiveVariant === 'gold') {
    variantStyles = 'bg-bg-elevated border-accent-gold/30 hover:border-accent-gold/50';
  }

  let glowStyles = '';
  if (glow || goldBorder) {
    if (effectiveVariant === 'intel') glowStyles = 'intel-glow';
    else if (effectiveVariant === 'gold') glowStyles = 'gold-glow';
  }

  return (
    <div className={`${baseStyles} ${variantStyles} ${glowStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
