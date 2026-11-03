import { useRef, useState } from 'react'
import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

const icon = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* continua para o método alternativo */
  }
  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    area.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

function CopyButton({ value, label }) {
  const [state, setState] = useState('idle') // idle | ok | fail
  const timer = useRef(null)

  const handle = async () => {
    const ok = await copyText(value)
    setState(ok ? 'ok' : 'fail')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2200)
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={`Copiar ${label}`}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 font-label text-[0.7rem] font-extrabold uppercase tracking-[0.1em] transition-colors duration-200 active:scale-[0.97] ${
        state === 'ok'
          ? 'bg-[#1F6B3A] text-white'
          : 'bg-wine text-white hover:bg-wine-light'
      }`}
    >
      {state === 'ok' ? (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" {...icon} strokeWidth="2.4"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
          Copiado
        </>
      ) : state === 'fail' ? (
        'Copie à mão'
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" {...icon}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
          Copiar
        </>
      )}
    </button>
  )
}

function DataRow({ label, value, display, copyLabel }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-white/70 px-4 py-3">
      <div className="min-w-0 text-left">
        <p className="font-label text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-sage">{label}</p>
        <p className="mt-0.5 font-label text-[1rem] font-bold tracking-[0.03em] text-ink tabular-nums leading-snug [overflow-wrap:anywhere]">
          {display || value}
        </p>
      </div>
      <CopyButton value={value} label={copyLabel || label} />
    </div>
  )
}

function Card({ option, iconNode, title, subtitle, children, delay }) {
  return (
    <Reveal delay={delay} y={22}>
      <div className="rounded-2xl border border-gold/50 bg-linen/90 p-5 text-left shadow-[0_14px_32px_-20px_rgba(46,42,36,0.55)]">
        {option && (
          <span className="mb-3 inline-block rounded-full bg-gold-bright px-3 py-1 font-label text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-night">
            {option}
          </span>
        )}
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">{iconNode}</span>
          <div>
            <h4 className="font-display text-xl text-ink leading-tight">{title}</h4>
            {subtitle && <p className="font-body text-sm text-ink/85">{subtitle}</p>}
          </div>
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </Reveal>
  )
}

const groupNib = (nib) => nib.replace(/(\d{4})(?=\d)/g, '$1 ')

export default function GiftSection() {
  const { title, highlightTitle, highlightText, envelope, bank, emola, thanks } = invite.gifts

  return (
    <section className="relative px-6 py-20 max-w-xl mx-auto text-center">
      <Reveal y={20}>
        <p className="font-label tracking-widest2 text-sm text-sage uppercase mb-3">Com carinho</p>
        <h3 className="font-accent text-5xl md:text-6xl text-wine leading-none mb-7">{title}</h3>

        {/* Mensagem dos noivos, bem destacada */}
        <div className="mb-9 rounded-2xl bg-wine px-6 py-7 text-white shadow-[0_18px_36px_-18px_rgba(110,42,56,0.9)]">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-gold-bright">
            <svg width="30" height="30" viewBox="0 0 24 24" {...icon}>
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
              <path d="M12 8c-1.6-3.4-5.5-3.2-5.5-.8C6.5 8.7 9 8 12 8Zm0 0c1.6-3.4 5.5-3.2 5.5-.8C17.5 8.7 15 8 12 8Z" />
            </svg>
          </span>
          <h4 className="font-display text-2xl md:text-3xl leading-snug text-gold-bright" style={{ textWrap: 'balance' }}>
            {highlightTitle}
          </h4>
          <p className="mt-3 font-body text-base md:text-lg leading-relaxed text-white/95" style={{ textWrap: 'balance' }}>
            {highlightText}
          </p>
        </div>
      </Reveal>

      <div className="space-y-5">
        <Card
          delay={0}
          option={envelope.option}
          title={envelope.title}
          subtitle={envelope.note}
          iconNode={
            <svg width="26" height="26" viewBox="0 0 24 24" {...icon}>
              <rect x="3" y="5.5" width="18" height="13" rx="2" />
              <path d="M3.5 7l8.5 6 8.5-6" />
            </svg>
          }
        />

        <Card
          delay={0.05}
          option={bank.option}
          title={bank.title}
          subtitle={bank.bank}
          iconNode={
            <svg width="26" height="26" viewBox="0 0 24 24" {...icon}>
              <path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
            </svg>
          }
        >
          <DataRow label="Número da conta" value={bank.account} copyLabel="número da conta" />
          <DataRow label="NIB" value={bank.nib} display={groupNib(bank.nib)} copyLabel="NIB" />
        </Card>

        <Card
          delay={0.1}
          option={emola.option}
          title={emola.title}
          subtitle={`Em nome de ${emola.holder}`}
          iconNode={
            <svg width="26" height="26" viewBox="0 0 24 24" {...icon}>
              <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
              <path d="M11 18.5h2" />
            </svg>
          }
        >
          <DataRow label="Número Emola" value={emola.number} copyLabel="número Emola" />
        </Card>
      </div>

      <Reveal delay={0.1} y={14}>
        <p className="mt-6 font-body text-sm text-ink/85">
          Toque em <strong>Copiar</strong> e cole na sua aplicação bancária ou no Emola.
        </p>
        <p className="mt-4 font-accent text-3xl text-wine leading-tight">{thanks}</p>
      </Reveal>
    </section>
  )
}
