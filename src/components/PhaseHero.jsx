import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

function PartyHeart() {
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
      
      const targetScale = hovered ? 0.3 : 0.22;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      const targetSpeed = hovered ? 2.5 : 1.0;
      meshRef.current.rotation.y += 0.01 * targetSpeed;
      meshRef.current.rotation.z = Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 2]} intensity={4} color="#facc15" />
      <spotLight position={[-4, -3, -2]} intensity={5} color="#ec4899" angle={1} penumbra={0.5} distance={20} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#9333ea" distance={10} />
      
      <Sparkles count={150} scale={12} size={3.5} speed={0.8} opacity={0.8} color="#facc15" noise={0.4} />
      <Sparkles count={100} scale={10} size={4} speed={0.6} opacity={0.6} color="#ec4899" noise={0.3} />

      <Center>
        <group rotation={[0, 0, Math.PI]}>
          <mesh 
            ref={meshRef}
            scale={[0.22, 0.22, 0.22]} // initialize base scale safely
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
          >
            <extrudeGeometry args={[heartShape, { depth: 2, bevelEnabled: true, bevelSegments: 3, steps: 2, bevelSize: 1, bevelThickness: 1 }]} />
            <MeshDistortMaterial
              color="#1a0522"
              attach="material"
              distort={hovered ? 0.4 : 0.2}
              speed={hovered ? 3.0 : 1.2}
              roughness={0.2}
              metalness={0.8}
              emissive="#6b21a8"
              emissiveIntensity={hovered ? 0.8 : 0.4}
              wireframe
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
        x: (e.clientX / window.innerWidth - 0.5) * -30,
        y: (e.clientY / window.innerHeight - 0.5) * -30,
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
      {/* Deep party radial background */}
      <div className="absolute inset-0 bg-radial-party z-0"></div>

      {/* Hero Canvas holding the object. */}
      <div className="absolute inset-0 z-0 opacity-95 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <PartyHeart />
        </Canvas>
      </div>

      {/* Hero Foreground Text with subtle parallax mapping */}
      <motion.div 
        className="relative z-10 flex flex-col items-center pointer-events-none mt-10 px-4"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 75, damping: 20 }}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-4 text-center text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.8)] uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Farewell '26 <span className="opacity-80">🔥</span>
        </motion.h1>
        
        <motion.h2 
          className="text-xl sm:text-3xl md:text-5xl text-white font-extrabold tracking-[0.2em] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] uppercase text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          The SRMU Final Chapter
        </motion.h2>
      </motion.div>

      {isInteractive && (
        <motion.div 
          className="absolute bottom-20 z-20 flex flex-col items-center pointer-events-none px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            className="px-8 sm:px-10 py-4 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/80 text-white font-bold tracking-[0.1em] uppercase text-sm sm:text-base md:text-lg shadow-[0_0_30px_rgba(236,72,153,0.5)]"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(250,204,21,0.3)", "0 0 40px rgba(236,72,153,0.6)", "0 0 20px rgba(250,204,21,0.3)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Click here to enter the Party
          </motion.div>
        </motion.div>
      )}

      {/* Graduate mask at the bottom to blend smoothly into the next section */}
      <div className="absolute -bottom-1 left-0 w-full h-48 bg-gradient-to-t from-brand-bg to-transparent z-10 pointer-events-none"></div>
    </motion.div>
  );
}
