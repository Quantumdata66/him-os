'use client';

import React from 'react';

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  track?: 'emerald' | 'intel' | 'gold';
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  maxScore = 100,
  size = 120,
  strokeWidth = 10,
  label,
  track = 'emerald',
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#10B981'; // Emerald
  if (track === 'intel') strokeColor = '#4776B4'; // Executive Sapphire
  if (track === 'gold' || score >= maxScore) strokeColor = '#C9A84C'; // Executive Gold for 100% completion

  return (
    <div className="flex flex-col items-center justify-center space-y-2 select-none font-sans">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#28353D"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold font-mono text-text-primary">{Math.round(score)}</span>
          <span className="text-[9px] font-mono text-text-muted">/ {maxScore}</span>
        </div>
      </div>

      {label && <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider font-mono">{label}</span>}
    </div>
  );
};
