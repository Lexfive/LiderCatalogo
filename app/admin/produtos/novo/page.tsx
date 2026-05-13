import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/AdminNav'
import { ProductForm } from '@/components/admin/ProductForm'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = { title: 'Novo Produto' }

export default async function NovoProdutoPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

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
              Novo produto
            </h1>
            <p className="text-sm text-[#9E9A91] mt-0.5">
              Preencha as informações e publique no catálogo
            </p>
          </div>
        </div>

        <ProductForm />
      </main>
    </div>
  )
}
