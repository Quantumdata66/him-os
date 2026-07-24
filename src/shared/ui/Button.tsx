import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#C9A84C] text-[#0A0E1A] hover:bg-[#D4B65B] font-semibold focus:ring-[#C9A84C]',
    secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700 focus:ring-gray-600',
    outline: 'border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10 focus:ring-[#C9A84C]',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
