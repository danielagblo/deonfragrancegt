import type { APIRoute } from 'astro';
import { checkAdminAuth, createAdminToken, setAdminPassword, verifyAdminPassword } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!(await checkAdminAuth(request.headers.get('Authorization')))) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: Admin authorization token required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const currentPassword = typeof body?.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body?.newPassword === 'string' ? body.newPassword : '';
    const confirmPassword = typeof body?.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      return new Response(
        JSON.stringify({ error: 'Current, new, and confirmation passphrases are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (newPassword.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Use at least 10 characters for the new passphrase' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (newPassword !== confirmPassword) {
      return new Response(
        JSON.stringify({ error: 'The new passphrases do not match' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!(await verifyAdminPassword(currentPassword))) {
      return new Response(
        JSON.stringify({ error: 'The current passphrase is incorrect' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (await verifyAdminPassword(newPassword)) {
      return new Response(
        JSON.stringify({ error: 'Choose a passphrase different from the current one' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await setAdminPassword(newPassword);
    const token = await createAdminToken();

    return new Response(
      JSON.stringify({
        success: true,
        token,
        message: 'Passphrase updated. Other sessions have been signed out.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Admin password change error:', err);
    return new Response(
      JSON.stringify({ error: 'Could not change the passphrase', details: err?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
