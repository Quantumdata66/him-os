'use client';

import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

export interface MetricCardProps {
  title?: string;
  label?: string;
  value: string | number;
  change?: string;
  trendValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ElementType;
  subtitle?: string;
  subtext?: string;
  badgeText?: string;
  badgeVariant?: string;
  track?: 'emerald' | 'intel' | 'gold' | 'default';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  label,
  value,
  change,
  trendValue,
  trend = 'neutral',
  icon: Icon,
  subtitle,
  subtext,
  badgeText,
  badgeVariant,
  track = 'default',
}) => {
  const displayTitle = title || label || '';
  const displaySubtitle = subtitle || subtext || '';
  const displayChange = change || trendValue || '';

  let iconTrackStyles = 'bg-bg-subtle text-text-secondary border-border-subtle';
  if (track === 'emerald') {
    iconTrackStyles = 'bg-accent-emerald/15 text-accent-mint border-accent-emerald/30';
  } else if (track === 'intel') {
    iconTrackStyles = 'bg-intel-sapphire/15 text-intel-slate border-intel-sapphire/30';
  } else if (track === 'gold') {
    iconTrackStyles = 'bg-accent-gold/15 text-accent-gold border-accent-gold/30';
  }

  let trendColor = 'text-text-muted';
  if (trend === 'up') trendColor = 'text-accent-mint';
  if (trend === 'down') trendColor = 'text-red-400';

  return (
    <Card className="flex flex-col justify-between space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase font-mono truncate">
          {displayTitle}
        </span>
        <div className="flex items-center space-x-2">
          {badgeText && <Badge variant={(badgeVariant as any) || 'default'}>{badgeText}</Badge>}
          {Icon && (
            <div className={`p-1.5 rounded-xl border shrink-0 ${iconTrackStyles}`}>
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold font-mono text-text-primary tracking-tight">{value}</div>
        {(displayChange || displaySubtitle) && (
          <div className="flex items-center space-x-2 text-xs">
            {displayChange && <span className={`font-mono font-semibold ${trendColor}`}>{displayChange}</span>}
            {displaySubtitle && <span className="text-text-muted truncate">{displaySubtitle}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};
