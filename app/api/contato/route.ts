/**
 * app/api/contato/route.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Backend do formulário de contato.
 *
 * OPÇÃO A — Resend (recomendado, gratuito até 3.000 e-mails/mês):
 *   1. Crie conta em resend.com
 *   2. npm install resend
 *   3. Adicione RESEND_API_KEY no .env.local e nas env vars do Netlify
 *   4. Descomente o bloco "Resend" abaixo e comente o bloco "Simulação"
 *
 * OPÇÃO B — Netlify Forms (zero backend, gratuito, mais simples):
 *   Use o componente ContactFormNetlify em vez de ContactForm.
 *   Não precisa desta API route.
 *
 * OPÇÃO C — Formspree (sem backend, 50 submissões/mês grátis):
 *   Substitua o fetch() no ContactForm pelo endpoint do Formspree.
 *   Não precisa desta API route.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from 'next/server'

// ── Tipagem do payload ──────────────────────────────────────────────────────
interface ContactPayload {
  name: string
  phone?: string
  email: string
  interest?: string
  message: string
}

// ── Validação servidor ──────────────────────────────────────────────────────
function validate(data: Partial<ContactPayload>): string | null {
  if (!data.name?.trim()) return 'Nome é obrigatório.'
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'E-mail inválido.'
  }
  if (!data.message?.trim()) return 'Mensagem é obrigatória.'
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>
    const error = validate(body)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const { name, email, phone, interest, message } = body as ContactPayload

    // ── OPÇÃO A: Resend ─────────────────────────────────────────────────────
    // Descomente após: npm install resend
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Líder Molduras <noreply@lidermolduras.com.br>',
    //   to: process.env.CONTACT_EMAIL || 'atendimento@lidermolduras.com.br',
    //   replyTo: email,
    //   subject: `Novo contato de ${name}${interest ? ` — ${interest}` : ''}`,
    //   html: `
    //     <h2>Novo contato via site</h2>
    //     <p><strong>Nome:</strong> ${name}</p>
    //     <p><strong>E-mail:</strong> ${email}</p>
    //     <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
    //     <p><strong>Interesse:</strong> ${interest || 'Não informado'}</p>
    //     <hr />
    //     <p><strong>Mensagem:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // })

    // ── SIMULAÇÃO (remova ao ativar Resend) ─────────────────────────────────
    // Em desenvolvimento, apenas loga — sem envio real.
    console.log('[Contato] Novo formulário recebido:', { name, email, phone, interest, message })
    // Em produção real, substitua pelo bloco Resend acima.
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[Contato] Erro:', err)
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente ou entre em contato pelo WhatsApp.' },
      { status: 500 }
    )
  }
}
