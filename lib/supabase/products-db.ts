/**
 * lib/supabase/products-db.ts
 * Funções para ler e escrever produtos no Supabase.
 * Estas funções SUBSTITUEM as de lib/products.ts quando o Supabase estiver configurado.
 *
 * USO NO CATÁLOGO PÚBLICO:
 *   - Em Server Components, importe e use diretamente (sem 'use client')
 *   - Os dados são buscados em tempo de build (SSG) ou no servidor (SSR)
 */

import { createServerSupabaseClient } from './server'
import { createClient } from './client'
import type { ProductRow, ProductInsert, ProductUpdate } from './types'
import { v4 as uuidv4 } from 'uuid'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Gera slug a partir do nome: "Quadro Mar Azul" → "quadro-mar-azul" */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ─── LEITURA (Server Components / catálogo público) ───────────────────────────

/** Retorna todos os produtos disponíveis para o catálogo público */
export async function getAllProductsDB(): Promise<ProductRow[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .order('created_at', { ascending: false })

  if (error) { console.error('[DB] getAllProducts:', error.message); return [] }
  return data ?? []
}

/** Retorna um produto pelo slug (para páginas de produto) */
export async function getProductBySlugDB(slug: string): Promise<ProductRow | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('available', true)
    .single()

  if (error) { return null }
  return data
}

/** Retorna produtos em destaque para a home */
export async function getFeaturedProductsDB(): Promise<ProductRow[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) { console.error('[DB] getFeaturedProducts:', error.message); return [] }
  return data ?? []
}

/** Retorna produtos por categoria */
export async function getProductsByCategoryDB(category: string): Promise<ProductRow[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) { console.error('[DB] getProductsByCategory:', error.message); return [] }
  return data ?? []
}

/** Retorna slugs de todos os produtos disponíveis (para generateStaticParams) */
export async function getAllSlugDB(): Promise<string[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('available', true)

  if (error) { return [] }
  return (data ?? []).map((p) => p.slug)
}

/** Retorna produtos relacionados (mesma categoria, excluindo o atual) */
export async function getRelatedProductsDB(
  currentId: string,
  category: string,
  limit = 4
): Promise<ProductRow[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .eq('category', category)
    .neq('id', currentId)
    .limit(limit)

  if (error) { return [] }
  return data ?? []
}

// ─── LEITURA ADMIN (todos os produtos, incluindo indisponíveis) ───────────────

/** Retorna TODOS os produtos para o painel admin (autenticado) */
export async function getAllProductsAdmin(): Promise<ProductRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) { console.error('[Admin] getAllProducts:', error.message); return [] }
  return data ?? []
}

/** Retorna um produto pelo ID para o formulário de edição */
export async function getProductByIdAdmin(id: string): Promise<ProductRow | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) { return null }
  return data
}

// ─── ESCRITA (somente admin autenticado) ──────────────────────────────────────

/** Cria um novo produto */
export async function createProductDB(product: ProductInsert): Promise<ProductRow | null> {
  const supabase = createClient()
  const slug = generateSlug(product.name)

  const { data, error } = await supabase
    .from('products')
    .insert({ ...product, slug })
    .select()
    .single()

  if (error) { console.error('[Admin] createProduct:', error.message); return null }
  return data
}

/** Atualiza um produto existente */
export async function updateProductDB(id: string, updates: ProductUpdate): Promise<ProductRow | null> {
  const supabase = createClient()

  // Se o nome mudou, regenera o slug
  const payload = updates.name
    ? { ...updates, slug: generateSlug(updates.name) }
    : updates

  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) { console.error('[Admin] updateProduct:', error.message); return null }
  return data
}

/** Alterna disponibilidade de um produto */
export async function toggleAvailabilityDB(id: string, available: boolean): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .update({ available })
    .eq('id', id)

  return !error
}

/** Exclui um produto permanentemente (use com cuidado) */
export async function deleteProductDB(id: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  return !error
}

// ─── STORAGE (upload de imagens) ──────────────────────────────────────────────

/**
 * Faz upload de uma imagem para o Supabase Storage
 * Retorna a URL pública da imagem ou null em caso de erro
 */
export async function uploadProductImage(
  file: File,
  productSlug: string
): Promise<string | null> {
  const supabase = createClient()

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const fileName = `${productSlug}/${uuidv4()}.${ext}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) { console.error('[Storage] upload:', error.message); return null }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

/** Remove uma imagem do storage pelo caminho */
export async function deleteProductImage(url: string): Promise<boolean> {
  const supabase = createClient()

  // Extrai o caminho relativo da URL pública
  const path = url.split('/product-images/').pop()
  if (!path) return false

  const { error } = await supabase.storage
    .from('product-images')
    .remove([path])

  return !error
}
