import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Truck, Shield, MessageCircle, ShoppingBag } from 'lucide-react'
import { getProductBySlugDB, getRelatedProductsDB } from '@/lib/supabase/products-db'
import { buildMetadata } from '@/lib/metadata'
import { getProductWhatsAppUrl } from '@/lib/utils'
import { getCategoryLabel } from '@/lib/products'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const dynamic = 'force-dynamic'

// Não precisamos mais de generateStaticParams pois as rotas são dinâmicas (SSR)
export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProductBySlugDB(params.slug)
  if (!product) return {}
  return buildMetadata({
    title: product.name,
    description: product.description ?? '',
    path: `/produto/${product.slug}`,
    image: product.images?.[0],
  })
}

const FINISH_LABELS: Record<string, string> = {
  'verniz-fosco': 'Verniz Fosco',
  'verniz-brilhante': 'Verniz Brilhante',
  'folha-de-ouro': 'Folha de Ouro',
  'lacado': 'Lacado',
  'natural': 'Natural',
  'envelhecido': 'Envelhecido / Patinado',
  'polido': 'Polido',
  'bisotado': 'Bisotado',
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlugDB(params.slug)
  if (!product) notFound()

  const related = await getRelatedProductsDB(product.id, product.category, 4)
  const wppUrl = getProductWhatsAppUrl(product.name, product.slug)

  const categorySlug =
    product.category === 'quadro' ? 'quadros'
    : product.category === 'moldura' ? 'molduras'
    : 'espelhos'

  const catLabel = getCategoryLabel(product.category as 'quadro' | 'moldura' | 'espelho')

  const dimStr = `${product.width_cm} × ${product.height_cm} cm${product.depth_cm ? ` · profundidade ${product.depth_cm} cm` : ''}`

  const specs: [string, string][] = [
    ['Dimensões', dimStr],
    ...(product.materials ? [['Materiais', product.materials] as [string, string]] : []),
    ...(product.finish?.length ? [['Acabamento', product.finish.map((f) => FINISH_LABELS[f] ?? f).join(', ')] as [string, string]] : []),
    ...(product.colors?.length ? [['Cores', product.colors.join(', ')] as [string, string]] : []),
    ...(product.environments?.length ? [['Ambientes', product.environments.join(', ')] as [string, string]] : []),
    ['Categoria', catLabel],
    ...(product.styles?.length ? [['Estilos', product.styles.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')] as [string, string]] : []),
    ['Disponibilidade', product.available ? 'Disponível' : 'Indisponível'],
    ...(product.delivery_days ? [['Prazo estimado', product.delivery_days] as [string, string]] : []),
  ]

  return (
    <>
      <div className="pt-[72px]">
        <div className="container-elite section">
          {/* Breadcrumb */}
          <nav aria-label="Caminho da página" className="mb-10">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-charcoal-400 tracking-wide">
              <li><Link href="/" className="hover:text-gold transition-colors">Início</Link></li>
              <li aria-hidden="true" className="text-charcoal-300">/</li>
              <li><Link href="/catalogo" className="hover:text-gold transition-colors">Catálogo</Link></li>
              <li aria-hidden="true" className="text-charcoal-300">/</li>
              <li>
                <Link href={`/categoria/${categorySlug}`} className="hover:text-gold transition-colors">
                  {catLabel}
                </Link>
              </li>
              <li aria-hidden="true" className="text-charcoal-300">/</li>
              <li className="text-charcoal" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          {/* Layout principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-20">

            {/* Galeria */}
            <AnimatedSection direction="left">
              {product.images?.length > 0 ? (
                <div className="flex gap-4">
                  {/* Miniaturas */}
                  {product.images.length > 1 && (
                    <div className="flex flex-col gap-3 w-[72px] shrink-0">
                      {product.images.map((src, i) => (
                        <div key={i} className={`relative w-[72px] h-[72px] overflow-hidden border ${i === 0 ? 'border-gold' : 'border-charcoal-200'}`}>
                          <Image src={src} alt={`${product.name} foto ${i + 1}`}
                            fill className="object-cover" sizes="72px" />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Imagem principal */}
                  <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-cream-100">
                    <Image src={product.images[0]} alt={product.name}
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] bg-cream-100 border border-charcoal-200
                               flex items-center justify-center">
                  <p className="text-xs text-charcoal-300 tracking-wide uppercase">Fotos em breve</p>
                </div>
              )}
            </AnimatedSection>

            {/* Informações */}
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-3">
                <span className="section-tag mb-0">{catLabel}</span>
                {product.badge && (
                  <span className="bg-gold text-white font-sans text-[0.58rem] tracking-[0.1em] uppercase px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-display-sm font-light text-charcoal leading-tight mb-2">
                {product.name}
              </h1>

              {product.sku && (
                <p className="text-xs text-charcoal-300 font-mono mb-4">SKU: {product.sku}</p>
              )}

              <div className="gold-divider" />

              <p className="text-charcoal-600 leading-relaxed text-sm mb-8">
                {product.full_description || product.description}
              </p>

              {/* Especificações */}
              <div className="mb-8">
                <h2 className="text-[0.65rem] tracking-[0.22em] uppercase text-charcoal-400 font-sans mb-4">
                  Especificações
                </h2>
                <table className="w-full" aria-label="Especificações">
                  <tbody>
                    {specs.map(([label, value]) => (
                      <tr key={label} className="border-b border-charcoal-200/70">
                        <td className="py-2.5 text-[0.68rem] tracking-[0.08em] uppercase text-charcoal-400 font-sans w-28 pr-4 align-top">
                          {label}
                        </td>
                        <td className="py-2.5 text-sm text-charcoal leading-snug">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-6">
                <a href={wppUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp" aria-label={`Consultar ${product.name} no WhatsApp`}>
                  <MessageCircle size={17} aria-hidden="true" />
                  Consultar no WhatsApp
                </a>

                {product.marketplace_url && (
                  <a href={product.marketplace_url} target="_blank" rel="noopener noreferrer"
                    className="btn-outline w-full justify-center gap-2.5">
                    <ShoppingBag size={15} aria-hidden="true" />
                    Ver no marketplace
                  </a>
                )}

                <Link href="/contato" className="btn-outline w-full justify-center">
                  Solicitar orçamento
                </Link>
              </div>

              {/* Entrega */}
              <div className="border border-charcoal-200 p-5 space-y-3.5">
                <div className="flex items-start gap-3">
                  <Truck size={15} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">Entrega em todo o Brasil</p>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      {product.delivery_days
                        ? <>Prazo: <strong className="text-charcoal">{product.delivery_days}</strong> após confirmação.</>
                        : 'Prazo informado no momento do pedido.'}
                      {' '}Embalagem artística especial.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={15} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">Qualidade garantida</p>
                    <p className="text-xs text-charcoal-400">
                      Todas as peças passam por controle de qualidade antes do envio.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="section bg-cream-100">
            <div className="container-elite">
              <SectionHeader tag="Você também pode gostar" title="Produtos <em>Relacionados</em>" />
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {related.map((p) => (
                  <Link key={p.id} href={`/produto/${p.slug}`}
                    className="block bg-white group shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-[3/4] relative bg-cream-100 overflow-hidden">
                      {p.images?.[0] ? (
                        <Image src={p.images[0]} alt={p.name} fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="25vw" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-cream-100">
                          <span className="text-charcoal-300 text-xs">Sem foto</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[0.6rem] tracking-[0.18em] uppercase text-gold font-sans mb-1">
                        {getCategoryLabel(p.category as 'quadro' | 'moldura' | 'espelho')}
                      </p>
                      <p className="font-serif text-sm font-normal text-charcoal line-clamp-2">
                        {p.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
