import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function CaptionEditor({ captions, onCaptionsChange, currentTime, duration = 60 }) {
    const [selectedCaption, setSelectedCaption] = useState(null);
    // Normalize captions to use startTime/endTime
    const normalizedCaptions = captions.map(caption => ({
        ...caption,
        startTime: caption.startTime ?? caption.start ?? 0,
        endTime: caption.endTime ?? caption.end ?? 2,
    }));
    const addCaption = () => {
        const newCaption = {
            id: Date.now().toString(),
            text: 'New caption',
            startTime: currentTime || 0,
            endTime: (currentTime || 0) + 2,
        };
        onCaptionsChange([...normalizedCaptions, newCaption]);
    };
    const updateCaption = (id, updates) => {
        const updated = normalizedCaptions.map(caption => caption.id === id ? { ...caption, ...updates } : caption);
        onCaptionsChange(updated);
    };
    const deleteCaption = (id) => {
        onCaptionsChange(normalizedCaptions.filter(caption => caption.id !== id));
    };
    return (_jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Caption Editor" }), _jsx("button", { onClick: addCaption, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Add Caption" })] }), _jsx("div", { className: "space-y-3", children: normalizedCaptions.map((caption) => (_jsxs("div", { className: `border rounded-lg p-3 cursor-pointer transition-colors ${selectedCaption?.id === caption.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'}`, onClick: () => setSelectedCaption(caption), children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "text-sm text-gray-500", children: [caption.startTime.toFixed(1), "s - ", caption.endTime.toFixed(1), "s"] }), _jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        deleteCaption(caption.id);
                                    }, className: "text-red-500 hover:text-red-700 text-sm", children: "Delete" })] }), _jsx("textarea", { value: caption.text, onChange: (e) => updateCaption(caption.id, { text: e.target.value }), className: "w-full text-sm border-none resize-none outline-none", rows: 2, onClick: (e) => e.stopPropagation() })] }, caption.id))) }), selectedCaption && (_jsxs("div", { className: "mt-6 p-4 border-t", children: [_jsx("h4", { className: "font-medium mb-3", children: "Caption Timing" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Time (s)" }), _jsx("input", { type: "number", value: selectedCaption.startTime, onChange: (e) => updateCaption(selectedCaption.id, {
                                            startTime: Math.max(0, Math.min(duration, parseFloat(e.target.value) || 0))
                                        }), className: "w-full px-3 py-2 border border-gray-300 rounded-md", step: "0.1", min: "0", max: duration })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Time (s)" }), _jsx("input", { type: "number", value: selectedCaption.endTime, onChange: (e) => updateCaption(selectedCaption.id, {
                                            endTime: Math.max(selectedCaption.startTime || 0, Math.min(duration, parseFloat(e.target.value) || 0))
                                        }), className: "w-full px-3 py-2 border border-gray-300 rounded-md", step: "0.1", min: selectedCaption.startTime || 0, max: duration })] })] })] }))] }));
}
