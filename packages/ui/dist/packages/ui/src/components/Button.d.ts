import React from 'react';
export interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
