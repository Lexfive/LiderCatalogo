import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Utilitário para combinar classes Tailwind de forma segura */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Gera a URL do WhatsApp com mensagem pré-definida */
export function getWhatsAppUrl(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const defaultMsg =
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    'Olá! Gostaria de mais informações sobre os produtos da Líder Molduras.'
  const encoded = encodeURIComponent(message || defaultMsg)
  return `https://wa.me/${number}?text=${encoded}`
}

/** Gera a URL do WhatsApp para um produto específico */
export function getProductWhatsAppUrl(productName: string, productSlug: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lidermolduras.com.br'
  const message = `Olá! Tenho interesse no produto *${productName}* (${siteUrl}/produto/${productSlug}). Poderia me enviar mais informações e disponibilidade?`
  return getWhatsAppUrl(message)
}

/** Trunca texto mantendo palavras inteiras */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, text.lastIndexOf(' ', maxLength)) + '…'
}
