'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Pencil, Eye, EyeOff, Star, Trash2, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductSummary {
  id: string
  name: string
  sku: string | null
  category: string
  available: boolean
  featured: boolean
  created_at: string
  images: string[]
  badge: string | null
}

const CATEGORY_LABEL: Record<string, string> = {
  quadro: 'Quadro',
  moldura: 'Moldura',
  espelho: 'Espelho',
}

export function AdminProductList({ products: initial }: { products: ProductSummary[] }) {
  const [products, setProducts] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null) // id do produto em loading
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const supabase = createClient()

  // Toggle disponibilidade
  async function toggleAvailable(id: string, current: boolean) {
    setLoading(id)
    const { error } = await supabase
      .from('products')
      .update({ available: !current })
      .eq('id', id)

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, available: !current } : p))
      )
    }
    setLoading(null)
  }

  // Toggle destaque
  async function toggleFeatured(id: string, current: boolean) {
    setLoading(id)
    const { error } = await supabase
      .from('products')
      .update({ featured: !current })
      .eq('id', id)

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
      )
    }
    setLoading(null)
  }

  // Excluir produto
  async function deleteProduct(id: string) {
    setLoading(id)
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
    setLoading(null)
    setDeleteConfirm(null)
  }

  return (
    <div className="bg-white border border-[#E8E6DF]">
      {/* Header da tabela */}
      <div className="grid grid-cols-[auto,1fr,auto,auto,auto,auto] gap-4 items-center
                      px-5 py-3 border-b border-[#E8E6DF]
                      text-[0.65rem] tracking-[0.14em] uppercase text-[#9E9A91]
                      hidden md:grid">
        <span className="w-12">Foto</span>
        <span>Produto</span>
        <span className="text-center w-20">Categoria</span>
        <span className="text-center w-20">Visível</span>
        <span className="text-center w-20">Destaque</span>
        <span className="w-28">Ações</span>
      </div>

      {/* Linhas */}
      {products.map((product) => {
        const isLoading = loading === product.id

        return (
          <div key={product.id}
            className={cn(
              'grid grid-cols-1 md:grid-cols-[auto,1fr,auto,auto,auto,auto] gap-4 items-center',
              'px-5 py-4 border-b border-[#E8E6DF] last:border-0',
              'transition-colors duration-150',
              !product.available && 'opacity-50 bg-[#FAFAF7]',
              isLoading && 'opacity-60 pointer-events-none'
            )}>

            {/* Thumbnail */}
            <div className="w-12 h-12 bg-[#F4F3EF] border border-[#E8E6DF]
                            overflow-hidden shrink-0 hidden md:block">
              {product.images?.[0] ? (
                <Image src={product.images[0]} alt={product.name}
                  width={48} height={48} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#C8C4BB] text-[0.55rem] tracking-wide uppercase text-center leading-tight px-1">
                    Sem foto
                  </span>
                </div>
              )}
            </div>

            {/* Nome + SKU */}
            <div className="min-w-0">
              <p className="font-medium text-sm text-[#0A0A0A] truncate leading-snug">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {product.sku && (
                  <span className="text-[0.68rem] text-[#9E9A91] font-mono">
                    {product.sku}
                  </span>
                )}
                {product.badge && (
                  <span className="text-[0.58rem] tracking-[0.1em] uppercase
                                   bg-[#B8985A]/10 text-[#B8985A] px-1.5 py-0.5">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Categoria */}
            <div className="hidden md:flex justify-center">
              <span className={cn(
                'text-[0.65rem] tracking-[0.1em] uppercase px-2.5 py-1',
                product.category === 'quadro' && 'bg-blue-50 text-blue-600',
                product.category === 'moldura' && 'bg-amber-50 text-amber-600',
                product.category === 'espelho' && 'bg-emerald-50 text-emerald-600',
              )}>
                {CATEGORY_LABEL[product.category] ?? product.category}
              </span>
            </div>

            {/* Toggle visível */}
            <div className="flex md:justify-center items-center gap-2">
              <span className="md:hidden text-xs text-[#9E9A91]">Visível:</span>
              <button
                onClick={() => toggleAvailable(product.id, product.available)}
                aria-label={product.available ? 'Ocultar produto' : 'Tornar visível'}
                title={product.available ? 'Clique para ocultar' : 'Clique para tornar visível'}
                className={cn(
                  'w-8 h-8 flex items-center justify-center transition-colors duration-200 rounded-sm',
                  product.available
                    ? 'text-emerald-600 hover:bg-emerald-50'
                    : 'text-[#C8C4BB] hover:bg-[#F4F3EF]'
                )}
              >
                {product.available ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            {/* Toggle destaque */}
            <div className="flex md:justify-center items-center gap-2">
              <span className="md:hidden text-xs text-[#9E9A91]">Destaque:</span>
              <button
                onClick={() => toggleFeatured(product.id, product.featured)}
                aria-label={product.featured ? 'Remover destaque' : 'Destacar na home'}
                title={product.featured ? 'Remover da home' : 'Destacar na home'}
                className={cn(
                  'w-8 h-8 flex items-center justify-center transition-colors duration-200 rounded-sm',
                  product.featured
                    ? 'text-[#B8985A] hover:bg-[#F5EDD8]'
                    : 'text-[#C8C4BB] hover:bg-[#F4F3EF]'
                )}
              >
                <Star size={16} className={product.featured ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-1">
              {/* Editar */}
              <Link href={`/admin/produtos/${product.id}`}
                className="w-8 h-8 flex items-center justify-center text-[#9E9A91]
                           hover:text-[#0A0A0A] hover:bg-[#F4F3EF] transition-colors rounded-sm"
                title="Editar produto">
                <Pencil size={14} />
              </Link>

              {/* Ver no site */}
              <a href={`/produto/${product.id}`} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-[#9E9A91]
                           hover:text-[#0A0A0A] hover:bg-[#F4F3EF] transition-colors rounded-sm"
                title="Ver no site">
                <ExternalLink size={14} />
              </a>

              {/* Excluir */}
              {deleteConfirm === product.id ? (
                <div className="flex items-center gap-1.5 ml-1">
                  <span className="text-xs text-red-600">Confirmar?</span>
                  <button onClick={() => deleteProduct(product.id)}
                    className="text-xs text-red-600 hover:underline font-medium">
                    Sim
                  </button>
                  <button onClick={() => setDeleteConfirm(null)}
                    className="text-xs text-[#9E9A91] hover:underline">
                    Não
                  </button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(product.id)}
                  className="w-8 h-8 flex items-center justify-center text-[#C8C4BB]
                             hover:text-red-500 hover:bg-red-50 transition-colors rounded-sm"
                  title="Excluir produto">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
