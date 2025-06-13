import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

type Size = Required<ButtonProps>['size'];
type Variant = Required<ButtonProps>['variant'];

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2',
  lg: 'px-4 py-3 text-lg',
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-neon text-black hover:bg-primary-neon/90',
  ghost: 'bg-transparent text-primary-neon hover:bg-primary-neon/10',
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: ButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`rounded-md font-medium transition focus:ring-2 focus:ring-focus-outline focus:outline-none ${sizeClasses[size as Size]} ${variantClasses[variant as Variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {label}
  </button>
);

export default Button;
