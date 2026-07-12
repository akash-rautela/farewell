import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSun, FaMusic, FaRing } from 'react-icons/fa';
import ScratchCard from './ScratchCard';
import CountdownTimer from './CountdownTimer';

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

  const mainDetails = [
    { 
      icon: <FaCalendarAlt size={28} className="text-brand-primary" />, 
      title: "Date", 
      value: "November 9, 2026" 
    },
    { 
      icon: <FaClock size={28} className="text-brand-secondary" />, 
      title: "Time", 
      value: "4:00 PM Onwards" 
    },
    { 
      icon: <FaMapMarkerAlt size={28} className="text-brand-primary" />, 
      title: "Venue", 
      value: "Royal Heritage Palace, Delhi" 
    }
  ];

  const ceremonies = [
    {
      icon: <FaSun size={28} className="text-[#f59e0b]" />,
      name: "Haldi Ceremony",
      time: "Nov 8, 2026 • 11:00 AM",
      venue: "Shanti Gardens, Delhi",
      desc: "A bright morning filled with turmeric, laughter, and blessings to shower the couple with love."
    },
    {
      icon: <FaMusic size={28} className="text-brand-primary" />,
      name: "Sangeet Night",
      time: "Nov 8, 2026 • 7:00 PM",
      venue: "Royal Crystal Ballroom",
      desc: "An evening of endless music, sparkling dance performances, and family celebrations."
    },
    {
      icon: <FaRing size={28} className="text-brand-secondary" />,
      name: "Wedding & Reception",
      time: "Nov 9, 2026 • 4:00 PM",
      venue: "The Palace Courtyard",
      desc: "The auspicious vows, exchange of rings, and reception dinner celebrating Aditya & Riya."
    }
  ];

  return (
    <section className="relative w-full py-20 z-20 bg-gradient-to-b from-[#faf0f2] via-[#faf6f0] to-[#faf7f2] px-6">
      <div className="max-w-6xl mx-auto w-full flex flex-col space-y-24">
        
        {/* Countdown Timer Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <CountdownTimer />
        </motion.div>

        {/* Scratch Cards Section (Core Details) */}
        <div className="flex flex-col items-center space-y-16 md:space-y-24">
          <motion.div 
            className="text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[#d4af37] text-2xl mb-2 select-none animate-pulse">❀</div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-[#d4af37] mb-2">Scratch to Reveal Details</h2>
            <p className="text-brand-text/60 font-serif text-sm">Gently scratch the cards below to reveal the date, time, and venue!</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full"
            variants={containerVars}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {mainDetails.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={cardVars}
                whileHover={{ scale: 1.02, y: -4 }}
                className="luxury-card rounded-[2rem] flex flex-col items-center justify-center p-2 min-h-[220px] transition-all duration-300"
              >
                <div className="card-shimmer" />
                <ScratchCard>
                  <div className="flex flex-col items-center justify-center text-center p-8 w-full h-full min-h-[200px] relative z-10">
                    <div className="mb-4 p-4 rounded-full bg-[#fdfbf7] border border-brand-primary/10 shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-sm text-brand-text/50 font-display font-bold mb-1 uppercase tracking-widest">{item.title}</h3>
                    <p className="text-lg md:text-xl font-bold text-brand-text font-serif tracking-wide">{item.value}</p>
                  </div>
                </ScratchCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Ceremonies Schedule Section */}
        <div className="flex flex-col items-center space-y-16 md:space-y-24">
          <motion.div 
            className="text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[#d4af37] text-2xl mb-2 select-none animate-pulse">✦</div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-[#d4af37] mb-2">Pre-Wedding Events</h2>
            <div className="w-24 h-0.5 bg-brand-primary/70 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full"
            variants={containerVars}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {ceremonies.map((cerm, idx) => (
              <motion.div 
                key={idx}
                variants={cardVars}
                whileHover={{ scale: 1.02, y: -4 }}
                className="luxury-card rounded-[2rem] p-8 flex flex-col justify-between text-left transition-all duration-300"
              >
                <div className="card-shimmer" />
                <div className="flex flex-col space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/80 border border-brand-primary/10 flex items-center justify-center shadow-sm">
                    {cerm.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-text">{cerm.name}</h3>
                  <div className="flex flex-col space-y-1 text-sm text-brand-text/70">
                    <p className="font-semibold">{cerm.time}</p>
                    <p className="italic">{cerm.venue}</p>
                  </div>
                  <p className="text-sm text-brand-text/60 leading-relaxed font-serif pt-2">{cerm.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Google Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#d4af37] mb-2">Find the Venue</h2>
            <div className="w-16 h-0.5 bg-brand-secondary/70 mx-auto rounded-full mt-3"></div>
          </div>
          
          <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-md border border-brand-primary/10 p-2 bg-white/70 backdrop-blur-md flex flex-col items-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996162386927!2d77.2183!3d28.6129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5867f5b5f1%3A0x6b4ee95240294c!2sChanakyapuri%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
              width="100%" 
              height="380" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-inner w-full"
              title="Venue Location Map"
            />
            {/* View on Google Maps Button */}
            <motion.a
              href="https://maps.google.com/?q=Royal+Heritage+Palace,+Chanakyapuri,+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 mb-4 px-8 py-3 rounded-full bg-brand-primary hover:bg-brand-primary/95 text-white font-display font-bold text-sm tracking-wider shadow-[0_4px_15px_rgba(217,116,134,0.15)] hover:shadow-[0_4px_25px_rgba(217,116,134,0.3)] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>View on Google Maps</span>
              <span>📍</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Gifts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center py-6 flex flex-col items-center space-y-4"
        >
          <div className="text-3xl text-brand-primary">🎁</div>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-[#d4af37]">A Note on Gifts</h2>
          <p className="text-lg md:text-xl font-serif italic text-brand-text/80 max-w-xl px-4 leading-relaxed">
            "Your presence, blessings and good wishes are the most precious gifts for us. We do not need anything else. However, should you still wish to grace us with a token, we would be honoured."
          </p>
          <div className="w-16 h-0.5 bg-brand-primary/30 rounded-full mt-2"></div>
        </motion.div>

      </div>
    </section>
  );
}
