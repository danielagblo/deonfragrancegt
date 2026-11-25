import 'dotenv/config';

export interface InitPaymentRequest {
  email: string;
  amount: number; // in minor units (e.g. 1000 pence/kobo/pesewas)
  reference: string;
  currency?: string;
  callback_url?: string;
  channels?: string[];
  metadata?: string;
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    gateway_response?: string;
    paid_at?: string;
    created_at?: string;
    channel?: string;
    currency?: string;
    customer?: {
      email: string;
    };
  };
}

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

function requirePaystackSecretKey(): string {
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured');
  }
  return PAYSTACK_SECRET_KEY;
}

function timingSafeEqualHex(expected: string, actual: string): boolean {
  const a = expected.toLowerCase();
  const b = actual.toLowerCase();
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyPaystackWebhookSignature(
  rawBody: string,
  signature: string | null
): Promise<boolean> {
  if (!PAYSTACK_SECRET_KEY || !signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(requirePaystackSecretKey()),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  const expected = Array.from(new Uint8Array(signatureBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return timingSafeEqualHex(expected, signature);
}

export async function initializeTransaction(req: InitPaymentRequest): Promise<PaystackInitResponse> {
  const secretKey = requirePaystackSecretKey();

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Paystack initialize failed: ${response.status} ${errorText}`);
  }

  return (await response.json()) as PaystackInitResponse;
}

export async function verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const secretKey = requirePaystackSecretKey();

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Paystack verify failed: ${response.status} ${errorText}`);
  }

  return (await response.json()) as PaystackVerifyResponse;
}
