import { Request, Response } from 'express';
import { prisma } from '@xclips/db';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function healthCheck(req: Request, res: Response) {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown',
      redis: 'unknown',
      storage: 'unknown'
    }
  };

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database = 'healthy';
  } catch (error) {
    health.checks.database = 'unhealthy';
    health.status = 'degraded';
  }

  // Check Redis
  try {
    await redis.ping();
    health.checks.redis = 'healthy';
  } catch (error) {
    health.checks.redis = 'unhealthy';
    health.status = 'degraded';
  }

  // Check S3/Storage
  try {
    // This is a basic check - in production you might want to test actual S3 connectivity
    if (process.env.S3_ENDPOINT || process.env.S3_ACCESS_KEY) {
      health.checks.storage = 'configured';
    } else {
      health.checks.storage = 'not-configured';
    }
  } catch (error) {
    health.checks.storage = 'unhealthy';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
}