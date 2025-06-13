import { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '@xclips/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' as any });

export async function stripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;
  if (!sig) return res.status(400).send('Missing signature');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err) {
    console.error('Stripe signature error', err);
    return res.status(400).send('Webhook Error');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const minutes = parseInt(session.metadata?.minutes || '0', 10);
    if (userId && minutes) {
      await prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { credits: { increment: minutes } } }),
        prisma.payment.create({ data: { userId, gateway: 'stripe', gatewayId: session.id, minutes, amount: (session.amount_total || 0) / 100, currency: session.currency?.toUpperCase() || 'USD' } }),
      ]);
    }
  }

  res.json({ received: true });
} 