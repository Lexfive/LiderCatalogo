/**
 * components/sections/InspirationSection.tsx
 * Seção "Ambientes — Inspirações que Encantam" na home.
 *
 * COMO ADICIONAR SUAS FOTOS:
 * Coloque imagens em /public/images/inspiration/
 * Nomeie como: sala.jpg, quarto.jpg, escritorio.jpg, hall.jpg, lavabo.jpg
 * Tamanho ideal: 800×600px ou proporcional. Formato JPG ou WebP.
 *
 * Enquanto não há fotos reais, os itens exibem gradientes decorativos
 * com ícones e labels descritivos.
 */
import Link from 'next/link'
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeader } from '@/components/ui/SectionHeader'

const inspirationRooms = [
  {
    key: 'sala',
    label: 'Sala de Estar',
    sublabel: 'Quadros + Espelho grande',
    tip: 'Uma galeria de quadros cria identidade e preenche paredes grandes com elegância.',
    image: '/images/inspiration/sala.jpg',
    gradient: 'linear-gradient(145deg, #2d2218, #4a3525)',
    span: 'col-span-12 sm:col-span-7 lg:col-span-7',
    height: 'h-64 sm:h-72',
  },
  {
    key: 'quarto',
    label: 'Quarto Master',
    sublabel: 'Moldura acima da cabeceira',
    tip: 'Uma moldura centralizada acima da cama substitui o cabeceiro com sofisticação.',
    image: '/images/inspiration/quarto.jpg',
    gradient: 'linear-gradient(145deg, #1e2028, #2e3048)',
    span: 'col-span-12 sm:col-span-5 lg:col-span-5',
    height: 'h-64 sm:h-72',
  },
  {
    key: 'escritorio',
    label: 'Home Office',
    sublabel: 'Arte abstrata ao fundo',
    tip: 'Um quadro marcante atrás da mesa eleva o ambiente nas videochamadas.',
    image: '/images/inspiration/escritorio.jpg',
    gradient: 'linear-gradient(145deg, #1a2420, #243830)',
    span: 'col-span-12 sm:col-span-4 lg:col-span-4',
    height: 'h-56 sm:h-64',
  },
  {
    key: 'hall',
    label: 'Hall de Entrada',
    sublabel: 'Espelho + consola',
    tip: 'Um espelho de arco no hall cria profundidade e é o primeiro impacto da decoração.',
    image: '/images/inspiration/hall.jpg',
    gradient: 'linear-gradient(145deg, #28201a, #3d3025)',
    span: 'col-span-12 sm:col-span-5 lg:col-span-5',
    height: 'h-56 sm:h-64',
  },
  {
    key: 'lavabo',
    label: 'Lavabo',
    sublabel: 'Espelho oval com moldura',
    tip: 'Lavabos pequenos ganham personalidade com um espelho de moldura elaborada.',
    image: '/images/inspiration/lavabo.jpg',
    gradient: 'linear-gradient(145deg, #1e1e28, #2e2e40)',
    span: 'col-span-12 sm:col-span-3 lg:col-span-3',
    height: 'h-56 sm:h-64',
  },
]

function RoomCard({
  room,
  delay,
}: {
  room: typeof inspirationRooms[0]
  delay: number
}) {
  return (
    <AnimatedSection
      delay={delay}
      className={`${room.span} relative overflow-hidden group cursor-pointer ${room.height}`}
    >
      {/* Imagem ou gradiente */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-luxury group-hover:scale-[1.05]"
        style={{ background: room.gradient }}
      >
        <Image
          src={room.image}
          alt={`${room.label} decorado com peças Líder Molduras`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                      group-hover:from-black/90 transition-all duration-400" />

      {/* Conteúdo inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <p className="text-[0.58rem] tracking-[0.2em] uppercase text-gold-light mb-1">
          {room.sublabel}
        </p>
        <p className="font-serif text-base sm:text-lg font-light text-white leading-tight mb-1">
          {room.label}
        </p>
        {/* Dica — aparece no hover */}
        <p className="text-white/0 group-hover:text-white/60 text-xs leading-relaxed
                      transition-all duration-400 max-h-0 group-hover:max-h-20
                      overflow-hidden">
          {room.tip}
        </p>
      </div>
    </AnimatedSection>
  )
}

export function InspirationSection() {
  return (
    <section className="section" aria-label="Ambientes inspiradores">
      <div className="container-elite">
        <AnimatedSection>
          <SectionHeader
            tag="Ambientes"
            title="Inspirações que<br /><em>encantam</em>"
            subtitle="Cada espaço tem potencial para se tornar especial. Veja como nossas peças transformam ambientes reais."
          />
        </AnimatedSection>

        {/* Grid editorial responsivo */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {inspirationRooms.map((room, i) => (
            <RoomCard key={room.key} room={room} delay={0.07 * i} />
          ))}
        </div>

        {/* Dica de conteúdo — visível apenas em dev */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 border border-dashed border-charcoal-200 p-4 text-xs text-charcoal-400 space-y-1">
            <p className="font-medium text-charcoal-600">💡 Como adicionar fotos reais de ambientes:</p>
            <p>Coloque imagens em <code className="bg-cream-100 px-1">/public/images/inspiration/</code> com os nomes:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {inspirationRooms.map((r) => (
                <code key={r.key} className="bg-cream-100 px-1.5 py-0.5">{r.key}.jpg</code>
              ))}
            </div>
            <p className="mt-2">Tamanho ideal: <strong>1000×700px</strong> mínimo. Formatos: JPG ou WebP.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <AnimatedSection>
            <Link href="/inspiracao" className="btn-outline">
              Ver Galeria Completa
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
