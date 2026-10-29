'use client';

import { useState } from 'react';
import { Shell } from '../../components/Shell';

const materials = [
  { id: 'silver', name: 'Liquid Silver', note: 'Poured, then set. Reflects without glare.' },
  { id: 'stone', name: 'Black Basalt', note: 'Wet rock under tungsten light.' },
  { id: 'silk', name: 'Sheer Black', note: 'Almost invisible until it moves.' },
  { id: 'cuff', name: 'Sculptural Cuff', note: 'Armor that rests on the wrist.' },
];

export default function MetalPage() {
  const [active, setActive] = useState('silver');

  return (
    <Shell>
      <section className="px-6 pt-12 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9854a] mb-3">Metal</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-[#f3ece3] mb-4">Couture Armor</h1>
          <p className="max-w-xl text-sm font-light text-[#8a7f72] mb-16">
            Sculptural silver against fractured stone. Materials chosen for presence, not volume.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-3">
              {materials.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActive(m.id)}
                  className={`w-full text-left border px-6 py-5 transition-all duration-200 ${
                    active === m.id
                      ? 'border-[#c9854a] bg-[#c9854a]/10'
                      : 'border-white/8 hover:border-white/20'
                  }`}
                >
                  <span className="block font-display text-xl text-[#f3ece3]">{m.name}</span>
                  <span className="block mt-1 text-[12px] text-[#8a7f72]">{m.note}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-7">
              <div className="aspect-[4/5] border border-white/8 bg-gradient-to-br from-[#1a1510] via-[#0c0b0a] to-[#090807] flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9854a] mb-4">Active</p>
                  <p className="font-display text-3xl md:text-4xl font-light text-[#f3ece3]">
                    {materials.find((m) => m.id === active)?.name}
                  </p>
                  <p className="mt-4 text-sm text-[#8a7f72] max-w-xs mx-auto">
                    {materials.find((m) => m.id === active)?.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
