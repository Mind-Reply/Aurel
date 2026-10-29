'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  SEED_COMPUTERS,
  SEED_AGENTS,
  SEED_ACTIVITY,
  COMPUTER_TEMPLATES,
  AGENT_TEMPLATES,
  ACTIVITY_TEMPLATES,
  KIND_LABEL,
  STATUS_COLOR,
  AGENT_STATUS_COLOR,
  makeId,
  type Computer,
  type ComputerStatus,
  type ComputerTemplate,
  type Agent,
  type AgentStatus,
  type AgentTemplate,
  type Activity,
  type ActivityKind,
  type ActivityTemplate,
} from '../../lib/admin';

const STORAGE_PC = 'aurel-admin-computers';
const STORAGE_AG = 'aurel-admin-agents';
const STORAGE_ACT = 'aurel-admin-activity';
const STORAGE_GATE = 'aurel-admin-unlocked';

const OWNER_CODE = 'aurel-owner';

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [computers, setComputers] = useState<Computer[]>(SEED_COMPUTERS);
  const [agents, setAgents] = useState<Agent[]>(SEED_AGENTS);
  const [activities, setActivities] = useState<Activity[]>(SEED_ACTIVITY);
  const [filter, setFilter] = useState<ActivityKind | 'all'>('all');
  const [tab, setTab] = useState<'computers' | 'agents'>('agents');

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [host, setHost] = useState('');
  const [status, setStatus] = useState<ComputerStatus>('idle');
  const [notes, setNotes] = useState('');
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [agName, setAgName] = useState('');
  const [agMode, setAgMode] = useState('');
  const [agFocus, setAgFocus] = useState('');
  const [agStatus, setAgStatus] = useState<AgentStatus>('idle');
  const [agNotes, setAgNotes] = useState('');

  const [actTitle, setActTitle] = useState('');
  const [actKind, setActKind] = useState<ActivityKind>('manual');
  const [actDetail, setActDetail] = useState('');

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_GATE) === '1');
    setComputers(loadJSON(STORAGE_PC, SEED_COMPUTERS));
    setAgents(loadJSON(STORAGE_AG, SEED_AGENTS));
    setActivities(loadJSON(STORAGE_ACT, SEED_ACTIVITY));
  }, []);

  const persistPc = useCallback((list: Computer[]) => {
    setComputers(list);
    saveJSON(STORAGE_PC, list);
  }, []);

  const persistAg = useCallback((list: Agent[]) => {
    setAgents(list);
    saveJSON(STORAGE_AG, list);
  }, []);

  const persistAct = useCallback((list: Activity[]) => {
    setActivities(list);
    saveJSON(STORAGE_ACT, list);
  }, []);

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === OWNER_CODE) {
      localStorage.setItem(STORAGE_GATE, '1');
      setUnlocked(true);
      setCode('');
    } else {
      setMsg('Invalid code');
      setTimeout(() => setMsg(null), 2000);
    }
  };

  const lock = () => {
    localStorage.removeItem(STORAGE_GATE);
    setUnlocked(false);
  };

  const applyComputerTemplate = (tpl: ComputerTemplate) => {
    setName(tpl.name);
    setRole(tpl.role);
    setHost(tpl.host);
    setStatus(tpl.status);
    setNotes(tpl.notes || '');
  };

  const applyAgentTemplate = (tpl: AgentTemplate) => {
    setAgName(tpl.name);
    setAgMode(tpl.mode);
    setAgFocus(tpl.focus);
    setAgStatus(tpl.status);
    setAgNotes(tpl.notes || '');
  };

  const applyActivityTemplate = (tpl: ActivityTemplate) => {
    setActKind(tpl.kind);
    setActTitle(tpl.title);
    setActDetail(tpl.detail || '');
  };

  const addComputer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    setMsg(null);
    const computer: Computer = {
      id: makeId('pc'),
      name: name.trim(),
      role: role.trim() || 'Node',
      host: host.trim() || '—',
      status,
      lastSeen: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };
    persistPc([computer, ...computers]);
    persistAct([
      { id: makeId('act'), kind: 'computer', title: `Added ${computer.name}`, detail: computer.role, computerId: computer.id, at: new Date().toISOString() },
      ...activities,
    ]);
    try {
      await fetch('/api/admin/computers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(computer) });
    } catch {}
    setName(''); setRole(''); setHost(''); setNotes(''); setStatus('idle');
    setAdding(false);
    setMsg('Computer added');
    setTimeout(() => setMsg(null), 2000);
  };

  const addFromComputerTemplate = async (tpl: ComputerTemplate) => {
    setAdding(true);
    const computer: Computer = {
      id: makeId('pc'), name: tpl.name, role: tpl.role, host: tpl.host, status: tpl.status,
      lastSeen: new Date().toISOString(), notes: tpl.notes,
    };
    persistPc([computer, ...computers]);
    persistAct([
      { id: makeId('act'), kind: 'computer', title: `Added ${computer.name}`, detail: `Template · ${tpl.label}`, computerId: computer.id, at: new Date().toISOString() },
      ...activities,
    ]);
    setAdding(false);
    setMsg(`${tpl.label} added`);
    setTimeout(() => setMsg(null), 2000);
  };

  const addAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agName.trim()) return;
    setAdding(true);
    const agent: Agent = {
      id: makeId('ag'), name: agName.trim(), mode: agMode.trim() || 'custom',
      focus: agFocus.trim() || '—', status: agStatus, lastRun: new Date().toISOString(),
      notes: agNotes.trim() || undefined,
    };
    persistAg([agent, ...agents]);
    persistAct([
      { id: makeId('act'), kind: 'agent', title: `Agent registered · ${agent.name}`, detail: agent.mode, agentId: agent.id, at: new Date().toISOString() },
      ...activities,
    ]);
    setAgName(''); setAgMode(''); setAgFocus(''); setAgNotes(''); setAgStatus('idle');
    setAdding(false);
    setMsg('Agent added');
    setTimeout(() => setMsg(null), 2000);
  };

  const addFromAgentTemplate = async (tpl: AgentTemplate) => {
    setAdding(true);
    const agent: Agent = {
      id: makeId('ag'), name: tpl.name, mode: tpl.mode, focus: tpl.focus,
      status: tpl.status, lastRun: new Date().toISOString(), notes: tpl.notes,
    };
    persistAg([agent, ...agents]);
    persistAct([
      { id: makeId('act'), kind: 'agent', title: `Agent · ${tpl.label}`, detail: tpl.focus.slice(0, 80), agentId: agent.id, at: new Date().toISOString() },
      ...activities,
    ]);
    setAdding(false);
    setMsg(`${tpl.label} agent ready`);
    setTimeout(() => setMsg(null), 2000);
  };

  const setAgentStatus = (id: string, next: AgentStatus) => {
    const list = agents.map((a) => a.id === id ? { ...a, status: next, lastRun: new Date().toISOString() } : a);
    persistAg(list);
    const ag = list.find((a) => a.id === id);
    if (ag) {
      persistAct([
        { id: makeId('act'), kind: 'agent', title: `${ag.name} → ${next}`, agentId: id, at: new Date().toISOString() },
        ...activities,
      ]);
    }
  };

  const removeAgent = (id: string) => {
    const ag = agents.find((a) => a.id === id);
    persistAg(agents.filter((a) => a.id !== id));
    if (ag) {
      persistAct([
        { id: makeId('act'), kind: 'agent', title: `Removed agent · ${ag.name}`, at: new Date().toISOString() },
        ...activities,
      ]);
    }
  };

  const runAgent = (id: string) => {
    setAgentStatus(id, 'running');
    const ag = agents.find((a) => a.id === id);
    if (ag) {
      persistAct([
        { id: makeId('act'), kind: 'agent', title: `Run · ${ag.name}`, detail: ag.focus.slice(0, 100), agentId: id, at: new Date().toISOString() },
        ...activities,
      ]);
    }
  };

  const logActivity = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!actTitle.trim()) return;
    const activity: Activity = {
      id: makeId('act'), kind: actKind, title: actTitle.trim(),
      detail: actDetail.trim() || undefined, at: new Date().toISOString(),
    };
    persistAct([activity, ...activities]);
    try {
      await fetch('/api/admin/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activity) });
    } catch {}
    setActTitle(''); setActDetail('');
  };

  const logFromTemplate = async (tpl: ActivityTemplate) => {
    const activity: Activity = {
      id: makeId('act'), kind: tpl.kind, title: tpl.title, detail: tpl.detail, at: new Date().toISOString(),
    };
    persistAct([activity, ...activities]);
    setMsg(`Logged · ${tpl.label}`);
    setTimeout(() => setMsg(null), 1500);
  };

  const setComputerStatus = (id: string, next: ComputerStatus) => {
    const list = computers.map((c) => c.id === id ? { ...c, status: next, lastSeen: new Date().toISOString() } : c);
    persistPc(list);
    const pc = list.find((c) => c.id === id);
    if (pc) {
      persistAct([
        { id: makeId('act'), kind: 'computer', title: `${pc.name} → ${next}`, computerId: id, at: new Date().toISOString() },
        ...activities,
      ]);
    }
  };

  const removeComputer = (id: string) => {
    const pc = computers.find((c) => c.id === id);
    persistPc(computers.filter((c) => c.id !== id));
    if (pc) {
      persistAct([
        { id: makeId('act'), kind: 'computer', title: `Removed ${pc.name}`, at: new Date().toISOString() },
        ...activities,
      ]);
    }
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return activities;
    return activities.filter((a) => a.kind === filter);
  }, [activities, filter]);

  const onlineCount = computers.filter((c) => c.status === 'online').length;
  const runningAgents = agents.filter((a) => a.status === 'running').length;

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#090807] flex items-center justify-center px-6">
        <form onSubmit={unlock} className="w-full max-w-sm border border-white/10 bg-[#161310] p-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9854a] mb-2">Owner Admin</p>
          <h1 className="font-display text-2xl font-light text-[#f3ece3] mb-6">Unlock dashboard</h1>
          <input type="password" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Owner code"
            className="w-full border border-white/10 bg-[#0c0b0a] px-4 py-3 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none mb-4" autoFocus />
          {msg && <p className="text-xs text-red-400 mb-3">{msg}</p>}
          <button type="submit" className="w-full border border-[#c9854a] bg-[#c9854a] py-3 text-[11px] uppercase tracking-[0.2em] text-[#090807] hover:bg-transparent hover:text-[#c9854a] transition-colors">Enter</button>
          <Link href="/" className="mt-6 block text-center text-[11px] text-[#5c564e] hover:text-[#8a7f72]">← House</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090807] text-[#f3ece3]">
      <header className="border-b border-white/5 bg-[#0c0b0a]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm tracking-wide text-[#f3ece3] hover:text-[#c9854a]">AUREL</Link>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#8a7f72]">{runningAgents} agents · {onlineCount}/{computers.length} nodes</span>
            <button type="button" onClick={lock} className="text-[11px] uppercase tracking-[0.15em] text-[#5c564e] hover:text-[#8a7f72]">Lock</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-12">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-white/8 bg-[#161310]/60 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e]">Agents</p>
            <p className="font-display text-3xl text-[#f3ece3] mt-1">{agents.length}</p>
          </div>
          <div className="border border-white/8 bg-[#161310]/60 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e]">Running</p>
            <p className="font-display text-3xl text-emerald-400 mt-1">{runningAgents}</p>
          </div>
          <div className="border border-white/8 bg-[#161310]/60 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e]">Computers</p>
            <p className="font-display text-3xl text-[#f3ece3] mt-1">{computers.length}</p>
          </div>
          <div className="border border-white/8 bg-[#161310]/60 p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e]">Last event</p>
            <p className="font-display text-xl text-[#c9854a] mt-2">{activities[0] ? relativeTime(activities[0].at) : '—'}</p>
          </div>
        </section>

        {msg && (
          <p className="text-sm text-[#c9854a] border border-[#c9854a]/30 bg-[#c9854a]/5 px-4 py-2">{msg}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <section className="lg:col-span-2 space-y-6">
            <div className="flex gap-2">
              <button type="button" onClick={() => setTab('agents')} className={`text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 border ${tab === 'agents' ? 'border-[#c9854a] text-[#c9854a]' : 'border-white/10 text-[#5c564e]'}`}>Agents</button>
              <button type="button" onClick={() => setTab('computers')} className={`text-[11px] uppercase tracking-[0.15em] px-3 py-1.5 border ${tab === 'computers' ? 'border-[#c9854a] text-[#c9854a]' : 'border-white/10 text-[#5c564e]'}`}>Computers</button>
            </div>

            {tab === 'agents' && (
              <>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-3">Agents</p>
                  <h2 className="font-display text-2xl font-light text-[#f3ece3]">Parallel workers</h2>
                  <p className="mt-2 text-sm text-[#8a7f72]">Multiple agents on sub-problems · transparent reasoning · merged answer</p>
                </div>

                <div className="space-y-3">
                  {agents.map((a) => (
                    <div key={a.id} className="border border-white/8 bg-[#161310]/50 p-4 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-[#f3ece3]">{a.name}</p>
                          <p className="text-[11px] text-[#5c564e] mt-0.5">{a.mode}</p>
                          <p className="text-[11px] text-[#8a7f72] mt-1 line-clamp-2">{a.focus}</p>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider ${AGENT_STATUS_COLOR[a.status]}`}>{a.status}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        <button type="button" onClick={() => runAgent(a.id)} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[#c9854a]/40 text-[#c9854a] hover:bg-[#c9854a]/10">Run</button>
                        {(['running', 'idle', 'queued', 'error', 'offline'] as AgentStatus[]).map((s) => (
                          <button key={s} type="button" onClick={() => setAgentStatus(a.id, s)} className={`text-[10px] uppercase tracking-wider px-2 py-1 border ${a.status === s ? 'border-[#c9854a] text-[#c9854a]' : 'border-white/10 text-[#5c564e] hover:text-[#8a7f72]'}`}>{s}</button>
                        ))}
                        <button type="button" onClick={() => removeAgent(a.id)} className="ml-auto text-[10px] uppercase tracking-wider text-[#5c564e] hover:text-red-400">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Options cards */}
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Options · choose a mode</p>
                  <div className="grid grid-cols-1 gap-3">
                    {AGENT_TEMPLATES.map((tpl) => (
                      <div key={tpl.id} className="border border-white/8 bg-[#161310]/60 p-4 hover:border-[#c9854a]/40 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="text-sm text-[#f3ece3] font-medium">{tpl.label}</p>
                            <p className="text-[11px] text-[#5c564e] mt-0.5">{tpl.mode}</p>
                          </div>
                          <button type="button" disabled={adding} onClick={() => addFromAgentTemplate(tpl)}
                            className="shrink-0 border border-[#c9854a] bg-[#c9854a] px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#090807] hover:bg-transparent hover:text-[#c9854a] transition-colors disabled:opacity-50">
                            Select
                          </button>
                        </div>
                        <p className="text-[11px] text-[#8a7f72] mb-2 leading-relaxed">{tpl.focus}</p>
                        <ul className="space-y-1">
                          {tpl.points.map((pt, i) => (
                            <li key={i} className="text-[11px] text-[#5c564e] flex gap-2">
                              <span className="text-[#c9854a] shrink-0">·</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        <button type="button" onClick={() => applyAgentTemplate(tpl)} className="mt-3 text-[10px] uppercase tracking-wider text-[#5c564e] hover:text-[#c9854a]">
                          Prefill form →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={addAgent} className="border border-white/10 bg-[#0c0b0a] p-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Custom agent</p>
                  <input value={agName} onChange={(e) => setAgName(e.target.value)} placeholder="Name *" required className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                  <input value={agMode} onChange={(e) => setAgMode(e.target.value)} placeholder="Mode (parallel / search / imagine…)" className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                  <input value={agFocus} onChange={(e) => setAgFocus(e.target.value)} placeholder="Focus" className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                  <select value={agStatus} onChange={(e) => setAgStatus(e.target.value as AgentStatus)} className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] focus:border-[#c9854a] focus:outline-none">
                    <option value="idle">idle</option>
                    <option value="running">running</option>
                    <option value="queued">queued</option>
                    <option value="error">error</option>
                    <option value="offline">offline</option>
                  </select>
                  <button type="submit" disabled={adding} className="w-full border border-[#c9854a] bg-[#c9854a] py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#090807] hover:bg-transparent hover:text-[#c9854a] transition-colors disabled:opacity-50">Add agent</button>
                </form>
              </>
            )}

            {tab === 'computers' && (
              <>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-3">Computers</p>
                  <h2 className="font-display text-2xl font-light text-[#f3ece3]">Fleet</h2>
                </div>
                <div className="space-y-3">
                  {computers.map((c) => (
                    <div key={c.id} className="border border-white/8 bg-[#161310]/50 p-4 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm text-[#f3ece3]">{c.name}</p>
                          <p className="text-[11px] text-[#5c564e] mt-0.5">{c.role}</p>
                          <p className="text-[11px] text-[#8a7f72] mt-1">{c.host}</p>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider ${STATUS_COLOR[c.status]}`}>{c.status}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        {(['online', 'idle', 'offline', 'maintenance'] as ComputerStatus[]).map((s) => (
                          <button key={s} type="button" onClick={() => setComputerStatus(c.id, s)} className={`text-[10px] uppercase tracking-wider px-2 py-1 border ${c.status === s ? 'border-[#c9854a] text-[#c9854a]' : 'border-white/10 text-[#5c564e] hover:text-[#8a7f72]'}`}>{s}</button>
                        ))}
                        <button type="button" onClick={() => removeComputer(c.id)} className="ml-auto text-[10px] uppercase tracking-wider text-[#5c564e] hover:text-red-400">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border border-white/10 bg-[#0c0b0a] p-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Computer templates</p>
                  <div className="flex flex-wrap gap-2">
                    {COMPUTER_TEMPLATES.map((tpl) => (
                      <button key={tpl.id} type="button" disabled={adding} onClick={() => addFromComputerTemplate(tpl)}
                        onContextMenu={(e) => { e.preventDefault(); applyComputerTemplate(tpl); }}
                        className="border border-white/10 px-3 py-1.5 text-[11px] text-[#8a7f72] hover:border-[#c9854a] hover:text-[#c9854a] transition-colors disabled:opacity-50">{tpl.label}</button>
                    ))}
                  </div>
                </div>
                <form onSubmit={addComputer} className="border border-white/10 bg-[#0c0b0a] p-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Custom computer</p>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" required className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                  <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                  <input value={host} onChange={(e) => setHost(e.target.value)} placeholder="Host / specs" className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                  <select value={status} onChange={(e) => setStatus(e.target.value as ComputerStatus)} className="w-full border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] focus:border-[#c9854a] focus:outline-none">
                    <option value="online">online</option><option value="idle">idle</option><option value="offline">offline</option><option value="maintenance">maintenance</option>
                  </select>
                  <button type="submit" disabled={adding} className="w-full border border-[#c9854a] bg-[#c9854a] py-2.5 text-[11px] uppercase tracking-[0.18em] text-[#090807] hover:bg-transparent hover:text-[#c9854a] transition-colors disabled:opacity-50">Add computer</button>
                </form>
              </>
            )}
          </section>

          <section className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-3">Automation</p>
                <h2 className="font-display text-2xl font-light text-[#f3ece3]">Activity</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'agent', 'deploy', 'inquiry', 'pathfinder', 'computer', 'system', 'manual'] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setFilter(k)} className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border ${filter === k ? 'border-[#c9854a] text-[#c9854a]' : 'border-white/10 text-[#5c564e] hover:text-[#8a7f72]'}`}>{k}</button>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0c0b0a] p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-3">Activity templates</p>
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_TEMPLATES.map((tpl) => (
                  <button key={tpl.id} type="button" onClick={() => logFromTemplate(tpl)}
                    onContextMenu={(e) => { e.preventDefault(); applyActivityTemplate(tpl); }}
                    className="border border-white/10 px-3 py-1.5 text-[11px] text-[#8a7f72] hover:border-[#c9854a] hover:text-[#c9854a] transition-colors">{tpl.label}</button>
                ))}
              </div>
            </div>

            <form onSubmit={logActivity} className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <select value={actKind} onChange={(e) => setActKind(e.target.value as ActivityKind)} className="border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] focus:border-[#c9854a] focus:outline-none">
                  {(Object.keys(KIND_LABEL) as ActivityKind[]).map((k) => (<option key={k} value={k}>{KIND_LABEL[k]}</option>))}
                </select>
                <input value={actTitle} onChange={(e) => setActTitle(e.target.value)} placeholder="Title…" className="flex-1 border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
                <button type="submit" className="border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-[#f3ece3] hover:border-[#c9854a] hover:text-[#c9854a] transition-colors">Log</button>
              </div>
              <input value={actDetail} onChange={(e) => setActDetail(e.target.value)} placeholder="Detail (optional)" className="border border-white/10 bg-[#161310] px-3 py-2 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none" />
            </form>

            <div className="border border-white/8 divide-y divide-white/5 max-h-[560px] overflow-y-auto">
              {filtered.length === 0 && <p className="p-6 text-sm text-[#5c564e]">No activity in this filter.</p>}
              {filtered.map((a) => (
                <div key={a.id} className="px-4 py-3 flex items-start gap-4 hover:bg-white/[0.02]">
                  <div className="shrink-0 w-20">
                    <span className="text-[10px] uppercase tracking-wider text-[#c9854a]">{KIND_LABEL[a.kind]}</span>
                    <p className="text-[10px] text-[#5c564e] mt-0.5">{relativeTime(a.at)}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#f3ece3]">{a.title}</p>
                    {a.detail && <p className="text-[11px] text-[#8a7f72] mt-0.5">{a.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
