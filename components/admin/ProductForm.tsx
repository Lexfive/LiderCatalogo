'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@/lib/supabase/client'
import { generateSlug, uploadProductImage, deleteProductImage } from '@/lib/supabase/products-db'
import { cn } from '@/lib/utils'
import type { ProductRow } from '@/lib/supabase/types'
import {
  ImagePlus, X, GripVertical, Loader2, Save,
  AlertCircle, CheckCircle2, ChevronDown,
} from 'lucide-react'

// ─── Opções dos campos ────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: 'quadro', label: 'Quadro Decorativo' },
  { value: 'moldura', label: 'Moldura Artesanal' },
  { value: 'espelho', label: 'Espelho' },
]

const STYLES = [
  { value: 'abstrato', label: 'Abstrato' },
  { value: 'botanico', label: 'Botânico' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'classico', label: 'Clássico' },
  { value: 'contemporaneo', label: 'Contemporâneo' },
  { value: 'fotografico', label: 'Fotográfico' },
  { value: 'geometrico', label: 'Geométrico' },
]

const FINISHES = [
  { value: 'verniz-fosco', label: 'Verniz Fosco' },
  { value: 'verniz-brilhante', label: 'Verniz Brilhante' },
  { value: 'folha-de-ouro', label: 'Folha de Ouro' },
  { value: 'lacado', label: 'Lacado' },
  { value: 'natural', label: 'Natural' },
  { value: 'envelhecido', label: 'Envelhecido / Patinado' },
  { value: 'polido', label: 'Polido' },
  { value: 'bisotado', label: 'Bisotado' },
]

const ENVIRONMENTS = [
  'Sala de estar', 'Quarto', 'Escritório', 'Hall de entrada',
  'Corredor', 'Lavabo', 'Cozinha', 'Ambiente comercial',
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string
  sku: string
  marketplace_title: string
  category: 'quadro' | 'moldura' | 'espelho'
  width_cm: string
  height_cm: string
  depth_cm: string
  colors: string      // string separada por vírgula
  materials: string
  finish: string[]
  styles: string[]
  environments: string[]
  description: string
  full_description: string
  available: boolean
  featured: boolean
  delivery_days: string
  marketplace_url: string
  badge: string
}

interface ProductFormProps {
  /** Produto existente para edição. Se undefined, é um novo produto. */
  product?: ProductRow
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyForm(): FormData {
  return {
    name: '',
    sku: '',
    marketplace_title: '',
    category: 'quadro',
    width_cm: '',
    height_cm: '',
    depth_cm: '',
    colors: '',
    materials: '',
    finish: [],
    styles: [],
    environments: [],
    description: '',
    full_description: '',
    available: true,
    featured: false,
    delivery_days: '7 a 15 dias úteis',
    marketplace_url: '',
    badge: '',
  }
}

function productToForm(p: ProductRow): FormData {
  return {
    name: p.name,
    sku: p.sku ?? '',
    marketplace_title: p.marketplace_title ?? '',
    category: p.category,
    width_cm: String(p.width_cm),
    height_cm: String(p.height_cm),
    depth_cm: p.depth_cm ? String(p.depth_cm) : '',
    colors: (p.colors ?? []).join(', '),
    materials: p.materials ?? '',
    finish: p.finish ?? [],
    styles: p.styles ?? [],
    environments: p.environments ?? [],
    description: p.description ?? '',
    full_description: p.full_description ?? '',
    available: p.available,
    featured: p.featured,
    delivery_days: p.delivery_days ?? '7 a 15 dias úteis',
    marketplace_url: p.marketplace_url ?? '',
    badge: p.badge ?? '',
  }
}

// ─── Subcomponentes ──────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[0.68rem] tracking-[0.14em] uppercase text-[#9E9A91] mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full border border-[#E8E6DF] px-3.5 py-2.5 text-sm text-[#0A0A0A] bg-white',
        'placeholder:text-[#C8C4BB] outline-none',
        'focus:border-[#B8985A] transition-colors duration-200',
        className
      )}
      {...props}
    />
  )
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full border border-[#E8E6DF] px-3.5 py-2.5 text-sm text-[#0A0A0A] bg-white',
        'placeholder:text-[#C8C4BB] outline-none resize-y min-h-[90px]',
        'focus:border-[#B8985A] transition-colors duration-200',
        className
      )}
      {...props}
    />
  )
}

function TagCheckbox({
  value, label, checked, onChange,
}: {
  value: string; label: string; checked: boolean; onChange: () => void
}) {
  return (
    <button type="button" onClick={onChange}
      className={cn(
        'px-3 py-1.5 text-xs border transition-all duration-150 text-left',
        checked
          ? 'border-[#B8985A] bg-[#F5EDD8] text-[#8C7040]'
          : 'border-[#E8E6DF] text-[#9E9A91] hover:border-[#B8985A]/50'
      )}>
      {label}
    </button>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function ProductForm({ product }: ProductFormProps) {
  const isEditing = !!product
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState<FormData>(
    product ? productToForm(product) : emptyForm()
  )
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // ── Upload de imagens via drag & drop ────────────────────────────────────

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 5) {
      setErrorMsg('Máximo de 5 imagens por produto.')
      return
    }

    const slug = generateSlug(form.name || 'produto')
    setUploading(true)
    setErrorMsg('')

    for (const file of acceptedFiles) {
      const url = await uploadProductImage(file, slug)
      if (url) setImages((prev) => [...prev, url])
    }
    setUploading(false)
  }, [form.name, images.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024, // 5 MB por arquivo
    disabled: images.length >= 5 || uploading,
  })

  async function removeImage(url: string) {
    await deleteProductImage(url)
    setImages((prev) => prev.filter((u) => u !== url))
  }

  // ── Helpers de campo ─────────────────────────────────────────────────────

  function set(field: keyof FormData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleArray(field: 'finish' | 'styles' | 'environments', value: string) {
    setForm((prev) => {
      const arr = prev[field] as string[]
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      }
    })
  }

  // ── Submissão ────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (!form.name.trim()) { setErrorMsg('O nome do produto é obrigatório.'); return }
    if (!form.category) { setErrorMsg('Selecione uma categoria.'); return }
    if (!form.width_cm || !form.height_cm) { setErrorMsg('Largura e altura são obrigatórias.'); return }

    setSaving(true)

    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim() || null,
      marketplace_title: form.marketplace_title.trim() || null,
      slug: generateSlug(form.name),
      category: form.category,
      styles: form.styles,
      width_cm: parseFloat(form.width_cm),
      height_cm: parseFloat(form.height_cm),
      depth_cm: form.depth_cm ? parseFloat(form.depth_cm) : null,
      colors: form.colors.split(',').map((c) => c.trim()).filter(Boolean),
      materials: form.materials.trim() || null,
      finish: form.finish,
      environments: form.environments,
      description: form.description.trim() || null,
      full_description: form.full_description.trim() || null,
      images,
      badge: form.badge.trim() || null,
      featured: form.featured,
      available: form.available,
      delivery_days: form.delivery_days.trim() || null,
      marketplace_url: form.marketplace_url.trim() || null,
    }

    let error

    if (isEditing) {
      const res = await supabase.from('products').update(payload).eq('id', product.id)
      error = res.error
    } else {
      const res = await supabase.from('products').insert(payload)
      error = res.error
    }

    setSaving(false)

    if (error) {
      setErrorMsg(`Erro ao salvar: ${error.message}`)
      setStatus('error')
    } else {
      setStatus('success')
      setTimeout(() => router.push('/admin/produtos'), 1200)
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* Feedback de status */}
      {errorMsg && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200
                        text-red-700 text-sm px-4 py-3 mb-6">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}
      {status === 'success' && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200
                        text-emerald-700 text-sm px-4 py-3 mb-6">
          <CheckCircle2 size={16} />
          Produto salvo com sucesso! Redirecionando…
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,400px] gap-8">

        {/* ── Coluna principal ───────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Card: Identificação */}
          <Section title="Identificação">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FieldLabel required>Nome do produto</FieldLabel>
                <Input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Ex: Quadro Decorativo Ilha Mar Cristalino"
                  required
                />
                {form.name && (
                  <p className="text-[0.68rem] text-[#9E9A91] mt-1">
                    URL: /produto/<strong>{generateSlug(form.name)}</strong>
                  </p>
                )}
              </div>

              <div>
                <FieldLabel>SKU (código interno)</FieldLabel>
                <Input
                  value={form.sku}
                  onChange={(e) => set('sku', e.target.value)}
                  placeholder="QD-ILHA-MAR-80X120"
                />
              </div>

              <div>
                <FieldLabel>Etiqueta / Badge</FieldLabel>
                <Input
                  value={form.badge}
                  onChange={(e) => set('badge', e.target.value)}
                  placeholder="Novo, Destaque, Exclusivo…"
                />
              </div>

              <div className="sm:col-span-2">
                <FieldLabel>Título completo para marketplace / anúncio</FieldLabel>
                <Input
                  value={form.marketplace_title}
                  onChange={(e) => set('marketplace_title', e.target.value)}
                  placeholder="Ex: Quadro Decorativo 80x120 cm Com Moldura para Sala Quarto Escritório Hall"
                />
              </div>
            </div>
          </Section>

          {/* Card: Categoria e dimensões */}
          <Section title="Categoria e Dimensões">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <FieldLabel required>Categoria</FieldLabel>
                <div className="flex gap-3 flex-wrap">
                  {CATEGORIES.map(({ value, label }) => (
                    <button key={value} type="button"
                      onClick={() => set('category', value)}
                      className={cn(
                        'px-5 py-2.5 text-sm border transition-all duration-150',
                        form.category === value
                          ? 'border-[#B8985A] bg-[#F5EDD8] text-[#8C7040]'
                          : 'border-[#E8E6DF] text-[#9E9A91] hover:border-[#B8985A]/50'
                      )}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel required>Largura (cm)</FieldLabel>
                <Input type="number" min="0" step="0.1"
                  value={form.width_cm}
                  onChange={(e) => set('width_cm', e.target.value)}
                  placeholder="80" />
              </div>
              <div>
                <FieldLabel required>Altura (cm)</FieldLabel>
                <Input type="number" min="0" step="0.1"
                  value={form.height_cm}
                  onChange={(e) => set('height_cm', e.target.value)}
                  placeholder="120" />
              </div>
              <div>
                <FieldLabel>Profundidade (cm)</FieldLabel>
                <Input type="number" min="0" step="0.1"
                  value={form.depth_cm}
                  onChange={(e) => set('depth_cm', e.target.value)}
                  placeholder="4" />
              </div>
            </div>
          </Section>

          {/* Card: Características */}
          <Section title="Características">
            <div className="space-y-5">
              <div>
                <FieldLabel>Estilos</FieldLabel>
                <div className="flex flex-wrap gap-2 mt-1">
                  {STYLES.map(({ value, label }) => (
                    <TagCheckbox key={value} value={value} label={label}
                      checked={form.styles.includes(value)}
                      onChange={() => toggleArray('styles', value)} />
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel>Acabamentos</FieldLabel>
                <div className="flex flex-wrap gap-2 mt-1">
                  {FINISHES.map(({ value, label }) => (
                    <TagCheckbox key={value} value={value} label={label}
                      checked={form.finish.includes(value)}
                      onChange={() => toggleArray('finish', value)} />
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel>Ambientes indicados</FieldLabel>
                <div className="flex flex-wrap gap-2 mt-1">
                  {ENVIRONMENTS.map((env) => (
                    <TagCheckbox key={env} value={env} label={env}
                      checked={form.environments.includes(env)}
                      onChange={() => toggleArray('environments', env)} />
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel>Cores disponíveis</FieldLabel>
                <Input
                  value={form.colors}
                  onChange={(e) => set('colors', e.target.value)}
                  placeholder="Preto, Dourado, Natural (separar por vírgula)"
                />
              </div>

              <div>
                <FieldLabel>Materiais</FieldLabel>
                <Input
                  value={form.materials}
                  onChange={(e) => set('materials', e.target.value)}
                  placeholder="Ex: MDF laqueado, impressão fine art, vidro antirreflexo"
                />
              </div>
            </div>
          </Section>

          {/* Card: Descrições */}
          <Section title="Descrições">
            <div className="space-y-4">
              <div>
                <FieldLabel>Descrição curta <span className="normal-case text-[#C8C4BB]">(aparece nos cards)</span></FieldLabel>
                <Textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Máximo 150 caracteres. Resumo objetivo do produto."
                  rows={2}
                />
                <p className="text-[0.68rem] text-[#C8C4BB] mt-1">
                  {form.description.length} / 150 caracteres
                </p>
              </div>

              <div>
                <FieldLabel>Descrição completa <span className="normal-case text-[#C8C4BB]">(aparece na página do produto)</span></FieldLabel>
                <Textarea
                  value={form.full_description}
                  onChange={(e) => set('full_description', e.target.value)}
                  placeholder="Descrição detalhada: materiais, técnica, indicações, diferenciais, etc."
                  rows={5}
                />
              </div>
            </div>
          </Section>

          {/* Card: Links */}
          <Section title="Links externos">
            <div>
              <FieldLabel>Link do marketplace</FieldLabel>
              <Input
                type="url"
                value={form.marketplace_url}
                onChange={(e) => set('marketplace_url', e.target.value)}
                placeholder="https://produto.mercadolivre.com.br/..."
              />
              <p className="text-[0.68rem] text-[#9E9A91] mt-1">
                Se preenchido, aparece um botão &ldquo;Ver no marketplace&rdquo; na página do produto.
              </p>
            </div>
          </Section>
        </div>

        {/* ── Coluna lateral ─────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Card: Fotos */}
          <Section title="Fotos do produto">
            {/* Dropzone */}
            {images.length < 5 && (
              <div {...getRootProps()}
                className={cn(
                  'border-2 border-dashed rounded-sm p-6 text-center cursor-pointer',
                  'transition-colors duration-200',
                  isDragActive ? 'border-[#B8985A] bg-[#F5EDD8]/40' : 'border-[#E8E6DF] hover:border-[#B8985A]/50',
                  uploading && 'opacity-60 pointer-events-none'
                )}>
                <input {...getInputProps()} />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 size={24} className="animate-spin text-[#B8985A]" />
                    <p className="text-sm text-[#9E9A91]">Enviando…</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <ImagePlus size={24} className="text-[#C8C4BB]" />
                    <p className="text-sm text-[#9E9A91]">
                      {isDragActive ? 'Solte aqui' : 'Arraste ou clique para enviar'}
                    </p>
                    <p className="text-[0.68rem] text-[#C8C4BB]">
                      JPG, PNG, WebP · Máx. 5MB · Até {5 - images.length} foto(s)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Preview das imagens */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((url, i) => (
                  <div key={url} className="relative group aspect-square bg-[#F4F3EF] overflow-hidden">
                    <img src={url} alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#B8985A] text-white
                                       text-[0.55rem] tracking-wide uppercase px-1.5 py-0.5">
                        Principal
                      </span>
                    )}
                    <button type="button" onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white
                                 flex items-center justify-center opacity-0 group-hover:opacity-100
                                 transition-opacity duration-200">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[0.68rem] text-[#9E9A91] mt-2">
              A primeira foto é a imagem principal do produto.
              {images.length > 0 && ` ${images.length}/5 fotos adicionadas.`}
            </p>
          </Section>

          {/* Card: Status */}
          <Section title="Status e publicação">
            <div className="space-y-4">

              {/* Visível no catálogo */}
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm text-[#0A0A0A] font-medium">Visível no catálogo</p>
                  <p className="text-xs text-[#9E9A91]">
                    Produto aparece no site para os clientes
                  </p>
                </div>
                <div
                  onClick={() => set('available', !form.available)}
                  className={cn(
                    'relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0',
                    form.available ? 'bg-[#B8985A]' : 'bg-[#E8E6DF]'
                  )}>
                  <div className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200',
                    form.available ? 'left-5' : 'left-1'
                  )} />
                </div>
              </label>

              {/* Destaque na home */}
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm text-[#0A0A0A] font-medium">Destaque na home</p>
                  <p className="text-xs text-[#9E9A91]">
                    Aparece na seção &ldquo;Destaques&rdquo; da página inicial
                  </p>
                </div>
                <div
                  onClick={() => set('featured', !form.featured)}
                  className={cn(
                    'relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0',
                    form.featured ? 'bg-[#B8985A]' : 'bg-[#E8E6DF]'
                  )}>
                  <div className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200',
                    form.featured ? 'left-5' : 'left-1'
                  )} />
                </div>
              </label>

              {/* Prazo de entrega */}
              <div>
                <FieldLabel>Prazo estimado de entrega</FieldLabel>
                <Input
                  value={form.delivery_days}
                  onChange={(e) => set('delivery_days', e.target.value)}
                  placeholder="7 a 15 dias úteis"
                />
              </div>
            </div>
          </Section>

          {/* Botão salvar */}
          <button
            type="submit"
            disabled={saving || status === 'success'}
            className={cn(
              'w-full flex items-center justify-center gap-2.5',
              'bg-[#B8985A] text-white font-sans text-xs tracking-[0.14em] uppercase',
              'py-4 transition-colors duration-300',
              'hover:bg-[#D4B87A] disabled:opacity-60 disabled:cursor-not-allowed'
            )}>
            {saving ? (
              <><Loader2 size={15} className="animate-spin" /> Salvando…</>
            ) : status === 'success' ? (
              <><CheckCircle2 size={15} /> Salvo!</>
            ) : (
              <><Save size={15} /> {isEditing ? 'Salvar alterações' : 'Publicar produto'}</>
            )}
          </button>

          {isEditing && (
            <a href={`/produto/${generateSlug(form.name)}`}
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2
                         border border-[#E8E6DF] text-[#9E9A91] text-xs uppercase tracking-wide
                         py-3 hover:border-[#B8985A] hover:text-[#B8985A] transition-colors">
              Ver no site →
            </a>
          )}
        </div>
      </div>
    </form>
  )
}

// ─── Section card ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E8E6DF] p-6">
      <h2 className="text-[0.68rem] tracking-[0.2em] uppercase text-[#9E9A91] mb-5 pb-3
                     border-b border-[#F4F3EF] font-sans">
        {title}
      </h2>
      {children}
    </div>
  )
}
