import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Command } from 'cmdk';
const routes = [
    { name: 'Dashboard', path: '/' },
    { name: 'Upload', path: '/upload' },
    { name: 'Credits', path: '/credits' },
];
export default function CommandPalette({ onNavigate }) {
    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
    const handleSelect = (path) => {
        setOpen(false);
        if (onNavigate) {
            onNavigate(path);
        }
    };
    return (_jsxs(Command.Dialog, { open: open, onOpenChange: setOpen, label: "Command Menu", className: "fixed inset-0 z-50 flex items-start justify-center p-4", children: [_jsx(Command.Input, { placeholder: "Type a command or search\u2026", className: "w-full border-0 p-4 text-lg bg-surface-matte text-white rounded-t" }), _jsx(Command.List, { className: "max-h-60 overflow-y-auto bg-surface-matte rounded-b", children: routes.map((r) => (_jsx(Command.Item, { onSelect: () => handleSelect(r.path), className: "px-4 py-2 hover:bg-primary-neon/20", children: r.name }, r.path))) })] }));
}
