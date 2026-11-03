import { invite } from '../data.js'
import Reveal from './Reveal.jsx'
import RingsArt from './RingsArt.jsx'

export default function VerseSection() {
  const { title, text, reference } = invite.verse

  return (
    <section className="relative isolate overflow-hidden bg-night px-6 py-24 text-center">
      <img
        src="/images/foto3.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/45 to-night" aria-hidden="true" />

      <div className="mx-auto max-w-xl">
        <Reveal y={16}>
          {/* anéis realistas, com a fita a atravessar a faixa */}
          <div className="relative mx-auto w-56 md:w-64">
            <div
              className="absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2 border-y border-[#D6C3A8]"
              style={{
                height: '11.25%',
                background: 'repeating-linear-gradient(180deg, #F6ECDF 0, #F6ECDF 2px, #DDCBB4 2px, #DDCBB4 3px)',
                boxShadow: 'inset 0 3px 4px rgba(122,90,46,0.30), inset 0 -3px 4px rgba(122,90,46,0.25), 0 6px 14px rgba(0,0,0,0.55)',
              }}
              aria-hidden="true"
            />
            <RingsArt idp="vs" className="relative block w-full overflow-visible" />
          </div>
          <h3
            className="mt-8 font-script text-6xl md:text-7xl leading-none text-gold-bright"
            style={{ textShadow: '0 3px 14px rgba(0,0,0,0.8)', WebkitTextStroke: '0.9px #F5DC9A' }}
          >
            {title}
          </h3>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-gold-bright/80" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.12} y={22}>
          <blockquote
            className="mt-8 font-body text-xl md:text-2xl italic leading-[1.75] text-[#FFF6E3]"
            style={{ textWrap: 'balance' }}
          >
            “{text}”
          </blockquote>
        </Reveal>

        <Reveal delay={0.24} y={14}>
          <p className="mt-8 font-label text-sm font-extrabold uppercase tracking-[0.28em] text-gold-bright">
            {reference}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
