"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("../../../../packages/db/client");
const router = (0, express_1.Router)();
router.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: 'Missing token' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await client_1.prisma.user.findUnique({ where: { id: decoded.sub } });
        return res.json({ user });
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});
exports.default = router;
