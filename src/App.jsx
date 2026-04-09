import React, { useState, useRef } from 'react';
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
      // High-quality majestic ancient track fitting the Royal Scroll theme
      audioRef.current = new Audio("/experience.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
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
        <div className="w-full relative z-20 animate-fade-in-up">
          <EventDetails />
          <MemoryLane />
          <FinalCTA />
          <Footer audioRef={audioRef} />
        </div>
      )}

    </div>
  );
}
