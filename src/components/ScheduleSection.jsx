import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

function Icon({ name }) {
  if (name === 'rings') {
    return (
      <svg width="26" height="26" viewBox="0 0 32 32" {...stroke}>
        <circle cx="12" cy="20" r="7" />
        <circle cx="21" cy="20" r="7" />
        <path d="M9 9l3-4h4l3 4-5 5z" />
      </svg>
    )
  }
  if (name === 'church') {
    return (
      <svg width="26" height="26" viewBox="0 0 32 32" {...stroke}>
        <path d="M16 2v7M13 5h6" />
        <path d="M8 29V16l8-6 8 6v13z" />
        <path d="M13 29v-7a3 3 0 016 0v7" />
        <path d="M3 29h26" />
      </svg>
    )
  }
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" {...stroke}>
      <path d="M9 4h14l-1 8a6 6 0 01-12 0z" />
      <path d="M16 18v9M11 28h10" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

export default function ScheduleSection() {
  return (
    <section className="relative px-6 py-16 max-w-2xl mx-auto">
      <Reveal y={20}>
        <p className="font-label text-center tracking-widest2 text-sm text-sage uppercase mb-3">
          Programa do dia
        </p>
        <h3 className="font-accent text-center text-5xl md:text-6xl text-wine leading-none mb-12">
          Celebre connosco
        </h3>
      </Reveal>

      <div className="relative">
        <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-gold/10 via-gold/50 to-gold/10" />

        <ol className="space-y-8">
          {invite.schedule.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} y={22}>
              <li className="relative pl-16">
                <span className="absolute left-0 top-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-linen text-gold-dark shadow-sm">
                  <Icon name={item.icon} />
                </span>

                <div className="rounded-2xl border border-gold/25 bg-linen/70 backdrop-blur-sm px-5 py-5 text-left shadow-[0_10px_30px_-18px_rgba(46,42,36,0.35)]">
                  <p className="font-display text-3xl text-wine leading-none">
                    {item.time}
                  </p>
                  <p className="mt-2 font-display text-lg md:text-xl">{item.title}</p>
                  <p className="mt-1 font-body text-base text-ink">{item.location}</p>
                  {item.note && <p className="mt-1 font-body text-sm italic text-sage">{item.note}</p>}

                  <a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver ${item.location} no Google Maps`}
                    className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-wine px-3 py-3.5 font-label text-[0.72rem] font-extrabold uppercase tracking-[0.06em] whitespace-nowrap text-white shadow-[0_12px_24px_-12px_rgba(110,42,56,0.9)] ring-1 ring-wine-light transition-transform duration-200 active:scale-[0.98] hover:bg-wine-light"
                  >
                    <PinIcon />
                    Ver no Google Maps
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
