import React from 'react';
import { motion } from 'framer-motion';

export default function PhaseEnvelope({ onOpen }) {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] backdrop-blur-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, pointerEvents: 'none' }}
      transition={{ duration: 0.8 }}
    >
      {/* 🌌 Background Glow (Matching PhaseLetter exactly) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(212,175,55,0.12) 0%, rgba(139,69,19,0.06) 50%, #020617 100%)'
        }}
      />

      <motion.div 
        className="relative z-10 flex flex-col items-center mt-[-10vh]"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl font-serif font-bold text-[#d4af37] tracking-widest uppercase mb-16 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] text-center px-4"
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          A Royal Summons
        </motion.h2>

        <motion.div 
          className="relative cursor-pointer group"
          onClick={onOpen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Ancient Heavy Envelope Base */}
          <div 
            className="relative w-80 h-56 sm:w-96 sm:h-64 bg-[#efebe9] shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_0_50px_rgba(139,69,19,0.2)] border border-[#d7ccc8] flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
          >
            {/* Left Flap */}
            <div 
              className="absolute left-0 top-0 w-full h-full bg-[#e6d5b8] z-10 opacity-95" 
              style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)]"></div>
            </div>

            {/* Right Flap */}
            <div 
              className="absolute right-0 top-0 w-full h-full bg-[#e6d5b8] z-10 opacity-95" 
              style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)]"></div>
            </div>

            {/* Bottom Flap */}
            <div 
              className="absolute bottom-0 w-full h-full bg-[#d7ccc8] z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.4)]" 
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_0_-20px_40px_rgba(139,69,19,0.15)] border-t border-[#8d6e63]/30"></div>
            </div>

            {/* Top V-Flap (Overlapping everything to seal) */}
            <div 
              className="absolute top-0 w-full h-[65%] bg-[#fdf6e3] z-30" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
            >
              <div className="absolute inset-0 shadow-[inset_0_20px_40px_rgba(139,69,19,0.1)] border-b-2 border-[#bcaaa4]"></div>
            </div>

            {/* Royal Wax Seal */}
            <motion.div 
              className="absolute z-40 top-[55%] flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#991b1b] via-[#7f1d1d] to-[#450a0a] text-[#fdf6e3] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_3px_8px_rgba(255,255,255,0.2),inset_0_-5px_10px_rgba(0,0,0,0.5)] border border-[#450a0a]/50"
              animate={{ scale: [1, 1.05, 1], boxShadow: ["0 10px 20px rgba(0,0,0,0.8)", "0 15px 30px rgba(127,29,29,0.6)", "0 10px 20px rgba(0,0,0,0.8)"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-[#b91c1c]/40 blur-[0.5px]"></div>
              <span className="text-[10px] sm:text-xs font-serif opacity-80 mb-0.5">Break</span>
              <span className="text-lg sm:text-xl font-bold font-serif shadow-sm">Seal</span>
            </motion.div>

          </div>
          
          <motion.p 
            className="absolute -bottom-16 w-full text-center text-sm sm:text-base font-serif italic text-[#d4af37]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          >
            Click the wax seal to unravel the scroll...
          </motion.p>

        </motion.div>
      </motion.div>

    </motion.div>
  );
}
