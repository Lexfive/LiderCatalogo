-- ═══════════════════════════════════════════════════════════════════════════════
-- LÍDER MOLDURAS — Schema do Banco de Dados Supabase
-- ═══════════════════════════════════════════════════════════════════════════════
-- Como usar:
--   1. Acesse seu projeto em supabase.com
--   2. Vá em SQL Editor > New Query
--   3. Cole este arquivo inteiro e clique em Run
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── Extensão para geração de UUID ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Tabela de produtos ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id                 UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at         TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at         TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Identificação
  name               TEXT NOT NULL,
  sku                TEXT,
  marketplace_title  TEXT,
  slug               TEXT NOT NULL UNIQUE,

  -- Classificação
  category           TEXT NOT NULL CHECK (category IN ('quadro', 'moldura', 'espelho')),
  styles             TEXT[] DEFAULT '{}',
  badge              TEXT DEFAULT '',

  -- Dimensões (em cm)
  width_cm           NUMERIC(8,1) NOT NULL DEFAULT 0,
  height_cm          NUMERIC(8,1) NOT NULL DEFAULT 0,
  depth_cm           NUMERIC(8,1),

  -- Características
  colors             TEXT[] DEFAULT '{}',
  materials          TEXT,
  finish             TEXT[] DEFAULT '{}',
  environments       TEXT[] DEFAULT '{}',

  -- Conteúdo
  description        TEXT,
  full_description   TEXT,
  images             TEXT[] DEFAULT '{}',

  -- Status
  featured           BOOLEAN DEFAULT FALSE NOT NULL,
  available          BOOLEAN DEFAULT TRUE NOT NULL,
  delivery_days      TEXT,
  marketplace_url    TEXT DEFAULT ''
);

-- ─── Índices para buscas rápidas ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_slug       ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category   ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_available  ON public.products(available);
CREATE INDEX IF NOT EXISTS idx_products_featured   ON public.products(featured);

-- ─── Trigger: atualiza updated_at automaticamente ────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security (RLS) ─────────────────────────────────────────────────
-- Leitura pública (catálogo visível a todos)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública de produtos disponíveis"
  ON public.products FOR SELECT
  USING (available = TRUE);

-- Escrita restrita a usuários autenticados (admin)
CREATE POLICY "Admin pode inserir produtos"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Admin pode atualizar produtos"
  ON public.products FOR UPDATE
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admin pode excluir produtos"
  ON public.products FOR DELETE
  TO authenticated
  USING (TRUE);

-- Admin também pode ler produtos indisponíveis (ocultos)
CREATE POLICY "Admin lê todos os produtos"
  ON public.products FOR SELECT
  TO authenticated
  USING (TRUE);

-- ─── Storage: bucket de imagens dos produtos ─────────────────────────────────
-- Execute no SQL Editor:
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política: leitura pública das imagens
CREATE POLICY "Imagens públicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Política: upload restrito a usuários autenticados
CREATE POLICY "Admin faz upload de imagens"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

-- Política: exclusão restrita a usuários autenticados
CREATE POLICY "Admin exclui imagens"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

-- ─── Dados de exemplo (opcional) ─────────────────────────────────────────────
-- Descomente para inserir um produto de teste:
/*
INSERT INTO public.products (
  name, sku, slug, category, styles,
  width_cm, height_cm, depth_cm,
  materials, finish, environments,
  description, full_description,
  images, badge, featured, available, delivery_days
) VALUES (
  'Quadro Ilha Mar Cristalino',
  'QD-ILHA-MAR-80X120',
  'quadro-ilha-mar-cristalino',
  'quadro',
  ARRAY['contemporaneo', 'fotografico'],
  80, 120, 4,
  'Impressão fine art em papel algodão 300g, moldura em MDF laqueado',
  ARRAY['verniz-fosco'],
  ARRAY['sala', 'quarto', 'escritorio', 'hall'],
  'Quadro decorativo com moldura, ideal para sala, quarto, escritório e hall.',
  'Quadro decorativo 80×120 cm com moldura, inspirado em paisagens de ilha e mar cristalino.',
  ARRAY[]::TEXT[],
  'Novo',
  TRUE,
  TRUE,
  '7 a 15 dias úteis'
);
*/
