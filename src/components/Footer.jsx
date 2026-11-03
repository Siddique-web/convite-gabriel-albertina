import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 text-center bg-night">
      <Reveal y={12}>
        <p className="font-monogram text-gold-bright text-7xl md:text-8xl leading-none mb-4 tracking-[0.08em]" style={{ WebkitTextStroke: '1px currentColor' }}>
          {invite.monogram}
        </p>
      </Reveal>
      <Reveal delay={0.1} y={12}>
        <p className="font-label text-linen text-sm md:text-base tracking-[0.35em] uppercase">
          {invite.day} {invite.month} {invite.year}
        </p>
        <p className="mt-3 font-body text-sm italic text-linen/85">{invite.coupleNames}</p>
      </Reveal>
    </footer>
  )
}
