import { useEffect, useState } from 'react'
import { invite } from '../data.js'
import Reveal from './Reveal.jsx'
import { buildGoogleCalendarUrl } from '../utils/calendar.js'

const icon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

function CalendarPlus() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...icon}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...icon}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

// Detecta o telemóvel para destacar a melhor opção
function detectPlatform() {
  if (typeof navigator === 'undefined') return null
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ios'
  if (/SamsungBrowser|SM-|Samsung/i.test(ua)) return 'samsung'
  if (/Android/i.test(ua)) return 'google'
  return null
}

function Option({ href, download, target, rel, title, subtitle, recommended, primary }) {
  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-transform duration-200 active:scale-[0.99] ${
        primary
          ? 'border-wine bg-wine text-white shadow-[0_14px_30px_-14px_rgba(110,42,56,0.8)]'
          : 'border-gold/60 bg-linen/90 text-ink shadow-sm hover:bg-white'
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          primary ? 'bg-white/15 text-gold-bright' : 'bg-wine/10 text-wine'
        }`}
      >
        <CalendarPlus />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-label text-[0.8rem] font-extrabold uppercase tracking-[0.12em]">{title}</span>
        <span className={`mt-0.5 block font-body text-sm ${primary ? 'text-white/90' : 'text-ink/80'}`}>{subtitle}</span>
      </span>
      <span className={primary ? 'text-gold-bright' : 'text-wine'}>
        <Chevron />
      </span>
      {recommended && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-gold-bright px-3 py-0.5 font-label text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-night shadow">
          Recomendado
        </span>
      )}
    </a>
  )
}

export default function AddToCalendar() {
  const [platform, setPlatform] = useState(null)
  useEffect(() => setPlatform(detectPlatform()), [])

  const googleUrl = buildGoogleCalendarUrl(invite.calendar, invite.eventTimezone)

  const options = [
    {
      key: 'ios',
      title: 'iPhone / iPad',
      subtitle: 'Calendário da Apple · toque em “Adicionar”',
      href: invite.icsFile,
    },
    {
      key: 'samsung',
      title: 'Samsung / Android',
      subtitle: 'Calendário Samsung · abra o ficheiro descarregado',
      href: invite.icsFile,
      download: 'casamento-gabriel-albertina.ics',
    },
    {
      key: 'google',
      title: 'Google Calendar',
      subtitle: 'Abre direto no Google Calendar',
      href: googleUrl,
      target: '_blank',
      rel: 'noreferrer',
    },
  ]

  // opção recomendada sobe para o topo
  const ordered = [...options].sort((a, b) => (a.key === platform ? -1 : b.key === platform ? 1 : 0))

  return (
    <section className="relative px-6 py-16 max-w-xl mx-auto text-center">
      <Reveal y={20}>
        <p className="font-label tracking-widest2 text-sm text-sage uppercase mb-3">Não se esqueça</p>
        <h3 className="font-accent text-5xl md:text-6xl text-wine leading-none mb-5">Guarde a data</h3>

        <div className="mx-auto mb-3 inline-flex items-center gap-4 rounded-2xl border border-gold/60 bg-linen/90 px-5 py-3 shadow-sm">
          <div className="text-center leading-none">
            <p className="font-label text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-sage">Dez</p>
            <p className="font-display text-4xl text-wine">{invite.day}</p>
          </div>
          <div className="h-10 w-px bg-gold/60" />
          <div className="text-left">
            <p className="font-display text-lg text-ink leading-tight">{invite.weekday.charAt(0) + invite.weekday.slice(1).toLowerCase()}, {invite.year}</p>
            <p className="font-body text-sm text-ink/80">a partir das {invite.time.toLowerCase()}</p>
          </div>
        </div>

        <p className="mx-auto mb-8 max-w-sm font-body text-base text-ink">
          Escolha o seu telemóvel e o lembrete fica guardado no seu calendário.
        </p>
      </Reveal>

      <Reveal delay={0.12} y={20}>
        <div className="flex flex-col gap-4">
          {ordered.map((o, i) => (
            <Option
              key={o.key}
              href={o.href}
              download={o.download}
              target={o.target}
              rel={o.rel}
              title={o.title}
              subtitle={o.subtitle}
              recommended={platform === o.key}
              primary={platform ? o.key === platform : i === 0 && false}
            />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} y={16}>
        <p className="mt-6 font-body text-sm text-ink/80 leading-relaxed">
          O lembrete avisa <strong>1 dia antes</strong> e <strong>3 horas antes</strong> da cerimónia.
          <br />
          Se o ficheiro for descarregado, toque nele para abrir no Calendário.
        </p>
      </Reveal>
    </section>
  )
}
