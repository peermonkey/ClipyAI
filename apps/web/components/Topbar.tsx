"use client";
import { useSession, signOut } from 'next-auth/react';
import { CreditMeter, Button } from '@xclips/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/upload', label: 'Upload' },
  { href: '/credits', label: 'Credits' },
];

export default function Topbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle backdrop-blur-xl bg-surface-matte/80">
      <div className="flex items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className="text-2xl font-extrabold tracking-tight text-text-primary hover:text-text-accent transition-colors duration-200"
        >
          XClips<span className="text-text-accent">.ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`
                  relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg
                  ${isActive 
                    ? 'text-text-accent bg-surface-glass border border-border-accent' 
                    : 'text-text-secondary hover:text-text-accent hover:bg-surface-glass'
                  }
                `}
              >
                {item.label}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-text-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {session && (
            <div className="hidden sm:block w-32">
              <CreditMeter credits={0} max={1000} />
            </div>
          )}
          
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-8 h-8 bg-surface-glass border border-border-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-text-accent">
                    {session.user?.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="max-w-24 truncate">{session.user?.email}</span>
              </div>
              <Button 
                label="Logout" 
                variant="ghost" 
                size="sm" 
                onClick={() => signOut()} 
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm text-text-secondary hover:text-text-accent transition-colors"
              >
                Login
              </Link>
              <Button
                label="Sign Up"
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = "/login")}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
