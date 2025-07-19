import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function TimelineScrubber({ duration, start, end, currentTime = 0, highlights = [], waveform = [], showWaveform = false, showControls = true, showHighlights = true, onChange, onSeek }) {
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
    const handleSeek = (e) => {
        const time = Number(e.target.value);
        onSeek?.(time);
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const getHighlightColor = (type) => {
        switch (type) {
            case 'viral': return 'bg-red-500';
            case 'engaging': return 'bg-blue-500';
            case 'quotable': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };
    return (_jsxs("div", { className: "flex flex-col gap-4 w-full", children: [_jsxs("div", { className: "relative", children: [showWaveform && waveform.length > 0 && (_jsx("div", { className: "flex items-end h-16 mb-2 bg-gray-800 rounded px-1", children: waveform.map((amplitude, index) => (_jsx("div", { className: "flex-1 bg-gray-400 mx-px rounded-t", style: { height: `${amplitude * 100}%` } }, index))) })), _jsxs("div", { className: "relative h-4 bg-gray-800 rounded-full overflow-hidden", children: [_jsx("div", { className: "absolute h-full bg-primary-neon opacity-30", style: {
                                    left: `${(localStart / duration) * 100}%`,
                                    width: `${((localEnd - localStart) / duration) * 100}%`,
                                } }), _jsx("div", { className: "absolute w-1 h-full bg-white z-10", style: { left: `${(currentTime / duration) * 100}%` } }), showHighlights && highlights.map((highlight, index) => (_jsx("div", { className: `absolute h-full ${getHighlightColor(highlight.type)} opacity-60`, style: {
                                    left: `${(highlight.start / duration) * 100}%`,
                                    width: `${((highlight.end - highlight.start) / duration) * 100}%`,
                                }, title: `${highlight.label} (${highlight.confidence}% confidence)` }, index))), _jsx("input", { type: "range", min: 0, max: duration, value: currentTime, onChange: handleSeek, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" })] }), _jsxs("div", { className: "flex justify-between text-xs text-gray-400 mt-1", children: [_jsx("span", { children: "0:00" }), _jsx("span", { children: formatTime(duration) })] })] }), showControls && (_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { className: "text-gray-400", children: "Start:" }), _jsx("span", { children: formatTime(localStart) }), _jsx("input", { type: "range", min: 0, max: duration, value: localStart, onChange: handleStart, className: "w-24 accent-primary-neon" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { className: "text-gray-400", children: "End:" }), _jsx("span", { children: formatTime(localEnd) }), _jsx("input", { type: "range", min: 0, max: duration, value: localEnd, onChange: handleEnd, className: "w-24 accent-primary-neon" })] }), _jsxs("div", { className: "text-xs text-gray-400", children: ["Duration: ", formatTime(localEnd - localStart)] })] })), showHighlights && highlights.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 text-xs", children: highlights.map((highlight, index) => (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: `w-3 h-3 rounded ${getHighlightColor(highlight.type)}` }), _jsx("span", { children: highlight.label }), _jsxs("span", { className: "text-gray-400", children: ["(", highlight.confidence, "%)"] })] }, index))) }))] }));
}
