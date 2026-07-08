import Link from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
  variant?: 'outline' | 'solid' | 'ghost'
  className?: string
}

export default function GoldButton({ href, children, variant = 'outline', className = '' }: Props) {
  const base = 'inline-block text-[11px] uppercase tracking-widest px-8 py-4 transition-all duration-300 font-light'
  const styles = {
    outline: 'border border-aurel-gold/50 text-aurel-gold hover:bg-aurel-gold hover:text-aurel-black hover:border-aurel-gold',
    solid:   'bg-aurel-gold text-aurel-black hover:bg-aurel-gold-light',
    ghost:   'text-aurel-gold hover:text-aurel-gold-light underline-offset-4 hover:underline',
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} style={{ letterSpacing: '0.18em' }}>
      {children}
    </Link>
  )
}
