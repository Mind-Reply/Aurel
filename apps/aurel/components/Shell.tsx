'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'House' },
  { href: '/scent', label: 'Scent' },
  { href: '/metal', label: 'Metal' },
  { href: '/system', label: 'System' },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#090807]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          <Link href="/" className="wordmark text-sm text-[#f3ece3] hover:text-[#c9854a] transition-colors duration-200">
            AUREL
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-[#8a7f72]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors duration-200 hover:text-[#f3ece3] ${
                  pathname === l.href ? 'text-[#c9854a]' : ''
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="md:hidden text-[11px] uppercase tracking-[0.18em] text-[#8a7f72]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-white/5 bg-[#090807] px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-[12px] uppercase tracking-[0.18em] ${
                  pathname === l.href ? 'text-[#c9854a]' : 'text-[#8a7f72]'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <main className="flex-1 pt-16">{children}</main>
      <footer className="border-t border-white/5 px-6 py-12 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="wordmark text-xs text-[#f3ece3]">AUREL</span>
            <p className="mt-1 text-[11px] text-[#8a7f72]">Scent · Metal · System · Invisible connectivity</p>
          </div>
          <p className="text-[11px] text-[#5c564e]">© {new Date().getFullYear()} AUREL · Mind-Reply</p>
        </div>
      </footer>
    </div>
  );
}
