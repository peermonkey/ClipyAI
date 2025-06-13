import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
export default function TimelineScrubber({ duration, start, end, onChange }) {
    const [localStart, setLocalStart] = useState(start);
    const [localEnd, setLocalEnd] = useState(end);
    const handleStart = (e) => {
        const val = Number(e.target.value);
        if (val >= 0 && val < localEnd) {
            setLocalStart(val);
            onChange?.(val, localEnd);
        }
    };
    const handleEnd = (e) => {
        const val = Number(e.target.value);
        if (val <= duration && val > localStart) {
            setLocalEnd(val);
            onChange?.(localStart, val);
        }
    };
    return (_jsx("div", { className: "flex flex-col gap-2 w-full", children: _jsxs("div", { className: "flex items-center gap-2 text-xs text-text-muted", children: [_jsxs("span", { children: [localStart, "s"] }), _jsx("input", { type: "range", min: 0, max: duration, value: localStart, onChange: handleStart, className: "flex-1 accent-primary-neon" }), _jsx("input", { type: "range", min: 0, max: duration, value: localEnd, onChange: handleEnd, className: "flex-1 accent-primary-neon" }), _jsxs("span", { children: [localEnd, "s"] })] }) }));
}
