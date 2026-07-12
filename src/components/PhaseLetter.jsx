import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// PHASE 2: Royal Scroll Letter
// Theme: Elegant scroll (romantic, vintage)

export default function PhaseLetter({ onProceed }) {
  
  // Binding scroll mechanics
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  
  // Map internal scroll depth to physically spinning the mechanical rollers
  const rollerSpin = useTransform(scrollYProgress, [0, 1], ['0px', '-400px']);

  // Scroll Content Data for Wedding
  const content = [
    { type: "heading", text: "The Celebration of Love 📜✨" },
    { type: "body", text: "With hearts full of joy and love, we invite you to share in our celebration as we take our vows and begin our new journey together as one." },
    { type: "body", text: "Our story began with a simple chance meeting that blossomed into a beautiful lifetime of shared laughter, support, and dreams. Now, we are ready to pledge our forevers in the presence of our family and dearest friends." },
    { type: "highlight", text: "Aditya & Riya are tying the knot on November 9, 2026! 💍✨" },
    { type: "body", text: "Please join us on our special day for an evening of joy, feast, and celebration as we celebrate the union of two souls." },
    { type: "heading", text: "Save the Date! 🥂🌹" },
    { type: "body", text: "We request the honor of your presence and blessings at our wedding celebration." }
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#faf6f0] p-2 sm:p-6 md:p-12 lg:p-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >

      {/* 🌌 Background Glow (Royal Atmosphere) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(217,116,134,0.15) 0%, rgba(212,175,55,0.06) 50%, #faf6f0 100%)'
        }}
      />

      {/* 📜 Mechanical Scroll Assembly Container */}
      <div className="relative z-10 w-full max-w-2xl h-full max-h-[95vh] sm:max-h-[85vh] flex flex-col items-center">

        {/* 🪵 Top Spinning Roller (Fixed to bounds) */}
        <motion.div 
          className="relative z-20 w-[105%] flex-shrink-0 h-10 sm:h-12 bg-[#3e2723] rounded-full shadow-[0_15px_30px_rgba(217,116,134,0.15),inset_0_3px_5px_rgba(255,255,255,0.15),inset_0_-5px_10px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gold caps */}
          <div className="absolute -left-3 top-0 w-6 h-full bg-gradient-to-b from-[#f5d061] via-[#d4af37] to-[#aa832d] shadow-inner rounded-l-full z-10 border-r-2 border-[#544018]"></div>
          <div className="absolute -right-3 top-0 w-6 h-full bg-gradient-to-b from-[#f5d061] via-[#d4af37] to-[#aa832d] shadow-inner rounded-r-full z-10 border-l-2 border-[#544018]"></div>
          
          {/* Spinning Wood Texture layer linked to scroll position */}
          <motion.div 
            className="w-full h-full opacity-30 mix-blend-overlay rounded-full" 
            style={{ 
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
              backgroundPositionY: rollerSpin,
            }} 
          />
        </motion.div>

        {/* 📜 Dynamic Parchment Window */}
        <motion.div 
          className="relative w-full bg-[#fdf6e3] overflow-hidden"
          style={{
            boxShadow: '0 30px 80px rgba(217,116,134,0.12), inset 0 0 60px rgba(139,69,19,0.12)',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
            borderLeft: '1px solid rgba(139,69,19,0.2)',
            borderRight: '1px solid rgba(139,69,19,0.2)'
          }}
          initial={{ flexGrow: 0, height: 0 }}
          animate={{ flexGrow: 1, height: "auto" }}
          transition={{ duration: 2.2, ease: [0.25, 0.8, 0.25, 1] }}
        >
          {/* Edge masking gradients to simulate text rolling around cylinder smoothly */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#fdf6e3] via-[#fdf6e3]/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#fdf6e3] via-[#fdf6e3]/80 to-transparent z-20 pointer-events-none"></div>

          {/* Core Text Scroller */}
          <div 
            ref={scrollRef} 
            className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {/* Scroll Content Padding Frame */}
            <div className="flex flex-col space-y-10 text-center items-center font-serif text-[#3b2f2f] pt-24 pb-32 px-6 sm:px-12 md:px-16 w-full">

              <p className="text-sm opacity-60 italic mb-8">Scroll downward to read the invitation ↓</p>

              {content.map((item, idx) => {
                let style = "text-lg md:text-xl leading-[2.2] text-[#4e342e] w-full relative z-10 font-serif";

                if (item.type === "heading") {
                  style = "text-3xl md:text-5xl font-bold text-[#3e2723] mt-8 mb-4 border-b border-[#3e2723]/20 pb-4 w-full relative z-10 font-serif";
                }

                if (item.type === "highlight") {
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, root: scrollRef, margin: "100px" }}
                      transition={{ duration: 1 }}
                      className="w-full border-l-4 border-[#d4af37] bg-[#faf6f0] px-6 py-5 shadow-inner text-xl italic my-6 relative z-10 text-brand-primary"
                    >
                      {item.text}
                    </motion.div>
                  );
                }

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, root: scrollRef, margin: "100px" }}
                    transition={{ duration: 1 }}
                    className={style}
                  >
                    {item.text}
                  </motion.div>
                );
              })}

              <motion.p 
                className="italic text-lg mt-10 opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, root: scrollRef }}
                transition={{ delay: 0.5 }}
              >
                See you at the wedding...
              </motion.p>

              {/* 🔘 Gold Wax Seal CTA Button */}
              <motion.div 
                className="pt-12 flex justify-center w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, root: scrollRef }}
                transition={{ duration: 0.8 }}
              >
                <button 
                  onClick={onProceed}
                  className="w-36 h-36 rounded-full bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#a67c1e] text-[#faf6f0] flex flex-col items-center justify-center font-serif shadow-[0_15px_30px_rgba(212,175,55,0.4),inset_0_3px_8px_rgba(255,255,255,0.4),inset_0_-5px_10px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition border border-[#d4af37]/40 cursor-pointer"
                >
                  <span className="text-xs uppercase tracking-widest opacity-80">Enter</span>
                  <span className="text-lg font-bold tracking-wider text-white">Celebration</span>
                </button>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* 🪵 Bottom Spinning Roller (Fixed to bounds) */}
        <motion.div 
          className="relative z-20 w-[105%] flex-shrink-0 h-10 sm:h-12 bg-[#3e2723] rounded-full shadow-[0_-5px_25px_rgba(217,116,134,0.15),inset_0_3px_5px_rgba(255,255,255,0.15),inset_0_-5px_10px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -left-3 top-0 w-6 h-full bg-gradient-to-b from-[#f5d061] via-[#d4af37] to-[#aa832d] shadow-inner rounded-l-full z-10 border-r-2 border-[#544018]"></div>
          <div className="absolute -right-3 top-0 w-6 h-full bg-gradient-to-b from-[#f5d061] via-[#d4af37] to-[#aa832d] shadow-inner rounded-r-full z-10 border-l-2 border-[#544018]"></div>
          
          <motion.div 
            className="w-full h-full opacity-30 mix-blend-overlay rounded-full" 
            style={{ 
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
              backgroundPositionY: rollerSpin,
            }} 
          />
        </motion.div>

      </div>
    </motion.div>
  );
}