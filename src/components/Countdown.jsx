import { useEffect, useState } from 'react'
import { invite } from '../data.js'
import Reveal from './Reveal.jsx'
import { formatCountdown, padDisplay } from '../utils/calendar.js'

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center min-w-0 md:min-w-[5.5rem] px-1 md:px-3 py-4 md:py-5 rounded-xl border border-gold/50 bg-linen/90 shadow-sm">
      <span className="font-display text-3xl md:text-5xl leading-none text-wine tabular-nums">
        {padDisplay(value)}
      </span>
      <span className="mt-2 font-body text-[0.55rem] md:text-xs tracking-[0.2em] md:tracking-widest2 text-sage uppercase">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(() =>
    formatCountdown(new Date(invite.eventDate).getTime() - Date.now()),
  )

  useEffect(() => {
    const target = new Date(invite.eventDate).getTime()

    const tick = () => {
      setRemaining(formatCountdown(target - Date.now()))
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative px-6 py-16 text-center">
      <Reveal y={20}>
        <p className="font-label tracking-widest2 text-sm text-gold-dark uppercase mb-3">
          Faltam
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-wine mb-3">
          {remaining.finished ? 'Chegou o grande dia!' : 'Para o nosso casamento'}
        </h3>
        <div className="mb-8" />
      </Reveal>

      <Reveal delay={0.12} y={20}>
        <div className="grid grid-cols-4 md:flex md:flex-wrap items-center justify-center gap-2 md:gap-4 max-w-md md:max-w-none mx-auto">
          <CountdownUnit value={remaining.days} label="Dias" />
          <CountdownUnit value={remaining.hours} label="Horas" />
          <CountdownUnit value={remaining.minutes} label="Minutos" />
          <CountdownUnit value={remaining.seconds} label="Segundos" />
        </div>
      </Reveal>
    </section>
  )
}
