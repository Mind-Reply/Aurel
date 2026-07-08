import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'
import Link from 'next/link'

const services = [
  {
    number: '01',
    name: 'Private Connectivity Blueprint',
    desc: 'A paid assessment and strategy brief. Room priority, problem zones, guest access logic, budget bands, and a clear upgrade path — delivered as a private document.',
  },
  {
    number: '02',
    name: 'Residence & Venue Design',
    desc: 'Room-by-room wireless architecture. Hardware placement, concealment strategy, and full experience mapping — designed to disappear into the space.',
  },
  {
    number: '03',
    name: 'Seamless Guest Access',
    desc: 'Premium guest connectivity built around low-friction onboarding and private, secure access. Arrival should feel effortless.',
  },
  {
    number: '04',
    name: 'Concierge Care',
    desc: 'Silent monitoring, seasonal tuning, refresh cycles, and high-touch support. Your environment stays optimal without requiring your attention.',
  },
  {
    number: '05',
    name: 'Upgrade Path Membership',
    desc: 'Wi‑Fi 7 optimisation now, structured migration planning for Wi‑Fi 8 when the ecosystem matures. No disruptive rip-and-replace.',
  },
]

const segments = [
  { label: 'Luxury Homes & Villas', sub: 'Private residences that demand invisible perfection' },
  { label: 'Boutique Hotels', sub: 'Hospitality where every guest moment counts' },
  { label: 'Executive Offices', sub: 'Members clubs and leadership environments' },
  { label: 'Private Clinics', sub: 'High-end studios and medical suites' },
  { label: 'Premium Venues', sub: 'Restaurants, showrooms, and event spaces' },
]

const principles = [
  { label: 'Reliability before hype', desc: 'Every claim grounded in real-world performance, not theoretical peak speeds.' },
  { label: 'Design before clutter', desc: 'Infrastructure that disappears into the environment it serves.' },
  { label: 'Private by default', desc: 'Your network design, your client data, your workflow — never shared.' },
  { label: 'Upgradeable without disruption', desc: 'Wi‑Fi 7 now. Wi‑Fi 8-ready architecture built in from day one.' },
]

export default function Home() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,169,110,0.07) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex justify-center mb-10">
            <div
              className="flex items-center gap-4 text-aurel-gold text-[10px] uppercase"
              style={{ letterSpacing: '0.32em' }}
            >
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-aurel-gold" />
              Invisible Premium Connectivity
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-aurel-gold" />
            </div>
          </div>

          {/* Wordmark hero */}
          <h1
            className="font-serif text-[80px] md:text-[120px] lg:text-[160px] font-light leading-none mb-2 gold-gradient"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.18em' }}
          >
            AUREL
          </h1>

          {/* Rule line */}
          <div className="flex justify-center mb-10">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-aurel-gold to-transparent" />
          </div>

          {/* Positioning line */}
          <p
            className="font-serif text-2xl md:text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.04em' }}
          >
            We do not sell routers.<br />
            <em>We design confidence.</em>
          </p>

          {/* Core promise */}
          <p className="text-aurel-stone text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-14" style={{ letterSpacing: '0.04em' }}>
            Every room, every device, every moment —<br />
            calm, stable, seamless connectivity.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton href="/inquiry" variant="solid">
              Begin Private Inquiry
            </GoldButton>
            <GoldButton href="/about" variant="outline">
              The Standard
            </GoldButton>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[9px] text-aurel-stone tracking-widest uppercase" style={{ letterSpacing: '0.22em' }}>Discover</span>
            <div className="w-px h-10 bg-gradient-to-b from-aurel-gold to-transparent" />
          </div>
        </div>
      </section>

      {/* ── MARKET SIGNAL ── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <EyebrowLabel label="The Moment" className="mb-8" />
              <h2
                className="font-serif text-4xl md:text-5xl font-light text-aurel-pearl leading-tight mb-8"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                The market has moved.<br />
                <em className="text-aurel-gold">Speed was never the story.</em>
              </h2>
              <p className="text-aurel-stone leading-relaxed mb-6">
                Wi‑Fi 7 adoption is accelerating. With 117.9 million access point shipments forecast for 2026, the technology is proven, available, and deployable now. Wi‑Fi 8 remains in its earliest chipset phase — real commercial products arrive late 2026 at earliest.
              </p>
              <p className="text-aurel-stone leading-relaxed mb-10">
                The buyers who matter are not chasing specifications. They are purchasing calm. Reliability. The confidence that when a client walks in, the network works without a thought.
              </p>
              <GoldButton href="/about" variant="outline">Read the full standard</GoldButton>
            </Reveal>

            <Reveal delay={150}>
              <div className="space-y-6">
                {[
                  { stat: '117.9M', label: 'Wi‑Fi 7 APs forecast shipped in 2026', source: 'Wireless Broadband Alliance' },
                  { stat: 'MLO', label: 'Multi-link operation — simultaneous bands, no drop', source: 'Wi‑Fi Alliance' },
                  { stat: 'Late 2026', label: 'First commercial Wi‑Fi 8 products expected', source: 'Qualcomm, March 2026' },
                  { stat: 'Now', label: 'The moment to build the premium reliability brand', source: 'AUREL Strategic Position' },
                ].map(item => (
                  <div key={item.stat} className="glass-card p-6">
                    <div
                      className="font-serif text-3xl font-light text-aurel-gold mb-1"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {item.stat}
                    </div>
                    <div className="text-aurel-pearl text-sm mb-1">{item.label}</div>
                    <div className="text-aurel-stone text-[11px] uppercase tracking-widest" style={{ letterSpacing: '0.14em' }}>
                      {item.source}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* ── SERVICES ── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <EyebrowLabel label="Service Architecture" className="justify-center mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-light text-aurel-pearl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Own the experience layer.<br />
              <em>Let hardware follow.</em>
            </h2>
          </Reveal>

          <div className="space-y-px">
            {services.map((s, i) => (
              <Reveal key={s.number} delay={i * 80}>
                <div className="group grid grid-cols-12 gap-8 py-8 border-b border-aurel-gold/10 hover:border-aurel-gold/25 transition-all duration-500 cursor-default">
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-aurel-gold/40 text-xs font-light" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '13px' }}>
                      {s.number}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3
                      className="font-serif text-xl font-light text-aurel-pearl group-hover:text-aurel-gold transition-colors duration-300"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {s.name}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-6 md:col-start-6">
                    <p className="text-aurel-stone text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="hidden md:flex col-span-1 items-center justify-end">
                    <span className="text-aurel-gold/0 group-hover:text-aurel-gold/60 transition-all duration-300 text-lg">→</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <GoldButton href="/inquiry">Request a Private Connectivity Blueprint</GoldButton>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* ── SEGMENTS ── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <EyebrowLabel label="Who We Serve" className="mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-light text-aurel-pearl max-w-2xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Environments where<br />
              <em className="text-aurel-gold">connectivity failure feels expensive.</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.map((seg, i) => (
              <Reveal key={seg.label} delay={i * 80}>
                <div className="glass-card p-8 group hover:border-aurel-gold/30 transition-all duration-500">
                  <GoldLine className="mb-6" />
                  <h3
                    className="font-serif text-xl font-light text-aurel-pearl mb-3 group-hover:text-aurel-gold transition-colors duration-300"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {seg.label}
                  </h3>
                  <p className="text-aurel-stone text-sm">{seg.sub}</p>
                </div>
              </Reveal>
            ))}
            {/* CTA card */}
            <Reveal delay={400}>
              <Link
                href="/inquiry"
                className="glass-card p-8 border-aurel-gold/20 hover:border-aurel-gold/50 hover:bg-aurel-gold/5 transition-all duration-500 flex flex-col justify-between group"
              >
                <GoldLine className="mb-6" />
                <div>
                  <h3
                    className="font-serif text-xl font-light text-aurel-gold mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    Your Environment
                  </h3>
                  <p className="text-aurel-stone text-sm mb-6">
                    If seamless connectivity matters to how your space performs, we should speak.
                  </p>
                </div>
                <span className="text-aurel-gold text-[11px] tracking-widest uppercase group-hover:gap-3 transition-all" style={{ letterSpacing: '0.18em' }}>
                  Begin the conversation →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* ── PRINCIPLES ── */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <EyebrowLabel label="The Operating Principles" className="justify-center mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-light text-aurel-pearl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Not faster on paper.<br />
              <em className="text-aurel-gold">Better where life happens.</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {principles.map((p, i) => (
              <Reveal key={p.label} delay={i * 100}>
                <div className="flex gap-6">
                  <div className="w-px bg-gradient-to-b from-aurel-gold/60 to-transparent mt-1 flex-shrink-0" style={{ height: '80px' }} />
                  <div>
                    <h3
                      className="font-serif text-xl font-light text-aurel-pearl mb-3"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {p.label}
                    </h3>
                    <p className="text-aurel-stone text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* ── FINAL CTA ── */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)',
          }}
        />
        <Reveal className="relative z-10 max-w-2xl mx-auto">
          <EyebrowLabel label="Private Inquiry" className="justify-center mb-8" />
          <h2
            className="font-serif text-4xl md:text-6xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Every engagement<br />
            begins with a<br />
            <em className="text-aurel-gold">private conversation.</em>
          </h2>
          <p className="text-aurel-stone mb-12 leading-relaxed">
            No public pricing. No self-serve packages.<br />
            A direct exchange about your space and what it requires.
          </p>
          <GoldButton href="/inquiry" variant="solid" className="text-base px-12 py-5">
            Begin Private Inquiry
          </GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
