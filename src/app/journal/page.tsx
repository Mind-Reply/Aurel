import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLine, GoldLineFull } from '@/components/GoldLine'
import Link from 'next/link'

const articles = [
  {
    tag: 'Market Intelligence',
    date: 'July 2026',
    title: 'Why reliability won and speed lost',
    sub: 'The verified shift in how premium buyers evaluate wireless infrastructure — and what it means for the environments they own.',
    slug: 'reliability-over-speed',
    featured: true,
  },
  {
    tag: 'Technical Insight',
    date: 'June 2026',
    title: 'What Wi‑Fi 7 actually delivers in a luxury residence',
    sub: 'Multi-link operation, lower latency, and real-world dense device handling — translated from specification to lived experience.',
    slug: 'wifi7-luxury-residence',
    featured: false,
  },
  {
    tag: 'Guest Experience',
    date: 'June 2026',
    title: 'Passpoint and the end of the password screen',
    sub: 'How Passpoint and OpenRoaming are redesigning the guest arrival experience in premium hospitality — and what venues need to know.',
    slug: 'passpoint-guest-experience',
    featured: false,
  },
  {
    tag: 'Strategy',
    date: 'May 2026',
    title: 'The case for assessment-led connectivity design',
    sub: 'Why the most expensive Wi‑Fi mistake is hardware purchased before a design brief exists.',
    slug: 'assessment-led-design',
    featured: false,
  },
  {
    tag: 'Forward Look',
    date: 'May 2026',
    title: 'Wi‑Fi 8: what to plan for and what to wait on',
    sub: 'TP‑Link Archer 8, Qualcomm\'s portfolio announcement, and a clear-eyed view of when the upgrade path actually makes sense.',
    slug: 'wifi8-planning',
    featured: false,
  },
  {
    tag: 'Protection',
    date: 'April 2026',
    title: 'Building a moat: how premium service brands protect their method',
    sub: 'Trademark, copyright, and trade secrets — the layered protection model for a design-led connectivity house.',
    slug: 'brand-protection-moat',
    featured: false,
  },
]

export default function Journal() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Journal · Insight" className="mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-2xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Authority before<br />
              <em className="text-aurel-gold">audience.</em>
            </h1>
            <p className="text-aurel-stone text-lg max-w-xl leading-relaxed">
              Disciplined thinking about connectivity, premium environments, and the standard that distinguishes infrastructure from commodity. Only verifiable claims. Only relevant insight.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Featured */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <Link href={`/journal/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-12 glass-card p-10 hover:border-aurel-gold/30 transition-all duration-500">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] text-aurel-gold uppercase tracking-widest" style={{ letterSpacing: '0.22em' }}>{featured.tag}</span>
                  <span className="text-aurel-stone text-[10px]">{featured.date}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-aurel-pearl group-hover:text-aurel-gold transition-colors mb-6"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{featured.title}</h2>
                <p className="text-aurel-stone leading-relaxed mb-8">{featured.sub}</p>
                <span className="text-aurel-gold text-[11px] tracking-widest uppercase" style={{ letterSpacing: '0.18em' }}>
                  Read the analysis →
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="font-serif text-[120px] font-light text-aurel-gold/10 leading-none select-none"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>01</div>
                  <div className="text-aurel-stone text-xs tracking-widest uppercase" style={{ letterSpacing: '0.22em' }}>Featured</div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 80}>
                <Link href={`/journal/${article.slug}`}
                  className="group glass-card p-8 h-full flex flex-col hover:border-aurel-gold/30 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] text-aurel-gold uppercase tracking-widest" style={{ letterSpacing: '0.18em' }}>{article.tag}</span>
                    <span className="text-aurel-stone text-[10px]">{article.date}</span>
                  </div>
                  <GoldLine className="mb-6" />
                  <h3 className="font-serif text-xl font-light text-aurel-pearl group-hover:text-aurel-gold transition-colors mb-4 flex-1"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{article.title}</h3>
                  <p className="text-aurel-stone text-sm leading-relaxed mb-6">{article.sub}</p>
                  <span className="text-aurel-gold/60 text-[11px] tracking-widest group-hover:text-aurel-gold transition-colors" style={{ letterSpacing: '0.18em' }}>
                    Read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      <section className="py-32 px-6 text-center">
        <Reveal className="max-w-xl mx-auto">
          <EyebrowLabel label="Private Inquiry" className="justify-center mb-8" />
          <h2 className="font-serif text-3xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Reading is only the beginning.<br />
            <em className="text-aurel-gold">The conversation is private.</em>
          </h2>
          <GoldButton href="/inquiry" variant="solid">Begin a Private Inquiry</GoldButton>
        </Reveal>
      </section>

      <Footer />
    </main>
  )
}
