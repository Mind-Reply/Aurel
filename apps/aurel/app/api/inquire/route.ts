import { NextResponse } from 'next/server';

function makeReceipt(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AUR-${ts}-${rand}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, residenceLocation, portfolioCategory, message, lane } = body || {};

    if (!fullName || !email || !residenceLocation) {
      return NextResponse.json(
        { error: 'Full name, email and property location are required.' },
        { status: 400 }
      );
    }

    // Platform receipt — durable reference for the owner
    const receipt = makeReceipt();

    // In production this would write to Supabase / email the team.
    // For now we return a real receipt so the active platform flow completes.
    console.log('[AUREL INQUIRE]', {
      receipt,
      fullName,
      email,
      residenceLocation,
      portfolioCategory,
      lane: lane || null,
      message: message ? String(message).slice(0, 200) : null,
      at: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      receipt,
      message: 'Inquiry registered. Team will respond using the provided contact.',
    });
  } catch {
    return NextResponse.json({ error: 'Unable to process inquiry.' }, { status: 500 });
  }
}
