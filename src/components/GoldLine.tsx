interface Props {
  className?: string
}

export function GoldLine({ className = '' }: Props) {
  return (
    <div
      className={`h-px w-16 bg-gradient-to-r from-aurel-gold to-aurel-gold-light ${className}`}
    />
  )
}

export function GoldLineFull({ className = '' }: Props) {
  return <div className={`divider-gold ${className}`} />
}
