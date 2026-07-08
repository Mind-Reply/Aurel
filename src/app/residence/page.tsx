import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'

const phases = [
  {
    phase: 'Phase 1',
    name: 'Private Connectivity Blueprint',
    detail: 'A paid site assessment and strategy brief delivered as a private document. Room-by-room priority mapping, problem zone identification, device density analysis, guest access logic, budget bands, and a full upgrade path.',
    duration: '1–2 weeks',
  },
  {
    phase: 'Phase 2',
    name: 'Residence Design',
    detail: 'Detailed wireless architecture for the residence. Access point placement, signal path design, hardware selection, concealment strategy — everything mapped to the physical space and lifestyle requirements.',
    duration: '2–3 weeks',
  },
  {
    phase: 'Phase 3',
    name: 'Installation & Commissioning',
    detail: 'Clean, discreet deployment. Hardware arrives pre-configured. On-site commissioning is precise and unhurried. Every zone verified before handover.',
    duration: '1–3 days',
  },
  {
    phase: 'Phase 4',
    name: 'Concierge Care',
    detail: 'Ongoing monitoring, remote tuning, and seasonal refresh cycles. Silent background oversight so the environment continues performing without requiring your attention.',
    duration: 'Ongoing',
  },
]

export default function Residence() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Private Residence Design" className="mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-3xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Infrastructure that<br />
              <em className="text-aurel-gold">disappears into the home.</em>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-10" />
            <p className="text-aurel-stone text-lg max-w-xl leading-relaxed">
              Premium residences carry an expectation of calm. Every surface considered. Every detail resolved. Connectivity should be no different — present everywhere, visible nowhere.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* What we solve */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              The problems we are asked to solve
            </h2>
            <div className="space-y-5">
              {[
                'Dead zones in wings, lower floors, or exterior areas',
                'Dropped video calls in key rooms during critical moments',
                'Slow handoff between access points when moving through the property',
                'Guest networks that feel like an afterthought',
                'Visible hardware that conflicts with the interior design',
                'A router that needs rebooting when performance matters most',
                'A system that no-one in the household understands how to manage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-aurel-gold/50 mt-1 flex-shrink-0">—</span>
                  <p className="text-aurel-stone text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              What an AUREL residence feels like
            </h2>
            <div className="space-y-5">
              {[
                'Every room covered at consistent, reliable performance',
                'Seamless roaming as you move — calls never drop, streams never buffer',
                'Hardware placed and concealed with the interior in mind',
                'A private guest network that connects without friction',
                'Silent background monitoring — problems resolved before they surface',
                'A clear upgrade path when Wi‑Fi 8 hardware is commercially ready',
                'One point of contact for all connectivity questions, permanently',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-aurel-gold mt-1 flex-shrink-0">✦</span>
                  <p className="text-aurel-pearl text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Process */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <EyebrowLabel label="The Process" className="mb-6" />
            <h2 className="font-serif text-4xl font-light text-aurel-pearl max-w-xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Assessment-led, always.<br />
              <em className="text-aurel-gold">Design before installation.</em>
            </h2>
          </Reveal>

          <div className="space-y-px">
            {phases.map((p, i) => (
              <Reveal key={p.phase} delay={i * 80}>
                <div className="group grid grid-cols-12 gap-6 py-8 border-b border-aurel-gold/10 hover:border-aurel-gold/25 transition-all duration-500">
                  <div className="col-span-12 md:col-span-2">
                    <span className="text-[10px] text-aurel-gold uppercase tracking-widest" style={{ letterSpacing: '0.18em' }}>{p.phase}</span>
                    <div className="text-[10px] text-aurel-stone mt-1">{p.duration}</div>
                  </div>
                  <div className="col-span-12 md:col-span-3">
                    <h3 className="font-serif text-xl font-light text-aurel-pearl group-hover:text-aurel-gold transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      {p.name}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <p className="text-aurel-stone text-sm leading-relaxed">{p.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <Reveal className="max-w-xl mx-auto">
          <EyebrowLabel label="Begin" className="justify-center mb-8" />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Every residence design<br />
            <em className="text-aurel-gold">starts with a Blueprint.</em>
          </h2>
          <p className="text-aurel-stone mb-10 text-sm leading-relaxed">
            We do not begin with hardware recommendations. We begin with a private assessment of your space. The Blueprint is the first and most important deliverable.
          </p>
          <GoldButton href="/inquiry" variant="solid">Request a Private Blueprint</GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
