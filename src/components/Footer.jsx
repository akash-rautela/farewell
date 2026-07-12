import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';

export default function Footer({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      setIsPlaying(!audioRef.current.paused);

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      const currentAudio = audioRef.current;
      currentAudio.addEventListener('play', handlePlay);
      currentAudio.addEventListener('pause', handlePause);

      return () => {
        currentAudio.removeEventListener('play', handlePlay);
        currentAudio.removeEventListener('pause', handlePause);
      };
    }
  }, [audioRef]);

  const togglePlay = () => {
    if (!audioRef || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Playback prevented:", e));
    }
  };

  return (
    <footer className="w-full py-8 border-t border-brand-primary/10 bg-brand-bg relative z-20 flex flex-col md:flex-row items-center justify-between px-10 text-brand-text/60 font-serif text-sm">
      
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <span>With Love & Blessings,</span>
        <FaHeart className="text-brand-primary animate-pulse" />
        <span>Aditya & Riya</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="uppercase tracking-widest text-xs opacity-70">
          Background Music
        </span>
        <button 
          onClick={togglePlay}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 border border-brand-primary/10 hover:bg-brand-primary/15 hover:border-brand-primary/30 text-brand-primary transition-all duration-300 shadow-sm cursor-pointer"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1" />}
        </button>
      </div>

    </footer>
  );
}
