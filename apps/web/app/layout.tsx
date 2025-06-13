import './globals.css';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../services/auth/auth-config';
import { Providers } from '../components/Providers';
import Topbar from '../components/Topbar';
import dynamic from 'next/dynamic';
import type { Session } from 'next-auth';
import { Inter } from 'next/font/google';

const CommandPalette = dynamic(() => import('../components/CommandPaletteWrapper'), { ssr: false });
const NPSModal = dynamic(() => import('./components/NPSModal'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  title: 'XClips.ai',
  description: 'Turn long-form content into snackable clips.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session | null;
  return (
    <html lang="en" className={`${inter.variable} bg-surface-matte text-white font-sans`}>
      <body className="min-h-screen">
        <Providers session={session}>
          <Topbar />
          {children}
          <CommandPalette />
          <NPSModal />
        </Providers>
      </body>
    </html>
  );
}
