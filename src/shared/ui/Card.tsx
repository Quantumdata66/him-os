'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  goldBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', goldBorder = false }) => {
  return (
    <div
      className={`p-6 rounded-[18px] bg-[#163526] border ${
        goldBorder ? 'border-[#22C55E] shadow-lg shadow-[#22C55E]/10' : 'border-[#2B4D3E]'
      } transition-all duration-200 hover:border-[#22C55E]/60 ${className}`}
    >
      {children}
    </div>
  );
};
