import React from 'react';

interface ViralScoreBreakdown {
  overall: number;
  engagement?: number;
  trending?: number;
  uniqueness?: number;
  timing?: number;
}

interface ViralScoreMeterProps {
  score: number | ViralScoreBreakdown;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
}

export function ViralScoreMeter({ 
  score, 
  className = '', 
  size = 'md',
  showBreakdown = false 
}: ViralScoreMeterProps) {
  const scoreValue = typeof score === 'number' ? score : score.overall;
  const breakdown = typeof score === 'object' ? score : null;
  
  const clampedScore = Math.max(0, Math.min(100, scoreValue));
  
  const sizeConfig = {
    sm: { width: 80, height: 80, strokeWidth: 4, fontSize: 'text-sm' },
    md: { width: 120, height: 120, strokeWidth: 6, fontSize: 'text-lg' },
    lg: { width: 160, height: 160, strokeWidth: 8, fontSize: 'text-xl' },
  };
  
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 stroke-green-500';
    if (score >= 60) return 'text-yellow-500 stroke-yellow-500';
    if (score >= 40) return 'text-orange-500 stroke-orange-500';
    return 'text-red-500 stroke-red-500';
  };
  
  const scoreColor = getScoreColor(clampedScore);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={config.width} height={config.height} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            fill="transparent"
            className="text-gray-300"
          />
          {/* Progress circle */}
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={radius}
            strokeWidth={config.strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={scoreColor}
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center ${scoreColor}`}>
            <div className={`font-bold ${config.fontSize}`}>
              {Math.round(clampedScore)}
            </div>
            <div className="text-xs opacity-75">
              Viral Score
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="text-xs text-gray-500">
          {clampedScore >= 80 && '🔥 Highly Viral'}
          {clampedScore >= 60 && clampedScore < 80 && '⚡ Good Potential'}
          {clampedScore >= 40 && clampedScore < 60 && '📈 Moderate'}
          {clampedScore < 40 && '📊 Needs Work'}
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && breakdown && (
        <div className="mt-4 space-y-1 text-xs">
          {breakdown.engagement && (
            <div className="flex justify-between">
              <span>Engagement:</span>
              <span>{breakdown.engagement}</span>
            </div>
          )}
          {breakdown.trending && (
            <div className="flex justify-between">
              <span>Trending:</span>
              <span>{breakdown.trending}</span>
            </div>
          )}
          {breakdown.uniqueness && (
            <div className="flex justify-between">
              <span>Uniqueness:</span>
              <span>{breakdown.uniqueness}</span>
            </div>
          )}
          {breakdown.timing && (
            <div className="flex justify-between">
              <span>Timing:</span>
              <span>{breakdown.timing}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}