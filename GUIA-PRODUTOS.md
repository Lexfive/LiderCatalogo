# 📦 Guia de Produtos — Líder Molduras

> **Para quem:** Ramires Mohamed e equipe  
> **Objetivo:** Adicionar e gerenciar produtos no catálogo sem precisar de programador

---

## ✅ Lista de itens mínimos para o site estar operacional

Para ter o site funcionando com conteúdo real, você precisa de pelo menos:

### 📸 Fotos dos produtos (PRIORIDADE 1)

Cada produto precisa de **1 foto principal** (mínimo). Recomendado: 3 fotos por produto.

| Tipo de foto | Dimensões ideais | Formato |
|---|---|---|
| Foto principal do produto | **800 × 1067 px** (proporção 3:4) | JPG, qualidade 85% |
| Fotos secundárias | Mesma proporção 3:4 | JPG |
| Foto de ambiente (produto em uso) | 1200 × 800 px | JPG |

**Onde salvar as fotos:**
```
public/
  images/
    products/
      nome-do-produto/     ← pasta com o slug do produto
        01.jpg             ← foto principal
        02.jpg             ← foto secundária
        03.jpg             ← foto de ambiente
```

---

### 📋 Lista mínima de produtos para começar

Você precisa de pelo menos **6 produtos** para o site ter boa aparência (2 de cada categoria):

#### QUADROS (mínimo 2)
- [ ] Quadro decorativo abstrato (ex: arte em tons neutros)
- [ ] Quadro decorativo figurativo ou botânico

#### MOLDURAS (mínimo 2)
- [ ] Moldura clássica (madeira, dourada ou preta)
- [ ] Moldura moderna/minimalista

#### ESPELHOS (mínimo 2)
- [ ] Espelho com moldura decorativa
- [ ] Espelho redondo ou oval

#### IDEAL para um catálogo completo: 12+ produtos
- 4 a 6 quadros
- 3 a 4 molduras
- 3 a 4 espelhos

---

## 🛠️ Como adicionar um produto — passo a passo

### Passo 1 — Salve as fotos na pasta certa

1. Crie uma pasta em `public/images/products/` com o **slug** do produto
2. O slug é o nome do produto em minúsculas, sem acentos, com hífens
3. Exemplos de slugs:
   - "Quadro Abstrato Azul" → `quadro-abstrato-azul`
   - "Moldura Dourada Clássica" → `moldura-dourada-classica`
   - "Espelho Arco Veneziano" → `espelho-arco-veneziano`

```
public/images/products/
  quadro-abstrato-azul/
    01.jpg    ← foto principal (OBRIGATÓRIO)
    02.jpg    ← opcional
    03.jpg    ← opcional
```

---

### Passo 2 — Abra o arquivo de produtos

Abra o arquivo: **`lib/products.ts`**

Role até o final do array `products = [...]` e adicione um novo produto.

---

### Passo 3 — Copie e cole este modelo

```typescript
{
  id: 17,  // ← NÚMERO ÚNICO. Olhe o último produto e some 1.
  slug: 'nome-do-produto',  // ← igual ao nome da pasta das fotos
  name: 'Nome do Produto',
  category: 'quadro',  // ← 'quadro', 'moldura' ou 'espelho'
  styles: ['minimalista'],  // ← veja lista abaixo
  // Sem preço — o site é uma vitrine institucional.
  // Para venda direta, use marketplaceUrl abaixo.
  dimensions: {
    width: 60,   // largura em cm
    height: 80,  // altura em cm
    depth: 3,    // espessura em cm (opcional)
  },
  materials: 'MDF, vidro antirreflexo',
  finish: ['verniz-fosco'],  // ← veja lista abaixo
  description: 'Descrição curta que aparece no card do catálogo (máx. 120 caracteres).',
  fullDescription: 'Descrição completa que aparece na página do produto. Pode ser mais longa, com 2 a 3 frases detalhando materiais, acabamento, indicação de ambiente, etc.',
  images: ['/images/products/nome-do-produto/01.jpg'],
  thumbnailColor: ['#4a3828', '#2d2520'],  // ← cor de fundo enquanto a foto não carrega
  badge: '',  // ← 'Novo', 'Destaque', 'Promoção' ou vazio ''
  featured: false,  // ← true = aparece na home
  available: true,
  deliveryDays: '7 a 15 dias úteis',
  marketplaceUrl: '',  // ← link do Mercado Livre, Shopee, etc. (deixe '' se não tiver)
  createdAt: '2025-05-13',  // ← data de hoje
},
```

---

### Opções de `category`
```
'quadro'    → Quadros Decorativos
'moldura'   → Molduras Artesanais
'espelho'   → Espelhos Exclusivos
```

### Opções de `styles` (pode usar mais de um)
```
'abstrato'        → Arte abstrata
'botanico'        → Plantas, flores, natureza
'vintage'         → Estilo retrô/antigo
'minimalista'     → Design simples, limpo
'classico'        → Estilo tradicional
'contemporaneo'   → Design atual
'fotografico'     → Fotografia artística
'geometrico'      → Formas geométricas
```

### Opções de `finish`
```
'verniz-fosco'      → Acabamento fosco (sem brilho)
'verniz-brilhante'  → Acabamento brilhante
'folha-de-ouro'     → Dourado com folha de ouro
'lacado'            → Pintura lacada
'natural'           → Madeira natural
'envelhecido'       → Efeito envelhecido/patinado
'polido'            → Superfície polida
'bisotado'          → Chanfro no espelho
```

### `thumbnailColor` — cor de fundo placeholder
Use dois tons de cor no formato hex. Este gradiente aparece enquanto a foto real não carrega.

Sugestões por tipo:
```
Madeira escura:  ['#2d2520', '#4a3830']
Madeira clara:   ['#c8a860', '#8c6a30']
Dourado:         ['#b8985a', '#8c7040']
Preto/chumbo:    ['#1a1814', '#2e2c29']
Verde:           ['#1e2820', '#2e4038']
Azul:            ['#1a2028', '#2e3a48']
Branco/off:      ['#f4f3ef', '#c8c4bb']
```

---

## 📝 Exemplo completo de produto real

```typescript
{
  id: 17,
  slug: 'moldura-madeira-natural-50x70',
  name: 'Moldura Madeira Natural 50×70',
  category: 'moldura',
  styles: ['natural', 'minimalista'],
  price: 280,
  priceInstallments: 10,
  dimensions: {
    width: 50,
    height: 70,
    depth: 3,
  },
  materials: 'Madeira de pinus tratada, vidro flotado antirreflexo 2mm',
  finish: ['natural', 'verniz-fosco'],
  description: 'Moldura em madeira natural tratada. Discreta, versátil e elegante para qualquer ambiente.',
  fullDescription: 'Fabricada artesanalmente em madeira de pinus certificada, com tratamento antifungo e acabamento em verniz fosco natural que realça as veias da madeira. Inclui vidro flotado antirreflexo de 2mm e fundo de compensado. Indicada para salas, quartos e escritórios com estilo natural ou escandinavo.',
  images: [
    '/images/products/moldura-madeira-natural-50x70/01.jpg',
    '/images/products/moldura-madeira-natural-50x70/02.jpg',
  ],
  thumbnailColor: ['#c8a860', '#8c6a30'],
  badge: 'Novo',
  featured: true,
  available: true,
  deliveryDays: '5 a 10 dias úteis',
  marketplaceUrl: 'https://www.mercadolivre.com.br/seu-produto',  // opcional
  createdAt: '2025-05-13',
},
```

---

## 🖼️ Como trocar imagens de produtos já cadastrados

1. Salve a nova foto na pasta `public/images/products/slug-do-produto/`
2. Renomeie como `01.jpg` (substitui a principal) ou `02.jpg`, `03.jpg`
3. O site atualiza automaticamente no próximo deploy

---

## 🔆 Como destacar um produto na página inicial

No produto em `lib/products.ts`, mude:
```typescript
featured: false  →  featured: true
```

Máximo recomendado: **4 a 6 produtos em destaque** na home.

---

## ❌ Como ocultar um produto sem apagar

```typescript
available: true  →  available: false
```

O produto some do catálogo mas fica salvo no arquivo para uso futuro.

---

## 🚀 Após editar — como publicar

1. Salve o arquivo `lib/products.ts`
2. Faça commit e push para o GitHub:
```bash
git add lib/products.ts public/images/
git commit -m "feat: adiciona produto X"
git push
```
3. O Netlify detecta automaticamente e publica em ~2 minutos.

---

## 📌 Checklist rápido antes de publicar

- [ ] `id` é único (não repetido)
- [ ] `slug` não tem espaços nem acentos
- [ ] A pasta `public/images/products/slug/` existe com pelo menos `01.jpg`
- [ ] `available: true` para aparecer no site

---

*Dúvidas? Contato do desenvolvedor: Ramires Mohamed*
