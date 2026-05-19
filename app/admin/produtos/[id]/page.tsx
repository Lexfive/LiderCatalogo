import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/AdminNav'
import { ProductForm } from '@/components/admin/ProductForm'
import { ChevronLeft } from 'lucide-react'
import type { ProductRow } from '@/lib/supabase/types'

export const metadata: Metadata = { title: 'Editar Produto' }
export const dynamic = 'force-dynamic'

export default async function EditarProdutoPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav userEmail={user?.email} />

      <main className="flex-1 px-5 sm:px-8 py-8 max-w-[1280px] mx-auto w-full">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/produtos"
            className="text-[#9E9A91] hover:text-[#0A0A0A] transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-light text-[#0A0A0A]">
              Editar produto
            </h1>
            <p className="text-sm text-[#9E9A91] mt-0.5">
              {product.name}
              {product.sku && (
                <span className="ml-2 font-mono text-[#C8C4BB]">{product.sku}</span>
              )}
            </p>
          </div>
        </div>

        <ProductForm product={product as ProductRow} />
      </main>
    </div>
  )
}
