import { useRef } from 'react'
import { invite } from '../data.js'
import Reveal from './Reveal.jsx'
import CoupleNames from './CoupleNames.jsx'
import { useCoupleNames3D, useHeroScroll3D } from './ScrollSection.jsx'

export default function Hero({ revealed = false }) {
  const heroRef = useRef(null)
  const namesRef = useRef(null)

  useHeroScroll3D(revealed, heroRef)
  useCoupleNames3D(revealed, namesRef)

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-night md:flex md:min-h-screen md:items-center"
    >
      {/* Foto: no telemóvel ocupa o topo (rostos sempre livres); no computador, metade direita */}
      <div
        className="absolute inset-x-0 top-0 aspect-[4/5] md:inset-y-0 md:left-1/2 md:right-0 md:aspect-auto"
        aria-hidden="true"
      >
        <img
          src={invite.heroPhoto}
          alt=""
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 via-30% to-transparent md:bg-gradient-to-r md:from-night md:via-night/10 md:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night/50 to-transparent md:hidden" />
      </div>

      <div className="hero-scroll-inner relative z-10 flex w-full flex-col items-center px-6 pb-16 pt-[calc(100vw*0.72)] text-center md:w-1/2 md:py-20 md:pr-8 md:pt-20">
        <Reveal active={revealed} delay={0.05}>
          <p className="mb-2 font-label text-xs font-extrabold uppercase leading-relaxed tracking-[0.22em] text-[#FFF6E3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-sm md:text-base">
            {invite.greeting}
          </p>
        </Reveal>

        <Reveal active={revealed} delay={0.25}>
          <CoupleNames ref={namesRef} />
        </Reveal>

        <Reveal active={revealed} delay={0.5} className="mt-5">
          <p className="font-label text-[0.75rem] font-bold uppercase tracking-[0.4em] text-gold-bright md:text-xs">
            {invite.weekday} · {invite.time}
          </p>
        </Reveal>

        {/* Texto de convite */}
        <Reveal active={revealed} delay={0.7} className="mt-8 w-full">
          <div className="mx-auto max-w-md rounded-2xl border border-gold-bright/30 bg-night/55 px-5 py-6 backdrop-blur-[2px]">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-bright" />
              <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold-bright" fill="currentColor">
                <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" />
              </svg>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-bright" />
            </div>
            {invite.intro.map((paragraph, i) => (
              <p
                key={i}
                className={`font-body leading-[1.7] text-[#FFF6E3] ${
                  i === 0 ? 'mb-3 text-lg md:text-xl' : 'text-base md:text-lg'
                }`}
                style={{ textWrap: 'balance' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal active={revealed} delay={0.9} className="mt-8">
          <div className="flex flex-col items-center gap-2 text-[#FFF6E3]/90" aria-hidden="true">
            <span className="font-label text-[0.65rem] font-bold uppercase tracking-[0.35em]">Deslize</span>
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" stroke="currentColor" strokeWidth="1.6" className="animate-bounce">
              <path d="M8 2v16M2 13l6 6 6-6" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
