export interface OwnerSessionPayload {
  readonly role: "owner";
  readonly exp: number;
}

function encodeBase64Url(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(value, "base64url"));
  }

  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function importSigningKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createOwnerSessionToken(
  secret: string,
  expiresAtMs: number,
): Promise<string> {
  const payload: OwnerSessionPayload = {
    role: "owner",
    exp: expiresAtMs,
  };
  const data = encodeBase64Url(
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  const key = await importSigningKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );

  return `${data}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyOwnerSessionToken(
  token: string,
  secret: string,
): Promise<boolean> {
  const [data, signaturePart] = token.split(".");

  if (!data || !signaturePart) {
    return false;
  }

  try {
    const key = await importSigningKey(secret);
    const signatureBytes = new Uint8Array(decodeBase64Url(signaturePart));
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      new TextEncoder().encode(data),
    );

    if (!valid) {
      return false;
    }

    const payload = JSON.parse(
      new TextDecoder().decode(decodeBase64Url(data)),
    ) as OwnerSessionPayload;

    if (payload.role !== "owner") {
      return false;
    }

    return payload.exp > Date.now();
  } catch {
    return false;
  }
}
