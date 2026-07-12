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
    const audio = audioRef?.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(e => console.log("Playback prevented:", e));
    } else {
      audio.pause();
    }
  };

  return (
    <footer className="w-full py-8 border-t border-brand-primary/10 bg-brand-bg relative z-20 flex items-center justify-center px-10 text-brand-text/60 font-serif text-sm text-center">
      
      <div className="flex items-center space-x-2">
        <span>With Love & Blessings,</span>
        <FaHeart className="text-brand-primary animate-pulse" />
        <span>Aditya & Riya</span>
      </div>

    </footer>
  );
}
