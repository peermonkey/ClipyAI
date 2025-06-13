import React, { useState } from 'react';
import { Command } from 'cmdk';

const routes = [
  { name: 'Dashboard', path: '/' },
  { name: 'Upload', path: '/upload' },
  { name: 'Credits', path: '/credits' },
];

interface CommandPaletteProps {
  onNavigate?: (path: string) => void;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu" className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <Command.Input placeholder="Type a command or search…" className="w-full border-0 p-4 text-lg bg-surface-matte text-white rounded-t" />
      <Command.List className="max-h-60 overflow-y-auto bg-surface-matte rounded-b">
        {routes.map((r) => (
          <Command.Item key={r.path} onSelect={() => handleSelect(r.path)} className="px-4 py-2 hover:bg-primary-neon/20">
            {r.name}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
