import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, residenceLocation, portfolioCategory, message } = body || {};

    if (!fullName?.trim() || !email?.trim() || !residenceLocation?.trim()) {
      return NextResponse.json(
        { error: 'Full name, email and property location are required.' },
        { status: 400 }
      );
    }

    // Receipt format kept stable for client display. No secrets, no external write yet.
    const receipt = `AUR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // Structured log for later operator pickup (Vercel logs / future webhook)
    console.log(
      JSON.stringify({
        type: 'aurel_inquiry',
        receipt,
        fullName: String(fullName).slice(0, 160),
        email: String(email).slice(0, 254),
        residenceLocation: String(residenceLocation).slice(0, 200),
        portfolioCategory: portfolioCategory || 'residential',
        message: message ? String(message).slice(0, 2000) : '',
        at: new Date().toISOString(),
      })
    );

    return NextResponse.json({ receipt, ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to register inquiry.' }, { status: 500 });
  }
}
