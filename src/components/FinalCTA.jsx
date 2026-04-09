import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function FinalCTA() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
  };

  return (
    <section className="relative w-full py-32 flex items-center justify-center flex-col text-center z-20">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height}
            recycle={false}
            numberOfPieces={400}
            gravity={0.15}
            colors={['#7c3aed', '#38bdf8', '#f8fafc', '#1e1b4b']}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] tracking-tight">
          Let’s make it unforgettable ✨
        </h2>
        
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-12 py-5 rounded-full bg-brand-primary text-white font-bold text-lg overflow-hidden transition-all duration-300 neon-border hover:shadow-[0_0_30px_rgba(124,58,237,0.8)]"
        >
          <span className="relative z-10 block tracking-wider uppercase">See you at the Farewell 🎊</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-brand-secondary to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        </motion.button>
      </motion.div>
    </section>
  );
}
