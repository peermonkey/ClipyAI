"use client";
import { signIn } from 'next-auth/react';
import { Button } from '@xclips/ui';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-matte">
      <h1 className="mb-6 text-3xl font-bold">Login to XClips.ai</h1>
      <div className="space-y-4">
        <Button label="Sign in with Email" onClick={() => signIn('email')} />
        <Button label="Sign in with Google" variant="ghost" onClick={() => signIn('google')} />
      </div>
    </div>
  );
}
