import { jsx as _jsx } from "react/jsx-runtime";
const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg',
};
const variantClasses = {
    primary: 'bg-primary-neon text-white hover:opacity-90',
    ghost: 'bg-transparent text-primary-neon hover:bg-primary-neon/10',
};
export const Button = ({ label, onClick, variant = 'primary', size = 'md', disabled = false, }) => (_jsx("button", { type: "button", onClick: onClick, disabled: disabled, className: `rounded-md font-medium transition ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`, children: label }));
export default Button;
