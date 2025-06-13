'use client';

import { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button } from './Button';

interface Job {
  id: string;
  preset: string;
  status: string;
  url?: string;
  createdAt: string;
}

interface ExportModalProps {
  clipId: string;
  apiUrl?: string; // override for tests
}

const PRESETS = [
  { key: '9:16', label: 'Vertical (9:16)' },
  { key: '1:1', label: 'Square (1:1)' },
  { key: '16:9', label: 'Landscape (16:9)' },
];

export function ExportModal({ clipId, apiUrl }: ExportModalProps) {
  const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || '';
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingPreset, setLoadingPreset] = useState<string | null>(null);

  // Poll job status when modal is open
  useEffect(() => {
    if (!open) return;
    const fetchStatus = async () => {
      const res = await fetch(`${baseUrl}/export/status/${clipId}`);
      const data = await res.json();
      setJobs(data.jobs as Job[]);
    };
    fetchStatus();
    const id = setInterval(fetchStatus, 3000);
    return () => clearInterval(id);
  }, [open, clipId, baseUrl]);

  const requestExport = async (preset: string) => {
    setLoadingPreset(preset);
    const res = await fetch(`${baseUrl}/export/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clipId, preset }),
    });
    if (!res.ok) {
      alert('Failed to queue export');
    } else {
      const { jobId } = await res.json();
      setJobs((j) => [...j, { id: jobId, preset, status: 'queued', createdAt: new Date().toISOString() }]);
    }
    setLoadingPreset(null);
  };

  return (
    <>
      <Button label="Export" onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} title="Export Clip">
        <div className="flex flex-col gap-4">
          {/* Preset buttons */}
          <div className="flex gap-2 mb-4">
            {PRESETS.map(({ key, label }) => (
              <Button
                key={key}
                label={loadingPreset === key ? 'Queuing…' : label}
                variant="ghost"
                disabled={!!loadingPreset}
                onClick={() => requestExport(key)}
              />
            ))}
          </div>
          {/* Job status list */}
          <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {jobs.map((j) => (
              <li key={j.id} className="flex justify-between text-sm">
                <span>{PRESETS.find((p) => p.key === j.preset)?.label || j.preset}</span>
                <span>
                  {j.status === 'complete' && j.url ? (
                    <a href={j.url.replace('s3://', 'https://')} target="_blank" rel="noopener" className="text-primary-neon underline">
                      Download
                    </a>
                  ) : (
                    j.status)
                  }
                </span>
              </li>
            ))}
            {!jobs.length && <li className="text-muted-foreground">No exports yet</li>}
          </ul>
        </div>
      </Modal>
    </>
  );
} 