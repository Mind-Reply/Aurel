import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import GoldButton from '@/components/GoldButton'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLineFull } from '@/components/GoldLine'
import Link from 'next/link'

const articles: Record<string, {
  tag: string; date: string; title: string; sub: string; body: string[]
}> = {
  'reliability-over-speed': {
    tag: 'Market Intelligence', date: 'July 2026',
    title: 'Why reliability won and speed lost',
    sub: 'The verified shift in how premium buyers evaluate wireless infrastructure — and what it means for the environments they own.',
    body: [
      'The Wi‑Fi industry spent a decade selling peak theoretical throughput. 300 Mbps. 1 Gbps. 9.6 Gbps. Each generation announced with larger numbers and more impressive charts. And yet, in premium environments — luxury homes, boutique hotels, executive suites — the number that mattered was never gigabits per second. It was reliability. Consistency. The absence of the moment when a call dropped or a stream stuttered.',
      'The market has now caught up with what buyers already knew. Wi‑Fi 7, standardised by the Wi‑Fi Alliance, is positioned explicitly around multi-link operation, lower latency, greater reliability, and higher throughput — in that order. Not faster on paper. Better where life happens.',
      'TP‑Link\'s announcement of Archer 8 in May 2026 framed the first Wi‑Fi 8 router around "real-world reliability," not peak speed. Qualcomm\'s Wi‑Fi 8 portfolio announcement in March 2026 described infrastructure-level connectivity across an ecosystem. The Wireless Broadband Alliance, reporting in January 2026, forecast 117.9 million Wi‑Fi 7 access point shipments in 2026 — a technology already proven and scaling hard — while noting Wi‑Fi 8 remains in its earliest commercial phase.',
      'For the environments where AUREL operates, this shift is not a market signal to track. It is the foundation of a service brand. Buyers in luxury residential, boutique hospitality, and executive spaces are purchasing calm. The absence of friction. The confidence that connectivity is simply, quietly, always there.',
      'The correct response to this moment is not to wait for Wi‑Fi 8 hardware. It is to design and deploy Wi‑Fi 7 environments now — with the architecture, care programme, and upgrade path to move to Wi‑Fi 8 without disruption when the ecosystem warrants it.',
      'Reliability won. The premium brand that builds on that fact, rather than on specification sheets, is the brand that earns long-term trust in high-value environments.',
    ],
  },
  'wifi7-luxury-residence': {
    tag: 'Technical Insight', date: 'June 2026',
    title: 'What Wi‑Fi 7 actually delivers in a luxury residence',
    sub: 'Multi-link operation, lower latency, and real-world dense device handling — translated from specification to lived experience.',
    body: [
      'Wi‑Fi 7 introduces multi-link operation — the ability for a device to transmit and receive across multiple frequency bands simultaneously. In practical terms for a luxury residence, this means a device is no longer committed to a single channel. Congestion on one band does not degrade performance. The connection is more stable because it has more paths.',
      'Lower latency is the second significant characteristic. Wi‑Fi 7 introduces 4K QAM and 320 MHz channel widths, but more meaningfully for lived experience, it reduces the wait. Video calls feel more present. Interfaces respond more immediately. The network feels closer to the user.',
      'Dense device environments are where Wi‑Fi 7\'s multi-user enhancements matter most. A modern luxury residence may host 50 to 100+ connected devices simultaneously — climate systems, security, entertainment, personal devices, guest devices. Wi‑Fi 7\'s improved multi-user MIMO and OFDMA handling distributes that load more efficiently, so adding devices does not degrade the experience for others.',
      'None of these capabilities deliver their full value without intentional design. Hardware positioned without a survey, configured without understanding the space, or installed without a coverage plan will underperform regardless of its specification. This is why AUREL begins every residence engagement with a Private Connectivity Blueprint — before a single piece of hardware is selected.',
    ],
  },
  'passpoint-guest-experience': {
    tag: 'Guest Experience', date: 'June 2026',
    title: 'Passpoint and the end of the password screen',
    sub: 'How Passpoint and OpenRoaming are redesigning the guest arrival experience in premium hospitality.',
    body: [
      'The password screen is the most visible failure of hospitality connectivity. A guest arrives. They are handed a card, or directed to a notice on the wall, or asked at reception. They type a string of characters into a device. The network was ready — but the arrival experience was not.',
      'Wi‑Fi Alliance\'s Passpoint changes this at a technical level. A Passpoint-enabled device recognises a trusted network and authenticates automatically, without user intervention. No password. No portal. The network is simply there when the guest\'s device looks for it.',
      'WBA\'s OpenRoaming extends this further, building a global framework of trusted networks that participate in automatic, secure authentication. A guest whose home carrier or identity provider participates in OpenRoaming roams into a Passpoint-enabled venue as if connecting to their own trusted network.',
      'Tokyo Metropolitan Government announced an MOU with WBA in January 2026 to expand OpenRoaming across the city, citing over 20 million monthly public Wi‑Fi accesses. The direction of travel for premium connectivity is not towards more visible infrastructure — it is towards infrastructure that becomes invisible through trust.',
      'For boutique hotels, private members clubs, and premium hospitality venues, Passpoint-ready design is not a technical upgrade. It is an experience decision. Arrival should feel effortless. AUREL designs every hospitality environment to that standard.',
    ],
  },
  'assessment-led-design': {
    tag: 'Strategy', date: 'May 2026',
    title: 'The case for assessment-led connectivity design',
    sub: 'Why the most expensive Wi‑Fi mistake is hardware purchased before a design brief exists.',
    body: [
      'The most common and most expensive error in premium wireless installations is hardware-first thinking. A client sees a recommendation, or a supplier presents a product, and equipment is purchased before the environment has been properly assessed. The hardware arrives on site. The problems are then worked around rather than designed away.',
      'Assessment-led design inverts this sequence. The Private Connectivity Blueprint that begins every AUREL engagement is not a preamble to the real work. It is the most valuable deliverable in the programme. A detailed, room-by-room understanding of the space, the usage patterns, the device density, the concealment constraints, the guest access logic, and the upgrade path — delivered as a private strategy document before a single piece of hardware is specified.',
      'The Blueprint changes the conversation from "which router" to "what does this environment need to achieve." Hardware selection follows from that answer. The result is a deployment that performs because it was designed to perform, not because the right product happened to be installed in the right place by chance.',
      'For luxury environments where infrastructure must be invisible as well as effective, the assessment is also a design act. Hardware placement is not just a performance decision — it is an interior decision. A Blueprint includes concealment strategy and placement mapped to the architecture of the space.',
      'Begin with the Blueprint. Everything else follows from it.',
    ],
  },
  'wifi8-planning': {
    tag: 'Forward Look', date: 'May 2026',
    title: 'Wi‑Fi 8: what to plan for and what to wait on',
    sub: 'A clear-eyed view of when the upgrade path actually makes sense.',
    body: [
      'Wi‑Fi 8 is real, announced, and coming. TP‑Link announced Archer 8 on 28 May 2026 as its first Wi‑Fi 8 router platform, with a commercial launch target of October 2026. Qualcomm announced a Wi‑Fi 8 chipset portfolio on 1 March 2026, with commercial products expected in late 2026.',
      'The Wireless Broadband Alliance was direct in January 2026: Wi‑Fi 8 will not be finalised for several years, while Wi‑Fi 7 adoption accelerates. These two statements are not in contradiction. Wi‑Fi 8 is beginning its commercial emergence, but the ecosystem — the range of compatible devices, the access points, the enterprise controllers, the client support — is in its earliest phase.',
      'The correct position for a premium installation today is Wi‑Fi 7, deployed with architecture that does not preclude Wi‑Fi 8 migration. Cabling routes that accommodate future hardware. Controller infrastructure with a migration path. A care programme that includes advance planning for the upgrade cycle when it makes sense.',
      'This is the AUREL Upgrade Path Membership — not a hedge, but a planned programme. Wi‑Fi 7 optimisation now. A structured, considered migration to Wi‑Fi 8 when the ecosystem, the hardware, and the client\'s environment warrant it. No disruptive rip-and-replace. No premature expenditure on first-generation hardware in a new standard.',
      'The rule is simple: deploy the best proven technology available, designed to accommodate what is coming, supported by a programme that handles the transition without drama.',
    ],
  },
  'brand-protection-moat': {
    tag: 'Protection', date: 'April 2026',
    title: 'Building a moat: how premium service brands protect their method',
    sub: 'Trademark, copyright, and trade secrets — the layered protection model for a design-led connectivity house.',
    body: [
      'A premium service brand has three things worth protecting: the name, the expression, and the method. Most brands protect only the first. The strongest brands protect all three, using different instruments for each.',
      'Trademark protects the brand name, logo, and signature service names in the markets where they are used or where protection is sought. For AUREL, this means EUIPO as the primary route for EU-wide protection — a single application covering 27 member states — with Madrid System international filing as international commercial presence develops. The mark must be distinctive, applied for in the relevant Nice classes, and cleared of conflicting earlier rights before any public launch.',
      'Copyright protects original expression — website copy, service documentation, visual direction, presentations, reports, and other authored works — automatically on creation under EU frameworks. The protection exists from the moment of creation, but evidence of existence, authorship, and date matters. Version control, dated source files, and a systematic archive of published materials are the practical discipline that makes copyright enforceable.',
      'Trade secrets protect the method. The internal workflow, the assessment scoring system, the partner matrix, the deployment logic, the pricing intelligence — none of these are protectable by trademark or copyright, but all of them have commercial value that can be protected as confidential know-how. The threshold is simple: the information must not be publicly known, it must have commercial value, and reasonable steps must be taken to keep it secret. NDAs with all partners and clients, access-controlled storage, confidentiality markings on all internal documents, and a clear disclosure log.',
      'Protect the expression publicly. Protect the method privately. This is the moat of a design-led premium service brand.',
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug]

  if (!article) {
    return (
      <main className="bg-aurel-black min-h-screen">
        <Nav />
        <div className="pt-48 pb-32 px-6 text-center">
          <h1 className="font-serif text-4xl font-light text-aurel-pearl mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Article not found.</h1>
          <GoldButton href="/journal" variant="outline">Return to Journal</GoldButton>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      <article className="pt-48 pb-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] text-aurel-gold uppercase tracking-widest" style={{ letterSpacing: '0.22em' }}>{article.tag}</span>
              <span className="text-aurel-stone text-[10px]">{article.date}</span>
            </div>
            <EyebrowLabel label="Journal" className="mb-6" />
            <h1 className="font-serif text-4xl md:text-6xl font-light text-aurel-pearl leading-tight mb-6"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              {article.title}
            </h1>
            <p className="text-aurel-stone text-lg leading-relaxed mb-12">{article.sub}</p>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-16" />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              {article.body.map((para, i) => (
                <p key={i} className="text-aurel-silver leading-relaxed">{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <GoldLineFull className="my-16" />
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link href="/journal" className="text-aurel-stone text-sm hover:text-aurel-gold transition-colors">
                ← Return to Journal
              </Link>
              <GoldButton href="/inquiry" variant="outline" className="ml-auto">
                Begin Private Inquiry
              </GoldButton>
            </div>
          </Reveal>
        </div>
      </article>

      <Footer />
    </main>
  )
}
