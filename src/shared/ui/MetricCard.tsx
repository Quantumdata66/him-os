'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badgeText?: string;
  badgeVariant?: 'gold' | 'green' | 'blue' | 'purple' | 'gray';
  icon?: LucideIcon;
  goldBorder?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  badgeText,
  badgeVariant = 'gold',
  icon: Icon,
  goldBorder = false,
  trend,
  trendValue,
}) => {
  return (
    <Card goldBorder={goldBorder} className="space-y-3 p-4 flex flex-col justify-between transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">{label}</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl md:text-3xl font-mono font-bold text-gray-100">{value}</span>
            {trendValue && (
              <span className={`text-xs font-mono font-semibold ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {badgeText && (
            <Badge variant={badgeVariant} className="text-[9px]">
              {badgeText}
            </Badge>
          )}
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-[#C9A84C]">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {subtext && <p className="text-xs text-gray-400 leading-relaxed font-sans">{subtext}</p>}
    </Card>
  );
};
