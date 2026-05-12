# Maison Élite — Catálogo Online Premium

Site catálogo para marca de decoração de alto padrão com foco em quadros, molduras e espelhos.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion

---

## Índice

1. [Como rodar localmente](#como-rodar-localmente)
2. [Como adicionar novos produtos](#como-adicionar-novos-produtos)
3. [Como trocar imagens](#como-trocar-imagens)
4. [Deploy no Netlify](#deploy-no-netlify)
5. [Migração para Hostinger](#migração-para-hostinger)
6. [Migração para CMS](#migração-para-cms)
7. [Checklist de qualidade](#checklist-de-qualidade)

---

## Como rodar localmente

### Pré-requisitos
- Node.js 20+ ([download](https://nodejs.org))
- npm 10+ (já vem com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/maison-elite.git
cd maison-elite

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com seus dados (WhatsApp, URL do site, etc.)

# 4. Rode o servidor de desenvolvimento
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção |
| `npm start` | Roda o build de produção localmente |
| `npm run lint` | Verifica erros de código |
| `npm run format` | Formata o código com Prettier |

---

## Como adicionar novos produtos

Toda a gestão de produtos está no arquivo **`lib/products.ts`**. Não precisa mexer em nenhum outro arquivo.

### Passo a passo

1. Abra `lib/products.ts`
2. Localize o array `products = [...]`
3. Adicione um novo objeto seguindo o modelo abaixo:

```typescript
{
  id: 17,                              // Número único (sequencial)
  slug: 'meu-novo-produto',            // URL amigável, única, kebab-case
  name: 'Nome do Produto',             // Nome de exibição
  category: 'quadro',                  // 'quadro' | 'moldura' | 'espelho'
  styles: ['abstrato', 'minimalista'], // Ver lista de estilos abaixo
  price: 890,                          // Preço em reais (sem R$)
  priceInstallments: 12,               // Parcelas sem juros
  dimensions: {
    width: 80,                         // Largura em cm
    height: 100,                       // Altura em cm
    depth: 4,                          // Espessura em cm (opcional)
  },
  materials: 'Tela canvas, acrílico',  // Descrição dos materiais
  finish: ['verniz-fosco'],            // Ver lista de acabamentos abaixo
  description: 'Descrição curta...',   // Para cards (max ~120 chars)
  fullDescription: 'Descrição longa...', // Página do produto (2-3 parágrafos)
  images: ['/images/products/meu-novo-produto/01.jpg'], // Caminhos das fotos
  thumbnailColor: ['#B8440C', '#D4842A'], // Cor de fundo se não há foto
  badge: 'Novo',                       // Etiqueta especial (opcional)
  featured: false,                     // true = aparece na home
  available: true,                     // false = oculto do site
  deliveryDays: '7 a 12 dias úteis',   // Prazo de entrega
  createdAt: '2024-08-01',             // Data ISO (para ordenação)
}
```

### Estilos disponíveis (campo `styles`)
```
'abstrato' | 'botanico' | 'vintage' | 'minimalista' | 
'classico' | 'contemporaneo' | 'fotografico' | 'geometrico'
```

### Acabamentos disponíveis (campo `finish`)
```
'verniz-fosco' | 'verniz-brilhante' | 'folha-de-ouro' | 'lacado' | 
'natural' | 'envelhecido' | 'polido' | 'bisotado'
```

---

## Como trocar imagens

### Estrutura de pastas

```
public/
  images/
    products/
      quadro-abstrato-aurora/
        01.jpg    ← imagem principal
        02.jpg    ← imagem secundária
        03.jpg    ← imagem terciária
      espelho-arco-florentino/
        01.jpg
        02.jpg
    og-default.jpg   ← imagem para redes sociais (1200×630)
```

### Boas práticas para as imagens

| Tipo | Tamanho recomendado | Formato |
|------|---------------------|---------|
| Imagem principal do produto | 800×1067px (proporção 3:4) | JPG (80-85% qualidade) |
| Miniaturas | Mesma imagem — Next.js redimensiona | — |
| Open Graph (redes sociais) | 1200×630px | JPG |
| Banner de categoria | 1600×600px | JPG |

### Como vincular ao produto

No `lib/products.ts`, no campo `images` do produto:

```typescript
images: [
  '/images/products/nome-do-slug/01.jpg',
  '/images/products/nome-do-slug/02.jpg',
  '/images/products/nome-do-slug/03.jpg',
],
```

> **Dica:** Se não houver imagem, o site exibe automaticamente um gradiente colorido definido em `thumbnailColor`. Substitua assim que as fotos estiverem prontas.

---

## Deploy no Netlify

### Pré-requisito
- Conta no [Netlify](https://netlify.com) (plano gratuito funciona)
- Repositório no GitHub, GitLab ou Bitbucket

### Passo a passo completo

#### 1. Suba o projeto para o GitHub
```bash
git init
git add .
git commit -m "feat: projeto inicial Maison Élite"
git remote add origin https://github.com/SEU-USUARIO/maison-elite.git
git push -u origin main
```

#### 2. Conecte ao Netlify
1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione **GitHub** e autorize o acesso
4. Escolha o repositório `maison-elite`

#### 3. Configure o build
As configurações já estão no `netlify.toml`, mas confirme:

| Campo | Valor |
|-------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `20` |

#### 4. Configure as variáveis de ambiente
No painel do Netlify → **Site settings** → **Environment variables**:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5531999990000
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Gostaria de saber mais sobre os produtos.
NEXT_PUBLIC_SITE_URL=https://seu-site.netlify.app
NEXT_PUBLIC_SITE_NAME=Maison Élite
```

#### 5. Instale o plugin Next.js
No Netlify → **Plugins** → procure **"Essential Next.js"** e instale.

> O arquivo `netlify.toml` já declara `@netlify/plugin-nextjs` — ele será instalado automaticamente no deploy.

#### 6. Deploy
Clique em **"Deploy site"**. O build levará cerca de 2-3 minutos.

#### 7. Domínio personalizado (opcional)
- Netlify → **Domain settings** → **Add custom domain**
- Aponte o DNS para os nameservers do Netlify

---

## Migração para Hostinger

### Opção recomendada: exportação estática

Para Hostinger (hospedagem compartilhada), o mais simples é gerar um **site estático**.

#### 1. Ajuste o next.config.js

```js
// next.config.js
const nextConfig = {
  output: 'export',  // ← adicione esta linha
  images: {
    unoptimized: true, // ← necessário para export estático
  },
}
module.exports = nextConfig
```

#### 2. Gere o build estático
```bash
npm run build
```

A pasta `out/` será gerada com todos os arquivos estáticos.

#### 3. Faça upload para a Hostinger

**Via painel Hostinger:**
1. Acesse **hPanel** → **Gerenciador de arquivos**
2. Navegue até `public_html/`
3. Delete os arquivos antigos (se houver)
4. Faça upload de todo o conteúdo da pasta `out/`

**Via FTP (FileZilla):**
```
Host: ftp.seudominio.com.br
Usuário: (disponível no hPanel)
Senha: (disponível no hPanel)
Porta: 21
```
Copie o conteúdo de `out/` para `public_html/`

#### 4. Configure o domínio

**DNS — Registrador do domínio → aponte para a Hostinger:**
```
Tipo A:  @  →  IP da Hostinger (ex: 154.41.240.10)
Tipo A:  www → IP da Hostinger
```
O IP está disponível em hPanel → **Configurações de DNS**.

#### 5. SSL (HTTPS)
- hPanel → **SSL** → **Let's Encrypt** → ativar (gratuito)
- Propagação: até 24h

### Checklist de migração sem downtime

- [ ] Mantenha o site atual ativo durante a migração
- [ ] Faça upload na Hostinger ANTES de alterar o DNS
- [ ] Teste o site pela URL IP/temporária da Hostinger
- [ ] Só redirecione o DNS após confirmar que tudo funciona
- [ ] Ative o SSL na Hostinger antes de alterar DNS
- [ ] Aguarde propagação do DNS (até 48h) — use [dnschecker.org](https://dnschecker.org) para monitorar

---

## Migração para CMS

O projeto foi arquitetado para facilitar a migração para um CMS. Veja como fazer:

### Com Sanity (recomendado)

1. Crie uma conta em [sanity.io](https://sanity.io)
2. Crie um schema que replique a interface `Product` em `lib/products.ts`
3. Substitua as funções em `lib/products.ts` por chamadas à API do Sanity:

```typescript
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getAllProducts(): Promise<Product[]> {
  return client.fetch(`*[_type == "product" && available == true]`)
}
```

4. As páginas e componentes **não precisam ser alterados** — apenas as funções em `lib/products.ts`.

### Com Contentful ou Strapi
O mesmo padrão se aplica: substitua apenas as funções utilitárias em `lib/products.ts`.

---

## Checklist de qualidade

### Responsividade
- [ ] Mobile (320px–480px): navegação, cards, formulário
- [ ] Tablet (768px–1024px): grids, hero, galeria
- [ ] Desktop (1280px+): layout completo, hover states
- [ ] Menu mobile com drawer animado funcionando
- [ ] Imagens responsivas com `sizes` correto

### Performance
- [ ] Lighthouse score ≥ 90 (Performance, Accessibility, SEO)
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Imagens com `next/image` (lazy loading automático)
- [ ] Fontes com `font-display: swap` (sem FOIT)
- [ ] Build sem warnings do Next.js

### SEO
- [ ] Title e description únicos em cada página
- [ ] Open Graph configurado (título, descrição, imagem)
- [ ] Canonical URLs corretos
- [ ] Sitemap (adicionar `next-sitemap` se necessário)
- [ ] robots.txt

### Acessibilidade
- [ ] Contraste de texto ≥ 4.5:1 (WCAG AA)
- [ ] Alt text em todas as imagens de conteúdo
- [ ] Labels em todos os campos de formulário
- [ ] `aria-label` em botões sem texto visível
- [ ] Foco visível em todos os elementos interativos
- [ ] Navegação por teclado funcional
- [ ] Landmarks semânticos (header, main, footer, nav)
- [ ] `aria-live` no contador de resultados do catálogo
- [ ] Erro de formulário com `role="alert"`

### Funcional
- [ ] Filtros do catálogo funcionando (busca, categoria, estilo, ordenação)
- [ ] "Carregar mais" funcionando
- [ ] Galeria de produto com troca de imagem
- [ ] Botão WhatsApp abrindo no app correto
- [ ] Formulário de contato com validação
- [ ] Página 404 funcionando
- [ ] Links de breadcrumb corretos
- [ ] Produtos relacionados aparecendo

---

## Estrutura do projeto

```
maison-elite/
├── app/                          # Rotas (Next.js App Router)
│   ├── layout.tsx                # Layout raiz (Navbar, Footer, WhatsApp)
│   ├── page.tsx                  # Home
│   ├── not-found.tsx             # 404 elegante
│   ├── catalogo/page.tsx         # Catálogo com filtros
│   ├── categoria/[slug]/page.tsx # Quadros | Molduras | Espelhos
│   ├── produto/[slug]/page.tsx   # Detalhe do produto
│   ├── inspiracao/page.tsx       # Galeria editorial
│   ├── sobre/page.tsx            # Sobre a marca
│   └── contato/page.tsx          # Contato + formulário
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Navegação responsiva com drawer
│   │   └── Footer.tsx            # Rodapé completo
│   ├── sections/
│   │   ├── HeroSection.tsx       # Hero da home
│   │   ├── CategoriesSection.tsx # 3 categorias
│   │   ├── FeaturedProducts.tsx  # Destaques
│   │   ├── TestimonialsSection.tsx
│   │   ├── CtaBanner.tsx
│   │   └── ContactForm.tsx       # Formulário (client)
│   ├── catalog/
│   │   └── CatalogClient.tsx     # Filtros + grid (client)
│   ├── product/
│   │   └── ProductGallery.tsx    # Galeria com miniaturas
│   └── ui/
│       ├── ProductCard.tsx       # Card de produto
│       ├── SectionHeader.tsx     # Cabeçalho de seção
│       ├── AnimatedSection.tsx   # Wrapper com Framer Motion
│       └── WhatsAppFloat.tsx     # Botão flutuante
│
├── lib/
│   ├── products.ts               # ← ADICIONE PRODUTOS AQUI
│   ├── utils.ts                  # Utilitários (cn, WhatsApp URL)
│   └── metadata.ts               # Helpers de SEO
│
├── styles/
│   └── globals.css               # Tailwind + design system
│
├── public/
│   └── images/
│       └── products/             # ← COLOQUE AS FOTOS AQUI
│
├── tailwind.config.ts            # Design tokens (cores, fontes)
├── next.config.js                # Configuração do Next.js
├── netlify.toml                  # Configuração de deploy
└── .env.example                  # Variáveis de ambiente
```

---

*Desenvolvido com ❤️ — Maison Élite © 2024*
