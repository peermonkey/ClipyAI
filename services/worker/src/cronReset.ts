import { prisma } from '@xclips/db';
import cron from 'node-cron';

// Runs at 00:00 on 1st of every month
export function scheduleCreditReset() {
  cron.schedule('0 0 1 * *', async () => {
    console.log('[cron] Resetting user minutes balances');
    await prisma.user.updateMany({ data: { credits: 60 } }); // reset to 60 for Free; paid handled elsewhere
  });
} 