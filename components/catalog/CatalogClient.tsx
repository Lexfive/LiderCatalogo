'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Product, type ProductCategory, type ProductStyle } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { cn } from '@/lib/utils'

type SortOption = 'default' | 'name-asc' | 'newest'

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

  const filtered = useMemo(() => {
    let result = [...initialProducts]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.styles.some((s) => s.includes(q))
      )
    }
    if (filters.category) result = result.filter((p) => p.category === filters.category)
    if (filters.style) result = result.filter((p) => p.styles.includes(filters.style))

    switch (filters.sort) {
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')); break
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
    }
    return result
  }, [initialProducts, filters])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const activeFiltersCount = [filters.category, filters.style, filters.sort !== 'default' ? filters.sort : ''].filter(Boolean).length

  return (
    <div>
      {/* ── FILTROS ─────────────────────────────────────────────────────── */}
      <div className="mb-8 space-y-3">

        {/* Linha 1: busca + botão filtros mobile */}
        <div className="flex gap-3">
          <label htmlFor="search-input" className="sr-only">Buscar produtos</label>
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-300" aria-hidden="true" />
            <input
              id="search-input"
              type="search"
              placeholder="Buscar por nome ou estilo…"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full border border-charcoal-200 bg-white pl-10 pr-4 py-2.5
                         font-sans text-sm text-charcoal placeholder:text-charcoal-300
                         outline-none focus:border-gold transition-colors duration-300"
            />
          </div>

          {/* Botão filtros — aparece em telas médias pra baixo */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            className={cn(
              'lg:hidden flex items-center gap-2 border px-4 py-2.5 shrink-0',
              'font-sans text-[0.78rem] text-charcoal-600 transition-colors duration-200',
              showFilters ? 'border-gold text-gold bg-gold-pale' : 'border-charcoal-200 bg-white hover:border-gold'
            )}
          >
            <SlidersHorizontal size={14} />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-gold text-white text-[0.6rem] w-4 h-4 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Linha 2: selects — sempre visíveis em desktop, toggle em mobile */}
        <AnimatePresence>
          {(showFilters || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:!h-auto lg:!opacity-100"
            >
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
                {/* Categoria */}
                <label htmlFor="category-filter" className="sr-only">Categoria</label>
                <select id="category-filter" value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value as ProductCategory | '')}
                  className="border border-charcoal-200 bg-white px-4 py-2.5 font-sans text-sm
                             text-charcoal-600 outline-none focus:border-gold transition-colors sm:min-w-[170px]">
                  <option value="">Todas as categorias</option>
                  <option value="quadro">Quadros</option>
                  <option value="moldura">Molduras</option>
                  <option value="espelho">Espelhos</option>
                </select>

                {/* Ordenação */}
                <label htmlFor="sort-filter" className="sr-only">Ordenação</label>
                <select id="sort-filter" value={filters.sort}
                  onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
                  className="border border-charcoal-200 bg-white px-4 py-2.5 font-sans text-sm
                             text-charcoal-600 outline-none focus:border-gold transition-colors sm:min-w-[170px]">
                  <option value="default">Ordenar por</option>
                  <option value="newest">Mais recentes</option>
                  <option value="name-asc">Nome A-Z</option>
                </select>

                {/* Tags de estilo */}
                <div className="flex flex-wrap gap-2 items-center">
                  <button onClick={() => updateFilter('style', '')}
                    className={cn('border px-3.5 py-1.5 text-[0.68rem] tracking-[0.08em] uppercase font-sans transition-all duration-200',
                      filters.style === '' ? 'border-gold text-gold bg-gold-pale' : 'border-charcoal-200 text-charcoal-600 hover:border-gold hover:text-gold'
                    )}>
                    Todos
                  </button>
                  {(Object.entries(STYLE_LABELS) as [ProductStyle, string][]).map(([value, label]) => (
                    <button key={value} onClick={() => updateFilter('style', value === filters.style ? '' : value)}
                      className={cn('border px-3.5 py-1.5 text-[0.68rem] tracking-[0.08em] uppercase font-sans transition-all duration-200',
                        filters.style === value ? 'border-gold text-gold bg-gold-pale' : 'border-charcoal-200 text-charcoal-600 hover:border-gold hover:text-gold'
                      )}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Limpar filtros */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => { updateFilter('category', ''); updateFilter('style', ''); updateFilter('sort', 'default') }}
                    className="flex items-center gap-1.5 text-[0.72rem] text-charcoal-400 hover:text-gold transition-colors px-2 py-1"
                  >
                    <X size={13} /> Limpar filtros
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contagem */}
      <p className="text-xs text-charcoal-400 tracking-wide mb-6" aria-live="polite">
        {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-charcoal-300 mb-2">Nenhum produto encontrado</p>
          <p className="text-sm text-charcoal-300">Tente ajustar os filtros ou buscar por outro termo.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((product, i) => (
                <motion.div key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.25), duration: 0.35 }}>
                  <ProductCard product={product} priority={i < 4} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button onClick={() => setVisibleCount((p) => p + ITEMS_PER_PAGE)} className="btn-outline">
                Carregar mais ({filtered.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
