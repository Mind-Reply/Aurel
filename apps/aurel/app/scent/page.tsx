'use client';

import { useState, useEffect } from 'react';
import { Shell } from '../../components/Shell';
import { accords, formulaName, type Accord } from '../../lib/house';

export default function ScentPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [held, setHeld] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('aurel-scent-hold');
      if (raw) setHeld(raw);
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 4 ? prev : [...prev, id]
    );
  };

  const name = formulaName(selected);

  const hold = () => {
    if (selected.length === 0) return;
    try {
      localStorage.setItem('aurel-scent-hold', name);
      setHeld(name);
    } catch {}
  };

  const byFamily = (f: Accord['family']) => accords.filter((a) => a.family === f);

  return (
    <Shell>
      <section className="px-6 pt-12 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9854a] mb-3">Scent</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-[#f3ece3] mb-4">The Atelier</h1>
          <p className="max-w-xl text-sm font-light text-[#8a7f72] mb-16">
            Liquid silver poured over fractured black stone. Compose an accord. Hold it.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              {(['top', 'heart', 'base'] as const).map((family) => (
                <div key={family}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e] mb-4">{family}</p>
                  <div className="flex flex-wrap gap-3">
                    {byFamily(family).map((a) => {
                      const on = selected.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => toggle(a.id)}
                          aria-pressed={on}
                          className={`border px-5 py-3 text-left transition-all duration-200 ${
                            on
                              ? 'border-[#c9854a] bg-[#c9854a]/10 text-[#f3ece3]'
                              : 'border-white/10 text-[#8a7f72] hover:border-white/25'
                          }`}
                        >
                          <span className="block text-sm font-medium">{a.name}</span>
                          <span className="block text-[11px] mt-0.5 opacity-70">{a.note}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 border border-white/8 bg-[#161310]/80 p-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f72] mb-2">Formula</p>
                <h2 className="font-display text-3xl font-light text-[#f3ece3] mb-6">{name}</h2>
                {selected.length > 0 ? (
                  <ul className="space-y-2 mb-8">
                    {selected.map((id) => {
                      const a = accords.find((x) => x.id === id);
                      return (
                        <li key={id} className="text-sm text-[#8a7f72]">
                          {a?.name} <span className="text-[#5c564e]">· {a?.family}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-[#5c564e] mb-8">Select up to four notes.</p>
                )}
                <button
                  type="button"
                  onClick={hold}
                  disabled={selected.length === 0}
                  className="w-full border border-[#c9854a] bg-[#c9854a] py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a] disabled:opacity-40 disabled:pointer-events-none"
                >
                  Hold This Formula
                </button>
                {held && (
                  <p className="mt-6 text-[11px] text-[#c9854a]">Held: {held}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
