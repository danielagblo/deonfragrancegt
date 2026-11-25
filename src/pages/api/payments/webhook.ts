import type { APIRoute } from 'astro';
import { updateOrderStatus } from '../../../lib/db';
import { verifyPaystackWebhookSignature } from '../../../lib/paystack';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!(await verifyPaystackWebhookSignature(rawBody, signature))) {
      return new Response(JSON.stringify({ error: 'Invalid Paystack signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload = JSON.parse(rawBody);
    const event = payload?.event;

    if (event === 'charge.success') {
      const data = payload?.data;
      const ref = data?.reference;
      if (ref) {
        await updateOrderStatus(ref, 'paid', String(data?.id || ''));
      }
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: 'Webhook processing error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
