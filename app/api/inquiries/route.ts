import { createHmac } from "node:crypto";
import { site } from "../../../content/site.ts";
import {
  inquiryConfiguration,
  validateInquiry,
} from "../../../lib/inquiries.ts";

export const runtime = "nodejs";
const MAX_BYTES = 16_384;
function reply(
  status: number,
  message: string,
  extra?: Record<string, string>,
) {
  return Response.json(
    { accepted: false, message },
    { status, headers: { "Cache-Control": "no-store", ...extra } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next can normalize request.url to an internal hostname. The HTTP Host
  // remains the browser's destination; do not trust forwarded-host headers.
  const destination = new URL(request.url);
  const host = request.headers.get("host");
  if (host) destination.host = host;
  if (
    origin !== destination.origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return reply(403, "이 사이트에서 작성한 문의만 전송할 수 있습니다.");
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply(415, "지원하지 않는 전송 형식입니다.");
  const config = inquiryConfiguration();
  if (!site.inquiriesEnabled || !site.legalApproved || !config)
    return reply(
      503,
      "온라인 문의 접수를 준비 중입니다. 아직 전송되지 않았습니다.",
    );
  const length = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(length) || length < 0 || length > MAX_BYTES)
    return reply(413, "문의 내용이 너무 깁니다.");

  // Trust only Vercel's overwritten header on Vercel. Other hosts share a bucket
  // until their trusted proxy integration is explicitly implemented.
  const identity =
    process.env.VERCEL === "1"
      ? (request.headers.get("x-vercel-forwarded-for") ?? "unknown")
      : "shared";
  const bucket = createHmac("sha256", config.salt)
    .update(identity)
    .digest("hex");
  try {
    const script =
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n";
    const limit = await fetch(config.redis, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", script, "1", `otw:inquiry:${bucket}`]),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      redirect: "error",
    });
    if (!limit.ok)
      return reply(
        503,
        "접수 서비스를 확인 중입니다. 아직 전송되지 않았습니다.",
      );
    const result = await limit.json();
    if (typeof result.result !== "number" || !Number.isFinite(result.result))
      return reply(
        503,
        "접수 서비스를 확인 중입니다. 아직 전송되지 않았습니다.",
      );
    if (result.result > 5)
      return reply(429, "문의가 많아 잠시 후 다시 시도해 주세요.", {
        "Retry-After": "600",
      });
  } catch {
    return reply(503, "접수 서비스를 확인 중입니다. 아직 전송되지 않았습니다.");
  }

  if (!request.body) return reply(400, "문의 내용을 확인해 주세요.");
  const reader = request.body.getReader();
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return reply(413, "문의 내용이 너무 깁니다.");
      }
      chunks.push(value);
    }
  } catch {
    return reply(400, "문의 내용을 읽지 못했습니다.");
  }
  let value: unknown;
  try {
    value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(400, "문의 내용을 확인해 주세요.");
  }
  const inquiry = validateInquiry(value);
  if (!inquiry) return reply(400, "필수 항목과 동의 내용을 확인해 주세요.");
  try {
    const delivery = await fetch(config.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.webhookToken}`,
      },
      body: JSON.stringify({
        type: inquiry.type,
        program: inquiry.program,
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        privacyVersion: config.privacyVersion,
        consentedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (!delivery.ok)
      return reply(
        502,
        "전송을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      );
    return Response.json(
      {
        accepted: true,
        message:
          "문의가 수신 서비스로 전달되었습니다. 담당자 확인 후 안내드립니다.",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return reply(
      502,
      "전송을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
  }
}
