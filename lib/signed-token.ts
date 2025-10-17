import crypto from "crypto";

// Small base64url helpers
function b64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlDecode(input: string) {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = input.length % 4 === 0 ? 0 : 4 - (input.length % 4);
  return Buffer.from(input + "=".repeat(pad), "base64");
}

function getSecret(): string {
  const secret = process.env.INVOICE_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (!secret) {
    // Fallback for local dev; strongly recommend setting INVOICE_TOKEN_SECRET in production
    return "dev-invoice-secret";
  }
  return secret;
}

export type SignedPayload = {
  orderId: string;
  exp: number; // unix seconds
};

/**
 * Create a short-lived signed token for lightweight verification.
 * Token format: base64url(json).base64url(hmac_sha256(payload))
 */
export function createSignedToken(payload: { orderId: string }, ttlSeconds = 10 * 60): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = { orderId: payload.orderId, exp } satisfies SignedPayload;
  const json = JSON.stringify(body);
  const encoded = b64url(json);
  const hmac = crypto.createHmac("sha256", getSecret()).update(encoded).digest();
  const sig = b64url(hmac);
  return `${encoded}.${sig}`;
}

export function verifySignedToken(token: string): SignedPayload | null {
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  const expected = b64url(crypto.createHmac("sha256", getSecret()).update(encoded).digest());
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;

  try {
    const payload = JSON.parse(b64urlDecode(encoded).toString("utf8")) as SignedPayload;
    if (typeof payload.exp !== "number" || typeof payload.orderId !== "string") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null; // expired
    return payload;
  } catch {
    return null;
  }
}
