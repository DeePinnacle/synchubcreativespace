import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN from env.
const redis = Redis.fromEnv();

// 5 submissions per 10 minutes per IP — generous for real visitors,
// tight enough to blunt basic spam/bot floods on the contact form.
export const contactFormRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "ratelimit:contact",
});

export const vendorApplicationRateLimit = new Ratelimit({
  redis,                                    // same Redis instance the contact limiter uses
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "ratelimit:vendor",
});