'use client';

import { useState } from 'react';
import { Shell } from '../../components/Shell';
import { divisions, products, recommend, type Seat, type Need, type Scale } from '../../lib/house';
import { InquiryModal } from '../../components/InquiryModal';

const processStages = [
  {
    n: '01',
    title: 'Inquiry',
    owner: 'Client',
    desc: 'Submit scope and location. Receipt issued instantly. Team responds within 48 hours.',
  },
  {
    n: '02',
    title: 'Private Blueprint',
    owner: 'AUREL',
    desc: 'Questionnaire, material and layout review, priority room map, problem-zone analysis, guest-access logic, single upgrade path. Delivered in 10 business days.',
  },
  {
    n: '03',
    title: 'Design Acceptance',
    owner: 'Client',
    desc: 'Blueprint reviewed. Scope, timeline and investment confirmed. Install phase begins only after written acceptance.',
  },
  {
    n: '04',
    title: 'Invisible Install',
    owner: 'AUREL + partners',
    desc: 'Discreet access points integrated into architecture. Coverage validated against the blueprint. Minimal disruption.',
  },
  {
    n: '05',
    title: 'Telemetry Assurance',
    owner: 'AUREL',
    desc: 'Ongoing health monitoring, failover verification, and operational records. Network remains invisible and reliable.',
  },
];

export default function SystemPage() {
  const [seat, setSeat] = useState<Seat>('owner');
  const [need, setNeed] = useState<Need>('calm');
  const [scale, setScale] = useState<Scale>('single');
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillLane, setPrefillLane] = useState<string | undefined>();

  const rec = show ? recommend(seat, need, scale) : null;

  const openInquiry = (lane?: string) => {
    setPrefillLane(lane);
    setModalOpen(true);
  };

  return (
    <Shell>
      {/* Hero — primary commercial CTA first */}
      <section className="px-6 pt-12 pb-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9854a] mb-3">System · Active Platform</p>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-tight text-[#f3ece3] max-w-3xl text-balance">
            We do not sell routers.<br />
            <span className="italic text-[#c9854a]">We design confidence.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#8a7f72]">
            Every room, every device, every moment — calm, stable, seamless connectivity engineered for high-consequence architectural estates.
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-[#5c564e]">
            Response within 48 hours · Limited new commissions
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openInquiry('Private Blueprint')}
              className="border border-[#c9854a] bg-[#c9854a] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
            >
              Request Private Assessment
            </button>
            <a
              href="#process"
              className="border border-white/20 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f3ece3] transition-colors duration-200 hover:border-[#c9854a] hover:text-[#c9854a]"
            >
              How it works
            </a>
            <a
              href="#pathfinder"
              className="border border-white/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#8a7f72] transition-colors duration-200 hover:border-white/30 hover:text-[#f3ece3]"
            >
              Pathfinder
            </a>
          </div>
        </div>
      </section>

      {/* Architecture */}
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

      {/* Resilience & Risk */}
      <section className="px-6 py-20 md:px-8 border-b border-white/5 bg-[#0c0b0a]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#8a7f72]">Resilience</span>
            <h2 className="font-display text-3xl font-light text-[#f3ece3]">What happens when the primary path fails.</h2>
            <p className="mt-3 text-sm font-light text-[#8a7f72]">High-consequence environments require explicit failure design, not hope.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/8 bg-[#161310]/60 p-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-3">Failover</p>
              <h3 className="font-display text-xl text-[#f3ece3] mb-3">Multi-WAN</h3>
              <p className="text-sm font-light leading-relaxed text-[#8a7f72]">Primary and secondary paths planned from day one. Automatic switch when the main circuit degrades. No manual intervention required for the household.</p>
            </div>
            <div className="border border-white/8 bg-[#161310]/60 p-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-3">Segmentation</p>
              <h3 className="font-display text-xl text-[#f3ece3] mb-3">Guest vs private</h3>
              <p className="text-sm font-light leading-relaxed text-[#8a7f72]">Guest traffic isolated from owner and staff networks. IoT and media devices placed on controlled segments so a compromised camera cannot reach the office.</p>
            </div>
            <div className="border border-white/8 bg-[#161310]/60 p-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-3">Visibility</p>
              <h3 className="font-display text-xl text-[#f3ece3] mb-3">Telemetry</h3>
              <p className="text-sm font-light leading-relaxed text-[#8a7f72]">Health signals, coverage drift and outage events recorded. Optional remote monitoring so issues are known before they become visible to the household.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence — Selected Work */}
      <section className="px-6 py-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#8a7f72]">Selected Work</span>
            <h2 className="font-display text-3xl font-light text-[#f3ece3]">Evidence, not claims.</h2>
            <p className="mt-3 text-sm font-light text-[#8a7f72]">Anonymised outcome from a recent commission. Full case material available under NDA.</p>
          </div>
          <article className="border border-white/8 bg-[#161310]/60 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="max-w-xl">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">Project 01 · Architectural Residence</span>
                <h3 className="font-display text-2xl text-[#f3ece3] mb-4">Coastal concrete villa · Southern Europe</h3>
                <p className="text-sm font-light leading-relaxed text-[#8a7f72]">
                  Thick reinforced concrete, extensive glazing, multi-level guest wings. Prior network produced dead zones in three primary suites and unstable outdoor coverage. Redesigned as a single discreet fabric with segmented guest access and dual-WAN failover.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 shrink-0 md:w-56">
                <div>
                  <p className="font-display text-3xl text-[#f3ece3]">0</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#5c564e] mt-1">Visible APs in living spaces</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-[#f3ece3]">99.4%</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#5c564e] mt-1">Uptime (90-day post)</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-[#f3ece3]">14d</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#5c564e] mt-1">Blueprint to install start</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-[#f3ece3]">1</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#5c564e] mt-1">Fabric across indoor + terrace</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openInquiry('Coastal villa reference')}
              className="mt-8 text-[11px] uppercase tracking-[0.15em] text-[#c9854a] hover:underline"
            >
              Request similar blueprint →
            </button>
          </article>
        </div>
      </section>

      {/* Process — 5 stages with ownership */}
      <section id="process" className="px-6 py-20 md:px-8 border-b border-white/5 bg-[#0c0b0a]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-xl">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#8a7f72]">Process</span>
            <h2 className="font-display text-3xl font-light text-[#f3ece3]">Five stages. Clear ownership.</h2>
            <p className="mt-3 text-sm font-light text-[#8a7f72]">No ambiguity about who does what, or when the next decision is required.</p>
          </div>
          <div className="space-y-0">
            {processStages.map((s, i) => (
              <div
                key={s.n}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 ${
                  i < processStages.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="md:col-span-1">
                  <span className="font-display text-2xl text-[#c9854a]">{s.n}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-xl text-[#f3ece3]">{s.title}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#5c564e]">Owner · {s.owner}</p>
                </div>
                <div className="md:col-span-8">
                  <p className="text-sm font-light leading-relaxed text-[#8a7f72]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment deliverable preview + primary CTA */}
      <section id="engagement" className="px-6 py-20 md:px-8 border-b border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#8a7f72]">Private Blueprint</span>
            <h2 className="font-display text-3xl font-light text-[#f3ece3]">What you receive.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="border border-[#c9854a]/25 bg-[#c9854a]/5 p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-2">Fixed scope · 10-day delivery</p>
              <h3 className="font-display text-2xl text-[#f3ece3] mb-6">Assessment deliverables</h3>
              <ul className="space-y-3 text-sm font-light text-[#8a7f72]">
                <li className="flex gap-3"><span className="text-[#c9854a] shrink-0">01</span> Room priority matrix — which spaces matter most</li>
                <li className="flex gap-3"><span className="text-[#c9854a] shrink-0">02</span> Problem-zone map — where coverage currently fails</li>
                <li className="flex gap-3"><span className="text-[#c9854a] shrink-0">03</span> Guest segmentation logic — private vs visitor traffic</li>
                <li className="flex gap-3"><span className="text-[#c9854a] shrink-0">04</span> Material and layout constraints noted</li>
                <li className="flex gap-3"><span className="text-[#c9854a] shrink-0">05</span> Single clear upgrade path with decision points</li>
              </ul>
              <p className="mt-8 text-[11px] uppercase tracking-[0.15em] text-[#5c564e]">
                No obligation beyond the blueprint fee. Install scoped only after acceptance.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f72] mb-2">Timeline</p>
                <p className="font-display text-xl text-[#f3ece3]">48h response · 10 business days delivery</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f72] mb-2">Next step</p>
                <p className="text-sm font-light text-[#8a7f72] leading-relaxed max-w-sm">
                  Submit the private inquiry. You receive a receipt immediately. The team contacts you within two business days to confirm intake and begin the blueprint.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openInquiry('Private Blueprint')}
                className="self-start border border-[#c9854a] bg-[#c9854a] px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
              >
                Request Private Assessment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolios */}
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
              <button
                type="button"
                onClick={() => openInquiry('Architectural Residences')}
                className="mt-6 self-start text-[11px] uppercase tracking-[0.15em] text-[#c9854a] hover:underline"
              >
                Inquire this portfolio →
              </button>
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
              <button
                type="button"
                onClick={() => openInquiry('Private Hospitality & Villas')}
                className="mt-6 self-start text-[11px] uppercase tracking-[0.15em] text-[#c9854a] hover:underline"
              >
                Inquire this portfolio →
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* Pathfinder — soft entry */}
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
                onClick={() => openInquiry(rec.product)}
                className="border border-[#c9854a] bg-[#c9854a] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
              >
                Start this lane — Private Inquiry
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Products + Divisions + final CTA */}
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
            <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#c9854a]">Ready when you are</span>
            <h3 className="font-display text-2xl text-[#f3ece3]">Request a private assessment.</h3>
            <p className="mt-2 text-sm font-light text-[#8a7f72] max-w-md">
              Receipt issued immediately. Team response within 48 hours. Blueprint in 10 business days.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openInquiry('Private Blueprint')}
            className="shrink-0 border border-[#c9854a] bg-[#c9854a] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
          >
            Request Private Assessment
          </button>
        </div>
      </section>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillLane={prefillLane}
      />
    </Shell>
  );
}
