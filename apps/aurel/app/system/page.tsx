'use client';

import { useState } from 'react';
import { Shell } from '../../components/Shell';
import { divisions, products, recommend, type Seat, type Need, type Scale } from '../../lib/house';
import { InquiryModal } from '../../components/InquiryModal';

export default function SystemPage() {
  const [seat, setSeat] = useState<Seat>('owner');
  const [need, setNeed] = useState<Need>('calm');
  const [scale, setScale] = useState<Scale>('single');
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const rec = show ? recommend(seat, need, scale) : null;

  return (
    <Shell>
      {/* Connectivity hero */}
      <section className="px-6 pt-12 pb-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9854a] mb-3">System</p>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-tight text-[#f3ece3] max-w-3xl text-balance">
            We do not sell routers.<br />
            <span className="italic text-[#c9854a]">We design confidence.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#8a7f72]">
            Invisible premium connectivity for architectural estates and private hospitality. Calm. Stable. Seamless.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-10 border border-[#c9854a] bg-[#c9854a] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
          >
            Begin Private Inquiry
          </button>
        </div>
      </section>

      {/* Pathfinder */}
      <section className="px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-3">Pathfinder</p>
          <h2 className="font-display text-3xl font-light text-[#f3ece3] mb-12">Find the right lane.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e] mb-3">Seat</p>
              <div className="flex flex-col gap-2">
                {(['owner', 'operator', 'guest'] as Seat[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSeat(s); setShow(false); }}
                    className={`border px-4 py-3 text-left text-sm capitalize transition-colors duration-200 ${
                      seat === s ? 'border-[#c9854a] text-[#f3ece3]' : 'border-white/10 text-[#8a7f72]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e] mb-3">Need</p>
              <div className="flex flex-col gap-2">
                {(['calm', 'coverage', 'control'] as Need[]).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => { setNeed(n); setShow(false); }}
                    className={`border px-4 py-3 text-left text-sm capitalize transition-colors duration-200 ${
                      need === n ? 'border-[#c9854a] text-[#f3ece3]' : 'border-white/10 text-[#8a7f72]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5c564e] mb-3">Scale</p>
              <div className="flex flex-col gap-2">
                {(['single', 'estate', 'portfolio'] as Scale[]).map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    onClick={() => { setScale(sc); setShow(false); }}
                    className={`border px-4 py-3 text-left text-sm capitalize transition-colors duration-200 ${
                      scale === sc ? 'border-[#c9854a] text-[#f3ece3]' : 'border-white/10 text-[#8a7f72]'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShow(true)}
            className="border border-white/20 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#f3ece3] hover:border-[#c9854a] hover:text-[#c9854a] transition-colors duration-200"
          >
            Recommend
          </button>

          {rec && (
            <div className="mt-10 border border-[#c9854a]/30 bg-[#c9854a]/5 p-8 max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-2">{rec.lane}</p>
              <h3 className="font-display text-2xl text-[#f3ece3] mb-3">{rec.product}</h3>
              <p className="text-sm font-light text-[#8a7f72] leading-relaxed">{rec.why}</p>
            </div>
          )}
        </div>
      </section>

      {/* Products + Divisions */}
      <section className="border-t border-white/5 px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-6">Products</p>
            <ul className="space-y-4">
              {products.map((p) => (
                <li key={p.name} className="border-b border-white/5 pb-4">
                  <span className="block text-sm text-[#f3ece3]">{p.name}</span>
                  <span className="text-[11px] text-[#5c564e]">{p.lane}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-6">Divisions</p>
            <ul className="space-y-4">
              {divisions.map((d) => (
                <li key={d.name} className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="block text-sm text-[#f3ece3]">{d.name}</span>
                    <span className="text-[11px] text-[#5c564e]">{d.role}</span>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider ${
                    d.status === 'Active' ? 'text-[#c9854a]' : 'text-[#8a7f72]'
                  }`}>{d.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Shell>
  );
}
