'use client'

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

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!form.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'E-mail inválido'
    }
    if (!form.message.trim()) newErrors.message = 'Mensagem é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      // Chama a API route em app/api/contato/route.ts
      // Para usar Netlify Forms, importe ContactFormNetlify em vez deste componente.
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao enviar')
      }
      setSubmitted(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao enviar. Tente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={48} className="text-gold mb-4" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-light mb-2">Mensagem enviada!</h3>
        <p className="text-sm text-charcoal-400 leading-relaxed max-w-[280px]">
          Entraremos em contato em até 2 horas úteis. Aguarde — vamos criar algo especial juntos.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm(INITIAL_FORM) }}
          className="mt-8 btn-outline"
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de contato">
      {/* Nome + Telefone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="contact-name" className="form-label">
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Seu nome completo"
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn('form-input', errors.name && 'border-red-400')}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="form-label">
            Telefone
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(XX) 9 9999-0000"
            autoComplete="tel"
            className="form-input"
          />
        </div>
      </div>

      {/* E-mail */}
      <div className="mb-6">
        <label htmlFor="contact-email" className="form-label">
          E-mail <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="seu@email.com"
          autoComplete="email"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn('form-input', errors.email && 'border-red-400')}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Interesse */}
      <div className="mb-6">
        <label htmlFor="contact-interest" className="form-label">
          Interesse
        </label>
        <select
          id="contact-interest"
          value={form.interest}
          onChange={(e) => update('interest', e.target.value)}
          className="form-input cursor-pointer"
        >
          <option value="">Selecione uma categoria (opcional)</option>
          <option value="quadros">Quadros Decorativos</option>
          <option value="molduras">Molduras Artesanais</option>
          <option value="espelhos">Espelhos</option>
          <option value="personalizado">Projeto Personalizado</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Mensagem */}
      <div className="mb-8">
        <label htmlFor="contact-message" className="form-label">
          Mensagem <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Descreva o que procura, o ambiente, dimensões preferidas, prazo..."
          rows={4}
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn('form-input resize-none', errors.message && 'border-red-400')}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs text-red-500 mt-1">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          'Enviando…'
        ) : (
          <>
            <Send size={14} aria-hidden="true" />
            Enviar Mensagem
          </>
        )}
      </button>

      <p className="text-[0.68rem] text-charcoal-300 text-center mt-4 tracking-wide">
        Seus dados são confidenciais e nunca serão compartilhados.
      </p>
    </form>
  )
}
