"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const razorpay_1 = __importDefault(require("razorpay"));
const db_1 = require("@xclips/db");
const router = (0, express_1.Router)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
const razorpay = new razorpay_1.default({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
// GET /api/credits/balance
router.get('/balance', async (req, res) => {
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
    return res.json({ credits: user?.credits || 0 });
});
// POST /api/credits/checkout
router.post('/checkout', async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: 'Unauthorized' });
        const { minutes, gateway } = req.body;
        if (!minutes || minutes <= 0)
            return res.status(400).json({ error: 'Invalid minutes' });
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
    }
    catch (err) {
        console.error('[credits.checkout]', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
