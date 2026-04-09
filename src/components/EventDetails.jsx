import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function EventDetails() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVars = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 0.8 } }
  };

  const details = [
    { icon: <FaCalendarAlt size={32} className="text-brand-primary" />, title: "Date", value: "May 15, 2026" },
    { icon: <FaClock size={32} className="text-brand-secondary" />, title: "Time", value: "7:00 PM Onwards" },
    { icon: <FaMapMarkerAlt size={32} className="text-brand-primary" />, title: "Venue", value: "Grand Neon Hall" }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 z-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text-primary">Event Details</h2>
          <div className="w-24 h-1 bg-brand-primary/50 mx-auto rounded-full glow"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {details.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={cardVars}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card rounded-[2rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 neon-border hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="mb-6 p-5 rounded-full bg-brand-bg/60 border border-brand-secondary/20 group-hover:border-brand-primary/80 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl text-white/90 font-semibold mb-2 uppercase tracking-widest drop-shadow-md">{item.title}</h3>
              <p className="text-2xl md:text-3xl font-extrabold text-white tracking-wide drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
