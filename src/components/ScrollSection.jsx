import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function refreshScrollTriggers() {
  ScrollTrigger.refresh(true)
}

export default function ScrollSection({
  children,
  depth = 1,
  tilt = 'none',
  index,
  className = '',
  enabled = true,
}) {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  const resolvedTilt =
    tilt !== 'none'
      ? tilt
      : typeof index === 'number'
        ? index % 2 === 0
          ? 'left'
          : 'right'
        : 'none'

  useEffect(() => {
    if (!enabled) return undefined

    const section = sectionRef.current
    const inner = innerRef.current
    if (!section || !inner) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const rotateYStart =
      resolvedTilt === 'left' ? 10 * depth : resolvedTilt === 'right' ? -10 * depth : 0

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        {
          rotateX: 24 * depth,
          rotateY: rotateYStart,
          y: 100 * depth,
          z: -180 * depth,
          scale: 0.9,
          opacity: 0.15,
          transformPerspective: 1100,
          transformOrigin: '50% 88%',
          force3D: true,
        },
        {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          z: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 96%',
            end: 'top 28%',
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [depth, resolvedTilt, enabled])

  return (
    <div ref={sectionRef} data-depth={depth} className={`scroll-section ${className}`}>
      <div ref={innerRef} className="scroll-section-inner">
        {children}
      </div>
    </div>
  )
}

export function useHeroScroll3D(enabled, heroRef) {
  useEffect(() => {
    if (!enabled) return undefined

    const hero = heroRef.current
    if (!hero) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      const inner = hero.querySelector('.hero-scroll-inner')
      if (!inner) return

      gsap.to(inner, {
        y: -80,
        rotateX: 8,
        z: -60,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })
    }, hero)

    return () => ctx.revert()
  }, [enabled, heroRef])
}

export function useCoupleNames3D(enabled, namesRef) {
  useEffect(() => {
    if (!enabled) return undefined

    const el = namesRef.current
    if (!el) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.to(el, {
        rotateY: -12,
        rotateX: 8,
        z: 70,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray(el.querySelectorAll('.couple-name-line')).forEach((line, i) => {
        gsap.fromTo(
          line,
          { z: 20 + i * 20, rotateX: i === 0 ? -6 : 6 },
          {
            z: 60 + i * 40,
            rotateX: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 25%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, el)

    return () => ctx.revert()
  }, [enabled, namesRef])
}
