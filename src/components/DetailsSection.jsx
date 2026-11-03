import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

function Divider() {
  return <div className="hidden md:block w-px h-16 bg-gold/40 mx-8" />
}

export default function DetailsSection() {
  return (
    <section className="relative px-6 py-20 text-center">
      <Reveal y={20}>
        <p className="font-label tracking-widest2 text-sm text-sage uppercase mb-10">
          Reserve a data
        </p>
      </Reveal>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
        <Reveal delay={0}>
          <div>
            <div className="w-16 h-px bg-ink/50 mx-auto mb-3" />
            <p className="font-label tracking-widest2 text-lg">{invite.weekday}</p>
            <div className="w-16 h-px bg-ink/50 mx-auto mt-3" />
          </div>
        </Reveal>

        <Divider />

        <Reveal delay={0.12}>
          <div>
            <p className="font-body text-sm tracking-widest2 text-sage uppercase">{invite.month}</p>
            <p className="font-display text-7xl md:text-8xl leading-none my-1 text-wine">
              {invite.day}
            </p>
            <p className="font-body text-sm tracking-widest2 text-sage">
              {invite.year.split('').join(' ')}
            </p>
          </div>
        </Reveal>

        <Divider />

        <Reveal delay={0.24}>
          <div>
            <p className="font-label tracking-widest2 text-lg">{invite.time}</p>
            <p className="font-body text-xs italic text-sage mt-1">início das cerimónias</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
