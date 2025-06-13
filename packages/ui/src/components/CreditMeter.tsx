import React from 'react';

interface CreditMeterProps {
  credits: number;
  max: number;
}

export const CreditMeter: React.FC<CreditMeterProps> = ({ credits, max }) => {
  const pct = Math.min(credits / max, 1);
  let color = 'bg-primary-neon';
  if (credits / max < 0.1) color = 'bg-red-500';
  else if (credits / max < 0.3) color = 'bg-orange-400';

  return (
    <div className="w-full h-3 bg-gray-700 rounded">
      <div className={`h-full rounded ${color}`} style={{ width: `${pct * 100}%` }} />
    </div>
  );
};

export default CreditMeter; 