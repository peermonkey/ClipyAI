import React from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'glass' | 'flat';
}

export const Card: React.FC<CardProps> = ({ elevation = 'flat', className, children, ...props }) => (
  <div
    className={cn(
      'rounded-lg p-4 backdrop-blur-sm',
      elevation === 'glass' ? 'bg-white/10 shadow-lg' : 'bg-white/5',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card; 