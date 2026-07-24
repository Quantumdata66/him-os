import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10B981'; // Emerald
  if (score < 50) strokeColor = '#EF4444'; // Red
  else if (score < 75) strokeColor = '#F59E0B'; // Amber
  else if (score >= 85) strokeColor = '#C9A84C'; // Gold

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F2937"
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
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-mono font-bold text-gray-100">{score}%</span>
        </div>
      </div>
      {label && <span className="mt-2 text-xs font-semibold text-gray-200">{label}</span>}
      {sublabel && <span className="text-[10px] text-gray-400">{sublabel}</span>}
    </div>
  );
};
