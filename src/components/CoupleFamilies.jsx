import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

function Heart() {
  return (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20 9.5c0 6.1-8 11-8 11Z" />
    </svg>
  )
}

function Person({ person, delay }) {
  return (
    <Reveal delay={delay} y={26}>
      <div className="text-center">
        <h3 className="font-name text-ink text-[clamp(4.8rem,25vw,7.2rem)] leading-[1.05]">{person.name}</h3>
        <p className="mt-3 font-body text-base text-ink/90">{person.label}</p>
        {person.parents.map((parent) => (
          <p key={parent} className="font-body text-lg font-semibold text-ink leading-snug">
            {parent}
          </p>
        ))}
      </div>
    </Reveal>
  )
}

export default function CoupleFamilies() {
  const { photo, groom, bride } = invite.families

  return (
    <section className="relative bg-sand border-y border-gold/50 px-6 py-20 overflow-hidden">
      <div className="mx-auto max-w-xl text-center">
        <Reveal y={20}>
          <p className="font-label tracking-widest2 text-sm text-gold-dark uppercase mb-8">Os noivos</p>

          <div className="relative mx-auto h-56 w-56 md:h-64 md:w-64">
            <span className="absolute -inset-3 rounded-full border border-gold/70" aria-hidden="true" />
            <img
              src={photo}
              alt={`${groom.name} e ${bride.name}`}
              loading="lazy"
              className="h-full w-full rounded-full border-4 border-linen object-cover shadow-[0_18px_40px_-16px_rgba(40,28,14,0.6)]"
            />
          </div>
        </Reveal>

        <div className="mt-10">
          <Person person={groom} delay={0.05} />

          <Reveal delay={0.1} y={14}>
            <div className="my-8 flex items-center justify-center gap-4 text-wine">
              <span className="h-px w-16 bg-wine/40" aria-hidden="true" />
              <Heart />
              <span className="h-px w-16 bg-wine/40" aria-hidden="true" />
            </div>
          </Reveal>

          <Person person={bride} delay={0.05} />
        </div>
      </div>
    </section>
  )
}
