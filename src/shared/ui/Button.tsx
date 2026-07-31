'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-[12px] transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#22C55E] text-[#071A12] font-bold hover:bg-[#4ADE80] shadow-md shadow-[#22C55E]/20',
    secondary: 'bg-[#1D4735] text-[#F9FAFB] hover:bg-[#22C55E]/20 border border-[#2B4D3E]',
    outline: 'border border-[#2B4D3E] text-gray-200 hover:border-[#22C55E] hover:text-[#4ADE80] bg-transparent',
    ghost: 'text-gray-400 hover:text-[#F9FAFB] hover:bg-[#1D4735]/50 bg-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
