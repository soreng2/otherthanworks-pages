import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/inquiries/route.ts";
import { site } from "../content/site.ts";

// These are local test fixtures. No network request or real delivery occurs.
const originalFetch = globalThis.fetch;
const names = [
  "INQUIRY_WEBHOOK_URL",
  "INQUIRY_WEBHOOK_TOKEN",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "INQUIRY_RATE_SALT",
  "PRIVACY_NOTICE_VERSION",
  "INQUIRY_DELIVERY_VERIFIED",
  "VERCEL",
];
const originalEnv = Object.fromEntries(
  names.map((name) => [name, process.env[name]]),
);
const originalFlags = {
  inquiriesEnabled: site.inquiriesEnabled,
  legalApproved: site.legalApproved,
};
const body = {
  type: "class",
  program: "content-studio",
  name: "테스트",
  email: "test@example.com",
  message: "문의 경로를 모의 검증합니다.",
  consent: true,
  website: "",
};
afterEach(() => {
  globalThis.fetch = originalFetch;
  Object.assign(site, originalFlags);
  for (const name of names) {
    if (originalEnv[name] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[name];
  }
});
function enableFixtures() {
  Object.assign(site, { inquiriesEnabled: true, legalApproved: true });
  Object.assign(process.env, {
    INQUIRY_WEBHOOK_URL: "https://webhook.example.test/inquiries",
    INQUIRY_WEBHOOK_TOKEN: "mock-only",
    UPSTASH_REDIS_REST_URL: "https://mock.upstash.io",
    UPSTASH_REDIS_REST_TOKEN: "mock-only",
    INQUIRY_RATE_SALT: "unit-test-only",
    PRIVACY_NOTICE_VERSION: "test-draft",
    INQUIRY_DELIVERY_VERIFIED: "true",
    VERCEL: "0",
  });
}
function request(value = body, extra = {}) {
  return new Request("https://www.otherthanworks.com/api/inquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://www.otherthanworks.com",
      ...extra,
    },
    body: JSON.stringify(value),
  });
}
test("disabled deployment rejects delivery without contacting a provider", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw Error("unexpected request");
  };
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).accepted, false);
  assert.equal(calls, 0);
});
test("rejects cross-origin requests", async () =>
  assert.equal(
    (await POST(request(body, { Origin: "https://untrusted.example" }))).status,
    403,
  ));
test("rejects non-JSON requests", async () =>
  assert.equal(
    (await POST(request(body, { "Content-Type": "text/plain" }))).status,
    415,
  ));
test("does not claim success on a webhook failure", async () => {
  enableFixtures();
  let calls = 0;
  globalThis.fetch = async () =>
    ++calls === 1
      ? Response.json({ result: 1 })
      : new Response("provider failed", { status: 500 });
  const response = await POST(request());
  assert.equal(response.status, 502);
  assert.equal((await response.json()).accepted, false);
  assert.equal(calls, 2);
});
test("does not claim success on a timeout or network failure", async () => {
  enableFixtures();
  let calls = 0;
  globalThis.fetch = async () => {
    if (++calls === 1) return Response.json({ result: 1 });
    throw Error("timeout");
  };
  const response = await POST(request());
  assert.equal(response.status, 502);
  assert.equal((await response.json()).accepted, false);
});
test("fails closed if the durable rate limiter is unavailable", async () => {
  enableFixtures();
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(null, { status: 503 });
  };
  assert.equal((await POST(request())).status, 503);
  assert.equal(calls, 1);
});
test("rejects requests above the shared durable limit", async () => {
  enableFixtures();
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ result: 6 });
  };
  const response = await POST(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "600");
  assert.equal(calls, 1);
});
test("rejects oversized declared and streamed bodies", async () => {
  enableFixtures();
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ result: 1 });
  };
  assert.equal(
    (await POST(request(body, { "Content-Length": "20000" }))).status,
    413,
  );
  assert.equal(calls, 0);
  assert.equal(
    (await POST(request({ ...body, message: "x".repeat(17000) }))).status,
    413,
  );
  assert.equal(calls, 1);
});
test("never delivers invalid fields even after passing the rate limit", async () => {
  enableFixtures();
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ result: 1 });
  };
  assert.equal((await POST(request({ ...body, consent: false }))).status, 400);
  assert.equal(calls, 1);
});
test("same-origin checks support Next's normalized internal hostname", async () => {
  const incoming = new Request("http://localhost:3000/api/inquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://127.0.0.1:3000",
      Host: "127.0.0.1:3000",
    },
    body: JSON.stringify(body),
  });
  assert.equal((await POST(incoming)).status, 503);
});
test("mocked provider acceptance follows authenticated delivery only", async () => {
  enableFixtures();
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1
      ? Response.json({ result: 1 })
      : new Response(null, { status: 202 });
  };
  const response = await POST(request());
  assert.equal(response.status, 201);
  assert.equal((await response.json()).accepted, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, "https://webhook.example.test/inquiries");
  assert.equal(calls[1].options.redirect, "error");
  assert.equal(calls[1].options.headers.Authorization, "Bearer mock-only");
  const payload = JSON.parse(calls[1].options.body);
  assert.equal(payload.privacyVersion, "test-draft");
  assert.equal(payload.email, body.email);
  assert.ok(!("website" in payload));
});
