export type ComputerStatus = 'online' | 'idle' | 'offline' | 'maintenance';

export type Computer = {
  id: string;
  name: string;
  role: string;
  host: string;
  status: ComputerStatus;
  lastSeen: string;
  notes?: string;
};

export type ActivityKind =
  | 'deploy'
  | 'inquiry'
  | 'pathfinder'
  | 'scent'
  | 'computer'
  | 'system'
  | 'manual';

export type Activity = {
  id: string;
  kind: ActivityKind;
  title: string;
  detail?: string;
  computerId?: string;
  at: string;
};

export const SEED_COMPUTERS: Computer[] = [
  {
    id: 'mega-agent',
    name: 'MegaAgent PC Studio',
    role: 'Primary compute · local-first',
    host: 'Threadripper 7970X · RTX PRO 6000 96GB',
    status: 'online',
    lastSeen: new Date().toISOString(),
    notes: 'Always-on owner node · privacy-first',
  },
  {
    id: 'vercel-edge',
    name: 'Vercel Edge (aurel)',
    role: 'Public surface',
    host: 'aurel.a11-k.space',
    status: 'online',
    lastSeen: new Date().toISOString(),
    notes: 'House + System production',
  },
];

export const SEED_ACTIVITY: Activity[] = [
  {
    id: 'a1',
    kind: 'deploy',
    title: 'Production deploy ready',
    detail: 'dpl process stages + assessment CTA',
    at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 'a2',
    kind: 'system',
    title: 'Pathfinder + inquiry live',
    detail: 'Receipt API + lane prefill',
    at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'a3',
    kind: 'computer',
    title: 'MegaAgent registered',
    detail: 'Primary local-first node',
    computerId: 'mega-agent',
    at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export const KIND_LABEL: Record<ActivityKind, string> = {
  deploy: 'Deploy',
  inquiry: 'Inquiry',
  pathfinder: 'Pathfinder',
  scent: 'Scent',
  computer: 'Computer',
  system: 'System',
  manual: 'Manual',
};

export const STATUS_COLOR: Record<ComputerStatus, string> = {
  online: 'text-emerald-400',
  idle: 'text-[#c9854a]',
  offline: 'text-[#8a7f72]',
  maintenance: 'text-amber-400',
};
