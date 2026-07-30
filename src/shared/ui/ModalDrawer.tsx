'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

interface ModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ModalDrawer: React.FC<ModalDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <Card goldBorder className="w-full max-w-xl max-h-[90vh] overflow-y-auto space-y-4 bg-[#0D1322] border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div>
            <h2 className="text-lg font-serif font-bold text-gray-100">{title}</h2>
            {subtitle && <p className="text-xs text-gray-400 font-mono mt-0.5">{subtitle}</p>}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-100">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div>{children}</div>
      </Card>
    </div>
  );
};
