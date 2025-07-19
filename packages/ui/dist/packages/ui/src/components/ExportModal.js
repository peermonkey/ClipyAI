'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button } from './Button';
const PRESETS = [
    { key: '9:16', label: 'Vertical (9:16)' },
    { key: '1:1', label: 'Square (1:1)' },
    { key: '16:9', label: 'Landscape (16:9)' },
];
export function ExportModal({ clipId, apiUrl }) {
    const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || '';
    const [open, setOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loadingPreset, setLoadingPreset] = useState(null);
    // Poll job status when modal is open
    useEffect(() => {
        if (!open)
            return;
        const fetchStatus = async () => {
            const res = await fetch(`${baseUrl}/export/status/${clipId}`);
            const data = await res.json();
            setJobs(data.jobs);
        };
        fetchStatus();
        const id = setInterval(fetchStatus, 3000);
        return () => clearInterval(id);
    }, [open, clipId, baseUrl]);
    const requestExport = async (preset) => {
        setLoadingPreset(preset);
        const res = await fetch(`${baseUrl}/export/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clipId, preset }),
        });
        if (!res.ok) {
            alert('Failed to queue export');
        }
        else {
            const { jobId } = await res.json();
            setJobs((j) => [...j, { id: jobId, preset, status: 'queued', createdAt: new Date().toISOString() }]);
        }
        setLoadingPreset(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { label: "Export", onClick: () => setOpen(true) }), _jsx(Modal, { open: open, onClose: () => setOpen(false), title: "Export Clip", children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("div", { className: "flex gap-2 mb-4", children: PRESETS.map(({ key, label }) => (_jsx(Button, { label: loadingPreset === key ? 'Queuing…' : label, variant: "ghost", disabled: !!loadingPreset, onClick: () => requestExport(key) }, key))) }), _jsxs("ul", { className: "flex flex-col gap-2 max-h-60 overflow-y-auto", children: [jobs.map((j) => (_jsxs("li", { className: "flex justify-between text-sm", children: [_jsx("span", { children: PRESETS.find((p) => p.key === j.preset)?.label || j.preset }), _jsx("span", { children: j.status === 'complete' && j.url ? (_jsx("a", { href: j.url.replace('s3://', 'https://'), target: "_blank", rel: "noopener", className: "text-primary-neon underline", children: "Download" })) : (j.status) })] }, j.id))), !jobs.length && _jsx("li", { className: "text-muted-foreground", children: "No exports yet" })] })] }) })] }));
}
