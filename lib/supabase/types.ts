/**
 * lib/supabase/types.ts
 * Tipagem do banco de dados Supabase.
 *
 * Para regenerar automaticamente após alterar o schema:
 *   npx supabase gen types typescript --project-id SEU_PROJECT_ID > lib/supabase/types.ts
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string                    // UUID gerado pelo Supabase
          created_at: string            // timestamp ISO
          updated_at: string            // timestamp ISO
          name: string                  // Nome de exibição
          sku: string | null            // Código interno do produto
          marketplace_title: string | null // Título longo para marketplace/anúncio
          slug: string                  // URL amigável (gerado automaticamente do nome)
          category: 'quadro' | 'moldura' | 'espelho'
          styles: string[]              // Tags de estilo
          width_cm: number              // Largura em cm
          height_cm: number             // Altura em cm
          depth_cm: number | null       // Profundidade em cm (opcional)
          colors: string[]              // Cores disponíveis
          materials: string | null      // Descrição dos materiais
          finish: string[]              // Tipos de acabamento
          environments: string[]        // Ambientes indicados (sala, quarto, etc.)
          description: string | null    // Descrição curta para cards
          full_description: string | null // Descrição completa para página do produto
          images: string[]              // Array de URLs do Supabase Storage
          badge: string | null          // Etiqueta: 'Novo', 'Destaque', etc.
          featured: boolean             // Aparece na seção de destaques da home
          available: boolean            // Visível no catálogo público
          delivery_days: string | null  // Prazo estimado ex: '7 a 15 dias úteis'
          marketplace_url: string | null // Link externo para marketplace
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Tipo conveniente para trabalhar no app
export type ProductRow = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']
