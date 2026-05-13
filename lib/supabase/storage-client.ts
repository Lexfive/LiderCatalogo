import { v4 as uuidv4 } from 'uuid'
import { createClient } from './client'

/**
 * Faz upload de uma imagem para o Supabase Storage.
 * Retorna a URL publica da imagem ou null em caso de erro.
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

  if (error) {
    console.error('[Storage] upload:', error.message)
    return null
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

/** Remove uma imagem do storage pelo caminho extraido da URL publica. */
export async function deleteProductImage(url: string): Promise<boolean> {
  const supabase = createClient()

  const path = url.split('/product-images/').pop()
  if (!path) return false

  const { error } = await supabase.storage
    .from('product-images')
    .remove([path])

  return !error
}
