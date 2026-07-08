import Link from 'next/link'

const links = [
  { href: '/about',       label: 'The Standard' },
  { href: '/residence',   label: 'Residence Design' },
  { href: '/hospitality', label: 'Hospitality' },
  { href: '/access',      label: 'Seamless Access' },
  { href: '/care',        label: 'Care Plans' },
  { href: '/journal',     label: 'Journal' },
  { href: '/inquiry',     label: 'Private Inquiry' },
]

export default function Footer() {
  return (
    <footer className="bg-aurel-black border-t border-aurel-gold/10 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span
                className="font-serif text-3xl font-light text-aurel-gold"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.22em' }}
              >
                AUREL
              </span>
              <div className="text-[9px] text-aurel-stone mt-1" style={{ letterSpacing: '0.28em' }}>
                CONNECTIVITY
              </div>
            </div>
            <p className="text-aurel-stone text-sm leading-relaxed max-w-xs">
              We do not sell routers.<br />
              We design confidence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[10px] text-aurel-stone tracking-widest uppercase mb-6" style={{ letterSpacing: '0.22em' }}>
              Services
            </div>
            <nav className="flex flex-col gap-3">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-aurel-silver text-sm hover:text-aurel-gold transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] text-aurel-stone tracking-widest uppercase mb-6" style={{ letterSpacing: '0.22em' }}>
              Private Contact
            </div>
            <p className="text-aurel-stone text-sm leading-relaxed mb-6">
              Every engagement begins with a private conversation.
              No forms. No noise. Just a direct exchange.
            </p>
            <Link
              href="/inquiry"
              className="inline-block border border-aurel-gold/40 text-aurel-gold text-[11px] tracking-widest px-6 py-3 hover:bg-aurel-gold hover:text-aurel-black transition-all duration-300 uppercase"
              style={{ letterSpacing: '0.18em' }}
            >
              Begin Private Inquiry
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-aurel-stone text-[11px]" style={{ letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} AUREL Connectivity. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-aurel-stone text-[11px] hover:text-aurel-silver transition-colors">
              Privacy
            </Link>
            <span className="text-aurel-graphite text-[11px]">
              Wi‑Fi 7 now · Wi‑Fi 8-ready path later
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
