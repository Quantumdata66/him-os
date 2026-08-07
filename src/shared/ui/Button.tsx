'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'intel' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-mint disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs space-x-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm space-x-2',
    lg: 'px-6 py-3 text-sm font-bold space-x-2.5',
  };

  const variantStyles = {
    primary: 'bg-accent-emerald text-bg-primary hover:bg-accent-emerald/90 shadow-sm',
    outline: 'bg-bg-elevated border border-border-subtle text-text-primary hover:border-accent-emerald hover:bg-bg-subtle',
    secondary: 'bg-bg-subtle text-text-primary hover:bg-bg-elevated border border-transparent',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-subtle',
    intel: 'bg-intel-sapphire text-white hover:bg-intel-slate focus:ring-intel-slate shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
