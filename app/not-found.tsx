import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-[72px]">
      <div className="text-center px-6">
        <span className="section-tag justify-center flex mb-4">Página não encontrada</span>
        <p className="font-serif text-[8rem] font-light text-charcoal-200 leading-none mb-4">
          404
        </p>
        <h1 className="font-serif text-3xl font-light text-charcoal mb-4">
          Esta página não existe
        </h1>
        <p className="text-charcoal-400 text-sm leading-relaxed max-w-sm mx-auto mb-10">
          A página que você procura pode ter sido movida ou não existe mais.
          Explore nosso catálogo para encontrar algo especial.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Voltar ao Início
          </Link>
          <Link href="/catalogo" className="btn-outline">
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
