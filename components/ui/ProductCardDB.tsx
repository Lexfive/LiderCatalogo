/**
 * ProductCardDB.tsx
 * Versão do ProductCard que recebe diretamente a estrutura do Supabase.
 * Usado em seções Server Components (home, etc.) que consultam o banco diretamente.
 */
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProductSummary {
  id: string
  slug: string
  name: string
  category: string
  width_cm: number
  height_cm: number
  images: string[]
  badge: string | null
  available: boolean
  featured: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  quadro: 'Quadro Decorativo',
  moldura: 'Moldura Artesanal',
  espelho: 'Espelho',
}

// Gradientes placeholder por categoria
const CATEGORY_GRADIENTS: Record<string, string> = {
  quadro: 'linear-gradient(145deg, #2a2118, #4a3828)',
  moldura: 'linear-gradient(145deg, #1a2028, #2e3a48)',
  espelho: 'linear-gradient(145deg, #1e2820, #2e4038)',
}

export function ProductCardDB({
  product,
  priority = false,
}: {
  product: ProductSummary
  priority?: boolean
}) {
  const { slug, name, category, width_cm, height_cm, images, badge } = product
  const catLabel = CATEGORY_LABELS[category] ?? category
  const gradient = CATEGORY_GRADIENTS[category] ?? 'linear-gradient(145deg, #2d2520, #4a3830)'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/produto/${slug}`}
        className="block bg-white group focus-visible:outline-2 focus-visible:outline-gold
                   shadow-sm hover:shadow-md transition-shadow duration-300"
        aria-label={`Ver detalhes de ${name}`}
      >
        {/* Imagem */}
        <div className="aspect-[3/4] relative overflow-hidden bg-cream-100">
          {images?.[0] ? (
            <Image
              src={images[0]}
              alt={`${name} — ${catLabel}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3
                         transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ background: gradient }}
              aria-hidden="true"
            >
              <div className="w-12 h-12 border border-white/20 rounded-sm" />
              <span className="text-white/35 text-[0.58rem] tracking-[0.18em] uppercase font-sans">
                Foto em breve
              </span>
            </div>
          )}

          {badge && (
            <span className="absolute top-3 left-3 z-10
                             bg-gold text-white font-sans
                             text-[0.58rem] tracking-[0.1em] uppercase px-2.5 py-1">
              {badge}
            </span>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5
                          transition-colors duration-400 z-[1]" />
        </div>

        {/* Info */}
        <div className="p-4 pb-5">
          <p className="text-[0.6rem] tracking-[0.18em] uppercase text-gold font-sans mb-1">
            {catLabel}
          </p>
          <h3 className="font-serif text-[1.05rem] font-normal leading-snug mb-2
                         text-charcoal group-hover:text-charcoal-600 transition-colors
                         line-clamp-2">
            {name}
          </h3>
          <p className="text-[0.7rem] text-charcoal-300 tracking-wide">
            {width_cm} × {height_cm} cm
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
