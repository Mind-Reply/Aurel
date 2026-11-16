'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Shell } from '../components/Shell';
import { IntentRouter, Intent } from '../components/IntentRouter';

export default function HousePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [hint, setHint] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const intent: Intent = IntentRouter.resolve(query);
    if (intent.route) {
      router.push(intent.route);
    } else {
      setHint(intent.hint ?? 'Try a word — scent, metal, system, or just browse.');
    }
  }

  return (
    <Shell>
      <section className="relative min-h-[85vh] flex items-end md:items-center px-6 pb-20 pt-24 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#1a1510_0%,#090807_55%)]" />
        <div className="relative mx-auto max-w-3xl w-full text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#c9854a]">The House · Active Platform</p>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05] tracking-tight text-[#f3ece3] text-balance">
            What are you<br />
            <span className="italic text-[#c9854a]">looking for?</span>
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed text-[#8a7f72]">
            Scent. Metal. System. Or nothing in particular — type it and the house answers.
          </p>

          <form onSubmit={handleSubmit} className="mt-12">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHint(null);
                }
                placeholder="scent, metal, system, or just browsing…"
                autoFocus
                className="w-full bg-transparent border-b border-white/20 py-4 text-center text-lg md:text-xl font-light text-[#f3ece3] placeholder:text-[#5c564e] outline-none focus:border-[#c9854a] transition-colors duration-200"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.2em] text-[#c9854a] hover:text-[#f3ece3] transition-colors duration-200"
              >
                Enter →
              </button>
            </div>
            {hint && (
              <p className="mt-4 text-sm text [#8a7f72] font-light">{hint}</p>
            )}
          </form>

          <div className="mt-16 flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.25em] text-[#5c564e]">
            <Link href="/scent" className="hover:text-[#c9854a] transition-colors">Scent</Link>
            <Link href="/metal" className="hover:text [#c9854a] transition-colors">Metal</Link>
            <Link href="/system" className="hover:text [#c9854a] transition-colors">System</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
