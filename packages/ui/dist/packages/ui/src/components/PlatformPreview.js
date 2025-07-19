import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function PlatformPreview({ platform, videoSrc, aspectRatio, title, description, hashtags }) {
    const platformStyles = {
        youtube: 'bg-red-600',
        tiktok: 'bg-black',
        instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
        twitter: 'bg-blue-500'
    };
    return (_jsxs("div", { className: `rounded-lg p-4 ${platformStyles[platform]}`, children: [_jsxs("div", { className: "text-white text-sm font-medium mb-2 capitalize", children: [platform, " Preview"] }), _jsxs("div", { className: "bg-white rounded overflow-hidden", children: [_jsx("video", { className: "w-full h-48 object-cover", src: videoSrc, muted: true, style: { aspectRatio }, children: _jsx("source", { src: videoSrc, type: "video/mp4" }) }), title && (_jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "font-medium text-gray-900", children: title }), description && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: description })), hashtags && hashtags.length > 0 && (_jsx("div", { className: "mt-2", children: _jsx("div", { className: "flex flex-wrap gap-1", children: hashtags.map((tag, index) => (_jsxs("span", { className: "text-xs text-blue-600", children: ["#", tag] }, index))) }) }))] }))] })] }));
}
