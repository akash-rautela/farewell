import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function FloatingParticle({ item, fullWidth, loop, interactive }) {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    if (!interactive || hovered) return;
    setHovered(true);
    // Settle back to rest coordinate after 1.2 seconds so it can be nudged/swayed again
    setTimeout(() => {
      setHovered(false);
    }, 1200);
  };

  return (
    <motion.div
      className={`absolute ${interactive ? 'pointer-events-auto cursor-default' : 'pointer-events-none'}`}
      style={{
        left: `${item.x}%`,
        width: item.size,
        height: item.isPetal ? item.size * 1.3 : item.size,
        backgroundColor: item.isPetal ? item.color : 'rgba(212, 175, 55, 0.25)',
        border: !item.isPetal ? `1.5px solid ${item.color}` : 'none',
        borderRadius: item.isPetal ? '50% 0% 50% 50%' : '50%',
        boxShadow: !item.isPetal ? `0 0 12px ${item.color}` : 'none',
        filter: 'blur-[0.2px]'
      }}
      animate={{
        // If looping, fall off-screen. If landing, settle at landY position near the bottom of the section.
        top: loop ? ['-5%', '108%'] : ['-5%', `${item.landY}%`],
        x: [0, Math.sin(item.id) * (fullWidth ? 45 : 25), Math.sin(item.id + 2) * (fullWidth ? -35 : -20), 0],
        rotate: [0, 360 + Math.random() * 360],
        // Interactive wind push offsets
        translateX: hovered && interactive ? Math.sin(item.id) * 35 : 0,
        translateY: hovered && interactive ? -20 : 0,
        scale: hovered && interactive ? 1.25 : 1
      }}
      transition={{
        top: {
          duration: item.duration,
          repeat: loop ? Infinity : 0,
          delay: item.delay,
          ease: loop ? "linear" : "easeOut" // easeOut makes particles decelerate gently as they land on the floor
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
        // Spring physics to make the wind reaction bounce/sway organically
        translateX: { type: "spring", stiffness: 80, damping: 10 },
        translateY: { type: "spring", stiffness: 80, damping: 10 },
        scale: { duration: 0.4 }
      }}
      onPointerOver={handleHover}
    />
  );
}

export default function FloatingEffects({ fullWidth = false, zIndex = "z-40", loop = true, count = 48, interactive = false, landYRange = [85, 97] }) {
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

      // Settle/land at a coordinate near the bottom of the section wrapper
      const landY = landYRange[0] + Math.random() * (landYRange[1] - landYRange[0]);

      return {
        id: i,
        x: startX,
        landY,
        size: isPetal ? 10 + Math.random() * 12 : 8 + Math.random() * 8, // slightly larger gold bubbles
        delay: Math.random() * (loop ? 6 : 3), // tighter delays for a rich initial burst in RSVP section
        duration: loop ? (9 + Math.random() * 8) : (5 + Math.random() * 5), // faster fall speed to settle quickly in RSVP
        color: isPetal ? 'rgba(217, 116, 134, 0.45)' : 'rgba(212, 175, 55, 0.5)',
        isPetal
      };
    });
  }, [fullWidth, count, loop, landYRange[0], landYRange[1]]);

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
