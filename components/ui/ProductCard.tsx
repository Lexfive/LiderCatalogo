'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type Product, formatPrice, getCategoryLabel } from '@/lib/products'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { slug, name, category, price, priceInstallments = 12, dimensions, images, thumbnailColor, badge } = product
  const installmentValue = Math.round(price / priceInstallments)

  const placeholderStyle = {
    background: `linear-gradient(150deg, ${thumbnailColor[0]}, ${thumbnailColor[1] || thumbnailColor[0]})`,
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
        {/* Imagem */}
        <div className="product-img-wrap">
          {images[0] && images[0] !== '/images/products/placeholder.jpg' ? (
            <Image
              src={images[0]}
              alt={`${name} — ${getCategoryLabel(category)}`}
              fill
              className="object-cover product-img-zoom"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
          ) : (
            <div
              className="absolute inset-0 product-img-zoom flex items-center justify-center"
              style={placeholderStyle}
              aria-hidden="true"
            >
              {/* Ícone placeholder elegante */}
              <div className="text-center opacity-20">
                <div className="w-14 h-14 border border-white/60 mx-auto mb-2" />
                <p className="text-white text-[0.6rem] tracking-[0.15em] uppercase">Foto em breve</p>
              </div>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <span className="absolute top-3 left-3 bg-gold text-white
                             text-[0.58rem] tracking-[0.1em] uppercase px-2.5 py-1 z-10 font-sans">
              {badge}
            </span>
          )}

          {/* Overlay de hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-400 z-[1]" />
        </div>

        {/* Info */}
        <div className="p-4 pb-5">
          <p className="text-[0.6rem] tracking-[0.18em] uppercase text-gold font-sans mb-1">
            {getCategoryLabel(category)}
          </p>
          <h3 className="font-serif text-[1.05rem] font-normal leading-snug mb-1.5 text-charcoal
                         group-hover:text-charcoal-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-[0.7rem] text-charcoal-300 tracking-wide mb-2.5">
            {dimensions.width} × {dimensions.height} cm
          </p>
          <div className="flex items-baseline justify-between flex-wrap gap-1">
            <p className="font-serif text-[1.25rem] font-light text-charcoal">
              {formatPrice(price)}
            </p>
            <p className="font-sans text-[0.65rem] text-charcoal-400 font-light">
              {priceInstallments}× {formatPrice(installmentValue)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
