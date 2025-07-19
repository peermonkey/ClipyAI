import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function VideoPlayer({ src, poster, currentTime, aspectRatio, className, onTimeUpdate }) {
    return (_jsx("div", { className: `relative bg-black rounded-lg overflow-hidden ${className || ''}`, children: _jsxs("video", { className: "w-full h-full", src: src, poster: poster, controls: true, style: { aspectRatio }, onTimeUpdate: (e) => onTimeUpdate?.(e.currentTarget.currentTime), children: [_jsx("source", { src: src, type: "video/mp4" }), "Your browser does not support the video tag."] }) }));
}
