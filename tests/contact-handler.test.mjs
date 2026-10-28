import { test } from "node:test";
import assert from "node:assert/strict";
import { handleContact } from "../lib/contact-handler.mjs";

const message = { name: "A visitor", email: "visitor@example.com", topic: "Project collaboration", message: "I would like to discuss a web project.", website: "" };
const request = (body = message, headers = {}) => new Request("https://portfolio.test/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://portfolio.test", ...headers }, body: JSON.stringify(body) });

test("rejects invalid fields without contacting a provider", async () => {
  for (const invalid of [{ email: "invalid" }, { message: "short" }, { name: "" }, { topic: "bad\r\nheader" }, { website: "spam" }]) {
    const response = await handleContact(request({ ...message, ...invalid }));
    assert.equal(response.status, 400);
  }
});
test("rejects requests from a different website", async () => {
  assert.equal((await handleContact(request(message, { Origin: "https://elsewhere.test" }))).status, 403);
});
test("limits oversized requests", async () => {
  assert.equal((await handleContact(request({ ...message, message: "x".repeat(17000) }))).status, 413);
});
test("does not report success when delivery is unconfigured", async () => {
  assert.equal((await handleContact(request())).status, 503);
});
test("sends only to the portfolio owner and uses visitor as reply-to", async () => {
  const response = await handleContact(request(message, { "x-forwarded-for": "192.0.2.10" }), {
    apiKey: "test-key", from: "Portfolio <sender@example.com>",
    fetchEmail: async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails");
      const payload = JSON.parse(options.body);
      assert.deepEqual(payload.to, ["rjranjit099@gmail.com"]);
      assert.equal(payload.reply_to, message.email);
      assert.equal(payload.from, "Portfolio <sender@example.com>");
      assert.ok(payload.text.includes(message.message));
      return Response.json({ id: "test-delivery" });
    },
  });
  assert.equal(response.status, 200);
});
test("provider failures never produce a success response", async () => {
  const config = { apiKey: "test-key", from: "sender@example.com", fetchEmail: async () => Response.json({ message: "provider error" }, { status: 403 }) };
  assert.equal((await handleContact(request(message, { "x-forwarded-for": "192.0.2.11" }), config)).status, 502);
});
test("throttles repeated attempts", async () => {
  const config = { apiKey: "test-key", from: "sender@example.com", fetchEmail: async () => Response.json({ id: "test" }) };
  for (let count = 0; count < 5; count++) assert.equal((await handleContact(request(message, { "x-forwarded-for": "192.0.2.12" }), config)).status, 200);
  assert.equal((await handleContact(request(message, { "x-forwarded-for": "192.0.2.12" }), config)).status, 429);
});
