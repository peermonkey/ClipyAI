'use client';

import { useEffect, useState } from 'react';
import { Button, CreditMeter } from '@xclips/ui';

export default function CreditsPage() {
  const [credits, setCredits] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number>(0);
  const [gateway, setGateway] = useState<'stripe' | 'razorpay'>('stripe');
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch(`${apiBase}/credits/balance`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      }
    };
    fetchBalance();
  }, [apiBase]);

  const checkout = async () => {
    if (!minutes) return;
    const res = await fetch(`${apiBase}/credits/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ minutes, gateway }),
    });
    const data = await res.json();
    if (gateway === 'stripe' && data.url) {
      window.location.href = data.url;
    }
    if (gateway === 'razorpay' && data.order) {
      const { order } = data;
      // load Razorpay script
      const rz = await import('razorpay-web-sdk');
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.id,
        handler() {
          window.location.reload();
        },
        notes: order.notes,
      } as any;
      const rzp = new rz.default(options);
      rzp.open();
    }
  };

  return (
    <main className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Credits</h1>
      {credits !== null && (
        <div className="w-full max-w-md flex flex-col gap-2">
          <CreditMeter credits={credits} max={1000} />
          <p className="text-center">{credits} minutes remaining</p>
        </div>
      )}
      <div className="flex flex-col gap-4 w-full max-w-md mt-6">
        <input
          type="number"
          className="p-2 rounded bg-surface-matte text-white"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
          placeholder="Minutes to purchase"
        />
        <select value={gateway} onChange={(e) => setGateway(e.target.value as any)} className="p-2 rounded bg-surface-matte text-white">
          <option value="stripe">Stripe</option>
          <option value="razorpay">Razorpay</option>
        </select>
        <Button label="Purchase" onClick={checkout} />
      </div>
    </main>
  );
} 