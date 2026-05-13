import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Truck, Shield, MessageCircle, ShoppingBag } from 'lucide-react'
import {
  getProductBySlug,
  getAllSlugs,
  getRelatedProducts,
  formatDimensions,
  getCategoryLabel,
  getFinishLabel,
} from '@/lib/products'
import { buildMetadata } from '@/lib/metadata'
import { getProductWhatsAppUrl } from '@/lib/utils'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCard } from '@/components/ui/ProductCard'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

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
  const wppUrl = getProductWhatsAppUrl(product.name, product.slug)

  const categorySlug =
    product.category === 'quadro' ? 'quadros'
    : product.category === 'moldura' ? 'molduras'
    : 'espelhos'

  // Tabela de especificações — sem preço
  const specs: [string, string][] = [
    ['Dimensões', formatDimensions(product.dimensions)],
    ['Materiais', product.materials],
    ['Acabamento', product.finish.map(getFinishLabel).join(', ')],
    ['Categoria', getCategoryLabel(product.category)],
    ['Estilos', product.styles.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')],
    ...(product.available ? [['Disponibilidade', 'Disponível'] as [string, string]] : []),
    ...(product.deliveryDays ? [['Prazo estimado', product.deliveryDays] as [string, string]] : []),
  ]

  return (
    <>
      <div className="pt-[72px]">
        <div className="container-elite section">

          {/* Breadcrumb */}
          <nav aria-label="Caminho da página" className="mb-10">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1
                           text-xs text-charcoal-400 tracking-wide">
              <li><Link href="/" className="hover:text-gold transition-colors">Início</Link></li>
              <li aria-hidden="true" className="text-charcoal-300">/</li>
              <li><Link href="/catalogo" className="hover:text-gold transition-colors">Catálogo</Link></li>
              <li aria-hidden="true" className="text-charcoal-300">/</li>
              <li>
                <Link href={`/categoria/${categorySlug}`} className="hover:text-gold transition-colors">
                  {getCategoryLabel(product.category)}
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal-300">/</li>
              <li className="text-charcoal" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          {/* Layout: galeria + info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">

            {/* ── Galeria ──────────────────────────────────────────── */}
            <AnimatedSection direction="left">
              <ProductGallery
                images={product.images}
                productName={product.name}
                thumbnailColor={product.thumbnailColor}
              />
            </AnimatedSection>

            {/* ── Informações ──────────────────────────────────────── */}
            <AnimatedSection delay={0.1}>

              {/* Categoria + badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className="section-tag mb-0">{getCategoryLabel(product.category)}</span>
                {product.badge && (
                  <span className="bg-gold text-white font-sans
                                   text-[0.58rem] tracking-[0.1em] uppercase px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Nome */}
              <h1 className="font-serif text-display-sm font-light text-charcoal
                             leading-tight mb-4">
                {product.name}
              </h1>

              <div className="gold-divider" />

              {/* Descrição completa */}
              <p className="text-charcoal-600 leading-relaxed text-sm mb-8">
                {product.fullDescription}
              </p>

              {/* ── Especificações ───────────────────────────────── */}
              <div className="mb-8">
                <h2 className="text-[0.65rem] tracking-[0.22em] uppercase
                               text-charcoal-400 font-sans mb-4">
                  Especificações
                </h2>
                <table className="w-full" aria-label="Especificações do produto">
                  <tbody>
                    {specs.map(([label, value]) => (
                      <tr key={label} className="border-b border-charcoal-200/70">
                        <td className="py-2.5 text-[0.68rem] tracking-[0.08em] uppercase
                                       text-charcoal-400 font-sans w-28 pr-4 align-top">
                          {label}
                        </td>
                        <td className="py-2.5 text-sm text-charcoal leading-snug">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Chamadas para ação ───────────────────────────── */}
              <div className="space-y-3 mb-6">

                {/* WhatsApp — sempre presente */}
                <a
                  href={wppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  aria-label={`Consultar ${product.name} no WhatsApp`}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Consultar no WhatsApp
                </a>

                {/* Marketplace — só aparece se marketplaceUrl estiver preenchido */}
                {product.marketplaceUrl && (
                  <a
                    href={product.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full justify-center gap-2.5"
                    aria-label={`Ver ${product.name} no marketplace`}
                  >
                    <ShoppingBag size={15} aria-hidden="true" />
                    Ver no marketplace
                  </a>
                )}

                {/* Orçamento por e-mail */}
                <Link
                  href="/contato"
                  className="btn-outline w-full justify-center"
                >
                  Solicitar orçamento
                </Link>
              </div>

              {/* ── Info de entrega ──────────────────────────────── */}
              <div className="border border-charcoal-200 p-5 space-y-3.5">
                <div className="flex items-start gap-3">
                  <Truck size={15} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">
                      Entrega em todo o Brasil
                    </p>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      {product.deliveryDays
                        ? <>Prazo estimado: <strong className="text-charcoal">{product.deliveryDays}</strong> após confirmação.</>
                        : 'Prazo informado no momento do pedido.'
                      }{' '}
                      Embalagem especial artística.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={15} className="text-gold mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">
                      Qualidade garantida
                    </p>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      Todas as peças passam por controle rigoroso de qualidade antes do envio.
                    </p>
                  </div>
                </div>
              </div>

            </AnimatedSection>
          </div>
        </div>

        {/* Produtos relacionados */}
        {related.length > 0 && (
          <section className="section bg-cream-100" aria-label="Produtos relacionados">
            <div className="container-elite">
              <SectionHeader
                tag="Você também pode gostar"
                title="Produtos <em>Relacionados</em>"
              />
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
