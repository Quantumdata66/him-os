import React from 'react';
import { cn } from './cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090B] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#C9A84C] text-gray-950 hover:bg-[#D4AF37] font-semibold focus:ring-[#C9A84C]/50 shadow-sm shadow-[#C9A84C]/20',
    secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700/60 focus:ring-gray-600',
    outline: 'border border-gray-700/80 bg-transparent text-gray-200 hover:bg-gray-800/60 hover:border-gray-600 focus:ring-gray-600',
    ghost: 'bg-transparent text-gray-400 hover:text-gray-100 hover:bg-gray-800/40 focus:ring-gray-600',
    gold: 'bg-gradient-to-r from-[#C9A84C] to-[#D4AF37] text-gray-950 font-bold hover:brightness-110 shadow-md shadow-[#C9A84C]/20',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-md space-x-1.5',
    md: 'text-xs px-4 py-2 rounded-lg space-x-2',
    lg: 'text-sm px-5 py-2.5 rounded-lg space-x-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
