import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  goldBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', goldBorder = false }) => {
  return (
    <div
      className={`bg-[#111827] border ${
        goldBorder ? 'border-[#C9A84C]/40 hover:border-[#C9A84C]' : 'border-gray-800 hover:border-gray-700'
      } rounded-xl p-5 shadow-lg transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
};
