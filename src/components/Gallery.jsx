import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

const AUTOPLAY_MS = 4000
const SLIDE_MS = 900
const GAP = 20

const arrow = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

function Lightbox({ index, onClose, onChange }) {
  const photos = invite.gallery
  const next = useCallback(() => onChange((index + 1) % photos.length), [index, onChange, photos.length])
  const prev = useCallback(
    () => onChange((index - 1 + photos.length) % photos.length),
    [index, onChange, photos.length],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-night/95 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de fotos"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-linen/30 text-linen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" {...arrow}><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Foto anterior"
        className="absolute left-3 md:left-8 flex h-11 w-11 items-center justify-center rounded-full border border-linen/30 text-linen bg-night/40"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" {...arrow}><path d="M15 5l-7 7 7 7" /></svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={photos[index].src}
          src={photos[index].src}
          alt={photos[index].alt}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Foto seguinte"
        className="absolute right-3 md:right-8 flex h-11 w-11 items-center justify-center rounded-full border border-linen/30 text-linen bg-night/40"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" {...arrow}><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <p className="absolute bottom-5 font-label text-xs tracking-widest2 text-linen/70">
        {index + 1} / {photos.length}
      </p>
    </motion.div>
  )
}

export default function Gallery() {
  const photos = invite.gallery
  const n = photos.length
  // 3 cópias seguidas: o carrossel anda sempre para a frente e "salta" em silêncio para a cópia do meio
  const items = [...photos, ...photos, ...photos]

  const viewportRef = useRef(null)
  const cardRef = useRef(null)
  const dragRef = useRef({ startX: 0, moved: 0, active: false })
  const [metrics, setMetrics] = useState({ container: 0, card: 0 })
  const [idx, setIdx] = useState(n)
  const [animate, setAnimate] = useState(true)
  const [open, setOpen] = useState(null)
  const [interaction, setInteraction] = useState(0)

  // medir o ecrã e o tamanho das fotos
  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !cardRef.current) return
      setMetrics({ container: viewportRef.current.clientWidth, card: cardRef.current.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // rolar sem parar: uma foto a cada 4 segundos, em ciclo infinito
  useEffect(() => {
    if (open !== null) return undefined
    const timer = setInterval(() => setIdx((i) => i + 1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [open, interaction])

  // depois de cada deslize, se saiu da cópia do meio, volta para ela sem se notar
  useEffect(() => {
    if (!animate || (idx >= n && idx < 2 * n)) return undefined
    const timer = setTimeout(() => {
      setAnimate(false)
      setIdx((i) => (i >= 2 * n ? i - n : i + n))
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    }, SLIDE_MS + 60)
    return () => clearTimeout(timer)
  }, [idx, animate, n])

  const go = useCallback((dir) => {
    setIdx((i) => i + dir)
    setInteraction((x) => x + 1)
  }, [])

  const goToDot = (k) => {
    setIdx(n + k)
    setInteraction((x) => x + 1)
  }

  // deslizar com o dedo / rato
  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, moved: 0, active: true }
  }
  const onPointerMove = (e) => {
    if (dragRef.current.active) dragRef.current.moved = e.clientX - dragRef.current.startX
  }
  const onPointerUp = () => {
    const { moved, active } = dragRef.current
    dragRef.current.active = false
    if (active && Math.abs(moved) > 45) go(moved < 0 ? 1 : -1)
  }

  const openPhoto = (i) => {
    if (Math.abs(dragRef.current.moved) > 10) return
    setOpen(i % n)
  }

  const step = metrics.card + GAP
  const offset = (metrics.container - metrics.card) / 2 - idx * step
  const active = ((idx % n) + n) % n

  return (
    <section className="relative py-16">
      <Reveal y={20}>
        <p className="font-label text-center tracking-widest2 text-sm text-sage uppercase mb-3">
          Galeria
        </p>
        <h3 className="font-accent text-center text-5xl md:text-6xl text-wine leading-none mb-10 px-6">
          O nosso amor em imagens
        </h3>
      </Reveal>

      <div className="relative max-w-5xl mx-auto">
        <div
          ref={viewportRef}
          className="overflow-hidden py-3 select-none"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="flex will-change-transform"
            style={{
              gap: GAP,
              transform: `translate3d(${offset}px,0,0)`,
              transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : 'none',
            }}
          >
            {items.map((photo, i) => {
              const isActive = i === idx
              return (
                <button
                  key={`${photo.src}-${i}`}
                  ref={i === 0 ? cardRef : null}
                  type="button"
                  onClick={() => openPhoto(i)}
                  aria-label={`Ampliar foto ${(i % n) + 1}`}
                  className={`group relative shrink-0 w-[70vw] max-w-[300px] aspect-[3/4] overflow-hidden rounded-t-full rounded-b-2xl border border-gold/60 bg-parchment shadow-[0_18px_40px_-20px_rgba(46,42,36,0.6)] transition-all duration-700 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-[0.9] opacity-60'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={i < n * 2 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="pointer-events-none absolute inset-[6px] rounded-t-full rounded-b-xl border border-linen/50" />
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full border border-gold bg-linen text-wine shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" {...arrow}><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto seguinte"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full border border-gold bg-linen text-wine shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" {...arrow}><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Ir para a foto ${i + 1}`}
            onClick={() => goToDot(i)}
            className="p-1.5"
          >
            <span className={`block h-2.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-wine' : 'w-2.5 bg-wine/35'}`} />
          </button>
        ))}
      </div>

      <p className="mt-2 text-center font-body text-sm text-ink/85">Toque numa foto para ampliar</p>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
      </AnimatePresence>
    </section>
  )
}
