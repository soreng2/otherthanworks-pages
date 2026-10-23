import test from "node:test";
import assert from "node:assert/strict";
import { normalizeInstagramUrl } from "../lib/instagram.ts";

test('Instagram share links normalize to safe canonical embed sources', () => {
  assert.equal(normalizeInstagramUrl('https://instagram.com/reel/Abc_123-/?igsh=tracking'), 'https://www.instagram.com/reel/Abc_123-/');
  assert.equal(normalizeInstagramUrl('https://www.instagram.com/p/Abc123/#fragment'), 'https://www.instagram.com/p/Abc123/');
});
test('profiles, redirects, scripts and hostile hostnames cannot become embeds', () => {
  for (const url of ['javascript:alert(1)', 'http://instagram.com/p/x/', 'https://instagram.com.evil.test/p/x/', 'https://instagram.com@evil.test/p/x/', 'https://evil@instagram.com/p/x/', 'https://instagram.com:8443/p/x/', 'https://www.instagram.com/other.than.works/', 'https://www.instagram.com/p/x/embed/', 'https://www.instagram.com/p/%3Cscript%3E/', 'https://www.instagram.com/']) {
    assert.equal(normalizeInstagramUrl(url), null, url);
  }
});
