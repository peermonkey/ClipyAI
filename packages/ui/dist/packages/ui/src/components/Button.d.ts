import React from 'react';
export interface ButtonProps {
    children?: React.ReactNode;
    label?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
