import { Redis } from '@upstash/redis';

export const runtime = 'edge';

export async function GET() {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });

    const count = await redis.incr('portfolio_visitors');
    return Response.json({ count });
  } catch {
    return Response.json({ count: 0 });
  }
}
