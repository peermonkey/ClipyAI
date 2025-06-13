import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../utils/cn';
export const Card = ({ elevation = 'flat', className, children, ...props }) => (_jsx("div", { className: cn('rounded-lg p-4 backdrop-blur-sm', elevation === 'glass' ? 'bg-white/10 shadow-lg' : 'bg-white/5', className), ...props, children: children }));
export default Card;
