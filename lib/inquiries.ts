import { classes } from "../content/site.ts";

export type Inquiry = {
  type: "class" | "studio";
  program: string;
  name: string;
  email: string;
  message: string;
  consent: true;
  website: string;
};

const programs = new Set<string>(classes.map((item) => item.slug));
const allowedKeys = new Set([
  "type",
  "program",
  "name",
  "email",
  "message",
  "consent",
  "website",
]);
export function validateInquiry(value: unknown): Inquiry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (Object.keys(data).some((key) => !allowedKeys.has(key))) return null;
  if (data.type !== "class" && data.type !== "studio") return null;
  if (data.consent !== true) return null;
  for (const key of ["name", "email", "message", "program", "website"])
    if (typeof data[key] !== "string") return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const message = (data.message as string).trim();
  const program = data.program as string;
  const website = data.website as string;
  if (!name || name.length > 80 || /[\r\n\x00-\x1F]/.test(name)) return null;
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(email)
  )
    return null;
  if (message.length < 10 || message.length > 4000 || message.includes("\0"))
    return null;
  if (website.length > 0) return null;
  if (data.type === "class" && !programs.has(program)) return null;
  if (data.type === "studio" && program !== "") return null;
  return {
    type: data.type,
    name,
    email,
    message,
    program,
    consent: true,
    website: "",
  };
}

export function inquiryConfiguration() {
  const names = [
    "INQUIRY_WEBHOOK_URL",
    "INQUIRY_WEBHOOK_TOKEN",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "INQUIRY_RATE_SALT",
    "PRIVACY_NOTICE_VERSION",
  ] as const;
  if (
    process.env.INQUIRY_DELIVERY_VERIFIED !== "true" ||
    names.some((name) => !process.env[name])
  )
    return null;
  try {
    const webhook = new URL(process.env.INQUIRY_WEBHOOK_URL!);
    const redis = new URL(process.env.UPSTASH_REDIS_REST_URL!);
    if (
      [webhook, redis].some(
        (url) =>
          url.protocol !== "https:" || url.username || url.password || url.hash,
      )
    )
      return null;
    if (!redis.hostname.endsWith(".upstash.io") || redis.pathname !== "/")
      return null;
    return {
      webhook: webhook.href,
      webhookToken: process.env.INQUIRY_WEBHOOK_TOKEN!,
      redis: redis.origin,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      salt: process.env.INQUIRY_RATE_SALT!,
      privacyVersion: process.env.PRIVACY_NOTICE_VERSION!,
    };
  } catch {
    return null;
  }
}
