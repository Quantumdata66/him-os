import React from 'react';
import { cn } from './cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  goldBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  goldBorder = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-[#111827] rounded-xl p-5 border transition-all duration-200 shadow-sm hover:shadow-md',
        goldBorder
          ? 'border-[#C9A84C]/40 hover:border-[#C9A84C]/70 shadow-[#C9A84C]/5'
          : 'border-gray-800/80 hover:border-gray-700/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
