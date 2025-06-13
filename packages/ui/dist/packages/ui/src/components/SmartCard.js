import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function SmartCard({ id, thumbUrl, duration, onClick }) {
    return (_jsx("div", { className: "rounded-lg overflow-hidden bg-black/30 shadow hover:shadow-lg transition cursor-pointer", onClick: () => onClick?.(id), children: _jsxs("div", { className: "relative w-full aspect-video", children: [_jsx("img", { src: thumbUrl, alt: "Clip thumbnail", className: "object-cover" }), _jsxs("span", { className: "absolute bottom-1 right-1 text-xs bg-black/70 px-1 rounded", children: [Math.floor(duration / 60), ":", String(duration % 60).padStart(2, '0')] })] }) }));
}
