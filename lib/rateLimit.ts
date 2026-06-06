// In-memory rate limiter (for development)
// For production, use @upstash/ratelimit + Redis

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function cleanupExpired() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 30,
  windowMs: number = 60000 // 1 minute
): Promise<{ success: boolean; remaining: number; reset: number }> {
  cleanupExpired();

  const now = Date.now();
  const limit = rateLimitStore.get(identifier) || {
    count: 0,
    resetTime: now + windowMs,
  };

  if (now > limit.resetTime) {
    // Window expired, reset
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: maxRequests - 1, reset: now + windowMs };
  }

  if (limit.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      reset: limit.resetTime,
    };
  }

  limit.count++;
  rateLimitStore.set(identifier, limit);

  return {
    success: true,
    remaining: maxRequests - limit.count,
    reset: limit.resetTime,
  };
}

export const RATE_LIMITS = {
  AUTH_OTP: { max: 3, window: 15 * 60 * 1000 }, // 3 attempts per 15 min
  EMERGENCY_SOS: { max: 3, window: 60 * 60 * 1000 }, // 3 per hour
  CHAT: { max: 60, window: 60 * 1000 }, // 60 per minute
  TRANSLATION: { max: 100, window: 60 * 1000 }, // 100 per minute
  ACCOMMODATION_SEARCH: { max: 30, window: 60 * 1000 }, // 30 per minute
  LOST_PERSON_REPORT: { max: 5, window: 60 * 60 * 1000 }, // 5 per hour
  GENERAL_API: { max: 100, window: 60 * 1000 }, // 100 per minute
};
