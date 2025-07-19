"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayWebhook = razorpayWebhook;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("@xclips/db");
async function razorpayWebhook(req, res) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const payload = JSON.stringify(req.body);
    const expected = crypto_1.default.createHmac('sha256', secret).update(payload).digest('hex');
    if (signature !== expected) {
        return res.status(400).send('Invalid signature');
    }
    const event = req.body;
    if (event.event === 'payment.captured') {
        const { id: paymentId, notes, currency, amount } = event.payload.payment.entity;
        const userId = notes?.userId;
        const minutes = parseInt(notes?.minutes || '0', 10);
        if (userId && minutes) {
            await db_1.prisma.$transaction([
                db_1.prisma.user.update({ where: { id: userId }, data: { credits: { increment: minutes } } }),
                db_1.prisma.payment.create({ data: { userId, gateway: 'razorpay', gatewayId: paymentId, minutes, amount: amount / 100, currency } }),
            ]);
        }
    }
    return res.json({ received: true });
}
