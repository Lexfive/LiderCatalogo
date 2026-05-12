import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type Product, formatPrice, getCategoryLabel } from '@/lib/products'

interface ProductCardProps {
  product: Product
  priority?: boolean // Para LCP (primeiros cards visíveis)
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const {
    slug,
    name,
    category,
    price,
    priceInstallments = 12,
    dimensions,
    images,
    thumbnailColor,
    badge,
  } = product

  const installmentValue = Math.round(price / priceInstallments)

  // Gradiente placeholder enquanto a imagem real não está disponível
  const placeholderStyle = {
    background: `linear-gradient(145deg, ${thumbnailColor[0]}, ${thumbnailColor[1] || thumbnailColor[0]})`,
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/produto/${slug}`}
        className="block bg-white group focus-visible:outline-2 focus-visible:outline-gold"
        aria-label={`Ver detalhes de ${name}`}
      >
        {/* Imagem do produto */}
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
            // Placeholder estilizado com cores do produto
            <div
              className="absolute inset-0 product-img-zoom flex items-center justify-center"
              style={placeholderStyle}
              aria-hidden="true"
            >
              {/* Decoração geométrica sutil */}
              <div className="w-1/2 h-2/3 border border-white/20" />
            </div>
          )}

          {/* Badge */}
          {badge && (
            <span
              className="absolute top-3 left-3 bg-gold text-white
                         text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 z-10"
            >
              {badge}
            </span>
          )}
        </div>

        {/* Info do produto */}
        <div className="p-5 pb-6">
          <p className="text-label-sm uppercase tracking-[0.18em] text-gold mb-1.5">
            {getCategoryLabel(category)}
          </p>
          <h3 className="font-serif text-xl font-normal leading-tight mb-2 text-charcoal group-hover:text-charcoal-600 transition-colors">
            {name}
          </h3>
          <p className="text-[0.72rem] text-charcoal-300 tracking-wider mb-3">
            {dimensions.width} × {dimensions.height} cm
          </p>
          <p className="font-serif text-2xl font-light text-charcoal">
            {formatPrice(price)}{' '}
            <span className="font-sans text-xs font-light text-charcoal-400">
              ou {priceInstallments}× de {formatPrice(installmentValue)}
            </span>
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
