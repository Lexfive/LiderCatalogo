'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type Product, getCategoryLabel } from '@/lib/products'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const {
    slug, name, category, dimensions,
    images, thumbnailColor, badge,
  } = product

  const placeholderStyle = {
    background: `linear-gradient(150deg, ${thumbnailColor[0]}, ${thumbnailColor[1] ?? thumbnailColor[0]})`,
  }

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
        {/* ── Imagem ─────────────────────────────────────────────────── */}
        <div className="product-img-wrap">
          {images[0] ? (
            <Image
              src={images[0]}
              alt={`${name} — ${getCategoryLabel(category)}`}
              fill
              className="object-cover product-img-zoom"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
          ) : (
            /* Placeholder elegante enquanto não há foto */
            <div
              className="absolute inset-0 product-img-zoom flex flex-col items-center justify-center gap-3"
              style={placeholderStyle}
              aria-hidden="true"
            >
              <div className="w-12 h-12 border border-white/25 rounded-sm" />
              <span className="text-white/40 text-[0.58rem] tracking-[0.18em] uppercase font-sans">
                Foto em breve
              </span>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <span className="absolute top-3 left-3 z-10
                             bg-gold text-white font-sans
                             text-[0.58rem] tracking-[0.1em] uppercase px-2.5 py-1">
              {badge}
            </span>
          )}

          {/* Hover overlay suave */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5
                          transition-colors duration-400 z-[1]" />
        </div>

        {/* ── Info ───────────────────────────────────────────────────── */}
        <div className="p-4 pb-5">
          {/* Categoria */}
          <p className="text-[0.6rem] tracking-[0.18em] uppercase text-gold font-sans mb-1">
            {getCategoryLabel(category)}
          </p>

          {/* Nome */}
          <h3 className="font-serif text-[1.05rem] font-normal leading-snug mb-2
                         text-charcoal group-hover:text-charcoal-600 transition-colors
                         line-clamp-2">
            {name}
          </h3>

          {/* Dimensões */}
          <p className="text-[0.7rem] text-charcoal-300 tracking-wide">
            {dimensions.width} × {dimensions.height} cm
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
