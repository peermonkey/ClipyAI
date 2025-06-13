'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CommandPalette from '../../../packages/ui/src/components/CommandPalette';

export default function CommandPaletteWrapper() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return <CommandPalette onNavigate={handleNavigate} />;
}
