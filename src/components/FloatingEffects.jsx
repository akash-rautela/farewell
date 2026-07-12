import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function FloatingParticle({ item, fullWidth, loop, interactive }) {
  const [hovered, setHovered] = useState(false);
  const [fading, setFading] = useState(false);

  const handleHover = () => {
    if (!interactive || fading) return;
    setHovered(true);
    setTimeout(() => {
      setFading(true);
    }, 200); // show a slight physical push offset before fading out
  };

  return (
    <motion.div
      className={`absolute ${interactive ? 'pointer-events-auto cursor-default' : 'pointer-events-none'}`}
      style={{
        left: `${item.x}%`,
        top: `-5%`,
        width: item.size,
        height: item.isPetal ? item.size * 1.3 : item.size,
        backgroundColor: item.isPetal ? item.color : 'rgba(212, 175, 55, 0.25)',
        border: !item.isPetal ? `1.5px solid ${item.color}` : 'none',
        borderRadius: item.isPetal ? '50% 0% 50% 50%' : '50%',
        boxShadow: !item.isPetal ? `0 0 12px ${item.color}` : 'none',
        filter: 'blur-[0.2px]'
      }}
      animate={{
        y: fading ? '115vh' : ['0vh', '115vh'],
        x: [0, Math.sin(item.id) * (fullWidth ? 45 : 25), Math.sin(item.id + 2) * (fullWidth ? -35 : -20), 0],
        rotate: [0, 360 + Math.random() * 360],
        // Interactive wind push offsets
        translateX: hovered && interactive ? Math.sin(item.id) * 35 : 0,
        translateY: hovered && interactive ? -20 : 0,
        scale: hovered && interactive ? 1.2 : 1,
        opacity: fading && interactive ? 0 : 1
      }}
      transition={{
        y: {
          duration: item.duration,
          repeat: loop ? Infinity : 0,
          delay: item.delay,
          ease: "linear"
        },
        x: {
          duration: item.duration,
          repeat: loop ? Infinity : 0,
          delay: item.delay,
          ease: "linear"
        },
        rotate: {
          duration: item.duration,
          repeat: loop ? Infinity : 0,
          delay: item.delay,
          ease: "linear"
        },
        translateX: { type: "spring", stiffness: 100, damping: 12 },
        translateY: { type: "spring", stiffness: 100, damping: 12 },
        scale: { duration: 0.4 },
        opacity: fading ? { duration: 0.6, ease: "easeOut" } : { duration: 0.2 }
      }}
      onPointerOver={handleHover}
    />
  );
}

export default function FloatingEffects({ fullWidth = false, zIndex = "z-40", loop = true, count = 48, interactive = false }) {
  // Memoize elements to prevent re-randomizing coordinates on mouse movements
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const isPetal = i % 2 === 0;
      
      // Gutter Frame vs Full Screen distribution
      let startX = 0;
      if (fullWidth) {
        startX = Math.random() * 100;
      } else {
        const isLeft = i % 2 === 0;
        startX = isLeft ? Math.random() * 15 : 85 + Math.random() * 15;
      }

      return {
        id: i,
        x: startX,
        size: isPetal ? 10 + Math.random() * 12 : 8 + Math.random() * 8, // slightly larger gold bubbles
        delay: Math.random() * 6, // tighter delays for a rich initial burst
        duration: 9 + Math.random() * 8, // slightly faster fall duration for shower effect
        color: isPetal ? 'rgba(217, 116, 134, 0.45)' : 'rgba(212, 175, 55, 0.5)',
        isPetal
      };
    });
  }, [fullWidth, count]);

  return (
    // Dynamic zIndex injection to coordinate layering stacks
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${zIndex} w-full h-full`}>
      {items.map((item) => (
        <FloatingParticle
          key={item.id}
          item={item}
          fullWidth={fullWidth}
          loop={loop}
          interactive={interactive}
        />
      ))}
    </div>
  );
}
