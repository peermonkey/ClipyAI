import { jsx as _jsx } from "react/jsx-runtime";
export const CreditMeter = ({ credits, max }) => {
    const pct = Math.min(credits / max, 1);
    let color = 'bg-primary-neon';
    if (credits / max < 0.1)
        color = 'bg-red-500';
    else if (credits / max < 0.3)
        color = 'bg-orange-400';
    return (_jsx("div", { className: "w-full h-3 bg-gray-700 rounded", children: _jsx("div", { className: `h-full rounded ${color}`, style: { width: `${pct * 100}%` } }) }));
};
export default CreditMeter;
