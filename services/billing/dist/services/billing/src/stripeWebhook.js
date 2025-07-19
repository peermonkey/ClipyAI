"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = stripeWebhook;
const stripe_1 = __importDefault(require("stripe"));
const db_1 = require("@xclips/db");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
async function stripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    if (!sig)
        return res.status(400).send('Missing signature');
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        console.error('Stripe signature error', err);
        return res.status(400).send('Webhook Error');
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const minutes = parseInt(session.metadata?.minutes || '0', 10);
        if (userId && minutes) {
            await db_1.prisma.$transaction([
                db_1.prisma.user.update({ where: { id: userId }, data: { credits: { increment: minutes } } }),
                db_1.prisma.payment.create({ data: { userId, gateway: 'stripe', gatewayId: session.id, minutes, amount: (session.amount_total || 0) / 100, currency: session.currency?.toUpperCase() || 'USD' } }),
            ]);
        }
    }
    res.json({ received: true });
}
