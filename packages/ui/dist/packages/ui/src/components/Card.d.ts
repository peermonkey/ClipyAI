import React from 'react';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    elevation?: 'glass' | 'flat';
}
export declare const Card: React.FC<CardProps>;
export default Card;
