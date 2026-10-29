'use client';

import Link from 'next/link';
import { Shell } from '../components/Shell';

const doors = [
  {
    href: '/scent',
    label: 'Scent',
    title: 'The Atelier',
    desc: 'Liquid silver over black stone. Accords composed, held, and named.',
  },
  {
    href: '/metal',
    label: 'Metal',
    title: 'Couture Armor',
    desc: 'Sculptural silver against wet rock. Materials that refuse to shout.',
  },
  {
    href: '/system',
    label: 'System',
    title: 'Invisible Connectivity',
    desc: 'We do not sell routers. We design confidence — private networks as atmosphere.',
  },
];

export default function HousePage() {
  return (
    <Shell>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end md:items-center px-6 pb-20 pt-24 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a1510_0%,#090807_55%)]" />
        <div className="relative mx-auto max-w-6xl w-full">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#c9854a]">The House · Active Platform</p>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05] tracking-tight text-[#f3ece3] max-w-3xl text-balance">
            Scent. Metal.<br />
            <span className="italic text-[#c9854a]">System.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg font-light leading-relaxed text-[#8a7f72]">
            Three doors into one house. Atmosphere first. Connectivity that never announces itself. Pathfinder, atelier, and private inquiry live.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/system"
              className="border border-[#c9854a] bg-[#c9854a] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors duration-200 hover:bg-transparent hover:text-[#c9854a]"
            >
              Enter System
            </Link>
            <Link
              href="/scent"
              className="border border-white/20 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f3ece3] transition-colors duration-200 hover:border-[#c9854a] hover:text-[#c9854a]"
            >
              Compose Scent
            </Link>
            <Link
              href="/system#pathfinder"
              className="border border-white/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#8a7f72] transition-colors duration-200 hover:border-white/30 hover:text-[#f3ece3]"
            >
              Pathfinder
            </Link>
          </div>
        </div>
      </section>

      {/* Doors */}
      <section className="border-t border-white/5 px-6 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#8a7f72]">Three Doors</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-[#f3ece3] mb-16">Choose the language that fits.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doors.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group border border-white/8 bg-[#161310]/60 p-8 transition-all duration-200 hover:border-[#c9854a]/40 hover:bg-[#161310]"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a]">{d.label}</span>
                <h3 className="mt-3 font-display text-2xl font-light text-[#f3ece3] group-hover:text-[#c9854a] transition-colors duration-200">
                  {d.title}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#8a7f72]">{d.desc}</p>
                <span className="mt-8 inline-block text-[11px] uppercase tracking-[0.15em] text-[#5c564e] group-hover:text-[#c9854a] transition-colors">
                  Enter →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform strip */}
      <section className="border-t border-white/5 px-6 py-16 md:px-8 bg-[#0c0b0a]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-2">Atelier</p>
            <p className="font-display text-xl text-[#f3ece3]">Compose & hold</p>
            <p className="mt-1 text-sm text-[#8a7f72]">Accords stay in browser storage until you clear them.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-2">Pathfinder</p>
            <p className="font-display text-xl text-[#f3ece3]">Lane recommendation</p>
            <p className="mt-1 text-sm text-[#8a7f72]">Seat · need · scale → concrete product + inquiry.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9854a] mb-2">Inquiry</p>
            <p className="font-display text-xl text-[#f3ece3]">Private commission</p>
            <p className="mt-1 text-sm text-[#8a7f72]">Receipt returned instantly. Team reviews from logs.</p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-white/5 px-6 py-24 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9854a] mb-6">Manifesto</p>
          <p className="font-display text-2xl md:text-3xl font-light leading-snug text-[#f3ece3] text-balance">
            We do not sell routers.<br />
            <span className="italic text-[#8a7f72]">We design confidence.</span>
          </p>
          <p className="mt-8 text-sm font-light leading-relaxed text-[#8a7f72] max-w-xl mx-auto">
            Every room, every device, every moment — calm, stable, seamless. Connectivity engineered so the architecture remains the hero.
          </p>
          <Link
            href="/system"
            className="mt-10 inline-block border border-[#c9854a] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#c9854a] transition-colors duration-200 hover:bg-[#c9854a] hover:text-[#090807]"
          >
            Open System
          </Link>
        </div>
      </section>
    </Shell>
  );
}
