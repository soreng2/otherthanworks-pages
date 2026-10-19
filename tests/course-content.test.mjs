import test from "node:test";
import assert from "node:assert/strict";
import { defaultCourse, validPaymentUrl, validateCourse } from "../lib/course-content.ts";
import { classes } from "../content/site.ts";

test("confirmed cohorts and regular class fee are preserved", () => {
  const bySlug = Object.fromEntries(classes.map(item => [item.slug, item]));
  assert.equal(bySlug['drawing-routine'].price, 190000);
  assert.equal(bySlug['pictureforge'].cohort, '8기');
  assert.equal(bySlug['emoticon'].duration, '3개월');
  assert.equal(bySlug['emoticon'].cohort, '10기');
  assert.equal(bySlug['content-studio'].cohort, '3기');
  assert.equal(bySlug['portfolio-ready'].cohort, '3기');
});

test("payment links only allow the operator's exact HTTPS product path", () => {
  assert.equal(validPaymentUrl('https://smartstore.naver.com/monmut/products/12345'), true);
  for (const url of ['javascript:alert(1)', 'https://smartstore.naver.com.evil.test/monmut/products/123', 'https://smartstore.naver.com@evil.test/monmut/products/123', 'http://smartstore.naver.com/monmut/products/123', 'https://smartstore.naver.com/monmut', 'https://smartstore.naver.com/another/products/123', 'https://smartstore.naver.com/monmut/products/123?redirect=evil']) {
    assert.equal(validPaymentUrl(url), false, url);
  }
});

test("a new course never enables payment and cannot enable it without a product", () => {
  const course = defaultCourse(classes[0]);
  assert.equal(course.payment_verified, false);
  assert.equal(validateCourse(course), null);
  assert.ok(validateCourse({ ...course, payment_verified: true }));
});

test("details require descriptions, safe photo paths and bounded content", () => {
  const course = defaultCourse(classes[0]);
  assert.ok(validateCourse({ ...course, curriculum: ' ' }));
  assert.ok(validateCourse({ ...course, photos: [{ path: '../x.jpg', alt: 'photo' }] }));
  assert.ok(validateCourse({ ...course, photos: [{ path: '11111111-1111-1111-1111-111111111111.jpg', alt: '' }] }));
  assert.ok(validateCourse({ ...course, title: 'x'.repeat(121) }));
});
