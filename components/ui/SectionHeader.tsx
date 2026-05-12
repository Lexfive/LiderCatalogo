import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  tag?: string
  title: string          // Suporta HTML simples com <em> para itálico
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean        // Para fundos escuros
  className?: string
}

export function SectionHeader({
  tag,
  title,
  subtitle,
  align = 'left',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {tag && (
        <span className={cn('section-tag', light && 'text-gold')}>
          {tag}
        </span>
      )}
      <h2
        className={cn(
          'font-serif font-light text-balance',
          'text-display-md',
          light ? 'text-white' : 'text-charcoal'
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={cn('gold-divider', align === 'center' && 'mx-auto')} />
      {subtitle && (
        <p
          className={cn(
            'max-w-lg leading-relaxed text-sm',
            light ? 'text-white/50' : 'text-charcoal-400',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
