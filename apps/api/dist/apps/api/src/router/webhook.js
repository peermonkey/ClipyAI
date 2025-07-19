"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { stripeWebhook } from '../../../services/billing/src/stripeWebhook';
// import { razorpayWebhook } from '../../../services/billing/src/razorpayWebhook';
const router = (0, express_1.Router)();
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
exports.default = router;
