import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryLane() {
  const [activeIndex, setActiveIndex] = useState(0);

  const memories = [
    {
      url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
      title: "How We Met",
      description: "A simple introduction that turned into hours of conversation, sharing laughter and finding a home in each other. ❤️"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      title: "The Proposal",
      description: "Under a canopy of stars and a promise of forever, we decided to embark on this beautiful adventure together. 💍"
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
      title: "Our Adventures",
      description: "From exploring mountain heights to enjoying lazy Sunday fests, every moment has been a treasure we hold close. ✈️"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
      title: "Tying the Knot",
      description: "Standing on the threshold of our forever, excited to make our promises and step into a new chapter of love. 🌹"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % memories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [memories.length]);

  return (
    <section className="relative w-full py-32 bg-brand-bg z-20 overflow-hidden flex flex-col items-center">
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-brand-text">Our Story</h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"></div>
          <p className="mt-4 text-brand-text/75 font-serif max-w-xl mx-auto text-base md:text-lg">
            A journey of love, friendship, and beautiful moments that led us to this special day.
          </p>
        </motion.div>

        {/* Interactive Stacked Cards Carousel */}
        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {memories.map((mem, idx) => {
              const isActive = idx === activeIndex;
              let offset = idx - activeIndex;
              if (offset < 0) offset += memories.length;

              const zIndex = memories.length - offset;
              const scale = isActive ? 1 : 1 - (offset * 0.05);
              const xOffset = isActive ? 0 : offset * 40;
              const opacity = isActive ? 1 : 1 - (offset * 0.3);

              if (offset > 2) return null;

              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: 100 }}
                  animate={{ 
                    opacity: opacity, 
                    scale: scale, 
                    x: xOffset, 
                    zIndex: zIndex 
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  className={`absolute w-[90%] md:w-[70%] h-[400px] rounded-3xl overflow-hidden glass-card cursor-pointer border ${isActive ? 'border-brand-primary shadow-[0_15px_35px_rgba(217,116,134,0.12)]' : 'border-black/5'}`}
                  onClick={isActive ? handleNext : () => setActiveIndex(idx)}
                >
                  <img src={mem.url} alt={mem.title} className="absolute inset-0 w-full h-full object-cover" />
                  
                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                      <motion.h3 
                        className="text-2xl md:text-3xl font-extrabold text-brand-secondary mb-3 drop-shadow-md font-serif tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {mem.title}
                      </motion.h3>
                      <motion.p 
                        className="text-base md:text-lg text-white font-medium drop-shadow-sm max-w-lg font-serif leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {mem.description}
                      </motion.p>

                      <div className="mt-6 flex space-x-4">
                        <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="p-3 rounded-full bg-white/20 hover:bg-brand-primary text-white transition-colors backdrop-blur-md cursor-pointer">
                          ←
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="p-3 rounded-full bg-white/20 hover:bg-brand-primary text-white transition-colors backdrop-blur-md cursor-pointer">
                          →
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
