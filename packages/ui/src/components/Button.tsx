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

type Size = Required<ButtonProps>['size'];
type Variant = Required<ButtonProps>['variant'];

const sizeClasses: Record<Size, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2',
  lg: 'px-4 py-3 text-lg',
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-neon text-black hover:bg-primary-neon/90',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  ghost: 'bg-transparent text-primary-neon hover:bg-primary-neon/10',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
  type = 'button',
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`rounded-md font-medium transition focus:ring-2 focus:ring-focus-outline focus:outline-none ${fullWidth ? 'w-full flex items-center' : ''} ${sizeClasses[size as Size]} ${variantClasses[variant as Variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {children || label}
  </button>
);

export default Button;
