"use client";
import { useSession, signOut } from 'next-auth/react';
import { CreditMeter, Button } from '@xclips/ui';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/upload', label: 'Upload' },
  { href: '/credits', label: 'Credits' },
];

export default function Topbar() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between backdrop-blur bg-black/30 px-6 py-3 shadow-lg">
      <Link href="/" className="text-xl font-extrabold tracking-tight hover:opacity-90">
        XClips<span className="text-primary-neon">.ai</span>
      </Link>

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-primary-neon transition-colors">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="w-24">
          <CreditMeter credits={0} max={1000} />
        </div>
        {session ? (
          <Button label="Logout" variant="ghost" size="sm" onClick={() => signOut()} />
        ) : (
          <Link href="/login" className="text-sm hover:text-primary-neon">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
