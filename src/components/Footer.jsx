import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Reliable placeholder lo-fi track from mixkit
  const AUDIO_SRC = "https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3";

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_SRC);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // keep volume low and non-distracting

    return () => {
      audioRef.current.pause();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Must catch potential DOMException for un-interacted playback
      audioRef.current.play().catch(e => console.log("Playback prevented:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <footer className="w-full py-8 border-t border-white/10 bg-brand-bg relative z-20 flex flex-col md:flex-row items-center justify-between px-10 text-gray-400 font-light text-sm">
      
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <span>Made with</span>
        <FaHeart className="text-red-500 animate-pulse" />
        <span>by juniors</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="uppercase tracking-widest text-xs opacity-70">
          Background Music
        </span>
        <button 
          onClick={togglePlay}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-brand-primary/20 hover:border-brand-primary/50 text-white transition-all duration-300 neon-border"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-1" />}
        </button>
      </div>

    </footer>
  );
}
