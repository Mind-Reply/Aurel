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

export type AgentStatus = 'running' | 'idle' | 'queued' | 'error' | 'offline';

export type Agent = {
  id: string;
  name: string;
  mode: string;
  status: AgentStatus;
  focus: string;
  lastRun: string;
  notes?: string;
};

export type ActivityKind =
  | 'deploy'
  | 'inquiry'
  | 'pathfinder'
  | 'scent'
  | 'computer'
  | 'agent'
  | 'system'
  | 'manual';

export type Activity = {
  id: string;
  kind: ActivityKind;
  title: string;
  detail?: string;
  computerId?: string;
  agentId?: string;
  at: string;
};

export type ComputerTemplate = {
  id: string;
  label: string;
  name: string;
  role: string;
  host: string;
  status: ComputerStatus;
  notes?: string;
};

export type AgentTemplate = {
  id: string;
  label: string;
  name: string;
  mode: string;
  focus: string;
  status: AgentStatus;
  notes?: string;
};

export type ActivityTemplate = {
  id: string;
  label: string;
  kind: ActivityKind;
  title: string;
  detail?: string;
};

export const COMPUTER_TEMPLATES: ComputerTemplate[] = [
  {
    id: 'tpl-mega',
    label: 'MegaAgent',
    name: 'MegaAgent PC Studio',
    role: 'Primary compute · local-first',
    host: 'Threadripper 7970X · RTX PRO 6000 96GB',
    status: 'online',
    notes: 'Always-on owner node · privacy-first',
  },
  {
    id: 'tpl-edge',
    label: 'Vercel Edge',
    name: 'Vercel Edge (aurel)',
    role: 'Public surface',
    host: 'aurel.a11-k.space',
    status: 'online',
    notes: 'House + System production',
  },
  {
    id: 'tpl-laptop',
    label: 'Owner laptop',
    name: 'Owner Laptop',
    role: 'Mobile control',
    host: 'macOS / Windows',
    status: 'idle',
    notes: 'Day-to-day owner machine',
  },
  {
    id: 'tpl-mac-mini',
    label: 'Mac Mini',
    name: 'Mac Mini Node',
    role: 'Always-on light node',
    host: 'Apple Silicon',
    status: 'online',
  },
  {
    id: 'tpl-gpu',
    label: 'GPU node',
    name: 'GPU Worker',
    role: 'Inference / render',
    host: 'CUDA workstation',
    status: 'idle',
    notes: 'Heavy jobs only',
  },
  {
    id: 'tpl-pi',
    label: 'Edge Pi',
    name: 'Raspberry Pi Edge',
    role: 'Site / IoT edge',
    host: 'ARM · local network',
    status: 'offline',
  },
  {
    id: 'tpl-cloud',
    label: 'Cloud VM',
    name: 'Cloud VM',
    role: 'Burst / staging',
    host: 'GCP / AWS / Hetzner',
    status: 'idle',
  },
];

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'ag-multi',
    label: 'Multi-agent',
    name: 'Multi-Agent Core',
    mode: 'parallel',
    focus: 'Hardest questions · sub-problems in parallel · merged cited answer',
    status: 'idle',
    notes: 'Each agent shows work · auditable reasoning',
  },
  {
    id: 'ag-search',
    label: 'Search',
    name: 'Live Search Agent',
    mode: 'search',
    focus: 'Web + 𝕏 live · primary sources · real-time trends',
    status: 'idle',
    notes: 'Not last year’s training data',
  },
  {
    id: 'ag-imagine',
    label: 'Imagine',
    name: 'Imagine Agent',
    mode: 'imagine',
    focus: 'Text-to-image · text-to-video · restyle and iterate',
    status: 'idle',
    notes: 'Up to 2K · short video in-thread',
  },
  {
    id: 'ag-code',
    label: 'Code',
    name: 'Code Agent',
    mode: 'code',
    focus: 'Write · debug · explain in any language',
    status: 'idle',
  },
  {
    id: 'ag-vision',
    label: 'Vision',
    name: 'Vision Agent',
    mode: 'vision',
    focus: 'Screenshots · photos · diagrams',
    status: 'idle',
  },
  {
    id: 'ag-voice',
    label: 'Voice',
    name: 'Voice Agent',
    mode: 'voice',
    focus: 'Natural back-and-forth · low latency',
    status: 'idle',
  },
  {
    id: 'ag-file',
    label: 'Files',
    name: 'File & PDF Agent',
    mode: 'files',
    focus: 'Upload · summarize · extract',
    status: 'idle',
  },
  {
    id: 'ag-reason',
    label: 'Deep reason',
    name: 'Deep Reasoning Agent',
    mode: 'reason',
    focus: 'Step-by-step thinking · verifiable chain',
    status: 'idle',
  },
];

export const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  {
    id: 'act-deploy-prod',
    label: 'Deploy prod',
    kind: 'deploy',
    title: 'Production deploy ready',
    detail: 'Vercel production · main',
  },
  {
    id: 'act-deploy-preview',
    label: 'Deploy preview',
    kind: 'deploy',
    title: 'Preview deploy',
    detail: 'Branch preview live',
  },
  {
    id: 'act-inquiry',
    label: 'Inquiry in',
    kind: 'inquiry',
    title: 'Private inquiry received',
    detail: 'Receipt issued',
  },
  {
    id: 'act-pathfinder',
    label: 'Pathfinder',
    kind: 'pathfinder',
    title: 'Pathfinder recommendation used',
    detail: 'Lane prefilled into inquiry',
  },
  {
    id: 'act-scent',
    label: 'Scent hold',
    kind: 'scent',
    title: 'Scent formula held',
    detail: 'Atelier localStorage',
  },
  {
    id: 'act-blueprint',
    label: 'Blueprint',
    kind: 'system',
    title: 'Private Blueprint commissioned',
    detail: '10-day delivery clock started',
  },
  {
    id: 'act-assess',
    label: 'Assessment',
    kind: 'system',
    title: 'Assessment request',
    detail: '48h response SLA',
  },
  {
    id: 'act-agent-run',
    label: 'Agent run',
    kind: 'agent',
    title: 'Agent run started',
    detail: 'Parallel workers engaged',
  },
  {
    id: 'act-agent-merge',
    label: 'Agent merge',
    kind: 'agent',
    title: 'Multi-agent results merged',
    detail: 'Cited coherent answer',
  },
  {
    id: 'act-maint',
    label: 'Maintenance',
    kind: 'computer',
    title: 'Node entered maintenance',
    detail: 'Scheduled window',
  },
  {
    id: 'act-online',
    label: 'Node online',
    kind: 'computer',
    title: 'Node back online',
  },
  {
    id: 'act-manual',
    label: 'Note',
    kind: 'manual',
    title: 'Owner note',
    detail: '',
  },
];

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

export const SEED_AGENTS: Agent[] = [
  {
    id: 'agent-multi',
    name: 'Multi-Agent Core',
    mode: 'parallel',
    status: 'idle',
    focus: 'Hardest questions · sub-problems in parallel',
    lastRun: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    notes: 'Auditable · merged cited answers',
  },
  {
    id: 'agent-search',
    name: 'Live Search Agent',
    mode: 'search',
    status: 'idle',
    focus: 'Web + 𝕏 · primary sources',
    lastRun: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
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
    kind: 'agent',
    title: 'Multi-agent idle',
    detail: 'Ready for parallel sub-problems',
    agentId: 'agent-multi',
    at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'a3',
    kind: 'system',
    title: 'Pathfinder + inquiry live',
    detail: 'Receipt API + lane prefill',
    at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'a4',
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
  agent: 'Agent',
  system: 'System',
  manual: 'Manual',
};

export const STATUS_COLOR: Record<ComputerStatus, string> = {
  online: 'text-emerald-400',
  idle: 'text-[#c9854a]',
  offline: 'text-[#8a7f72]',
  maintenance: 'text-amber-400',
};

export const AGENT_STATUS_COLOR: Record<AgentStatus, string> = {
  running: 'text-emerald-400',
  idle: 'text-[#c9854a]',
  queued: 'text-sky-400',
  error: 'text-red-400',
  offline: 'text-[#8a7f72]',
};
