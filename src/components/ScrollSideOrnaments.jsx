import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloralSprig from './FloralSprig.jsx'

gsap.registerPlugin(ScrollTrigger)

const ORNAMENTS = [
  { side: 'left', position: '18%', depth: 0.6 },
  { side: 'right', position: '32%', depth: 0.8 },
  { side: 'left', position: '48%', depth: 0.7 },
  { side: 'right', position: '64%', depth: 0.65 },
  { side: 'left', position: '80%', depth: 0.75 },
]

function SideOrnament({ side, position, depth, enabled }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled || !ref.current) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const fromX = side === 'left' ? -90 : 90
    const fromRotateY = side === 'left' ? 48 : -48

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          x: fromX,
          rotateY: fromRotateY,
          z: -140 * depth,
          opacity: 0,
          scale: 0.75,
          force3D: true,
        },
        {
          x: 0,
          rotateY: side === 'left' ? 8 : -8,
          z: 20,
          opacity: 0.5,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 95%',
            end: 'top 55%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [side, depth, enabled])

  return (
    <div
      ref={ref}
      className={`scroll-ornament pointer-events-none absolute z-0 ${
        side === 'left' ? 'left-1 md:left-6' : 'right-1 md:right-6'
      }`}
      style={{ top: position }}
      aria-hidden="true"
    >
      <FloralSprig flip={side === 'right'} className="w-12 md:w-16 opacity-80" />
    </div>
  )
}

export default function ScrollSideOrnaments({ enabled = true }) {
  if (!enabled) return null

  return (
    <div className="scroll-ornaments pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {ORNAMENTS.map((item, index) => (
        <SideOrnament key={`${item.side}-${index}`} {...item} enabled={enabled} />
      ))}
    </div>
  )
}
