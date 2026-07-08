import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'

const regions = [
  { region: 'Europe', flag: '🇪🇺', desc: 'EUIPO-registered mark strategy, GDPR-aligned data handling, EU-wide service architecture. Boutique hospitality, private residences, executive offices across continental Europe and the UK.' },
  { region: 'Middle East', flag: '🇦🇪', desc: 'High-density luxury residential and hospitality markets. Private villa estates, five-star properties, executive spaces in the Gulf. Seamless multilingual guest access.' },
  { region: 'Asia Pacific', flag: '🌏', desc: 'Tokyo OpenRoaming partnership ecosystem. Precision hospitality markets. Technology-forward executive environments across Singapore, Hong Kong, Japan, and Australia.' },
  { region: 'Americas', flag: '🌎', desc: 'Ultra-high-net-worth residential design. Premium hospitality. Executive private offices. USPTO trademark protection layer for US market entry.' },
  { region: 'Global Properties', flag: '🌍', desc: 'Multi-property programmes for international hotel groups, private estate portfolios, and global members club networks. One standard. Consistent everywhere.' },
]

export default function AccessPage() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Seamless Access · Global Reach" className="mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-4xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              One standard.<br />
              <em className="text-aurel-gold">Delivered anywhere in the world.</em>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-10" />
            <p className="text-aurel-stone text-lg max-w-2xl leading-relaxed">
              AUREL is built as a globally deployable brand from its foundation. Trademark strategy, service architecture, and operational standards designed for international markets from day one — not retrofitted later.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Passpoint / OpenRoaming deep */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <EyebrowLabel label="The Technical Foundation" className="mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Passpoint and OpenRoaming —<br />
              <em className="text-aurel-gold">the infrastructure of seamless.</em>
            </h2>
            <div className="space-y-5 text-aurel-stone leading-relaxed text-sm">
              <p>Wi‑Fi Alliance's Passpoint automates network discovery and authentication. A device recognises a trusted network and connects — without a password screen, without a portal, without friction. The guest arrives and the network is simply there.</p>
              <p>WBA's OpenRoaming builds on Passpoint to create a global, automatic, secure Wi‑Fi framework. Venues participating in OpenRoaming offer a level of trust and seamlessness that standard Wi‑Fi cannot match.</p>
              <p>Tokyo Metropolitan Government announced a major OpenRoaming expansion partnership with WBA in January 2026, describing over 20 million monthly public Wi‑Fi accesses. The direction of travel for premium connectivity is clear.</p>
              <p>AUREL designs environments to be Passpoint-ready and OpenRoaming-aligned wherever the client's ambition warrants it. This is not a future option — it is a deployable design decision today.</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-4">
              {[
                { label: 'Zero-friction onboarding', desc: 'Devices connect automatically in Passpoint-enabled environments. No password, no portal, no staff intervention.' },
                { label: 'Trusted authentication', desc: 'OpenRoaming provides cryptographic-level trust. Guest credentials are secure, never exposed to the venue network.' },
                { label: 'Global portability', desc: 'A guest whose home carrier participates in OpenRoaming roams seamlessly into your venue as if it were their own trusted network.' },
                { label: 'Scalable to any geography', desc: 'The framework operates identically in Tokyo, Dubai, London, or New York. One standard, consistent across every AUREL installation.' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-aurel-gold mt-1 flex-shrink-0 text-lg">✦</span>
                    <div>
                      <h4 className="font-serif text-lg font-light text-aurel-pearl mb-2"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.label}</h4>
                      <p className="text-aurel-stone text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Global regions */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <EyebrowLabel label="Global Markets" className="mb-6" />
            <h2 className="font-serif text-4xl font-light text-aurel-pearl max-w-2xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Premium connectivity<br />
              <em className="text-aurel-gold">has no geography.</em>
            </h2>
          </Reveal>
          <div className="space-y-px">
            {regions.map((r, i) => (
              <Reveal key={r.region} delay={i * 60}>
                <div className="group grid grid-cols-12 gap-6 py-8 border-b border-aurel-gold/10 hover:border-aurel-gold/25 transition-all duration-500">
                  <div className="col-span-12 md:col-span-1 flex items-center text-3xl">{r.flag}</div>
                  <div className="col-span-12 md:col-span-3">
                    <h3 className="font-serif text-xl font-light text-aurel-pearl group-hover:text-aurel-gold transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{r.region}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <p className="text-aurel-stone text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* IP / Trademark global layer */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <EyebrowLabel label="Brand Protection · Globally Ready" className="mb-6" />
            <h2 className="font-serif text-4xl font-light text-aurel-pearl max-w-2xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              The AUREL name is being<br />
              <em className="text-aurel-gold">protected in every key market.</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { body: 'EUIPO', sub: 'EU-wide trade mark — single application, 27 member states. Priority filing route for AUREL.' },
              { body: 'WIPO Madrid', sub: 'International filing via Madrid System once EU basic mark is established. Covers 130+ jurisdictions.' },
              { body: 'USPTO', sub: 'US mark protection for Americas market entry. Filed on AUREL as commercial expansion confirms.' },
              { body: 'Bulgarian Patent Office', sub: 'National route. Supports Madrid filing as Office of origin. Covers Bulgarian-first commercial presence.' },
            ].map((item, i) => (
              <Reveal key={item.body} delay={i * 80}>
                <div className="glass-card p-6 h-full">
                  <GoldLine className="mb-4" />
                  <div className="font-serif text-xl font-light text-aurel-gold mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.body}</div>
                  <p className="text-aurel-stone text-sm leading-relaxed">{item.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-aurel-stone text-xs mt-8 max-w-2xl leading-relaxed opacity-60">
              Trade mark filings require official registry credentials, identity verification, and payment outside this platform. This architecture represents the strategic plan, not confirmed filed registrations. Sources: EUIPO, WIPO, USPTO, Bulgarian Patent Office, Your Europe.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      <section className="py-32 px-6 text-center">
        <Reveal className="max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            A global programme<br />
            <em className="text-aurel-gold">starts with one conversation.</em>
          </h2>
          <p className="text-aurel-stone mb-10 text-sm leading-relaxed">
            Whether you are operating a single estate or a multi-property international portfolio, the engagement begins privately with a connectivity assessment.
          </p>
          <GoldButton href="/inquiry" variant="solid">Begin the Conversation</GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
