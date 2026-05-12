import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, Truck, Shield, MessageCircle } from 'lucide-react'
import {
  getProductBySlug,
  getAllSlugs,
  getRelatedProducts,
  formatPrice,
  formatDimensions,
  getCategoryLabel,
} from '@/lib/products'
import { buildMetadata } from '@/lib/metadata'
import { getProductWhatsAppUrl } from '@/lib/utils'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCard } from '@/components/ui/ProductCard'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

// Gera todas as rotas estáticas na build.
// OBRIGATÓRIO para `output: export` (Hostinger/static hosting):
// sem generateStaticParams + dynamicParams=false, slugs dinâmicos quebram em export estático.
export const dynamicParams = false

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// Metadata dinâmica por produto
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/produto/${product.slug}`,
    image: product.images[0],
  })
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.id, product.category)
  const installmentValue = Math.round(product.price / (product.priceInstallments || 12))
  const wppUrl = getProductWhatsAppUrl(product.name, product.slug)

  return (
    <>
      <div className="pt-[72px]">
        <div className="container-elite section">
          {/* Breadcrumb */}
          <nav aria-label="Caminho da página" className="mb-10">
            <ol className="flex items-center gap-2 text-xs text-charcoal-400 tracking-wide">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/catalogo" className="hover:text-gold transition-colors">
                  Catálogo
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/categoria/${product.category === 'quadro' ? 'quadros' : product.category === 'moldura' ? 'molduras' : 'espelhos'}`}
                  className="hover:text-gold transition-colors"
                >
                  {getCategoryLabel(product.category)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-charcoal" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Layout principal: galeria + info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">
            {/* ── GALERIA ─────────────────────────────────────────────── */}
            <AnimatedSection direction="left">
              <ProductGallery
                images={product.images}
                productName={product.name}
                thumbnailColor={product.thumbnailColor}
              />
            </AnimatedSection>

            {/* ── INFORMAÇÕES ─────────────────────────────────────────── */}
            <AnimatedSection delay={0.1}>
              {/* Categoria */}
              <span className="section-tag">{getCategoryLabel(product.category)}</span>

              {/* Nome */}
              <h1 className="font-serif text-display-sm font-light text-charcoal leading-tight mb-4">
                {product.name}
              </h1>

              {/* Badge */}
              {product.badge && (
                <span className="inline-block bg-gold text-white text-[0.62rem] tracking-[0.12em] uppercase px-3 py-1 mb-4">
                  {product.badge}
                </span>
              )}

              {/* Preço */}
              <div className="mb-6">
                <p className="font-serif text-4xl font-light text-charcoal mb-1">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs text-charcoal-400 font-sans">
                  ou {product.priceInstallments || 12}× de{' '}
                  <strong className="font-medium text-charcoal">{formatPrice(installmentValue)}</strong>{' '}
                  sem juros
                </p>
              </div>

              <div className="gold-divider" />

              {/* Descrição curta */}
              <p className="text-charcoal-600 leading-relaxed text-sm mb-8">
                {product.fullDescription}
              </p>

              {/* Especificações */}
              <div className="mb-8">
                <h2 className="text-[0.68rem] tracking-[0.2em] uppercase text-charcoal-400 font-sans mb-4">
                  Especificações
                </h2>
                <table className="w-full" aria-label="Especificações do produto">
                  <tbody>
                    {[
                      ['Dimensões', formatDimensions(product.dimensions)],
                      ['Materiais', product.materials],
                      ['Categoria', getCategoryLabel(product.category)],
                      ['Estilos', product.styles.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b border-charcoal-200">
                        <td className="py-3 text-xs tracking-[0.1em] uppercase text-charcoal-400 font-sans w-28 pr-4">
                          {label}
                        </td>
                        <td className="py-3 text-sm text-charcoal leading-snug">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-6">
                {/* WhatsApp — principal */}
                <a
                  href={wppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  aria-label={`Solicitar ${product.name} no WhatsApp`}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Solicitar no WhatsApp
                </a>

                {/* Orçamento */}
                <Link href="/contato" className="btn-outline w-full justify-center">
                  Solicitar Orçamento por E-mail
                </Link>
              </div>

              {/* Informações de entrega */}
              <div className="border border-charcoal-200 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">Entrega em todo o Brasil</p>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      Prazo estimado: <strong className="text-charcoal">{product.deliveryDays}</strong> após
                      confirmação do pedido. Embalagem especial artística.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">Garantia e qualidade</p>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      Todas as peças passam por controle rigoroso de qualidade. Frete grátis acima de
                      R$ 800,00.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <section className="section bg-cream-100" aria-labelledby="related-heading">
            <div className="container-elite">
              <SectionHeader
                tag="Você também pode gostar"
                title="Produtos <em>Relacionados</em>"
              />
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
