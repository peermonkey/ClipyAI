import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function TimelineScrubber({ duration, start, end, currentTime = 0, highlights = [], waveform = [], showWaveform = false, showHighlights = false, onChange, onSeek }) {
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
    return (_jsxs("div", { className: "flex flex-col gap-2 w-full", children: [_jsxs("div", { className: "relative w-full h-12 bg-gray-200 rounded", children: [showWaveform && waveform.length > 0 && (_jsx("div", { className: "absolute inset-0 flex items-end justify-around px-1", children: waveform.map((level, index) => (_jsx("div", { className: "bg-gray-400 w-1 rounded-t", style: { height: `${Math.max(level * 100, 2)}%` } }, index))) })), showHighlights && highlights.map((highlight, index) => {
                        const startPercent = (highlight.start / duration) * 100;
                        const widthPercent = ((highlight.end - highlight.start) / duration) * 100;
                        const colors = {
                            viral: 'bg-red-400',
                            engaging: 'bg-blue-400',
                            quotable: 'bg-green-400'
                        };
                        return (_jsx("div", { className: `absolute top-0 h-2 ${colors[highlight.type]} opacity-70 rounded`, style: {
                                left: `${startPercent}%`,
                                width: `${widthPercent}%`
                            }, title: `${highlight.label} (${highlight.confidence}% confidence)` }, index));
                    }), _jsx("div", { className: "absolute top-0 w-0.5 h-full bg-red-500", style: { left: `${(currentTime / duration) * 100}%` } }), _jsx("div", { className: "absolute top-2 h-8 bg-blue-500 opacity-30 rounded", style: {
                            left: `${(localStart / duration) * 100}%`,
                            width: `${((localEnd - localStart) / duration) * 100}%`
                        } }), _jsx("div", { className: "absolute inset-0 cursor-pointer", onClick: (e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickPercent = (e.clientX - rect.left) / rect.width;
                            const seekTime = clickPercent * duration;
                            onSeek?.(seekTime);
                        } })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-600", children: [_jsxs("span", { children: [localStart.toFixed(1), "s"] }), _jsx("input", { type: "range", min: 0, max: duration, step: "0.1", value: localStart, onChange: handleStart, className: "flex-1 accent-blue-500" }), _jsx("input", { type: "range", min: 0, max: duration, step: "0.1", value: localEnd, onChange: handleEnd, className: "flex-1 accent-blue-500" }), _jsxs("span", { children: [localEnd.toFixed(1), "s"] })] })] }));
}
