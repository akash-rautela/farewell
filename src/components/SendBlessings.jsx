import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SendBlessings() {
  const [blessings, setBlessings] = useState([]);

  const handleSend = () => {
    const id = Date.now();
    const icons = ['❤️', '💖', '🌸', '✨', '🌹'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const newBlessing = {
      id,
      icon: randomIcon,
      x: Math.random() * 60 - 30, // side-to-side variation
      scale: 0.8 + Math.random() * 0.8,
      duration: 3 + Math.random() * 2 // rise speed
    };

    setBlessings((prev) => [...prev, newBlessing]);

    // Cleanup after animation completes to avoid memory footprint
    setTimeout(() => {
      setBlessings((prev) => prev.filter((b) => b.id !== id));
    }, 5000);
  };

  // Automatically release a love bubble every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSend();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Emojis Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {blessings.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.2, y: '90vh', x: `calc(1.5rem + 28px + ${b.x}px)` }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: b.scale,
                y: '-10vh',
                // Natural keyframe swaying paths
                x: [
                  `calc(1.5rem + 28px + ${b.x}px)`,
                  `calc(1.5rem + 28px + ${b.x + 20}px)`,
                  `calc(1.5rem + 28px + ${b.x - 20}px)`,
                  `calc(1.5rem + 28px + ${b.x + 10}px)`
                ]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: b.duration, ease: 'easeOut' }}
              className="absolute text-2xl select-none"
              style={{
                textShadow: '0 2px 10px rgba(217, 116, 134, 0.3)'
              }}
            >
              {b.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={handleSend}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white/90 border border-brand-primary/15 text-brand-primary shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer"
        whileTap={{ scale: 0.9 }}
        title="Send Love & Blessings"
      >
        <motion.span 
          className="text-2xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ❤️
        </motion.span>
      </motion.button>
    </>
  );
}
