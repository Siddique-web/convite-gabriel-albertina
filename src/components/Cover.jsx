import { useState } from 'react'
import { motion } from 'framer-motion'
import { invite } from '../data.js'
import RingButton from './RingButton.jsx'

const SLIDE_DURATION = 0.9
const SLIDE_MS = SLIDE_DURATION * 1000

// Cada "porta" mostra metade da mesma foto (e metade da fita): ao abrir, tudo se parte ao meio.
function DoorPhoto({ side }) {
  return (
    <div
      className={`absolute inset-y-0 w-screen ${side === 'left' ? 'left-0' : 'right-0'}`}
      aria-hidden="true"
    >
      {/* Telemóvel / retrato: foto a preencher o ecrã */}
      <img
        src={invite.heroPhoto}
        alt=""
        className="cover-fill h-full w-full object-cover object-[50%_30%]"
        draggable={false}
      />

      {/* Computador / paisagem: foto inteira em formato retrato ao centro, fundo desfocado nos lados */}
      <div className="cover-fit absolute inset-0">
        <img
          src={invite.heroPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-125 blur-2xl brightness-50"
          draggable={false}
        />
        <img
          src={invite.heroPhoto}
          alt=""
          className="absolute left-1/2 top-0 h-full aspect-[4/5] -translate-x-1/2 object-cover object-top"
          draggable={false}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/5 via-45% to-night/90" />

      {/* Fita de cetim por trás do anel */}
      <div
        className="absolute inset-x-0 border-y border-[#D6C3A8]"
        style={{
          bottom: '15%',
          height: 'calc(var(--ring-w) * 0.113)',
          transform: 'translateY(50%)',
          background:
            'repeating-linear-gradient(180deg, #F6ECDF 0, #F6ECDF 2px, #DDCBB4 2px, #DDCBB4 3px)',
          boxShadow:
            'inset 0 3px 4px rgba(122,90,46,0.30), inset 0 -3px 4px rgba(122,90,46,0.25), 0 6px 14px rgba(0,0,0,0.55)',
        }}
      />
    </div>
  )
}

export default function Cover({ onMusicStart, onReveal, onComplete }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    onMusicStart?.()
    setTimeout(onReveal, 280)
    setTimeout(onComplete, SLIDE_MS + 120)
  }

  const ease = [0.65, 0, 0.35, 1]
  const shadow = { textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 0 22px rgba(0,0,0,0.6)' }

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-screen overflow-hidden pointer-events-auto bg-night"
      style={{ height: '100dvh', '--ring-w': 'min(62vw, 30dvh, 15rem)' }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-night"
        initial={{ x: 0 }}
        animate={opening ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: SLIDE_DURATION, ease }}
      >
        <DoorPhoto side="left" />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-night"
        initial={{ x: 0 }}
        animate={opening ? { x: '100%' } : { x: 0 }}
        transition={{ duration: SLIDE_DURATION, ease }}
      >
        <DoorPhoto side="right" />
      </motion.div>

      {/* Conteúdo da capa: rostos livres no centro, nomes por baixo e anel bem em baixo */}
      <motion.div
        className="cover-column relative z-10 mx-auto h-full"
        animate={opening ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 px-6 pt-9 text-center">
          <p
            className="font-label font-extrabold text-[#FFF6E3] text-[0.72rem] sm:text-sm tracking-[0.22em] uppercase leading-relaxed"
            style={shadow}
          >
            {invite.greeting}
          </p>
          <div className="mx-auto mt-3 h-[2px] w-16 bg-gold-bright" />
        </div>

        <div className="absolute inset-x-0 text-center px-4" style={{ bottom: '25%' }}>
          <h1
            className="font-name text-gold-bright leading-[0.95]"
            style={{ fontSize: 'min(5.2rem, 11.4dvh)', textShadow: '0 3px 14px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.55)', WebkitTextStroke: '0.5px #F5DC9A' }}
          >
            {invite.couple.groom}
            <span className="block font-accent text-[#FFF6E3] leading-[0.7]" style={{ fontSize: '0.7em', WebkitTextStroke: '0.6px #FFF6E3' }}>
              &amp;
            </span>
            {invite.couple.bride}
          </h1>
          <p className="mt-2 font-label font-bold text-[#FFF6E3] text-sm tracking-[0.35em]" style={shadow}>
            {invite.dateDisplay}
          </p>
        </div>

        {/* Anel (centro exacto na fita, 15% acima do fundo) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 translate-y-1/2"
          style={{ bottom: '15%' }}
        >
          <RingButton onClick={handleOpen} disabled={opening} />
        </div>

        <button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="absolute inset-x-0 mx-auto flex w-fit max-w-[19rem] flex-col items-center gap-1 px-3 text-center disabled:pointer-events-none"
          style={{ bottom: 'max(3.5%, env(safe-area-inset-bottom))' }}
        >
          <span
            className="font-label font-extrabold uppercase text-gold-bright text-[0.72rem] sm:text-sm tracking-[0.16em] leading-snug"
            style={{ ...shadow, textWrap: 'balance' }}
          >
            Clique no anel para abrir o convite
          </span>
        </button>
      </motion.div>
    </div>
  )
}
