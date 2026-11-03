import {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { invite } from '../data.js'

const MusicPlayer = forwardRef(function MusicPlayer(
  { playing, onPlayingChange, showControls = true },
  ref,
) {
  const audioRef = useRef(null)
  const [showHint, setShowHint] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  const markFailure = useCallback(() => {
    setLoadFailed(true)
    setShowHint(true)
    onPlayingChange?.(false)
  }, [onPlayingChange])

  // Chamado de forma síncrona no clique do selo — mantém o gesto do utilizador
  useImperativeHandle(ref, () => ({
    playFromGesture() {
      const audio = audioRef.current
      if (!audio || loadFailed) {
        markFailure()
        return Promise.reject(new Error('Audio unavailable'))
      }

      onPlayingChange?.(true)
      return audio.play().catch((err) => {
        markFailure()
        throw err
      })
    },
  }))

  useEffect(() => {
    if (!audioRef.current || loadFailed) return

    if (playing) {
      audioRef.current.play().catch(markFailure)
    } else {
      audioRef.current.pause()
    }
  }, [playing, loadFailed, markFailure])

  const toggle = async () => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
      onPlayingChange?.(false)
      return
    }

    if (loadFailed) {
      setShowHint(true)
      return
    }

    try {
      await audioRef.current.play()
      onPlayingChange?.(true)
      setShowHint(false)
    } catch {
      markFailure()
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={invite.musicSrc}
        loop
        preload="metadata"
        onError={markFailure}
        onCanPlayThrough={() => {
          setLoadFailed(false)
          setShowHint(false)
        }}
      />

      {showControls && (
        <>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pausar música' : 'Tocar música'}
            className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-linen/90 text-gold shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {showHint && (
            <p className="fixed bottom-[4.5rem] right-5 z-40 max-w-[12rem] rounded-lg border border-gold/20 bg-linen/95 px-3 py-2 text-right font-body text-[0.65rem] text-sage shadow-md">
              {loadFailed
                ? `Não foi possível carregar ${invite.musicSrc}. Verifica public/music/ e o nome em data.js.`
                : 'Não foi possível reproduzir a música neste dispositivo.'}
            </p>
          )}
        </>
      )}
    </>
  )
})

export default MusicPlayer
