import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'

export default function About() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="The Standard" className="mb-8" />
            <h1
              className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-3xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Reliability is not a feature.<br />
              <em className="text-aurel-gold">It is the baseline.</em>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-10" />
            <p className="text-aurel-stone text-lg max-w-xl leading-relaxed">
              The era of speed theatre is ending. Buyers who understand what connectivity means to their environment are asking different questions now.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* The Shift */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              What the market is actually saying
            </h2>
            <div className="space-y-6 text-aurel-stone leading-relaxed">
              <p>Wi‑Fi 7 access point shipments are forecast to reach 117.9 million units in 2026. The technology is proven, deployed, and available now. This is not a future standard — it is the current best-practice foundation for any premium wireless environment.</p>
              <p>Wi‑Fi 8 remains in an early chipset and prototype phase. TP‑Link announced Archer 8 in May 2026 with an October 2026 target. Qualcomm announced a Wi‑Fi 8 portfolio in March 2026. These are important signals, not available infrastructure.</p>
              <p>The Wi‑Fi Alliance positions Wi‑Fi 7 around multi-link operation, lower latency, greater reliability, and higher throughput. Not theoretical speed. Real-world performance in dense, demanding environments.</p>
              <p>WBA's OpenRoaming and Wi‑Fi Alliance's Passpoint are converging toward a world where premium environments offer seamless, automatic, secure connectivity. That world requires intentional design — not commodity hardware.</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-8">
              <blockquote className="border-l-2 border-aurel-gold pl-8 py-2">
                <p className="font-serif text-xl font-light text-aurel-pearl italic mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  "The next generation of Wi‑Fi must move beyond peak theoretical speed and focus on improving reliability under real-world conditions."
                </p>
                <cite className="text-aurel-stone text-[11px] tracking-widest uppercase not-italic" style={{ letterSpacing: '0.14em' }}>
                  TP‑Link, May 2026
                </cite>
              </blockquote>

              <blockquote className="border-l-2 border-aurel-gold/40 pl-8 py-2">
                <p className="font-serif text-xl font-light text-aurel-pearl italic mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  "Wi‑Fi 8 will not be finalized for several years, while Wi‑Fi 7 adoption accelerates."
                </p>
                <cite className="text-aurel-stone text-[11px] tracking-widest uppercase not-italic" style={{ letterSpacing: '0.14em' }}>
                  Wireless Broadband Alliance, Jan 2026
                </cite>
              </blockquote>

              <blockquote className="border-l-2 border-aurel-gold/20 pl-8 py-2">
                <p className="font-serif text-xl font-light text-aurel-pearl italic mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  "Passpoint is designed to automate network authentication and enable seamless network access and roaming."
                </p>
                <cite className="text-aurel-stone text-[11px] tracking-widest uppercase not-italic" style={{ letterSpacing: '0.14em' }}>
                  Wi‑Fi Alliance
                </cite>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* The AUREL approach */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <EyebrowLabel label="Our Approach" className="justify-center mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl font-light text-aurel-pearl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              A luxury infrastructure brand.<br />
              <em className="text-aurel-gold">Not a gadget brand.</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Assessment First',
                body: 'Every engagement starts with a Private Connectivity Blueprint. A paid, detailed strategy document. We understand the space before we design the solution.',
              },
              {
                title: 'Design-Led Execution',
                body: 'Hardware is placed, concealed, and configured to disappear. The environment comes first. Infrastructure follows the architecture, not the other way around.',
              },
              {
                title: 'Protected Intelligence',
                body: 'Our deployment logic, partner matrix, and implementation methodology are trade secrets. What we deliver is proprietary — because the method matters as much as the result.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <GoldLine className="mb-6" />
                <h3 className="font-serif text-xl font-light text-aurel-pearl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  {item.title}
                </h3>
                <p className="text-aurel-stone text-sm leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <Reveal className="max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            The standard is<br />
            <em className="text-aurel-gold">invisible until it isn't.</em>
          </h2>
          <p className="text-aurel-stone mb-10 leading-relaxed">
            When connectivity fails in a premium environment, the absence of a standard becomes obvious. AUREL exists to prevent that moment.
          </p>
          <GoldButton href="/inquiry" variant="solid">Begin Private Inquiry</GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
