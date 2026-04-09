import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryLane() {
  const [activeIndex, setActiveIndex] = useState(0);

  const memories = [
    {
      url: "https://images.unsplash.com/photo-1523580494112-071dcb849ea4?auto=format&fit=crop&q=80&w=800",
      title: "SRMU Fests",
      description: "When the entire campus turned into a concert ground and we lost our voices cheering! 🎸"
    },
    {
      url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800",
      title: "Canteen Gossips",
      description: "Those endless hours spent at the canteen talking about everything except studies. ☕💬"
    },
    {
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      title: "The B5 Mystery",
      description: "Waiting for B5 to finally be completed... maybe our juniors will see it happen! 🏢👷‍♂️"
    },
    {
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800",
      title: "Final Exams",
      description: "The 3 AM group study panics and the absolute relief of handing in the last paper. 📚"
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
    }, 4000);
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-brand-primary neon-text-primary uppercase">Memory Lane</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-brand-secondary to-brand-primary mx-auto rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)]"></div>
          <p className="mt-4 text-white font-medium max-w-lg mx-auto text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Click the highlighted memories to relive our best moments at Shri Ramswaroop Memorial University.</p>
        </motion.div>

        {/* Interactive Stacked Cards Carousel */}
        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {memories.map((mem, idx) => {
              // Calculate positional offset based on active index
              const isActive = idx === activeIndex;
              let offset = idx - activeIndex;
              if (offset < 0) offset += memories.length; // wrap around

              // Define visual hierarchy based on stack position
              const zIndex = memories.length - offset;
              const scale = isActive ? 1 : 1 - (offset * 0.05);
              const xOffset = isActive ? 0 : offset * 40;
              const opacity = isActive ? 1 : 1 - (offset * 0.3);

              if (offset > 2) return null; // Only show top 3 cards for performance

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
                  className={`absolute w-[90%] md:w-[70%] h-[400px] rounded-3xl overflow-hidden glass-card cursor-pointer border-2 ${isActive ? 'border-brand-primary shadow-[0_0_40px_rgba(236,72,153,0.3)]' : 'border-white/10'}`}
                  onClick={isActive ? handleNext : () => setActiveIndex(idx)}
                >
                  <img src={mem.url} alt={mem.title} className="absolute inset-0 w-full h-full object-cover" />
                  
                  {/* Heavy dark gradient for unreadable base images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                      <motion.h3 
                        className="text-3xl font-extrabold text-brand-secondary mb-3 drop-shadow-lg uppercase tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {mem.title}
                      </motion.h3>
                      <motion.p 
                        className="text-lg md:text-xl text-white font-semibold drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] max-w-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {mem.description}
                      </motion.p>

                      <div className="mt-6 flex space-x-4">
                        <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="p-3 rounded-full bg-white/20 hover:bg-brand-primary text-white transition-colors backdrop-blur-md">
                          ←
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="p-3 rounded-full bg-white/20 hover:bg-brand-primary text-white transition-colors backdrop-blur-md">
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
