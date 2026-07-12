import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import FloatingEffects from './FloatingEffects';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

function WeddingHeart() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(5, 5);
    shape.bezierCurveTo(5, 5, 4, 0, 0, 0);
    shape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
    shape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
    shape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
    shape.bezierCurveTo(16, 7, 16, 0, 10, 0);
    shape.bezierCurveTo(7, 0, 5, 5, 5, 5);
    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      
      const targetScale = hovered ? 0.28 : 0.22;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      const targetSpeed = hovered ? 2.2 : 1.0;
      meshRef.current.rotation.y += 0.015 * targetSpeed;
      meshRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Warm and romantic lighting setup */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 2]} intensity={3.5} color="#d4af37" />
      <spotLight position={[-4, -3, -2]} intensity={4.5} color="#d97486" angle={1} penumbra={0.5} distance={20} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#c5a880" distance={10} />
      
      {/* Elegant gold and pink floating sparkles */}
      <Sparkles count={120} scale={12} size={3.0} speed={0.6} opacity={0.7} color="#d4af37" noise={0.4} />
      <Sparkles count={80} scale={10} size={3.5} speed={0.4} opacity={0.5} color="#d97486" noise={0.3} />

      <Center>
        <group rotation={[0, 0, Math.PI]}>
          <mesh 
            ref={meshRef}
            scale={[0.22, 0.22, 0.22]}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <extrudeGeometry args={[heartShape, { depth: 2, bevelEnabled: true, bevelSegments: 3, steps: 2, bevelSize: 1, bevelThickness: 1 }]} />
            <MeshDistortMaterial
              color="#fdf0f0"
              attach="material"
              distort={hovered ? 0.35 : 0.15}
              speed={hovered ? 2.5 : 1.0}
              roughness={0.15}
              metalness={0.4}
              emissive="#e8c5c8"
              emissiveIntensity={hovered ? 1.5 : 0.8}
            />
          </mesh>
        </group>
      </Center>
    </group>
  );
}

export default function PhaseHero({ onClick, isInteractive }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * -15,
        y: (e.clientY / window.innerHeight - 0.5) * -15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="relative w-full h-screen bg-brand-bg flex flex-col items-center justify-center overflow-hidden z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onClick={isInteractive ? onClick : undefined}
      style={{ cursor: isInteractive ? 'pointer' : 'default' }}
    >
      {/* Soft wedding radial background */}
      <div className="absolute inset-0 bg-radial-party z-0"></div>

      {/* Hero Canvas holding the 3D Wedding Heart. */}
      <div className="absolute inset-0 z-0 opacity-95 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <WeddingHeart />
        </Canvas>
      </div>

      {/* Falling Rose Petals & Golden Sparkles - Full width, layered behind the card */}
      <FloatingEffects fullWidth={true} zIndex="z-0" />

      {/* Hero Foreground Invitation Card with subtle parallax mapping */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center pointer-events-none px-4 w-full"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
      >
        <motion.div
          className="relative w-[92%] max-w-md bg-[#faf6f0]/90 backdrop-blur-md border border-[#c5a880]/30 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(217,116,134,0.12)] flex flex-col items-center justify-center text-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Decorative Inner Gold Border */}
          <div className="absolute inset-4 border border-[#d4af37]/35 rounded-[2rem] pointer-events-none"></div>
          
          {/* Decorative corner motifs in gold/rose */}
          <div className="absolute top-6 left-6 text-brand-primary/45 text-xs select-none pointer-events-none">✦</div>
          <div className="absolute top-6 right-6 text-brand-primary/45 text-xs select-none pointer-events-none">✦</div>
          <div className="absolute bottom-6 left-6 text-brand-primary/45 text-xs select-none pointer-events-none">✦</div>
          <div className="absolute bottom-6 right-6 text-brand-primary/45 text-xs select-none pointer-events-none">✦</div>

          {/* Accent Script Line */}
          <span className="font-script text-3xl sm:text-4xl text-brand-primary mb-2">
            Together with their families
          </span>
          
          {/* Invitation Tagline */}
          <span className="text-[10px] tracking-[0.25em] uppercase text-brand-text/50 font-display mb-3">
            Invite You To Celebrate The Wedding Of
          </span>

          {/* Names */}
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#d4af37] tracking-wide mb-3 select-text">
            Aditya & Riya
          </h1>
          
          {/* Rose Divider */}
          <div className="flex items-center space-x-2 my-2 w-full justify-center">
            <div className="h-[0.5px] w-8 bg-[#c5a880]/50"></div>
            <span className="text-brand-primary text-sm">🌹</span>
            <div className="h-[0.5px] w-8 bg-[#c5a880]/50"></div>
          </div>

          {/* Are Tying the Knot / Wedding Announcement */}
          <h2 className="text-sm sm:text-base text-[#3c2f2f] font-semibold font-serif tracking-[0.2em] uppercase mt-2">
            Are Tying The Knot
          </h2>

          {/* Date */}
          <p className="text-lg sm:text-xl text-[#3c2f2f]/85 font-medium tracking-[0.1em] mt-3 font-serif">
            November 9, 2026
          </p>

          {/* Venue Preview */}
          <p className="text-xs text-brand-text/50 font-serif tracking-wider mt-2 max-w-[240px] leading-relaxed">
            Royal Heritage Palace, Chanakyapuri, New Delhi
          </p>
        </motion.div>
      </motion.div>

      {isInteractive && (
        <motion.div 
          className="absolute bottom-12 z-20 flex flex-col items-center pointer-events-none px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            className="px-8 sm:px-10 py-4 rounded-full bg-white/80 backdrop-blur-md border border-brand-primary/20 text-brand-primary font-bold tracking-[0.15em] uppercase text-sm sm:text-base font-display shadow-[0_10px_25px_rgba(217,116,134,0.1)]"
            animate={{ scale: [1, 1.04, 1], boxShadow: ["0 10px 20px rgba(217,116,134,0.05)", "0 10px 25px rgba(212,175,55,0.2)", "0 10px 20px rgba(217,116,134,0.05)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Click to Enter Celebration
          </motion.div>
        </motion.div>
      )}

      {/* Blend smoothly into the next section */}
      <div className="absolute -bottom-1 left-0 w-full h-48 bg-gradient-to-t from-brand-bg to-transparent z-10 pointer-events-none"></div>
    </motion.div>
  );
}
