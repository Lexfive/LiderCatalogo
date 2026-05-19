/**
 * lib/supabase/products-client.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Funções Supabase seguras para uso em Client Components ('use client').
 * NÃO importa next/headers nem createServerSupabaseClient.
 * Usa apenas createClient() (browser-side).
 *
 * Separado de products-db.ts para evitar que Client Components puxem
 * a cadeia server.ts → next/headers, que gera erro de build.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from './client'
import type { ProductRow, ProductInsert, ProductUpdate } from './types'
import { v4 as uuidv4 } from 'uuid'

// ─── Helpers puros (sem dependência de Supabase) ──────────────────────────────

/** Gera slug a partir do nome: "Quadro Mar Azul" → "quadro-mar-azul" */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ─── LEITURA ADMIN (browser, usuário autenticado) ─────────────────────────────

/** Retorna TODOS os produtos para o painel admin (incluindo indisponíveis) */
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

// ─── ESCRITA (browser, somente admin autenticado) ─────────────────────────────

/** Cria um novo produto */
export async function createProductClient(product: ProductInsert): Promise<ProductRow | null> {
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
export async function updateProductClient(id: string, updates: ProductUpdate): Promise<ProductRow | null> {
  const supabase = createClient()

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
export async function toggleAvailabilityClient(id: string, available: boolean): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .update({ available })
    .eq('id', id)

  return !error
}

/** Exclui um produto permanentemente */
export async function deleteProductClient(id: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  return !error
}

// ─── STORAGE (upload de imagens, browser-side) ────────────────────────────────

/**
 * Faz upload de uma imagem para o Supabase Storage.
 * Retorna a URL pública ou null em caso de erro.
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

  const path = url.split('/product-images/').pop()
  if (!path) return false

  const { error } = await supabase.storage
    .from('product-images')
    .remove([path])

  return !error
}
