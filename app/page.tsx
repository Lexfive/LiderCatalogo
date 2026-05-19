import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { RecentProducts } from '@/components/sections/RecentProducts'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { InspirationSection } from '@/components/sections/InspirationSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = {
  title: 'Líder Molduras — Quadros, Molduras & Espelhos Premium',
  description:
    'Quadros decorativos, molduras artesanais e espelhos exclusivos de alto padrão. Peças que transformam ambientes com elegância e sofisticação.',
}

// Permite SSR para a seção de recém adicionados (dados do Supabase)
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      {/* Hero de impacto */}
      <HeroSection />

      {/* 3 categorias com imagem */}
      <CategoriesSection />

      {/*
        "Recém Adicionados" — produtos do Supabase ordenados por data.
        Quando não há produtos cadastrados, a seção some automaticamente.
        Assim que você cadastrar o 1º produto no painel /admin, aparece aqui.
      */}
      <RecentProducts />

      {/*
        Fallback: "Destaques da Temporada" com dados estáticos de lib/products.ts
        Aparece APENAS se o Supabase ainda não estiver configurado.
        Pode ser removido quando os produtos do Supabase estiverem ativos.
      */}
      <FeaturedProducts />

      {/* Galeria de ambientes inspiradores */}
      <InspirationSection />

      {/* Depoimentos de clientes */}
      <TestimonialsSection />

      {/* CTA final + WhatsApp */}
      <CtaBanner />
    </>
  )
}
