"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const email_1 = __importDefault(require("next-auth/providers/email"));
const google_1 = __importDefault(require("next-auth/providers/google"));
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const db_1 = require("@xclips/db");
exports.authOptions = {
    adapter: (0, prisma_adapter_1.PrismaAdapter)(db_1.prisma),
    session: {
        strategy: 'jwt',
    },
    providers: [
        (0, email_1.default)({
            server: process.env.EMAIL_SERVER ?? '',
            from: process.env.EMAIL_FROM ?? 'noreply@xclips.ai',
        }),
        (0, google_1.default)({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    pages: {
        signIn: '/login',
    },
};
