import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/AdminNav'
import { AdminProductList } from '@/components/admin/AdminProductList'
import { PlusCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Produtos' }

// Sem cache — sempre busca dados frescos
export const dynamic = 'force-dynamic'

export default async function AdminProdutosPage() {
  const supabase = createServerSupabaseClient()

  // Busca usuário logado
  const { data: { user } } = await supabase.auth.getUser()

  // Busca TODOS os produtos (incluindo indisponíveis) para o admin
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, category, available, featured, created_at, images, badge')
    .order('created_at', { ascending: false })

  const total = products?.length ?? 0
  const ativos = products?.filter((p) => p.available).length ?? 0
  const destaques = products?.filter((p) => p.featured).length ?? 0

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav userEmail={user?.email} />

      <main className="flex-1 px-5 sm:px-8 py-8 max-w-[1280px] mx-auto w-full">
        {/* Header da página */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-serif font-light text-[#0A0A0A]">Produtos</h1>
            <p className="text-sm text-[#9E9A91] mt-0.5">
              Gerencie o catálogo da Líder Molduras
            </p>
          </div>
          <Link href="/admin/produtos/novo"
            className="inline-flex items-center gap-2 bg-[#B8985A] text-white
                       text-xs tracking-[0.12em] uppercase px-5 py-2.5 font-sans
                       transition-colors hover:bg-[#D4B87A] shrink-0">
            <PlusCircle size={15} />
            Novo produto
          </Link>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total de produtos', value: total, color: 'text-[#0A0A0A]' },
            { label: 'Ativos no catálogo', value: ativos, color: 'text-emerald-600' },
            { label: 'Em destaque na home', value: destaques, color: 'text-[#B8985A]' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-[#E8E6DF] px-5 py-4">
              <p className={`text-2xl font-serif font-light ${color}`}>{value}</p>
              <p className="text-xs text-[#9E9A91] mt-0.5 leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* Lista de produtos */}
        {total === 0 ? (
          <div className="bg-white border border-[#E8E6DF] text-center py-20">
            <p className="font-serif text-xl text-[#C8C4BB] mb-3">Nenhum produto ainda</p>
            <p className="text-sm text-[#9E9A91] mb-6">
              Adicione o primeiro produto ao catálogo.
            </p>
            <Link href="/admin/produtos/novo"
              className="inline-flex items-center gap-2 bg-[#B8985A] text-white
                         text-xs tracking-[0.12em] uppercase px-6 py-3 font-sans
                         transition-colors hover:bg-[#D4B87A]">
              <PlusCircle size={14} />
              Adicionar produto
            </Link>
          </div>
        ) : (
          <AdminProductList products={products ?? []} />
        )}
      </main>
    </div>
  )
}
