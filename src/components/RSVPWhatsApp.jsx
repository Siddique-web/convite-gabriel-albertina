import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 1 1 12.04 20.1Zm4.45-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06a6.63 6.63 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

export function buildWhatsAppUrl() {
  const number = invite.whatsappNumber.replace(/\D/g, '')
  const text = encodeURIComponent(invite.whatsappMessage)
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
}

export default function RSVPWhatsApp() {
  return (
    <section className="relative px-6 py-24 max-w-xl mx-auto text-center">
      <Reveal y={20}>
        <p className="font-label tracking-widest2 text-sm text-sage uppercase mb-3">
          Confirmar presença
        </p>
      </Reveal>

      <Reveal delay={0.1} y={20}>
        <h3 className="font-accent text-5xl md:text-6xl text-wine leading-[1.05] mb-4">{invite.closingLine}</h3>
        <p className="font-body text-base text-ink mb-10 max-w-sm mx-auto">
          Toque no botão: o WhatsApp abre com a mensagem pronta, basta enviar.
        </p>
      </Reveal>

      <Reveal delay={0.2} y={20} className="flex justify-center">
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 rounded-full whitespace-nowrap bg-gradient-to-br from-gold-light via-gold to-gold-dark text-linen font-label tracking-[0.2em] uppercase text-sm shadow-[0_12px_30px_-10px_rgba(140,106,44,0.7)] hover:scale-105 transition-transform duration-300"
        >
          <WhatsAppIcon />
          Confirmar presença
        </a>
      </Reveal>

      <Reveal delay={0.3} y={18}>
        <div
          role="note"
          className="mt-12 rounded-xl border border-wine/25 bg-linen/70 px-5 py-4 text-left"
        >
          <p className="font-label text-xs tracking-widest2 uppercase text-wine mb-2">Aviso</p>
          <p className="font-body text-sm text-ink leading-relaxed uppercase tracking-wide">
            {invite.rsvpNotice}.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
