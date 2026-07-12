import React from 'react';
import { motion } from 'framer-motion';

export default function PhaseEnvelope({ onOpen }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf6f0] backdrop-blur-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, pointerEvents: 'none' }}
      transition={{ duration: 0.8 }}
    >
      {/* 🌌 Background Glow (Matching PhaseLetter exactly) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(217,116,134,0.15) 0%, rgba(212,175,55,0.06) 50%, #faf6f0 100%)'
        }}
      />

      <motion.div 
        className="relative z-10 flex flex-col items-center mt-[-10vh]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-center mb-16 text-center px-4"
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <span className="font-script text-3xl md:text-4xl text-brand-primary mb-2">Together with their families</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#d4af37] tracking-widest uppercase drop-shadow-sm">
            A Promise of Forever
          </h2>
        </motion.div>

        <motion.div 
          className="relative cursor-pointer group"
          onClick={onOpen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Elegant Wedding Envelope Base */}
          <div 
            className="relative w-80 h-56 sm:w-96 sm:h-64 bg-[#fdfbf7] shadow-[0_30px_60px_rgba(217,116,134,0.12),inset_0_0_40px_rgba(217,116,134,0.05)] border border-[#f5e6e8] flex items-center justify-center overflow-hidden rounded-md"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
          >
            {/* Left Flap */}
            <div 
              className="absolute left-0 top-0 w-full h-full bg-[#f2e2e5] z-10 opacity-95" 
              style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.02)]"></div>
            </div>

            {/* Right Flap */}
            <div 
              className="absolute right-0 top-0 w-full h-full bg-[#f2e2e5] z-10 opacity-95" 
              style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_10px_0_20px_rgba(0,0,0,0.02)]"></div>
            </div>

            {/* Bottom Flap */}
            <div 
              className="absolute bottom-0 w-full h-full bg-[#e8d5d8] z-20 shadow-[0_-5px_15px_rgba(217,116,134,0.1)]" 
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_0_-20px_40px_rgba(217,116,134,0.05)] border-t border-[#d97486]/10"></div>
            </div>

            {/* Top V-Flap (Overlapping everything to seal) */}
            <div 
              className="absolute top-0 w-full h-[65%] bg-[#fcf7f8] z-30" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_0_20px_40px_rgba(217,116,134,0.03)] border-b border-[#e8d5d8]"></div>
            </div>

            {/* Royal Wax Seal (Gold Monogram) */}
            <motion.div 
              className="absolute z-40 top-[55%] flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#a67c1e] text-[#faf6f0] shadow-[0_10px_25px_rgba(212,175,55,0.4),inset_0_3px_8px_rgba(255,255,255,0.4),inset_0_-5px_10px_rgba(0,0,0,0.2)] border border-[#d4af37]/50"
              animate={{ scale: [1, 1.05, 1], boxShadow: ["0 10px 25px rgba(212,175,55,0.4)", "0 15px 30px rgba(212,175,55,0.6)", "0 10px 25px rgba(212,175,55,0.4)"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-[#faf6f0]/40 blur-[0.5px]"></div>
              <span className="text-[10px] sm:text-xs font-display uppercase tracking-widest opacity-80 mb-0.5">Open</span>
              <span className="text-base sm:text-lg font-bold font-display tracking-wider shadow-sm text-white">A & R</span>
            </motion.div>

          </div>
          
          <motion.p 
            className="absolute -bottom-16 w-full text-center text-sm sm:text-base font-serif italic text-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          >
            Click the wax seal to open the invitation...
          </motion.p>

        </motion.div>
      </motion.div>

    </motion.div>
  );
}
