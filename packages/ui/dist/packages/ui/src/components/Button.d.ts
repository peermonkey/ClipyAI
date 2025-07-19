import React from 'react';
export interface ButtonProps {
    children?: React.ReactNode;
    label?: string;
    onClick?: () => void;
    variant?: 'primary' | 'ghost' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
