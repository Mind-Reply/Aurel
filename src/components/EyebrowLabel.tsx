interface Props {
  label: string
  className?: string
}

export default function EyebrowLabel({ label, className = '' }: Props) {
  return (
    <div
      className={`flex items-center gap-3 text-aurel-gold text-[10px] uppercase tracking-widest ${className}`}
      style={{ letterSpacing: '0.28em' }}
    >
      <span className="w-8 h-px bg-aurel-gold/60 inline-block" />
      {label}
    </div>
  )
}
