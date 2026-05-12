'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductGalleryProps {
  images: string[]
  productName: string
  thumbnailColor: string[]
}

export function ProductGallery({ images, productName, thumbnailColor }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const placeholderStyle = {
    background: `linear-gradient(145deg, ${thumbnailColor[0]}, ${thumbnailColor[1] || thumbnailColor[0]})`,
  }

  // Cria lista de "slides" — imagens reais ou placeholders
  const slides = images.length > 0
    ? images
    : [null, null, null] // 3 placeholders se não há imagens

  return (
    <div className="flex gap-4">
      {/* Miniaturas */}
      <div className="flex flex-col gap-3 w-[80px] shrink-0">
        {slides.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Ver imagem ${i + 1} de ${productName}`}
            aria-current={activeIndex === i}
            className={`
              relative w-[80px] h-[80px] overflow-hidden border transition-colors duration-200
              ${activeIndex === i ? 'border-gold' : 'border-charcoal-200 hover:border-charcoal-400'}
            `}
          >
            {src ? (
              <Image
                src={src}
                alt={`${productName} — foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  ...placeholderStyle,
                  filter: i === activeIndex ? 'none' : 'brightness(0.7)',
                }}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      {/* Imagem principal */}
      <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-cream-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {slides[activeIndex] ? (
              <Image
                src={slides[activeIndex]!}
                alt={`${productName} — imagem principal`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={placeholderStyle}
                aria-hidden="true"
              >
                {/* Decoração geométrica */}
                <div className="w-[45%] h-[55%] border border-white/20" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
