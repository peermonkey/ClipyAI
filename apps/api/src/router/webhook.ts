import { Router } from 'express';
import { stripeWebhook } from '@xclips/billing/stripeWebhook';
import { razorpayWebhook } from '@xclips/billing/razorpayWebhook';

const router = Router();

// raw body parser must be applied before these routes in main app
router.post('/stripe', stripeWebhook);
router.post('/razorpay', razorpayWebhook);

export default router; 