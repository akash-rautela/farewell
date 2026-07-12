import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScratchCard({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const glitterSpecks = useRef([]);
  const particlesRef = useRef([]); // magical fading scratch particles
  const startTime = useRef(Date.now());
  const animationFrameId = useRef(null);
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef(null);
  const lastSpawnPoint = useRef({ x: 0, y: 0 }); // throttles particle bursts by distance
  const lastCheckTime = useRef(0);

  // Core render function to draw metallic cover, glitter, moving shine, and subtract scratches
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;

    // 1. Clear main canvas
    ctx.clearRect(0, 0, width, height);

    // 2. Draw metallic gold gradient
    ctx.globalCompositeOperation = 'source-over';
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    // Multi-stop gold for realistic metallic shine reflection
    goldGrad.addColorStop(0, '#bf953f');   // Deep gold
    goldGrad.addColorStop(0.2, '#fcf6ba'); // Soft pale gold (highlight)
    goldGrad.addColorStop(0.4, '#b38728'); // Dull gold
    goldGrad.addColorStop(0.6, '#fbf5b7'); // Golden sheen
    goldGrad.addColorStop(0.8, '#aa771c'); // Dark bronze gold
    goldGrad.addColorStop(1, '#bf953f');   // Deep gold
    
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 3. Draw twinkling glitter specks
    const time = (Date.now() - startTime.current) / 1000;
    glitterSpecks.current.forEach((speck) => {
      // Sinusoidal twinkling pulse
      const twinkle = Math.sin(time * 6 + speck.phase) * 0.35 + 0.65;
      ctx.fillStyle = `rgba(255, 255, 255, ${speck.opacity * twinkle})`;
      ctx.beginPath();
      ctx.arc(speck.x * width, speck.y * height, speck.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Diagonal moving shine sweep (every 4.5 seconds: 1.5s sweep + 3.0s pause)
    const elapsed = Date.now() - startTime.current;
    const cycleDuration = 4500; // 4.5 seconds per sweep cycle
    const progress = (elapsed % cycleDuration) / cycleDuration;
    
    let sweepProgress = -1;
    if (progress <= 0.33) {
      sweepProgress = progress / 0.33; // map to 0 to 1 during first 1.5 seconds
    }

    if (sweepProgress !== -1) {
      // Use source-atop to restrict the shine highlights to the golden card layer
      ctx.globalCompositeOperation = 'source-atop';
      const shineWidth = 100;
      const startX = -shineWidth - 50;
      const endX = width + shineWidth + 50;
      const currentX = startX + (endX - startX) * sweepProgress;

      const shineGrad = ctx.createLinearGradient(
        currentX - shineWidth, 0,
        currentX + shineWidth, height
      );
      shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)'); // white shine stripe
      shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = shineGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // 5. Draw decorative golden luxury inner border
    ctx.globalCompositeOperation = 'source-atop';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // 6. Draw text overlay in Cormorant Garamond display
    ctx.fillStyle = '#faf6f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = width < 250 ? '14px' : '16px';
    ctx.font = `bold ${fontSize} 'Cormorant Garamond', Georgia, serif`;
    
    // Elegant text drop shadow
    ctx.shadowColor = 'rgba(60, 47, 47, 0.45)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText('Scratch to Reveal ✦', width / 2, height / 2);
    
    // Reset shadow values
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // 7. Erase scratched areas using offscreen canvas mask
    if (offscreenCanvasRef.current) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(offscreenCanvasRef.current, 0, 0);
    }

    // 8. Draw magical fading golden sparkles popping from the scratched paths
    ctx.globalCompositeOperation = 'source-over';
    particlesRef.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // light gravity falling effect
      p.alpha -= 0.025; // fade out rate

      if (p.alpha > 0) {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        const size = p.size * (0.8 + Math.sin(time * 10 + p.phase) * 0.2);
        ctx.arc(p.x, p.y, Math.max(0.1, size), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Clean up dead particles
    particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };

  // Keep drawing loop running while canvas is active and not revealed
  useEffect(() => {
    if (isRevealed) return;

    const loop = () => {
      renderCanvas();
      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRevealed]);

  // ResizeObserver to coordinate sizes of both the main and offscreen canvases
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = width;
          canvas.height = height;

          // Align offscreen canvas dimension
          if (!offscreenCanvasRef.current) {
            offscreenCanvasRef.current = document.createElement('canvas');
          }
          offscreenCanvasRef.current.width = width;
          offscreenCanvasRef.current.height = height;

          // Generate static glitter specks mapped relative to bounds
          const specks = [];
          const count = 35;
          for (let i = 0; i < count; i++) {
            specks.push({
              x: Math.random(),
              y: Math.random(),
              size: 0.7 + Math.random() * 1.5,
              opacity: 0.35 + Math.random() * 0.55,
              phase: Math.random() * Math.PI * 2
            });
          }
          glitterSpecks.current = specks;

          renderCanvas();
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (isRevealed) return;
    const coords = getCoordinates(e);
    if (!coords) return;
    setIsDrawing(true);
    lastPoint.current = coords;
    scratch(coords.x, coords.y);
  };

  const draw = (e) => {
    if (!isDrawing || isRevealed) return;
    if (e.cancelable) e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    scratch(coords.x, coords.y);
    checkScratchPercentage(false);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPoint.current = null;
    checkScratchPercentage(true);
  };

  // Perform scratch strokes onto the offscreen canvas mask
  const scratch = (x, y) => {
    const offscreen = offscreenCanvasRef.current;
    if (!offscreen) return;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    offCtx.globalCompositeOperation = 'source-over';
    offCtx.lineJoin = 'round';
    offCtx.lineCap = 'round';
    offCtx.lineWidth = 42; // Brush thickness
    offCtx.strokeStyle = '#000000';
    offCtx.fillStyle = '#000000';

    offCtx.beginPath();
    if (lastPoint.current) {
      offCtx.moveTo(lastPoint.current.x, lastPoint.current.y);
      offCtx.lineTo(x, y);
      offCtx.stroke();
    } else {
      offCtx.arc(x, y, 21, 0, Math.PI * 2);
      offCtx.fill();
    }

    lastPoint.current = { x, y };

    // Throttled particle spawning: only spawn on initial tap or when moved > 8px
    const dx = x - lastSpawnPoint.current.x;
    const dy = y - lastSpawnPoint.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 8 || !lastPoint.current) {
      lastSpawnPoint.current = { x, y };
      const colors = ['#bf953f', '#fcf6ba', '#b38728', '#fbf5b7', '#ffffff'];
      for (let i = 0; i < 2; i++) { // spawn only 2 sparkles instead of 4
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5, // slower horizontal sway
          vy: (Math.random() - 0.5) * 1.5 - 0.5, // gentle float
          size: 1 + Math.random() * 1.8,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI
        });
      }
    }

    renderCanvas();
  };

  // Calculate clear percentage directly from the offscreen canvas mask
  const checkScratchPercentage = (force = false) => {
    const offscreen = offscreenCanvasRef.current;
    if (!offscreen) return;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;
    const width = offscreen.width;
    const height = offscreen.height;

    const now = Date.now();
    if (!force && now - lastCheckTime.current < 150) return;
    lastCheckTime.current = now;

    try {
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let cleared = 0;

      // Count pixels written to in offscreen canvas (alpha channel > 50)
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 150) {
          cleared++;
        }
      }

      const percent = (cleared / (width * height)) * 100;
      if (percent >= 25) {
        setIsRevealed(true);
      }
    } catch (err) {
      console.error("Failed to calculate scratch percentage:", err);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[150px] select-none rounded-[2rem] overflow-hidden flex flex-col justify-center"
    >
      {/* Target Content to Reveal */}
      <div className="w-full h-full relative z-0 flex flex-col justify-center">
        {children}
      </div>

      {/* Scratch Canvas Overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 cursor-crosshair touch-none w-full h-full"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
