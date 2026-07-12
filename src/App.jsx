import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import PhaseEnvelope from './components/PhaseEnvelope';
import PhaseLetter from './components/PhaseLetter';
import PhaseHero from './components/PhaseHero';
import EventDetails from './components/EventDetails';
import MemoryLane from './components/MemoryLane';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [phase, setPhase] = useState("envelope"); // 'envelope', 'letter', 'hero', 'main'
  const audioRef = useRef(null);

  // Reusable function to initialize audio safely upon first click interaction
  const tryStartAudio = () => {
    if (!audioRef.current) {
      // Elegant romantic background music
      audioRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-love-story-1159.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Audio play blocked natively:", e));
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
            <EventDetails />
            <FinalCTA />
            <Footer audioRef={audioRef} />
          </div>
          {/* Floating WhatsApp Contact Button */}
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
