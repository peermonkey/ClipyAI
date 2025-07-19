import { Router } from 'express';
// import { stripeWebhook } from '../../../services/billing/src/stripeWebhook';
// import { razorpayWebhook } from '../../../services/billing/src/razorpayWebhook';

const router = Router();

// raw body parser must be applied before these routes in main app
// router.post('/stripe', stripeWebhook);
// router.post('/razorpay', razorpayWebhook);

// Placeholder endpoints for now
router.post('/stripe', (req, res) => {
  res.json({ message: 'Stripe webhook endpoint' });
});

router.post('/razorpay', (req, res) => {
  res.json({ message: 'Razorpay webhook endpoint' });
});

export default router; 