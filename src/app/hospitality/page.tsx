import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'

const hospitality = [
  { label: 'Boutique Hotels', body: 'Every room covered. Guest connection automatic from check-in. Staff networks isolated. Infrastructure invisible within the property design.' },
  { label: 'Private Members Clubs', body: 'Discreet coverage across lounge, dining, and event zones. Member experience premium. No connectivity friction at any touchpoint.' },
  { label: 'Premium Restaurants', body: 'Coverage across front-of-house, private dining, and service areas. POS reliability. Guest connectivity as a silent amenity.' },
  { label: 'Event & Exhibition Spaces', body: 'Dense device handling for high-attendance events. Wi‑Fi 7 multi-link operation handles concurrent streams without degradation.' },
  { label: 'Showrooms & Studios', body: 'High-performance connectivity for product demonstrations, connected displays, and client presentations without dead zones.' },
]

export default function Hospitality() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Hospitality & Guest Experience" className="mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-3xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Arrival should feel<br />
              <em className="text-aurel-gold">effortless.</em>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-10" />
            <p className="text-aurel-stone text-lg max-w-xl leading-relaxed">
              In premium hospitality, connectivity is an invisible amenity. Guests should not notice the network. They should only notice that everything works.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* OpenRoaming insight */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <EyebrowLabel label="Industry Signal" className="mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Seamless guest access<br />
              is now a<br />
              <em className="text-aurel-gold">strategic differentiator.</em>
            </h2>
            <div className="space-y-5 text-aurel-stone leading-relaxed text-sm">
              <p>Wi‑Fi Alliance's Passpoint automates network discovery and authentication. A guest's device recognises and joins the network without a password interaction — reducing friction to near zero.</p>
              <p>WBA's OpenRoaming creates an automatic, secure global Wi‑Fi framework. Passpoint-enabled venues participate in a seamless, trusted ecosystem that premium guests increasingly expect.</p>
              <p>Tokyo Metropolitan Government signed a partnership with WBA in January 2026 to expand OpenRoaming across the city, citing over 20 million public Wi‑Fi accesses per month.</p>
              <p>Venues designed with these standards in mind are not just better connected — they signal intent. Guests feel the difference even when they cannot name it.</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <blockquote className="glass-card p-10 border-l-4 border-aurel-gold">
              <p className="font-serif text-2xl font-light text-aurel-pearl italic mb-6"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                "Arrival should feel effortless. That emotional outcome is valuable."
              </p>
              <cite className="text-aurel-stone text-[11px] tracking-widest uppercase not-italic" style={{ letterSpacing: '0.14em' }}>
                AUREL Premium Experience Principle
              </cite>
              <div className="mt-8 pt-8 border-t border-aurel-gold/10">
                <p className="text-aurel-stone text-sm">OpenRoaming source: Wireless Broadband Alliance. Passpoint source: Wi‑Fi Alliance. Tokyo partnership: Tokyo Metropolitan Government, Jan 2026.</p>
              </div>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Venue types */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <EyebrowLabel label="Environments We Design For" className="mb-6" />
            <h2 className="font-serif text-4xl font-light text-aurel-pearl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Premium spaces require<br />
              <em className="text-aurel-gold">premium infrastructure thinking.</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitality.map((h, i) => (
              <Reveal key={h.label} delay={i * 80}>
                <div className="glass-card p-8 group hover:border-aurel-gold/30 transition-all duration-500 h-full">
                  <GoldLine className="mb-6" />
                  <h3 className="font-serif text-xl font-light text-aurel-pearl mb-4 group-hover:text-aurel-gold transition-colors"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                    {h.label}
                  </h3>
                  <p className="text-aurel-stone text-sm leading-relaxed">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Service stack for hospitality */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Reveal>
            <EyebrowLabel label="Delivered As" className="mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              A complete hospitality<br />
              <em className="text-aurel-gold">connectivity programme.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Venue Blueprint', body: 'Paid assessment covering all zones, staff and guest network separation, device density, current pain points, and phased deployment plan.' },
                { step: '02', title: 'Design & Installation', body: 'Hardware specified to the venue. Placed with the interior in mind. Commissioned to precision.' },
                { step: '03', title: 'Guest Access Layer', body: 'Passpoint and OpenRoaming-aligned guest network. Frictionless connection. Premium experience from first contact.' },
                { step: '04', title: 'Ongoing Care', body: 'Continuous monitoring and seasonal tuning. Advance planning for hardware refresh cycles. One point of contact always.' },
              ].map((s, i) => (
                <div key={s.step} className="flex gap-6">
                  <span className="text-aurel-gold/40 font-serif text-2xl flex-shrink-0 leading-none"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{s.step}</span>
                  <div>
                    <h4 className="font-serif text-lg font-light text-aurel-pearl mb-2"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{s.title}</h4>
                    <p className="text-aurel-stone text-sm leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      <section className="py-32 px-6 text-center">
        <Reveal className="max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Your venue's connectivity<br />
            <em className="text-aurel-gold">should match its standard.</em>
          </h2>
          <p className="text-aurel-stone mb-10 text-sm leading-relaxed">
            We work with a limited number of hospitality environments at any one time to maintain depth of service. Begin a private conversation now.
          </p>
          <GoldButton href="/inquiry" variant="solid">Request a Venue Assessment</GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
