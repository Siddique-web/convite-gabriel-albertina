// Ramo de flores secas desenhado em linha, inspirado no imaginário do
// convite (não é uma reprodução de nenhuma imagem existente).
export default function FloralSprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 220"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60 210 C58 160 62 120 55 70" stroke="#6E2A38" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M55 130 C40 118 28 112 16 108" stroke="#6E2A38" strokeWidth="1" strokeLinecap="round" />
      <path d="M57 95 C44 84 34 78 20 74" stroke="#6E2A38" strokeWidth="1" strokeLinecap="round" />
      <path d="M56 150 C68 140 78 136 92 133" stroke="#6E2A38" strokeWidth="1" strokeLinecap="round" />
      <path d="M58 70 C66 55 70 42 66 20" stroke="#8A8368" strokeWidth="1" strokeLinecap="round" />

      {/* botões / flores em elipses soltas, tons quentes */}
      <ellipse cx="16" cy="106" rx="5" ry="3.4" fill="#B4863C" opacity="0.85" transform="rotate(-25 16 106)" />
      <ellipse cx="20" cy="72" rx="4.5" ry="3" fill="#8C4152" opacity="0.85" transform="rotate(10 20 72)" />
      <ellipse cx="92" cy="131" rx="5" ry="3.2" fill="#D9B978" opacity="0.9" transform="rotate(20 92 131)" />
      <ellipse cx="66" cy="18" rx="4" ry="6" fill="#EAE0D2" stroke="#8A8368" strokeWidth="0.6" />
      <circle cx="55" cy="70" r="3.4" fill="#6E2A38" opacity="0.8" />
      <circle cx="46" cy="118" r="3" fill="#B4863C" opacity="0.7" />
      <circle cx="80" cy="140" r="2.6" fill="#8C4152" opacity="0.7" />
    </svg>
  )
}
