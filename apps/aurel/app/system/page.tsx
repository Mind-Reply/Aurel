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
      {/* Connectivity hero — prior language kept */}
      <section className="px-6 pt-12 pb-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9854a] mb-3">System</p>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-tight text-[#f3ece3] max-w-3xl text-balance">
            We do not sell routers.<br />
            <span className="italic text-[#c9854a]">We design confidence.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#8a7f72]">
            Every room, every device, every moment — calm, stable, seamless connectivity engineered for high-consequence architectural estates.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="border border-[#c9854a] bg-[#c9854a] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
            >
              Begin Private Inquiry
            </button>
            <a
              href="#pathfinder"
              className="border border-white/20 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f3ece3] transition-colors duration-200 hover:border-[#c9854a] hover:text-[#c9854a]"
            >
              Pathfinder
            </a>
          </div>
        </div>
      </section>

      {/* Architecture points — restored from prior */}
      <section className="px-6 py-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#8a7f72]">The Architecture</span>
            <h2 className="font-display text-3xl font-light leading-snug text-[#f3ece3]">Infrastructure as an extension of interior space.</h2>
          </div>
          <div className="md:col-span-8 flex flex-col space-y-8 text-base font-light leading-relaxed text-[#8a7f72]">
            <p>Traditional enterprise networks optimize for throughput at the cost of operational noise. In architectural estates, cables, blinking arrays, and unscheduled resets compromise the sanctuary of intentional design.</p>
            <p>AUREL integrates high-reliability wireless infrastructure into plaster, masonry, and millwork, with performance and coverage validated against each property’s actual requirements.</p>
            <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <span className="mb-1 block font-display text-3xl text-[#f3ece3]">Designed</span>
                <span className="text-xs uppercase tracking-[0.15em] text-[#5c564e]">For resilience</span>
              </div>
              <div>
                <span className="mb-1 block font-display text-3xl text-[#f3ece3]">Measured</span>
                <span className="text-xs uppercase tracking-[0.15em] text-[#5c564e]">Against real conditions</span>
              </div>
              <div>
                <span className="mb-1 block font-display text-3xl text-[#f3ece3]">Discreet</span>
                <span className="text-xs uppercase tracking-[0.15em] text-[#5c564e]">By design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolios — prior Residence / Hospitality */}
      <section className="px-6 py-20 md:px-8 border-b border-white/5 bg-[#0c0b0a]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-xl">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#8a7f72]">Commission Frameworks</span>
            <h2 className="font-display text-3xl font-light text-[#f3ece3]">Bespoke network design for demanding environments.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="flex flex-col justify-between border border-white/8 bg-[#161310]/60 p-8 md:p-10">
              <div>
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Portfolio 01</span>
                <h3 className="mb-4 font-display text-2xl text-[#f3ece3]">Architectural Residences</h3>
                <p className="mb-6 text-sm font-light leading-relaxed text-[#8a7f72]">
                  Site-specific wireless planning for concrete, glass, and steel boundaries, with discreet access points and resilient connectivity options.
                </p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-6 text-xs uppercase tracking-[0.1em] text-[#8a7f72]">
                <li>• Concealed cabling strategy</li>
                <li>• Multi-WAN failover planning</li>
                <li>• Segmented connected devices</li>
              </ul>
            </article>
            <article className="flex flex-col justify-between border border-white/8 bg-[#161310]/60 p-8 md:p-10">
              <div>
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Portfolio 02</span>
                <h3 className="mb-4 font-display text-2xl text-[#f3ece3]">Private Hospitality & Villas</h3>
                <p className="mb-6 text-sm font-light leading-relaxed text-[#8a7f72]">
                  Guest connectivity designed for high-density use across indoor and outdoor spaces, with operational visibility and defined service expectations.
                </p>
              </div>
              <ul className="space-y-2 border-t border-white/5 pt-6 text-xs uppercase tracking-[0.1em] text-[#8a7f72]">
                <li>• Seamless roaming design</li>
                <li>• Segregated guest access</li>
                <li>• Remote health monitoring options</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Pathfinder — active recommendation → inquiry */}
      <section id="pathfinder" className="px-6 py-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a7f72] mb-3">Pathfinder</p>
          <h2 className="font-display text-3xl font-light text-[#f3ece3] mb-4">Find the right lane.</h2>
          <p className="text-sm font-light text-[#8a7f72] mb-12 max-w-xl">Answer three questions. Receive a concrete product recommendation, then open a private inquiry pre-aligned to that lane.</p>

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
              <p className="text-sm font-light text-[#8a7f72] leading-relaxed mb-6">{rec.why}</p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="border border-[#c9854a] bg-[#c9854a] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
              >
                Start this lane — Private Inquiry
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Products + Divisions + Telemetry CTA */}
      <section className="border-t border-white/5 px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
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

        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/8 bg-[#161310]/50 p-8 md:p-10">
          <div>
            <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#c9854a]">Auditable Telemetry</span>
            <h3 className="font-display text-2xl text-[#f3ece3]">Operational records and network assurance.</h3>
            <p className="mt-2 text-sm font-light text-[#8a7f72] max-w-md">Commission an assessment. Receive a private blueprint with room priority, problem zones, guest access logic and a clear upgrade path.</p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="shrink-0 border border-[#c9854a] bg-[#c9854a] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
          >
            Commission Assessment
          </button>
        </div>
      </section>

      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </Shell>
  );
}
