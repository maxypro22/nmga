/**
 * Simple per-key fixed-window rate limiter.
 *
 * Implementation note: this uses an in-memory Map, so on Vercel's serverless
 * runtime the state lives only for the lifetime of a single function instance.
 * That means a determined attacker spread across many cold starts can exceed
 * the per-window limit. This module is intended as a defense layer ON TOP OF
 * Vercel's edge DDoS protection — not a replacement for it. For stricter
 * limits, swap the Map for a Redis / Upstash backed implementation.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 1024;

export type RateLimitOptions = {
  /** Logical key, e.g. "login:1.2.3.4". */
  key: string;
  /** Max attempts per window. */
  max: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  /** Seconds the caller should wait before retrying. 0 when ok. */
  retryAfter: number;
  remaining: number;
};

export function rateLimit(opts: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  // Opportunistic prune so the Map can't grow without bound.
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt < now) buckets.delete(k);
    }
  }

  const existing = buckets.get(opts.key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfter: 0, remaining: opts.max - 1 };
  }

  if (existing.count >= opts.max) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      remaining: 0,
    };
  }

  existing.count += 1;
  return { ok: true, retryAfter: 0, remaining: opts.max - existing.count };
}

/**
 * Pull a stable-ish client identifier from request headers. Falls back to a
 * generic bucket for direct connections so the limiter still applies at all.
 */
export function clientKey(req: Request, prefix: string): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return `${prefix}:${ip}`;
}
