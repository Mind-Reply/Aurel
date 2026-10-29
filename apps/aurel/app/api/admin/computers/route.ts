import { NextResponse } from 'next/server';
import { SEED_COMPUTERS, makeId, type Computer, type ComputerStatus } from '../../../lib/admin';

// Serverless-friendly: returns seed + accepts POST for logging.
// Primary persistence is client localStorage (owner admin). Server keeps a soft cache for the request lifetime.

let cache: Computer[] = [...SEED_COMPUTERS];

export async function GET() {
  return NextResponse.json({ computers: cache });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, host, status, notes } = body || {};

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    const computer: Computer = {
      id: makeId('pc'),
      name: String(name).trim().slice(0, 120),
      role: String(role || 'Node').trim().slice(0, 120),
      host: String(host || '—').trim().slice(0, 200),
      status: (['online', 'idle', 'offline', 'maintenance'].includes(status)
        ? status
        : 'idle') as ComputerStatus,
      lastSeen: new Date().toISOString(),
      notes: notes ? String(notes).trim().slice(0, 500) : undefined,
    };

    cache = [computer, ...cache.filter((c) => c.id !== computer.id)];

    console.log('[AUREL ADMIN] computer added', computer.id, computer.name);

    return NextResponse.json({ ok: true, computer });
  } catch {
    return NextResponse.json({ error: 'Unable to add computer' }, { status: 500 });
  }
}
