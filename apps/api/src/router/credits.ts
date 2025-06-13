import { Router } from 'express';
import Stripe from 'stripe';
import Razorpay from 'razorpay';
import { prisma } from '@xclips/db';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' as any });
const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID as string, key_secret: process.env.RAZORPAY_KEY_SECRET as string });

// GET /api/credits/balance
router.get('/balance', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return res.json({ credits: user?.credits || 0 });
});

// POST /api/credits/checkout
router.post('/checkout', async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const { minutes, gateway } = req.body as { minutes: number; gateway: 'stripe' | 'razorpay' };
    if (!minutes || minutes <= 0) return res.status(400).json({ error: 'Invalid minutes' });

    const amountUsd = minutes * 7; // example 7 cents per minute

    if (gateway === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: amountUsd, // cents
              product_data: { name: `${minutes} Minutes Top-Up` },
            },
          },
        ],
        success_url: `${process.env.WEB_URL}/credits?success=1`,
        cancel_url: `${process.env.WEB_URL}/credits?canceled=1`,
        metadata: { userId, minutes: String(minutes) },
      });
      return res.json({ url: session.url });
    }

    if (gateway === 'razorpay') {
      // convert to INR, example 5 INR per minute
      const amountInr = minutes * 500; // paise (₹5 per minute)
      const order = await razorpay.orders.create({
        amount: amountInr,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: { userId, minutes: String(minutes) },
      });
      return res.json({ order });
    }

    return res.status(400).json({ error: 'Unsupported gateway' });
  } catch (err) {
    console.error('[credits.checkout]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 