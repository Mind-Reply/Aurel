import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="bg-aurel-black min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-serif text-[160px] font-light text-aurel-gold/10 leading-none select-none mb-4"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
          404
        </div>
        <h1 className="font-serif text-3xl font-light text-aurel-pearl mb-6"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
          This page does not exist.
        </h1>
        <p className="text-aurel-stone mb-10">Some things should stay quiet.</p>
        <Link
          href="/"
          className="inline-block border border-aurel-gold/40 text-aurel-gold text-[11px] tracking-widest px-8 py-4 hover:bg-aurel-gold hover:text-aurel-black transition-all duration-300 uppercase"
          style={{ letterSpacing: '0.18em' }}
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
