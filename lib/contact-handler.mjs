import { createHash } from "node:crypto";

const MAX_BYTES = 16384;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map();
const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;

function reply(status, body, headers = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function readBody(request) {
  if (Number(request.headers.get("content-length")) > MAX_BYTES) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > MAX_BYTES) { await reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function handleContact(request, { apiKey, from, fetchEmail = fetch } = {}) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== (request.headers.get("host") || new URL(request.url).host)) return reply(403, { error: "Please send your message from the contact page." });
    } catch { return reply(403, { error: "Invalid request origin." }); }
  }
  if (!request.headers.get("content-type")?.includes("application/json")) return reply(415, { error: "Please submit the contact form." });

  let body;
  try { body = await readBody(request); }
  catch (error) { return reply(error instanceof RangeError ? 413 : 400, { error: "The message could not be read. Please check its length and try again." }); }

  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400, { error: "Please complete the contact form." });
  const { name, email, message, topic, website } = body;
  if (website) return reply(400, { error: "Unable to submit this form." });
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100 || /[\r\n]/.test(name)) return reply(400, { error: "Please enter a name between 2 and 100 characters." });
  if (typeof email !== "string" || email.length > 254 || !emailPattern.test(email)) return reply(400, { error: "Please enter a valid email address." });
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 5000) return reply(400, { error: "Please enter a message between 10 and 5,000 characters." });
  if (typeof topic !== "string" || topic.trim().length < 1 || topic.length > 100 || /[\r\n]/.test(topic)) return reply(400, { error: "Please choose a valid message topic." });

  if (!apiKey || !from) return reply(503, { error: "Message sending is temporarily unavailable. Please email rjranjit099@gmail.com directly." });

  // Best-effort per-instance throttle. No visitor messages or raw IPs are retained.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const key = createHash("sha256").update(address).digest("hex");
  const attempt = attempts.get(key) || { count: 0, expires: now + WINDOW_MS };
  if (attempt.count >= 5) return reply(429, { error: "Too many messages. Please wait a little, or contact me by email." }, { "Retry-After": String(Math.ceil((attempt.expires - now) / 1000)) });
  if (attempts.size >= 2000 && !attempts.has(key)) return reply(429, { error: "Please try again shortly, or email me directly." });
  attempt.count += 1;
  attempts.set(key, attempt);

  try {
    const response = await fetchEmail("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: ["rjranjit099@gmail.com"],
        reply_to: email.trim(),
        subject: `Portfolio: ${topic.trim()}`,
        text: `From: ${name.trim()} <${email.trim()}>\nTopic: ${topic.trim()}\n\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || !result.id) return reply(502, { error: "Your message could not be sent. Please try again shortly, or email me directly." });
    return reply(200, { ok: true });
  } catch { return reply(502, { error: "The email service is unavailable right now. Please email me directly or try again shortly." }); }
}
