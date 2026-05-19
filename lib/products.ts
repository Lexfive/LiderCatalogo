/**
 * lib/products.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Fonte de dados dos produtos da Líder Molduras.
 *
 * COMO ADICIONAR UM NOVO PRODUTO:
 * 1. Copie o bloco de um produto existente e cole ao final do array `products`.
 * 2. Preencha todos os campos (id único, slug, name, category…).
 * 3. Fotos: coloque em /public/images/products/<slug>/ como 01.jpg, 02.jpg…
 * 4. O slug deve ser único, em kebab-case, sem acentos.
 * 5. Salve e faça push — o site atualiza em ~2 min no Netlify.
 *
 * CAMPOS REMOVIDOS INTENCIONALMENTE:
 * - price / priceInstallments: o site é uma vitrine institucional sem preços.
 *   Para vendas com valor, use marketplaceUrl para direcionar ao marketplace.
 *
 * MIGRAÇÃO PARA CMS (Sanity / Contentful / Strapi):
 * - A interface `Product` define o contrato de dados.
 * - Ao migrar, substitua as funções utilitárias abaixo por chamadas à API.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── TIPOS ───────────────────────────────────────────────────────────────────

export type ProductCategory = 'quadro' | 'moldura' | 'espelho'

export type ProductStyle =
  | 'abstrato'
  | 'botanico'
  | 'vintage'
  | 'minimalista'
  | 'classico'
  | 'contemporaneo'
  | 'fotografico'
  | 'geometrico'

export type ProductFinish =
  | 'verniz-fosco'
  | 'verniz-brilhante'
  | 'folha-de-ouro'
  | 'lacado'
  | 'natural'
  | 'envelhecido'
  | 'polido'
  | 'bisotado'

export interface ProductDimensions {
  width: number    // largura em cm
  height: number   // altura em cm
  depth?: number   // espessura em cm (opcional)
}

export interface Product {
  id: number
  slug: string                   // URL amigável, único, kebab-case
  name: string                   // Nome de exibição
  category: ProductCategory      // quadro | moldura | espelho
  styles: ProductStyle[]         // Tags de estilo (para filtros)
  dimensions: ProductDimensions  // Dimensões em cm
  materials: string              // Descrição dos materiais
  finish: ProductFinish[]        // Tipos de acabamento
  description: string            // Descrição curta — aparece nos cards
  fullDescription: string        // Descrição completa — página do produto
  images: string[]               // Caminhos em /public/ — ex: ['/images/products/slug/01.jpg']
  thumbnailColor: string[]       // [cor1, cor2] — gradiente placeholder enquanto foto não carrega
  badge?: string                 // Etiqueta opcional: 'Novo', 'Destaque', 'Exclusivo', etc.
  featured: boolean              // true = aparece na seção "Destaques" da home
  available: boolean             // false = oculto do site (produto pausado)
  deliveryDays?: string          // Prazo estimado — ex: '7 a 15 dias úteis' (opcional)
  marketplaceUrl?: string        // Link externo para marketplace (Mercado Livre, Shopee, etc.)
                                 // Se preenchido, exibe botão "Ver no marketplace"
                                 // Se vazio ou ausente, botão não aparece
  createdAt: string              // ISO date YYYY-MM-DD — usado para ordenação "mais recentes"
}

// ─── DADOS ───────────────────────────────────────────────────────────────────
// Substitua os thumbnailColor pelas fotos reais em /public/images/products/<slug>/

export const products: Product[] = [

  // ── QUADROS ──────────────────────────────────────────────────────────────

  {
    id: 1,
    slug: 'quadro-abstrato-aurora',
    name: 'Aurora Abstrata',
    category: 'quadro',
    styles: ['abstrato', 'contemporaneo'],
    dimensions: { width: 80, height: 100, depth: 4 },
    materials: 'Tela canvas 400g/m², pigmentos acrílicos premium, chassis de madeira maciça',
    finish: ['verniz-fosco'],
    description: 'Composição abstrata em tons quentes que evoca o nascer do sol. Impressão de alta resolução com acabamento vernizado.',
    fullDescription: 'A Aurora Abstrata captura a transição sutil entre a noite e o amanhecer em pinceladas amplas e generosas. Executada em tela canvas premium de 400g/m², com pigmentos acrílicos de alta durabilidade e chassis de madeira maciça tratada. O acabamento fosco elimina reflexos indesejados, realçando a profundidade das camadas de cor. Ideal para salas de estar, escritórios e quartos que buscam um ponto focal elegante.',
    images: ['/images/products/quadro-abstrato-aurora/01.jpg'],
    thumbnailColor: ['#B8440C', '#D4842A'],
    badge: 'Destaque',
    featured: true,
    available: true,
    deliveryDays: '7 a 12 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-06-01',
  },

  {
    id: 2,
    slug: 'quadro-botanico-serie-verde',
    name: 'Série Verde — Botânico I',
    category: 'quadro',
    styles: ['botanico', 'minimalista'],
    dimensions: { width: 60, height: 90, depth: 3 },
    materials: 'Papel algodão 300g, impressão fine art, passe-partout de linho',
    finish: ['verniz-fosco'],
    description: 'Da série botânica, celebra a flora brasileira em composição refinada. Ideal para ambientes clean e naturais.',
    fullDescription: 'A Série Botânica nasceu da admiração pela flora brasileira e seu incrível repertório de formas. Botânico I apresenta uma composição com samambaias e folhagens nativas em palheta verde profunda e cobre envelhecido. Impresso em papel algodão de 300g com tecnologia fine art giclée, garantindo reprodução fiel das cores por décadas. Acompanha passe-partout de linho natural que valoriza a apresentação final.',
    images: ['/images/products/quadro-botanico-serie-verde/01.jpg'],
    thumbnailColor: ['#2E4028', '#8CB840'],
    badge: 'Novo',
    featured: true,
    available: true,
    deliveryDays: '5 a 10 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-07-15',
  },

  {
    id: 3,
    slug: 'quadro-abstrato-ouro-negro',
    name: 'Ouro Negro',
    category: 'quadro',
    styles: ['abstrato', 'classico'],
    dimensions: { width: 100, height: 140, depth: 5 },
    materials: 'Tela canvas, folha de ouro 23k, acrílico importado',
    finish: ['folha-de-ouro', 'verniz-brilhante'],
    description: 'Intervenções em folha de ouro real sobre fundo preto profundo. Arte única e exclusiva com impacto visual extraordinário.',
    fullDescription: 'Ouro Negro é uma peça monumental que transforma qualquer parede em galeria. Sobre um fundo negro absoluto, intervenções em folha de ouro 23 quilates genuína criam tensão entre a ausência total de luz e o máximo de reflexo. Executada em tela canvas de alto desempenho com acrílico importado. Cada peça é única — a aplicação manual da folha de ouro garante que nenhum exemplar seja idêntico ao outro. Inclui certificado de autenticidade.',
    images: ['/images/products/quadro-abstrato-ouro-negro/01.jpg'],
    thumbnailColor: ['#0A0A0A', '#B8985A'],
    badge: 'Exclusivo',
    featured: false,
    available: true,
    deliveryDays: '10 a 15 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-05-20',
  },

  {
    id: 4,
    slug: 'quadro-botanico-cobre',
    name: 'Série Cobre — Botânico II',
    category: 'quadro',
    styles: ['botanico', 'vintage'],
    dimensions: { width: 50, height: 70, depth: 3 },
    materials: 'Papel algodão 300g, tinta metálica cobre, passe-partout kraft',
    finish: ['verniz-fosco'],
    description: 'Continuação da série botânica com acabamento em tinta metálica cobre. Beleza natural com sofisticação.',
    fullDescription: 'Botânico II dá continuidade à celebração da flora com uma paleta quente centrada nos tons de cobre envelhecido e terracota profundo. Os elementos vegetais são tratados com tinta metálica cobre real, criando brilho sutil que muda com a luz ambiente. Compõe harmoniosamente com Botânico I ou brilha sozinho em paredes de texturas neutras. Passe-partout em papel kraft premium completa a composição.',
    images: ['/images/products/quadro-botanico-cobre/01.jpg'],
    thumbnailColor: ['#B87040', '#5C3820'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '5 a 10 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-07-20',
  },

  {
    id: 5,
    slug: 'quadro-ceu-de-inverno',
    name: 'Céu de Inverno',
    category: 'quadro',
    styles: ['abstrato', 'minimalista'],
    dimensions: { width: 80, height: 80, depth: 4 },
    materials: 'Tela canvas, tinta a óleo importada, chassis flutuante',
    finish: ['verniz-fosco'],
    description: 'Pintura em óleo com técnica de espátula que recria a textura dos céus de inverno. Peça única e original.',
    fullDescription: 'Céu de Inverno é uma meditação visual sobre o silêncio e a vastidão. Usando a técnica de espátula com óleo importado, as camadas criam textura tridimensional que convida ao toque. A paleta de azuis frios e cinzas de platina evoca a quietude de manhãs de inverno. Formato quadrado em chassis flutuante com lateral pintada, dispensando moldura — a obra respira sozinha na parede.',
    images: ['/images/products/quadro-ceu-de-inverno/01.jpg'],
    thumbnailColor: ['#4878A8', '#C8D8E8'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '7 a 12 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-04-10',
  },

  {
    id: 6,
    slug: 'quadro-fotografico-brasilia',
    name: 'Brasília Modernista',
    category: 'quadro',
    styles: ['fotografico', 'contemporaneo', 'minimalista'],
    dimensions: { width: 70, height: 100, depth: 3 },
    materials: 'Impressão fotográfica metalizada, vidro flotado antirreflexo, moldura alumínio slim',
    finish: ['polido'],
    description: 'Fotografia artística da arquitetura modernista de Brasília. Homenagem ao design brasileiro em alta definição.',
    fullDescription: 'Uma homenagem à genialidade de Niemeyer e ao modernismo brasileiro. Esta fotografia captura a geometria sublime da capital federal em luz de fim de tarde, impressa em substrato metalizado que adiciona profundidade e contraste únicos. O vidro flotado antirreflexo garante visibilidade perfeita em qualquer iluminação. A moldura slim de alumínio polido enquadra com precisão sem competir com a imagem.',
    images: ['/images/products/quadro-fotografico-brasilia/01.jpg'],
    thumbnailColor: ['#2E3848', '#788898'],
    badge: 'Nacional',
    featured: false,
    available: true,
    deliveryDays: '7 a 12 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-03-05',
  },

  // ── MOLDURAS ─────────────────────────────────────────────────────────────

  {
    id: 7,
    slug: 'moldura-champagne-oval',
    name: 'Champagne Oval',
    category: 'moldura',
    styles: ['classico', 'vintage'],
    dimensions: { width: 50, height: 70 },
    materials: 'MDF de alta densidade com banho em folha de cobre champagne, vidro antirreflexo',
    finish: ['folha-de-ouro', 'polido'],
    description: 'Moldura oval com acabamento dourado champagne. Elegância atemporal para fotografias e obras de arte.',
    fullDescription: 'A Champagne Oval resgata a tradição das molduras ovais europeias com um olhar contemporâneo. O MDF de alta densidade é esculpido em perfil clássico e banhado em folha de cobre champagne aplicada à mão, camada por camada. O vidro antirreflexo incluso protege a obra sem interferir na apreciação. Disponível sob medida — consulte via WhatsApp para dimensões personalizadas.',
    images: ['/images/products/moldura-champagne-oval/01.jpg'],
    thumbnailColor: ['#D4B87A', '#8C7040'],
    badge: '',
    featured: true,
    available: true,
    deliveryDays: '10 a 18 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-06-10',
  },

  {
    id: 8,
    slug: 'moldura-ebano-slim',
    name: 'Ébano Slim',
    category: 'moldura',
    styles: ['minimalista', 'contemporaneo'],
    dimensions: { width: 40, height: 60 },
    materials: 'Madeira maciça ebonizada, vidro flotado antirreflexo',
    finish: ['natural', 'verniz-fosco'],
    description: 'Linha minimalista em madeira escura. Perfeita para fotografias e obras modernas sem concorrer com o conteúdo.',
    fullDescription: 'Ébano Slim é o essencial levado à perfeição. O perfil de apenas 8mm em madeira maciça ebonizada desaparece elegantemente ao redor da obra, dando protagonismo total ao conteúdo emoldurado. O processo de ebonização é natural — sem tinta, apenas tratamento químico que realça as fibras da madeira. Vidro flotado antirreflexo de 2mm incluso. Disponível nos tamanhos padrão e sob medida.',
    images: ['/images/products/moldura-ebano-slim/01.jpg'],
    thumbnailColor: ['#1A1814', '#5C5852'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '8 a 14 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-05-12',
  },

  {
    id: 9,
    slug: 'moldura-provencal-branca',
    name: 'Provençal Branca',
    category: 'moldura',
    styles: ['vintage', 'classico'],
    dimensions: { width: 60, height: 80 },
    materials: 'MDF esculpido à mão, pintura branco giz, cera natural de abelha',
    finish: ['envelhecido'],
    description: 'Moldura estilo provençal com detalhes esculpidos à mão e pintura giz envelhecida. Charme e delicadeza únicos.',
    fullDescription: 'Inspirada nas casas de campo do sul da França, a Provençal Branca carrega toda a delicadeza do estilo shabby chic refinado. Os detalhes florais são esculpidos à mão em MDF de alta densidade, e a pintura giz é aplicada em camadas — depois parcialmente lixada nas extremidades, criando o efeito de envelhecimento natural. Finalizada com cera de abelha que protege e adiciona leve brilho acetinado.',
    images: ['/images/products/moldura-provencal-branca/01.jpg'],
    thumbnailColor: ['#FAFAF7', '#C8C4BB'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '12 a 20 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-04-22',
  },

  {
    id: 10,
    slug: 'moldura-bronze-classica',
    name: 'Bronze Clássica',
    category: 'moldura',
    styles: ['classico', 'vintage'],
    dimensions: { width: 50, height: 60 },
    materials: 'Resina de alta densidade com banho em bronze, pátina artesanal',
    finish: ['envelhecido', 'polido'],
    description: 'Moldura com acabamento em bronze envelhecido, detalhes em relevo e pátina artesanal. Elegância intemporal.',
    fullDescription: 'A Bronze Clássica é uma declaração de amor ao artesanato tradicional. Fundida em resina de alta densidade e banhada em bronze real, cada peça passa pelo processo artesanal de pátina — uma oxidação controlada que cria veios e tonalidades únicas. Os detalhes em relevo incluem folhas de acanto e pérolas que circulam o perfil externo. Uma peça que vale tanto pela moldura quanto pelo que emoldura.',
    images: ['/images/products/moldura-bronze-classica/01.jpg'],
    thumbnailColor: ['#7A5030', '#3A2818'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '12 a 18 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-03-18',
  },

  {
    id: 11,
    slug: 'moldura-rattan-natural',
    name: 'Rattan Natural',
    category: 'moldura',
    styles: ['botanico', 'minimalista', 'contemporaneo'],
    dimensions: { width: 40, height: 50 },
    materials: 'Rattan natural trançado à mão, suporte em madeira, vidro antirreflexo',
    finish: ['natural'],
    description: 'Moldura eco-friendly em rattan natural trançado à mão. Traz leveza e naturalidade para ambientes modernos.',
    fullDescription: 'Rattan Natural celebra os materiais sustentáveis sem abrir mão do design sofisticado. O rattan é colhido de forma responsável e trançado à mão por artesãs do interior de Minas Gerais — cada peça é ligeiramente única. A base estrutural em madeira de reflorestamento garante rigidez sem peso. Perfeita para quartos, lavabos e espaços que respiram naturalidade.',
    images: ['/images/products/moldura-rattan-natural/01.jpg'],
    thumbnailColor: ['#C8A860', '#8C6A30'],
    badge: 'Eco',
    featured: false,
    available: true,
    deliveryDays: '8 a 14 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-07-01',
  },

  // ── ESPELHOS ─────────────────────────────────────────────────────────────

  {
    id: 12,
    slug: 'espelho-arco-florentino',
    name: 'Arco Florentino',
    category: 'espelho',
    styles: ['classico', 'vintage'],
    dimensions: { width: 70, height: 140, depth: 6 },
    materials: 'Espelho bisotado 6mm, moldura em resina com folha de ouro 22k, suporte de parede incluso',
    finish: ['folha-de-ouro', 'bisotado'],
    description: 'Espelho de arco com moldura elaborada em detalhes florais. Peça de destaque para salas e quartos sofisticados.',
    fullDescription: 'O Arco Florentino é uma relíquia contemporânea. Inspirado nos espelhos venezianos do século XVIII, apresenta moldura em resina de alta fidelidade com folha de ouro 22 quilates aplicada artesanalmente. O espelho bisotado — o chanfro perimetral de 45° — cria um efeito de luz que enriquece qualquer ambiente. Acompanha suporte de parede oculto, hardware de fixação e instruções detalhadas.',
    images: ['/images/products/espelho-arco-florentino/01.jpg'],
    thumbnailColor: ['#2E2018', '#B8985A'],
    badge: 'Best Seller',
    featured: true,
    available: true,
    deliveryDays: '10 a 18 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-06-05',
  },

  {
    id: 13,
    slug: 'espelho-lua-cheia',
    name: 'Lua Cheia',
    category: 'espelho',
    styles: ['contemporaneo', 'minimalista'],
    dimensions: { width: 80, height: 80, depth: 4 },
    materials: 'Espelho temperado 5mm, moldura em madeira carvalho maciço, cabide oculto',
    finish: ['natural', 'verniz-fosco'],
    description: 'Espelho circular com moldura em madeira carvalho texturizada. Design contemporâneo e intemporal.',
    fullDescription: 'Lua Cheia é o equilíbrio perfeito entre forma e função. O círculo perfeito em madeira de carvalho maciço traz calor orgânico a ambientes modernos. A madeira passa por tratamento de secagem controlada que garante estabilidade estrutural e realça as veias naturais. O espelho temperado de 5mm é seguro e possui pureza óptica superior. Versátil — funciona em corredor, quarto, sala ou banheiro.',
    images: ['/images/products/espelho-lua-cheia/01.jpg'],
    thumbnailColor: ['#3A2E22', '#C8B898'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '8 a 14 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-05-30',
  },

  {
    id: 14,
    slug: 'espelho-vintage-bistro',
    name: 'Bistro Vintage',
    category: 'espelho',
    styles: ['vintage', 'contemporaneo'],
    dimensions: { width: 60, height: 90, depth: 5 },
    materials: 'Espelho bisotado antigo, moldura em ferro forjado ennegrecido, suporte parede',
    finish: ['envelhecido', 'bisotado'],
    description: 'Estilo industrial sofisticado com detalhes em ferro forjado ennegrecido. Charme vintage para ambientes contemporâneos.',
    fullDescription: 'O Bistro Vintage conjura a atmosfera dos cafés parisienses do início do século XX com vocabulário absolutamente atual. A moldura em ferro forjado artesanalmente combina barra chata e fio quadrado em composição geométrica que enquadra um espelho bisotado de efeito levemente antiquado. A pátina escura do ferro foi aplicada com calor — não com tinta — garantindo durabilidade sem manutenção.',
    images: ['/images/products/espelho-vintage-bistro/01.jpg'],
    thumbnailColor: ['#2E2C29', '#8C7040'],
    badge: '',
    featured: false,
    available: true,
    deliveryDays: '10 a 16 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-04-15',
  },

  {
    id: 15,
    slug: 'espelho-art-deco-geometrico',
    name: 'Art Déco Geométrico',
    category: 'espelho',
    styles: ['geometrico', 'classico', 'contemporaneo'],
    dimensions: { width: 90, height: 120, depth: 7 },
    materials: 'Espelho bisotado 6mm, moldura em latão polido, estrutura interna em aço inox',
    finish: ['polido', 'bisotado'],
    description: 'Design inspirado no Art Déco com formas geométricas em latão polido. Uma obra de arte funcional.',
    fullDescription: 'O Art Déco Geométrico é um manifesto estético. Cada linha da moldura de latão polido foi pensada para evocar a geometria pura do movimento Art Déco — ângulos, raios e proporções que dialogam com a arquitetura de interiores de alto padrão. A estrutura interna em aço inox garante que o latão não deforme com variações de temperatura. O espelho bisotado de 6mm completa a peça com chanfro preciso.',
    images: ['/images/products/espelho-art-deco-geometrico/01.jpg'],
    thumbnailColor: ['#1A1814', '#D4B87A'],
    badge: 'Premium',
    featured: false,
    available: true,
    deliveryDays: '14 a 22 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-05-05',
  },

  {
    id: 16,
    slug: 'espelho-grand-miroir',
    name: 'Grand Miroir',
    category: 'espelho',
    styles: ['classico', 'contemporaneo'],
    dimensions: { width: 60, height: 180, depth: 8 },
    materials: 'Espelho temperado 6mm, moldura em madeira maciça laqueada dourada, suporte com regulagem',
    finish: ['lacado', 'folha-de-ouro'],
    description: 'Espelho de corpo inteiro com moldura laqueada em dourado. Peça de destaque para closets, halls e suítes premium.',
    fullDescription: 'Grand Miroir é um espelho que redefine o espaço onde é instalado. Com 180cm de altura, oferece visão de corpo inteiro com reflexo de excepcional clareza óptica. A moldura em madeira maciça recebe aplicação de laca em camadas — cada uma lixada e polida — antes do acabamento dourado final. O resultado é uma superfície que rivaliza com espelhos de manufatura europeia do século XIX. Suporte de parede com regulagem de inclinação incluso.',
    images: ['/images/products/espelho-grand-miroir/01.jpg'],
    thumbnailColor: ['#2E2820', '#D4B87A'],
    badge: 'Top Seller',
    featured: false,
    available: true,
    deliveryDays: '14 a 21 dias úteis',
    marketplaceUrl: '',
    createdAt: '2024-02-14',
  },
]

// ─── FUNÇÕES UTILITÁRIAS ─────────────────────────────────────────────────────

/** Retorna todos os produtos disponíveis */
export function getAllProducts(): Product[] {
  return products.filter((p) => p.available)
}

/** Retorna um produto pelo slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.available)
}

/** Retorna produtos por categoria */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category && p.available)
}

/** Retorna produtos em destaque (featured) */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.available)
}

/** Retorna produtos relacionados (mesma categoria, excluindo o atual) */
export function getRelatedProducts(currentId: number, category: ProductCategory, limit = 4): Product[] {
  return products
    .filter((p) => p.category === category && p.id !== currentId && p.available)
    .slice(0, limit)
}

/** Retorna todos os slugs disponíveis (para generateStaticParams) */
export function getAllSlugs(): string[] {
  return products.filter((p) => p.available).map((p) => p.slug)
}

/** Retorna o label da categoria em português */
export function getCategoryLabel(category: ProductCategory): string {
  const labels: Record<ProductCategory, string> = {
    quadro: 'Quadro Decorativo',
    moldura: 'Moldura Artesanal',
    espelho: 'Espelho',
  }
  return labels[category]
}

/** Retorna as dimensões formatadas como string legível */
export function formatDimensions(dim: ProductDimensions): string {
  const parts = [`${dim.width} × ${dim.height} cm`]
  if (dim.depth) parts.push(`profundidade ${dim.depth} cm`)
  return parts.join(' · ')
}

/** Retorna o label de acabamento em português */
export function getFinishLabel(finish: ProductFinish): string {
  const labels: Record<ProductFinish, string> = {
    'verniz-fosco': 'Verniz Fosco',
    'verniz-brilhante': 'Verniz Brilhante',
    'folha-de-ouro': 'Folha de Ouro',
    'lacado': 'Lacado',
    'natural': 'Natural',
    'envelhecido': 'Envelhecido / Patinado',
    'polido': 'Polido',
    'bisotado': 'Bisotado',
  }
  return labels[finish]
}
