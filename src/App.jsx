import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cover from './components/Cover.jsx'
import Hero from './components/Hero.jsx'
import CoupleFamilies from './components/CoupleFamilies.jsx'
import VerseSection from './components/VerseSection.jsx'
import GiftSection from './components/GiftSection.jsx'
import Countdown from './components/Countdown.jsx'
import DetailsSection from './components/DetailsSection.jsx'
import ScheduleSection from './components/ScheduleSection.jsx'
import Gallery from './components/Gallery.jsx'
import AddToCalendar from './components/AddToCalendar.jsx'
import RSVPForm from './components/RSVPForm.jsx'
import Footer from './components/Footer.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import ScrollSection, { refreshScrollTriggers } from './components/ScrollSection.jsx'
import ScrollSideOrnaments from './components/ScrollSideOrnaments.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [opened, setOpened] = useState(false)
  const [coverVisible, setCoverVisible] = useState(true)
  const [musicActive, setMusicActive] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const musicRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = opened ? 'auto' : 'hidden'
  }, [opened])

  useEffect(() => {
    if (!opened) return undefined

    const refresh = () => refreshScrollTriggers()
    const timer = setTimeout(refresh, 300)
    const timer2 = setTimeout(refresh, 900)
    const timer3 = setTimeout(refresh, 1800)

    window.addEventListener('resize', refresh)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
      window.removeEventListener('resize', refresh)
    }
  }, [opened])

  const handleMusicStart = () => {
    setMusicActive(true)
    musicRef.current?.playFromGesture()
  }

  return (
    <div className="relative perspective-root min-h-screen">
      <AnimatePresence>
        {coverVisible && (
          <Cover
            key="cover"
            onMusicStart={handleMusicStart}
            onReveal={() => setOpened(true)}
            onComplete={() => setCoverVisible(false)}
          />
        )}
      </AnimatePresence>

      <MusicPlayer
        ref={musicRef}
        playing={musicPlaying}
        onPlayingChange={setMusicPlaying}
        showControls={musicActive || opened}
      />

      {opened && (
        <motion.main
          className="scroll-stage relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScrollSideOrnaments enabled={opened} />

          <div className="relative z-10">
          <Hero revealed={opened} />

          <ScrollSection depth={0.7} index={1} enabled={opened}>
            <Countdown />
          </ScrollSection>

          <CoupleFamilies />

          <ScrollSection depth={0.55} index={2} enabled={opened}>
            <DetailsSection />
          </ScrollSection>

          <ScrollSection depth={0.65} index={3} enabled={opened}>
            <ScheduleSection />
          </ScrollSection>

          <ScrollSection depth={0.5} index={4} enabled={opened}>
            <Gallery />
          </ScrollSection>

          <VerseSection />

          <ScrollSection depth={0.45} index={5} enabled={opened}>
            <AddToCalendar />
          </ScrollSection>

          <ScrollSection depth={0.4} index={6} enabled={opened}>
            <GiftSection />
          </ScrollSection>

          <ScrollSection depth={0.4} index={7} enabled={opened}>
            <RSVPForm />
          </ScrollSection>

          <Footer />
          </div>
        </motion.main>
      )}
    </div>
  )
}
