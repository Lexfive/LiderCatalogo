'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Product, type ProductCategory, type ProductStyle } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { cn } from '@/lib/utils'

// ─── TIPOS ────────────────────────────────────────────────────────────────────

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'newest'

interface Filters {
  search: string
  category: ProductCategory | ''
  style: ProductStyle | ''
  sort: SortOption
}

const STYLE_LABELS: Record<ProductStyle, string> = {
  abstrato: 'Abstrato',
  botanico: 'Botânico',
  vintage: 'Vintage',
  minimalista: 'Minimalista',
  classico: 'Clássico',
  contemporaneo: 'Contemporâneo',
  fotografico: 'Fotográfico',
  geometrico: 'Geométrico',
}

const ITEMS_PER_PAGE = 8

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

interface CatalogClientProps {
  initialProducts: Product[]
  initialCategory?: ProductCategory
}

export function CatalogClient({ initialProducts, initialCategory }: CatalogClientProps) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: initialCategory || '',
    style: '',
    sort: 'default',
  })
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [showFilters, setShowFilters] = useState(false)

  // ─── LÓGICA DE FILTRO/ORDENAÇÃO ─────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...initialProducts]

    // Busca por texto
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.styles.some((s) => s.includes(q))
      )
    }

    // Filtro por categoria
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category)
    }

    // Filtro por estilo
    if (filters.style) {
      result = result.filter((p) => p.styles.includes(filters.style as ProductStyle))
    }

    // Ordenação
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return result
  }, [initialProducts, filters])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setVisibleCount(ITEMS_PER_PAGE) // Reset pagination ao filtrar
  }

  function loadMore() {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <div>
      {/* ── BARRA DE FILTROS ────────────────────────────────────────────── */}
      <div className="mb-8">
        {/* Busca + Toggles */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Input de busca */}
          <label htmlFor="search-input" className="sr-only">
            Buscar produtos
          </label>
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-300"
              aria-hidden="true"
            />
            <input
              id="search-input"
              type="search"
              placeholder="Buscar por nome, estilo, tag…"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full border border-charcoal-200 bg-white pl-10 pr-4 py-2.5
                         font-sans text-sm text-charcoal placeholder:text-charcoal-300
                         outline-none focus:border-gold transition-colors duration-300"
            />
          </div>

          {/* Select de categoria */}
          <label htmlFor="category-filter" className="sr-only">
            Filtrar por categoria
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value as ProductCategory | '')}
            className="border border-charcoal-200 bg-white px-4 py-2.5
                       font-sans text-sm text-charcoal-600 outline-none
                       focus:border-gold transition-colors duration-300 min-w-[160px]"
          >
            <option value="">Todas as categorias</option>
            <option value="quadro">Quadros</option>
            <option value="moldura">Molduras</option>
            <option value="espelho">Espelhos</option>
          </select>

          {/* Select de ordenação */}
          <label htmlFor="sort-filter" className="sr-only">
            Ordenar produtos
          </label>
          <select
            id="sort-filter"
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
            className="border border-charcoal-200 bg-white px-4 py-2.5
                       font-sans text-sm text-charcoal-600 outline-none
                       focus:border-gold transition-colors duration-300 min-w-[160px]"
          >
            <option value="default">Ordenar por</option>
            <option value="newest">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="name-asc">Nome A-Z</option>
          </select>

          {/* Botão de expandir estilos (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            className="sm:hidden flex items-center gap-2 border border-charcoal-200 bg-white px-4 py-2.5
                       font-sans text-sm text-charcoal-600 hover:border-gold transition-colors"
          >
            <SlidersHorizontal size={14} />
            Estilos
          </button>
        </div>

        {/* Tags de estilo */}
        <div
          className={cn(
            'flex flex-wrap gap-2',
            'sm:flex', // sempre visível no desktop
            !showFilters && 'hidden sm:flex' // escondido no mobile por padrão
          )}
        >
          {/* Botão "Todos" */}
          <button
            onClick={() => updateFilter('style', '')}
            className={cn(
              'border px-4 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase font-sans',
              'transition-all duration-200',
              filters.style === ''
                ? 'border-gold text-gold bg-gold-pale'
                : 'border-charcoal-200 text-charcoal-600 hover:border-gold hover:text-gold'
            )}
          >
            Todos
          </button>

          {(Object.entries(STYLE_LABELS) as [ProductStyle, string][]).map(([value, label]) => (
            <button
              key={value}
              onClick={() => updateFilter('style', value === filters.style ? '' : value)}
              className={cn(
                'border px-4 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase font-sans',
                'transition-all duration-200',
                filters.style === value
                  ? 'border-gold text-gold bg-gold-pale'
                  : 'border-charcoal-200 text-charcoal-600 hover:border-gold hover:text-gold'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTAGEM DE RESULTADOS ──────────────────────────────────────── */}
      <p className="text-xs text-charcoal-400 tracking-wide mb-6" aria-live="polite">
        {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado
        {filtered.length !== 1 ? 's' : ''}
      </p>

      {/* ── GRID DE PRODUTOS ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-charcoal-400 mb-2">Nenhum produto encontrado</p>
          <p className="text-sm text-charcoal-300">Tente ajustar os filtros ou buscar por outro termo.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.4 }}
                >
                  <ProductCard product={product} priority={i < 4} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Carregar mais */}
          {hasMore && (
            <div className="text-center mt-12">
              <button onClick={loadMore} className="btn-outline">
                Carregar mais ({filtered.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
