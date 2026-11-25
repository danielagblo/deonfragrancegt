import type { APIRoute } from 'astro';
import { checkAdminAuth } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!(await checkAdminAuth(request.headers.get('Authorization')))) {
    return new Response(
      JSON.stringify({ error: 'Session expired or invalid' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
