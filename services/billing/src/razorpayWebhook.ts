import { Request, Response } from 'express';
import crypto from 'crypto';
import { prisma } from '@xclips/db';

export async function razorpayWebhook(req: Request, res: Response) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
  const signature = req.headers['x-razorpay-signature'] as string;
  const payload = JSON.stringify(req.body);

  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  if (signature !== expected) {
    return res.status(400).send('Invalid signature');
  }

  const event = req.body;
  if (event.event === 'payment.captured') {
    const { id: paymentId, notes, currency, amount } = event.payload.payment.entity;
    const userId = notes?.userId;
    const minutes = parseInt(notes?.minutes || '0', 10);
    if (userId && minutes) {
      await prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { credits: { increment: minutes } } }),
        prisma.payment.create({ data: { userId, gateway: 'razorpay', gatewayId: paymentId, minutes, amount: amount / 100, currency } }),
      ]);
    }
  }

  return res.json({ received: true });
} 