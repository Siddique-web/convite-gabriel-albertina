import RingsArt from './RingsArt.jsx'

export default function RingButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Clique no anel para abrir o convite"
      className="group relative block disabled:pointer-events-none"
      style={{ width: 'var(--ring-w)' }}
    >
      <span className="ring-glow absolute -inset-3 rounded-full bg-gold-bright/50 blur-2xl" aria-hidden="true" />
      <RingsArt idp="cv" className="ring-pulse relative block w-full overflow-visible" />
    </button>
  )
}
