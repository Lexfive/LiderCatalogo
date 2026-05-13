'use client'

/**
 * ContactFormNetlify.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Alternativa ao ContactForm.tsx usando Netlify Forms (zero backend).
 *
 * COMO USAR:
 * 1. Em app/contato/page.tsx, substitua:
 *    import { ContactForm } from '@/components/sections/ContactForm'
 *    por:
 *    import { ContactFormNetlify } from '@/components/sections/ContactFormNetlify'
 *
 * 2. Deploy no Netlify — o Netlify detecta data-netlify="true" no HTML
 *    e passa a capturar os envios automaticamente.
 *
 * 3. Veja os envios em: Netlify Dashboard → Forms → contato-lider-molduras
 *
 * 4. Para notificação por e-mail: Netlify → Forms → Notifications → Add e-mail
 *
 * LIMITES DO PLANO GRATUITO NETLIFY FORMS:
 * 100 submissões/mês — suficiente para começar.
 * Para mais volume, use a API route com Resend.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  phone: string
  email: string
  interest: string
  message: string
}

const INITIAL: FormData = { name: '', phone: '', email: '', interest: '', message: '' }

export function ContactFormNetlify() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate() {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Nome é obrigatório'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'E-mail inválido'
    }
    if (!form.message.trim()) e.message = 'Mensagem é obrigatória'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    // Netlify Forms aceita fetch com URLSearchParams — sem backend necessário
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contato-lider-molduras',
          ...form,
        }).toString(),
      })
      setSubmitted(true)
    } catch {
      alert('Erro ao enviar. Tente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={48} className="text-gold mb-4" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-light mb-2">Mensagem enviada!</h3>
        <p className="text-sm text-charcoal-400 leading-relaxed max-w-[280px]">
          Entraremos em contato em até 2 horas úteis.
        </p>
        <button onClick={() => { setSubmitted(false); setForm(INITIAL) }} className="mt-8 btn-outline">
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    // data-netlify="true" — Netlify detecta este atributo no HTML estático da build
    // name="contato-lider-molduras" — identificador no painel do Netlify
    <form
      onSubmit={handleSubmit}
      name="contato-lider-molduras"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"  // Campo anti-spam
      aria-label="Formulário de contato"
      noValidate
    >
      {/* Campo oculto obrigatório pelo Netlify Forms */}
      <input type="hidden" name="form-name" value="contato-lider-molduras" />

      {/* Honeypot anti-spam — deve ficar oculto para humanos */}
      <p className="hidden" aria-hidden="true">
        <label>
          Não preencha este campo:
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="nl-name" className="form-label">Nome *</label>
          <input
            id="nl-name" name="name" type="text"
            value={form.name} onChange={(e) => update('name', e.target.value)}
            placeholder="Seu nome completo" autoComplete="name" aria-required="true"
            className={cn('form-input', errors.name && 'border-red-400')}
          />
          {errors.name && <p role="alert" className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="nl-phone" className="form-label">Telefone</label>
          <input
            id="nl-phone" name="phone" type="tel"
            value={form.phone} onChange={(e) => update('phone', e.target.value)}
            placeholder="(XX) 9 9999-0000" autoComplete="tel"
            className="form-input"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="nl-email" className="form-label">E-mail *</label>
        <input
          id="nl-email" name="email" type="email"
          value={form.email} onChange={(e) => update('email', e.target.value)}
          placeholder="seu@email.com" autoComplete="email" aria-required="true"
          className={cn('form-input', errors.email && 'border-red-400')}
        />
        {errors.email && <p role="alert" className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="nl-interest" className="form-label">Interesse</label>
        <select
          id="nl-interest" name="interest"
          value={form.interest} onChange={(e) => update('interest', e.target.value)}
          className="form-input cursor-pointer"
        >
          <option value="">Selecione (opcional)</option>
          <option value="Quadros Decorativos">Quadros Decorativos</option>
          <option value="Molduras Artesanais">Molduras Artesanais</option>
          <option value="Espelhos">Espelhos</option>
          <option value="Projeto Personalizado">Projeto Personalizado</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="mb-8">
        <label htmlFor="nl-message" className="form-label">Mensagem *</label>
        <textarea
          id="nl-message" name="message" rows={4}
          value={form.message} onChange={(e) => update('message', e.target.value)}
          placeholder="Descreva o que procura, ambiente, dimensões, prazo..."
          aria-required="true"
          className={cn('form-input resize-none', errors.message && 'border-red-400')}
        />
        {errors.message && <p role="alert" className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
        {loading ? 'Enviando…' : <><Send size={14} aria-hidden="true" /> Enviar Mensagem</>}
      </button>
      <p className="text-[0.68rem] text-charcoal-300 text-center mt-4 tracking-wide">
        Seus dados são confidenciais e nunca serão compartilhados.
      </p>
    </form>
  )
}
