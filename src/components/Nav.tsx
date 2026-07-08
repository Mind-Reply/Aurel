'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'The Standard' },
  { href: '/residence',    label: 'Residence' },
  { href: '/hospitality',  label: 'Hospitality' },
  { href: '/access',       label: 'Seamless Access' },
  { href: '/care',         label: 'Care Plans' },
  { href: '/journal',      label: 'Journal' },
  { href: '/inquiry',      label: 'Private Inquiry' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-aurel-black/95 backdrop-blur-md border-b border-aurel-gold/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Wordmark */}
        <Link href="/" className="group flex flex-col leading-none">
          <span
            className="font-serif text-2xl font-light text-aurel-gold tracking-widest2"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.22em' }}
          >
            AUREL
          </span>
          <span className="text-[9px] tracking-widest3 text-aurel-stone uppercase mt-0.5"
            style={{ letterSpacing: '0.28em' }}>
            Connectivity
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(1, 7).map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? 'text-aurel-gold'
                  : 'text-aurel-stone hover:text-aurel-pearl'
              }`}
              style={{ letterSpacing: '0.18em' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/inquiry"
            className="ml-4 px-5 py-2.5 border border-aurel-gold/40 text-aurel-gold text-[11px] tracking-widest uppercase hover:bg-aurel-gold hover:text-aurel-black transition-all duration-300"
            style={{ letterSpacing: '0.18em' }}
          >
            Inquire
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-aurel-pearl transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-aurel-pearl transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-aurel-pearl transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-aurel-charcoal/98 backdrop-blur-md border-t border-aurel-gold/10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-[12px] tracking-widest uppercase transition-colors ${
                  pathname === link.href ? 'text-aurel-gold' : 'text-aurel-silver hover:text-aurel-gold'
                }`}
                style={{ letterSpacing: '0.22em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
