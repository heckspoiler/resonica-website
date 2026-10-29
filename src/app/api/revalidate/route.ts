import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Called by the Prismic webhook on publish. Prismic sends the webhook's
 * secret in the JSON body; it must match PRISMIC_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  const expected = process.env.PRISMIC_WEBHOOK_SECRET;
  const body = await request.json().catch(() => null);

  if (!expected || body?.secret !== expected) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('prismic');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
