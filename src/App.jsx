import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaMusic } from 'react-icons/fa';
import PhaseEnvelope from './components/PhaseEnvelope';
import PhaseLetter from './components/PhaseLetter';
import PhaseHero from './components/PhaseHero';
import EventDetails from './components/EventDetails';
import MemoryLane from './components/MemoryLane';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingEffects from './components/FloatingEffects';
import SendBlessings from './components/SendBlessings';

function SectionDivider() {
  return (
    <div className="flex items-center justify-center space-x-4 my-2 opacity-85 py-4 bg-transparent w-full relative z-25">
      <div className="h-[0.5px] w-24 bg-gradient-to-r from-transparent to-[#c5a880]/60"></div>
      <span className="text-[#d4af37] text-lg font-serif">✦ 🌹 ✦</span>
      <div className="h-[0.5px] w-24 bg-gradient-to-l from-transparent to-[#c5a880]/60"></div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("envelope"); // 'envelope', 'letter', 'hero', 'main'
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Pre-instantiate the Audio object on mount so it preloads and is ready for synchronous user interaction
  useEffect(() => {
    const audio = new Audio("/experience.mp3");
    audio.loop = true;
    audio.volume = 0.35;

    // Unify play state by binding to native audio events
    audio.addEventListener('play', () => setIsAudioPlaying(true));
    audio.addEventListener('pause', () => setIsAudioPlaying(false));

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const tryStartAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => {
        console.log("Audio play blocked natively, waiting for user gesture:", e);
        setIsAudioPlaying(false);
      });
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => setIsAudioPlaying(true))
        .catch(e => {
          console.log("Playback prevented:", e);
          setIsAudioPlaying(false);
        });
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleEnvelopeClick = () => {
    tryStartAudio();
    setPhase("letter");
  };

  const handleLetterProceed = () => {
    setPhase("hero");
    window.scrollTo(0, 0); // guarantee top view on Hero
  };

  const handleHeroClick = () => {
    setPhase("main");
  };

  return (
    <div className="relative w-full text-brand-text bg-brand-bg min-h-screen overflow-x-hidden flex flex-col items-center">
      
      {/* Floating Small Audio Toggle in Top Right */}
      {phase !== "envelope" && audioRef.current && (
        <motion.button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-brand-primary/10 text-brand-primary backdrop-blur-md shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          title={isAudioPlaying ? "Pause Music" : "Play Music"}
        >
          {isAudioPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <FaMusic size={11} />
            </motion.div>
          ) : (
            <div className="relative flex items-center justify-center">
              <FaMusic size={11} className="opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-[1.5px] bg-brand-primary rotate-45"></div>
              </div>
            </div>
          )}
        </motion.button>
      )}

      {phase === "envelope" && (
        <PhaseEnvelope onOpen={handleEnvelopeClick} />
      )}

      {phase === "letter" && (
        <PhaseLetter onProceed={handleLetterProceed} />
      )}

      {(phase === "hero" || phase === "main") && (
        <PhaseHero onClick={handleHeroClick} isInteractive={phase === "hero"} />
      )}

      {/* Main Content displays seamlessly underneath Hero once unlocked */}
      {phase === "main" && (
        <>
          <div className="w-full relative z-20 animate-fade-in-up">
            <MemoryLane />
            <SectionDivider />
            <EventDetails />
            <SectionDivider />
            
            {/* Romantic falling petals isolated to RSVP and Footer sections, layered behind the cards */}
            <div className="w-full relative overflow-hidden bg-gradient-to-b from-[#faf7f2] to-[#f8e9eb] z-20">
              <FinalCTA />
              <Footer audioRef={audioRef} />
            </div>
          </div>

          {/* Floating WhatsApp Contact Button (Bottom Right) */}
          <motion.a
            href="https://wa.me/919999999999?text=Hi!%20I%20have%20a%20question%20about%20the%20wedding..."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 border border-white/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
            transition={{ 
              scale: { delay: 1, duration: 0.5, type: 'spring' },
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={28} />
          </motion.a>
        </>
      )}

    </div>
  );
}
