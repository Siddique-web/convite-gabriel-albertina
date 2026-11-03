import { forwardRef } from 'react'
import { invite } from '../data.js'

const nameClass =
  'couple-name-line font-name text-[clamp(4.8rem,25vw,7.2rem)] md:text-8xl lg:text-9xl leading-[1] text-gold-bright'
const nameShadow = { textShadow: '0 3px 14px rgba(0,0,0,0.9), 0 0 28px rgba(0,0,0,0.55)', WebkitTextStroke: '0.5px #F5DC9A' }

const CoupleNames = forwardRef(function CoupleNames({ className = '' }, ref) {
  return (
    <div ref={ref} data-couple-names className={`couple-names-3d ${className}`}>
      <div className="relative inline-block">
        <div className="flex flex-col items-center">
          <span className={nameClass} style={nameShadow}>
            {invite.couple.groom}
          </span>

          <span
            className="font-accent text-5xl md:text-6xl leading-none text-[#FFF6E3] -my-1"
            style={{ textShadow: '0 3px 10px rgba(0,0,0,0.85)' }}
          >
            &amp;
          </span>

          <span className={nameClass} style={nameShadow}>
            {invite.couple.bride}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold-bright/70" />
          <span className="font-label text-xs md:text-sm font-bold tracking-widest2 text-[#FFF6E3] uppercase">
            {invite.day} · 12 · {invite.year}
          </span>
          <span className="h-px w-10 bg-gold-bright/70" />
        </div>
      </div>
    </div>
  )
})

export default CoupleNames
