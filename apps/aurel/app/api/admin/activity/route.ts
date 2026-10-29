import { NextResponse } from 'next/server';
import { SEED_ACTIVITY, makeId, type Activity, type ActivityKind } from '@/lib/admin';

let cache: Activity[] = [...SEED_ACTIVITY];

export async function GET() {
  return NextResponse.json({
    activities: cache.slice(0, 100),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kind, title, detail, computerId } = body || {};

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const validKinds: ActivityKind[] = [
      'deploy',
      'inquiry',
      'pathfinder',
      'scent',
      'computer',
      'system',
      'manual',
    ];

    const activity: Activity = {
      id: makeId('act'),
      kind: validKinds.includes(kind) ? kind : 'manual',
      title: String(title).trim().slice(0, 200),
      detail: detail ? String(detail).trim().slice(0, 500) : undefined,
      computerId: computerId ? String(computerId) : undefined,
      at: new Date().toISOString(),
    };

    cache = [activity, ...cache].slice(0, 200);

    console.log('[AUREL ADMIN] activity', activity.kind, activity.title);

    return NextResponse.json({ ok: true, activity });
  } catch {
    return NextResponse.json({ error: 'Unable to log activity' }, { status: 500 });
  }
}
