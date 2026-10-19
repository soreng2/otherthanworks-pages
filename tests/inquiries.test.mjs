import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, inquiryConfiguration } from "../lib/inquiries.ts";

const valid = {
  type: "class",
  program: "content-studio",
  name: "테스트",
  email: "test@example.com",
  message: "클래스에 관해 궁금합니다.",
  consent: true,
  website: "",
};
test("accepts and trims a valid class inquiry", () => {
  const parsed = validateInquiry({ ...valid, name: "  테스트  " });
  assert.equal(parsed?.name, "테스트");
  assert.equal(parsed?.program, "content-studio");
});
test("accepts a studio inquiry without a class selection", () => {
  assert.ok(validateInquiry({ ...valid, type: "studio", program: "" }));
});
for (const [label, change] of [
  ["missing explicit consent", { consent: false }],
  ["string consent", { consent: "true" }],
  ["unknown program", { program: "invented-program" }],
  ["unknown type", { type: "payment" }],
  ["studio with a class selection", { type: "studio" }],
  ["spam honeypot", { website: "https://spam.example" }],
  ["invalid email", { email: "not-an-email" }],
  [
    "email header injection",
    { email: "test@example.com\r\nBcc:other@example.com" },
  ],
  ["name with control characters", { name: "test\nname" }],
  ["empty name", { name: "   " }],
  ["overlong name", { name: "가".repeat(81) }],
  ["short message", { message: "짧음" }],
  ["oversized message", { message: "가".repeat(4001) }],
  ["unexpected keys", { isAdmin: true }],
  ["invalid field types", { name: 42 }],
])
  test(`rejects ${label}`, () =>
    assert.equal(validateInquiry({ ...valid, ...change }), null));
test("rejects nulls, arrays, and primitives", () => {
  for (const value of [null, [], "text", 42, true, undefined])
    assert.equal(validateInquiry(value), null);
});
test("configuration fails closed without explicit delivery verification", () => {
  assert.equal(inquiryConfiguration(), null);
});
