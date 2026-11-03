import { useState } from 'react'
import { invite } from '../data.js'
import Reveal from './Reveal.jsx'

// Endpoint do Google Apps Script (Web App). Também está em src/data.js (rsvpEndpoint).
const ENDPOINT =
  invite.rsvpEndpoint ||
  'https://script.google.com/macros/s/AKfycbwCXlYiAGJLs1ZOhwaAwlKawJFQWVzCou-qK8j5KI0n8lWTOkYVE2lE76DBJSlBhSth/exec'

const RELATIONS = [
  'Família',
  'Amigo(a)',
  'Colega de Trabalho',
  'Vizinho(a)',
  'Igreja / Comunidade',
  'Outro',
]

const EMPTY = { nomeCompleto: '', grauParentesco: '', idade: '', email: '' }

const inputClass =
  'w-full rounded-xl border border-sand bg-linen/90 px-4 py-3.5 font-body text-base text-ink ' +
  'placeholder:text-sage/50 shadow-inner shadow-sand/30 outline-none transition duration-200 ' +
  'hover:border-gold-light focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/20 ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const labelClass = 'block mb-2 font-label text-xs tracking-widest2 uppercase text-wine'

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function RSVPForm() {
  const [formData, setFormData] = useState(EMPTY)
  const [outroTexto, setOutroTexto] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const isOutro = formData.grauParentesco === 'Outro'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (status) setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    const payload = {
      nomeCompleto: formData.nomeCompleto.trim(),
      grauParentesco: isOutro ? outroTexto.trim() : formData.grauParentesco,
      idade: formData.idade,
      email: formData.email.trim(),
    }

    setLoading(true)
    setStatus(null)

    try {
      // 'no-cors': o Google Apps Script não envia cabeçalhos CORS. O pedido é entregue,
      // mas a resposta fica "opaca" (não é possível lê-la no browser).
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      setStatus('success')
      setFormData(EMPTY)
      setOutroTexto('')
    } catch (err) {
      console.error('Erro ao enviar RSVP:', err)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rsvp" className="relative px-5 py-24 max-w-xl mx-auto">
      <Reveal y={20}>
        <div className="text-center">
          <h3 className="font-accent text-5xl md:text-6xl text-wine leading-[1.05] mb-4">
            Confirmação de Presença (RSVP)
          </h3>
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-body text-base text-ink leading-relaxed max-w-md mx-auto">
            Por favor, preencha os dados abaixo com o seu nome e informações para confirmar a sua
            presença no nosso evento. Certifique-se de preencher todos os campos antes de enviar.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15} y={20}>
        <form
          onSubmit={handleSubmit}
          noValidate={false}
          className="mt-10 rounded-3xl border border-gold/25 bg-parchment/80 p-6 sm:p-9 shadow-[0_24px_60px_-28px_rgba(46,42,36,0.45)] backdrop-blur-sm"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="nomeCompleto" className={labelClass}>
                Nome completo <span aria-hidden="true">*</span>
              </label>
              <input
                id="nomeCompleto"
                name="nomeCompleto"
                type="text"
                required
                autoComplete="name"
                placeholder="Ex.: Maria da Silva"
                value={formData.nomeCompleto}
                onChange={handleChange}
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="grauParentesco" className={labelClass}>
                Grau de parentesco / relação <span aria-hidden="true">*</span>
              </label>
              <select
                id="grauParentesco"
                name="grauParentesco"
                required
                value={formData.grauParentesco}
                onChange={handleChange}
                disabled={loading}
                className={inputClass}
              >
                <option value="" disabled>
                  Selecione a sua relação com os noivos
                </option>
                {RELATIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {isOutro && (
                <input
                  type="text"
                  required
                  aria-label="Descreva a sua relação com os noivos"
                  placeholder="Descreva a sua relação com os noivos"
                  value={outroTexto}
                  onChange={(e) => {
                    setOutroTexto(e.target.value)
                    if (status) setStatus(null)
                  }}
                  disabled={loading}
                  className={`${inputClass} mt-3`}
                />
              )}
            </div>

            <div>
              <label htmlFor="idade" className={labelClass}>
                Idade <span aria-hidden="true">*</span>
              </label>
              <input
                id="idade"
                name="idade"
                type="number"
                inputMode="numeric"
                required
                min="0"
                max="120"
                placeholder="Ex.: 30"
                value={formData.idade}
                onChange={handleChange}
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                E-mail <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-5 font-label text-sm uppercase tracking-[0.2em] text-linen
              bg-gradient-to-br from-gold-light via-gold to-gold-dark
              shadow-[0_14px_32px_-10px_rgba(140,106,44,0.75)]
              transition duration-300
              hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-10px_rgba(140,106,44,0.85)] hover:brightness-105
              active:translate-y-0 active:scale-[0.98] active:brightness-95
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40
              disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100"
          >
            {loading && <Spinner />}
            {loading ? 'A enviar confirmação...' : 'Confirmar presença'}
          </button>

          <div aria-live="polite" className="mt-6">
            {status === 'success' && (
              <div
                role="status"
                className="rounded-2xl border border-gold/40 bg-linen px-5 py-4 text-center"
              >
                <p className="font-accent text-3xl text-wine leading-tight">
                  Presença confirmada com sucesso!
                </p>
                <p className="mt-1 font-body text-sm text-ink">
                  Mal podemos esperar por tê-lo connosco.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div
                role="alert"
                className="rounded-2xl border border-wine/40 bg-wine/5 px-5 py-4 text-center font-body text-sm text-wine"
              >
                Não foi possível enviar a confirmação. Verifique a sua ligação à internet e tente
                novamente.
              </div>
            )}
          </div>
        </form>
      </Reveal>

      {invite.rsvpNotice && (
        <Reveal delay={0.25} y={18}>
          <div role="note" className="mt-10 rounded-xl border border-wine/25 bg-linen/70 px-5 py-4 text-left">
            <p className="font-label text-xs tracking-widest2 uppercase text-wine mb-2">Aviso</p>
            <p className="font-body text-sm text-ink leading-relaxed uppercase tracking-wide">
              {invite.rsvpNotice}.
            </p>
          </div>
        </Reveal>
      )}
    </section>
  )
}
