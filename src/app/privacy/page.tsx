import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLineFull } from '@/components/GoldLine'

export default function Privacy() {
  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />
      <section className="pt-48 pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Privacy" className="mb-8" />
            <h1 className="font-serif text-5xl font-light text-aurel-pearl mb-8"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Private by default.
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-12" />
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-8 text-aurel-stone leading-relaxed text-sm">
              <div>
                <h2 className="font-serif text-xl font-light text-aurel-pearl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>What we collect</h2>
                <p>We collect only information you provide directly through our private inquiry form: your name, email address, environment type, service interest, location, and message. No tracking pixels, no advertising networks, no third-party data sharing.</p>
              </div>
              <GoldLineFull />
              <div>
                <h2 className="font-serif text-xl font-light text-aurel-pearl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>How we use it</h2>
                <p>Inquiry data is used solely to respond to your message and manage the engagement if one proceeds. We do not use your data for marketing, profiling, or any purpose beyond the direct conversation you initiated.</p>
              </div>
              <GoldLineFull />
              <div>
                <h2 className="font-serif text-xl font-light text-aurel-pearl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Data retention</h2>
                <p>Inquiry data is retained only for as long as necessary to manage the engagement. If no engagement proceeds, inquiry data is deleted within 90 days of the final response.</p>
              </div>
              <GoldLineFull />
              <div>
                <h2 className="font-serif text-xl font-light text-aurel-pearl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Your rights</h2>
                <p>You have the right to request access to, correction of, or deletion of any personal data we hold about you. Requests can be sent to the private inquiry address. We respond within 30 days.</p>
              </div>
              <GoldLineFull />
              <div>
                <h2 className="font-serif text-xl font-light text-aurel-pearl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Cookies</h2>
                <p>This site uses no advertising cookies and no cross-site tracking. Essential functional cookies may be used to maintain session state. No cookie consent banner is required for essential-only cookies under applicable frameworks.</p>
              </div>
              <GoldLineFull />
              <p className="text-aurel-stone/60 text-xs">AUREL Connectivity. This policy applies to information collected via this website. Last reviewed July 2026.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  )
}
