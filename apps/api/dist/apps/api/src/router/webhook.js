"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripeWebhook_1 = require("@xclips/billing/stripeWebhook");
const razorpayWebhook_1 = require("@xclips/billing/razorpayWebhook");
const router = (0, express_1.Router)();
// raw body parser must be applied before these routes in main app
router.post('/stripe', stripeWebhook_1.stripeWebhook);
router.post('/razorpay', razorpayWebhook_1.razorpayWebhook);
exports.default = router;
