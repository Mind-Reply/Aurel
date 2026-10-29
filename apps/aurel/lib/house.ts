export type Accord = {
  id: string;
  name: string;
  note: string;
  family: 'top' | 'heart' | 'base';
};

export const accords: Accord[] = [
  { id: 'ozone', name: 'Ozone', note: 'Clean air after rain', family: 'top' },
  { id: 'metal', name: 'Cold Metal', note: 'Polished steel on skin', family: 'top' },
  { id: 'amber', name: 'Tungsten Amber', note: 'Warm resin under light', family: 'heart' },
  { id: 'stone', name: 'Black Stone', note: 'Wet basalt, mineral depth', family: 'heart' },
  { id: 'leather', name: 'Soft Leather', note: 'Worn gloves, quiet rooms', family: 'base' },
  { id: 'musk', name: 'White Musk', note: 'Skin-close, almost invisible', family: 'base' },
];

export function formulaName(ids: string[]): string {
  const map: Record<string, string> = {
    ozone: 'Air',
    metal: 'Edge',
    amber: 'Pour',
    stone: 'Vein',
    leather: 'Hold',
    musk: 'Skin',
  };
  if (ids.length === 0) return 'Untitled';
  const parts = ids.map((id) => map[id] || id).slice(0, 3);
  return `The ${parts.join(' ')}`;
}

export const divisions = [
  { name: 'MindReply', role: 'Intelligence layer', status: 'Active' },
  { name: 'A11-K', role: 'Owner operating system', status: 'Active' },
  { name: 'ResellerPro', role: 'Deployment & domains', status: 'Active' },
  { name: 'AUREL', role: 'Experience & connectivity', status: 'Active' },
  { name: 'PatchTalk', role: 'Communications', status: 'Review' },
];

export const products = [
  { name: 'Private Connectivity Blueprint', lane: 'Assessment' },
  { name: 'Residence & Venue Design', lane: 'Design' },
  { name: 'Invisible Infrastructure', lane: 'Install' },
  { name: 'Telemetry Assurance', lane: 'Operate' },
];

export type Seat = 'owner' | 'operator' | 'guest';
export type Need = 'calm' | 'coverage' | 'control';
export type Scale = 'single' | 'estate' | 'portfolio';

export type Recommendation = {
  lane: string;
  product: string;
  why: string;
};

export function recommend(seat: Seat, need: Need, scale: Scale): Recommendation {
  if (seat === 'owner' && need === 'calm') {
    return {
      lane: 'Private Blueprint',
      product: 'Private Connectivity Blueprint',
      why: 'Owners buy confidence first. A measured assessment removes noise before any hardware is chosen.',
    };
  }
  if (need === 'coverage' && scale !== 'single') {
    return {
      lane: 'Estate Design',
      product: 'Residence & Venue Design',
      why: 'Multi-building or hospitality environments require roaming design and segmented guest access from day one.',
    };
  }
  if (need === 'control') {
    return {
      lane: 'Telemetry',
      product: 'Telemetry Assurance',
      why: 'Operational visibility and remote health monitoring keep the network invisible and reliable over time.',
    };
  }
  return {
    lane: 'Infrastructure',
    product: 'Invisible Infrastructure',
    why: 'Discrete access points integrated into the architecture deliver calm, stable connectivity without visual noise.',
  };
}
