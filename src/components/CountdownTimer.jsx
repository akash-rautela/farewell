import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const weddingDate = new Date("2026-11-09T16:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isWeddingDay: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isWeddingDay: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isWeddingDay: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  if (timeLeft.isWeddingDay) {
    return (
      <motion.div 
        className="text-center py-6 px-8 rounded-3xl bg-white/70 backdrop-blur-md border border-brand-primary/20 shadow-sm max-w-lg mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-2xl md:text-3xl font-display font-bold text-brand-primary tracking-wide">
          Today is the Special Day! 💍🎉
        </span>
      </motion.div>
    );
  }

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto w-full">
      <p className="text-brand-primary font-script text-3xl md:text-4xl normal-case tracking-normal mb-1">Countdown to Forever</p>
      
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center justify-center py-4 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/80 border border-brand-primary/10 shadow-[0_8px_30px_rgb(217,116,134,0.04)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-primary">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-brand-text/50 font-display uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
