"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCreditReset = scheduleCreditReset;
const db_1 = require("@xclips/db");
const node_cron_1 = __importDefault(require("node-cron"));
// Runs at 00:00 on 1st of every month
function scheduleCreditReset() {
    node_cron_1.default.schedule('0 0 1 * *', async () => {
        console.log('[cron] Resetting user minutes balances');
        await db_1.prisma.user.updateMany({ data: { credits: 60 } }); // reset to 60 for Free; paid handled elsewhere
    });
}
