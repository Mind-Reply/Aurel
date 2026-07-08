import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'

const plans = [
  {
    name: 'Blueprint',
    tag: 'Starting point',
    tagColor: 'text-aurel-stone',
    items: [
      'Full site / property connectivity assessment',
      'Room-by-room wireless design brief',
      'Problem zone identification and resolution strategy',
      'Device density and guest access logic',
      'Budget band guidance and hardware direction',
      'Phased upgrade path to Wi‑Fi 8 when ready',
      'Delivered as a private, confidential document',
    ],
    cta: 'Request a Blueprint',
    highlight: false,
  },
  {
    name: 'Residence Design',
    tag: 'Most complete',
    tagColor: 'text-aurel-gold',
    items: [
      'Everything in Blueprint',
      'Full hardware specification and procurement support',
      'On-site installation and commissioning',
      'Hardware placement with interior concealment',
      'Staff and guest network configuration',
      'Passpoint / OpenRoaming-ready design',
      'Handover documentation and walkthrough',
    ],
    cta: 'Inquire About Design',
    highlight: true,
  },
  {
    name: 'Concierge Care',
    tag: 'Ongoing',
    tagColor: 'text-aurel-stone',
    items: [
      'Continuous remote performance monitoring',
      'Proactive issue resolution before you notice',
      'Seasonal tuning and optimisation cycles',
      'Priority support — single point of contact',
      'Annual hardware health review',
      'Advance planning for Wi‑Fi 8 migration',
      'Upgrade Path Membership included',
    ],
    cta: 'Discuss Care',
    highlight: false,
  },
]

export default function Care() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 70% 40%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Care Plans" className="mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-3xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Connectivity that<br />
              <em className="text-aurel-gold">never requires your attention.</em>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-10" />
            <p className="text-aurel-stone text-lg max-w-xl leading-relaxed">
              A premium environment should not require its owner to think about the network. AUREL Care is the discipline of silent, continuous excellence — resolved before it is noticed.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Plans */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <EyebrowLabel label="Service Tiers" className="justify-center mb-6" />
            <h2 className="font-serif text-4xl font-light text-aurel-pearl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Choose the level of<br />
              <em className="text-aurel-gold">involvement that fits your world.</em>
            </h2>
            <p className="text-aurel-stone mt-6 text-sm">No public pricing. Every engagement is scoped and quoted privately.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div className={`relative flex flex-col p-10 h-full transition-all duration-500 ${
                  plan.highlight
                    ? 'bg-aurel-charcoal border border-aurel-gold/40 shadow-[0_0_60px_rgba(201,169,110,0.08)]'
                    : 'glass-card hover:border-aurel-gold/20'
                }`}>
                  {plan.highlight && (
                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-aurel-gold to-transparent" />
                  )}
                  <div className={`text-[10px] uppercase tracking-widest mb-2 ${plan.tagColor}`} style={{ letterSpacing: '0.22em' }}>
                    {plan.tag}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-aurel-pearl mb-6"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{plan.name}</h3>
                  <GoldLine className="mb-8" />
                  <ul className="space-y-4 flex-1 mb-10">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-aurel-gold' : 'text-aurel-gold/50'}`}>✦</span>
                        <span className="text-aurel-stone text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <GoldButton
                    href="/inquiry"
                    variant={plan.highlight ? 'solid' : 'outline'}
                    className="text-center w-full block"
                  >
                    {plan.cta}
                  </GoldButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Upgrade Path */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <EyebrowLabel label="Upgrade Path Membership" className="mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Wi‑Fi 7 now.<br />
              <em className="text-aurel-gold">Wi‑Fi 8-ready by design.</em>
            </h2>
            <div className="space-y-5 text-aurel-stone text-sm leading-relaxed">
              <p>Wi‑Fi 8 commercial hardware is beginning to emerge — TP‑Link's Archer 8 is targeted for October 2026, Qualcomm announced a Wi‑Fi 8 chipset portfolio in March 2026. The standard is real, the hardware is coming.</p>
              <p>Every AUREL installation is designed with the upgrade path in mind. Cable routing, network architecture, and controller configuration are chosen to accommodate next-generation hardware without structural disruption.</p>
              <p>When the ecosystem matures and the hardware warrants it, Care plan clients receive structured migration planning as part of their programme — no rip-and-replace, no surprise costs, no downtime.</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="glass-card p-10 border-aurel-gold/20">
              <div className="font-serif text-5xl font-light text-aurel-gold mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Now</div>
              <p className="text-aurel-stone text-sm mb-8">Wi‑Fi 7 — deployed, proven, 117.9M APs shipping in 2026</p>
              <div className="w-px h-12 bg-gradient-to-b from-aurel-gold to-aurel-gold/20 mx-auto mb-8" />
              <div className="font-serif text-5xl font-light text-aurel-gold/50 mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Soon</div>
              <p className="text-aurel-stone text-sm mb-8">Wi‑Fi 8 — commercial products expected late 2026, ecosystem maturing</p>
              <div className="w-px h-12 bg-gradient-to-b from-aurel-gold/20 to-transparent mx-auto mb-8" />
              <div className="font-serif text-5xl font-light text-aurel-pearl mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Ready</div>
              <p className="text-aurel-stone text-sm">AUREL upgrade path — structured migration, no disruption</p>
            </div>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      <section className="py-32 px-6 text-center">
        <Reveal className="max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Silent excellence<br />
            <em className="text-aurel-gold">begins with a private brief.</em>
          </h2>
          <p className="text-aurel-stone mb-10 text-sm leading-relaxed">
            All care programmes are scoped and quoted individually. There is no standard package because no two environments are the same.
          </p>
          <GoldButton href="/inquiry" variant="solid">Discuss Your Care Programme</GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
