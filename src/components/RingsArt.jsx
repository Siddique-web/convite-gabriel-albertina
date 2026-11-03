// Arte dos dois anéis de ouro maciço em forma de infinito (∞), com a fita de cetim a passar pelo meio.
const CY = 65
const CENTERS = [66, 174]
const R = 45.5 // raio central do "tubo" do anel
const HOLE = 35 // raio do furo

// camadas do tubo, de fora para dentro (largura, raio, gradiente, opacidade)
const layers = (idp) => [
  { r: R, w: 21.5, fill: `url(#${idp}1)` },
  { r: R, w: 18.5, fill: `url(#${idp}2)` },
  { r: R + 0.5, w: 12.5, fill: `url(#${idp}3)` },
  { r: R + 2.4, w: 5.5, fill: `url(#${idp}4)` },
  { r: R + 3.6, w: 1.6, fill: '#FFFBE0', opacity: 0.85 },
]

export default function RingsArt({ idp = 'ra', letters = ['G', 'A'], className = '' }) {
  return (
    <svg viewBox="0 0 240 130" className={className} aria-hidden="true">
        <defs>
          {/* luz vinda de cima à esquerda */}
          <linearGradient id={`${idp}1`} gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="220" y2="130">
            <stop offset="0" stopColor="#B07F22" />
            <stop offset="0.5" stopColor="#7C5210" />
            <stop offset="1" stopColor="#4F300A" />
          </linearGradient>
          <linearGradient id={`${idp}2`} gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="220" y2="130">
            <stop offset="0" stopColor="#F0C75A" />
            <stop offset="0.5" stopColor="#C58D26" />
            <stop offset="1" stopColor="#8A5A12" />
          </linearGradient>
          <linearGradient id={`${idp}3`} gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="220" y2="130">
            <stop offset="0" stopColor="#FFE9A0" />
            <stop offset="0.5" stopColor="#E3AE3E" />
            <stop offset="1" stopColor="#A87018" />
          </linearGradient>
          <linearGradient id={`${idp}4`} gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="220" y2="130">
            <stop offset="0" stopColor="#FFFBDA" />
            <stop offset="0.55" stopColor="#F5D679" />
            <stop offset="1" stopColor="#CF9A30" />
          </linearGradient>

          <radialGradient id={`${idp}Hole`} cx="0.55" cy="0.6" r="0.75">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#F6EEDF" />
            <stop offset="1" stopColor="#E4D6BE" />
          </radialGradient>
          <linearGradient id={`${idp}Initial`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C8932B" />
            <stop offset="1" stopColor="#80561A" />
          </linearGradient>
          <linearGradient id={`${idp}RibbonShade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7A5A2E" stopOpacity="0.32" />
            <stop offset="0.18" stopColor="#7A5A2E" stopOpacity="0" />
            <stop offset="0.82" stopColor="#7A5A2E" stopOpacity="0" />
            <stop offset="1" stopColor="#7A5A2E" stopOpacity="0.28" />
          </linearGradient>
          <pattern id={`${idp}Stripes`} width="4" height="3" patternUnits="userSpaceOnUse">
            <rect width="4" height="3" fill="#F6ECDF" />
            <rect y="2" width="4" height="1" fill="#DDCBB4" />
          </pattern>

          <filter id={`${idp}Shadow`} x="-10%" y="-10%" width="120%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.55" result="soft" />
            <feDropShadow in="soft" dx="0" dy="3.5" stdDeviation="3.2" floodColor="#000" floodOpacity="0.55" />
          </filter>
          <filter id={`${idp}Blur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
          <filter id={`${idp}Soft`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>

          {CENTERS.map((cx) => (
            <clipPath id={`${idp}HoleClip${cx}`} key={cx}>
              <circle cx={cx} cy={CY} r={HOLE} />
            </clipPath>
          ))}
        </defs>

        {/* corpo dos anéis */}
        <g filter={`url(#${idp}Shadow)`}>
          {/* aro exterior escuro (dá volume) */}
          {CENTERS.map((cx) => (
            <circle key={`edge${cx}`} cx={cx} cy={CY} r={R} fill="none" stroke="#4A2D07" strokeWidth="23.5" />
          ))}
          {layers(idp).map((l, i) =>
            CENTERS.map((cx) => (
              <circle
                key={`${i}-${cx}`}
                cx={cx - (i > 1 ? 0.8 : 0)}
                cy={CY - (i > 1 ? 1 : 0)}
                r={l.r}
                fill="none"
                stroke={l.fill}
                strokeWidth={l.w}
                opacity={l.opacity ?? 1}
              />
            )),
          )}
        </g>

        {/* brilhos especulares no topo de cada anel */}
        {CENTERS.map((cx) => (
          <ellipse key={`spec${cx}`} cx={cx - 8} cy="12.5" rx="15" ry="2.1" fill="#FFFFFF" opacity="0.75" filter={`url(#${idp}Soft)`} transform={`rotate(-8 ${cx - 8} 12.5)`} />
        ))}

        {/* furos: fundo claro + fita a atravessar + sombra do aro */}
        {CENTERS.map((cx, i) => (
          <g key={`hole${cx}`} clipPath={`url(#${idp}HoleClip${cx})`}>
            <circle cx={cx} cy={CY} r={HOLE + 1} fill={`url(#${idp}Hole)`} />
            {/* fita */}
            <rect x={cx - HOLE} y={CY - 13.5} width={HOLE * 2} height="27" fill={`url(#${idp}Stripes)`} />
            <rect x={cx - HOLE} y={CY - 13.5} width={HOLE * 2} height="27" fill={`url(#${idp}RibbonShade)`} />
            {/* sombra do aro dentro do furo (canto superior esquerdo) */}
            <circle
              cx={cx + 2.5}
              cy={CY + 3.5}
              r={HOLE + 3}
              fill="none"
              stroke="#4A3210"
              strokeOpacity="0.55"
              strokeWidth="9"
              filter={`url(#${idp}Blur)`}
            />
            {/* sombra da fita junto ao aro */}
            <rect x={cx - HOLE} y={CY - 13.5} width="7" height="27" fill="#5A3E16" opacity="0.18" filter={`url(#${idp}Soft)`} />
            <rect x={cx + HOLE - 7} y={CY - 13.5} width="7" height="27" fill="#5A3E16" opacity="0.18" filter={`url(#${idp}Soft)`} />
          </g>
        ))}

        {/* iniciais */}
        <text
          x={CENTERS[0]}
          y="83"
          textAnchor="middle"
          fontSize="60"
          fill={`url(#${idp}Initial)`}
          stroke="#7A5418"
          strokeWidth="1.1"
          style={{ fontFamily: '"Great Vibes", cursive' }}
        >
          {letters[0]}
        </text>
        <text
          x={CENTERS[1]}
          y="83"
          textAnchor="middle"
          fontSize="60"
          fill={`url(#${idp}Initial)`}
          stroke="#7A5418"
          strokeWidth="1.1"
          style={{ fontFamily: '"Great Vibes", cursive' }}
        >
          {letters[1]}
        </text>

        {/* medalhão "&" gravado na junção dos anéis */}
        <g filter={`url(#${idp}Soft)`} opacity="0.5">
          <circle cx="120" cy="68" r="9" fill="#3E2606" />
        </g>
        <circle cx="120" cy={CY} r="9" fill={`url(#${idp}4)`} stroke="#8A5A12" strokeWidth="1.1" />
        <text
          x="120"
          y="70.2"
          textAnchor="middle"
          fontSize="13.5"
          fontWeight="700"
          fill="#6B4510"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          &amp;
        </text>
      </svg>
  )
}
