import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScratchCard({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef(null);
  const lastCheckTime = useRef(0);

  // Helper to draw the scratch cover
  const drawCanvasCover = (canvas, width, height) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset composite operation to draw the cover
    ctx.globalCompositeOperation = 'source-over';

    // Draw luxury gold gradient cover
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e8c5c8');  // Soft rose gold
    gradient.addColorStop(0.5, '#d4af37'); // Muted gold
    gradient.addColorStop(1, '#c5a880');  // Champagne gold
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw decorative gold border outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Draw prompt text
    ctx.fillStyle = '#faf6f0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Choose appropriate size based on dimensions
    const fontSize = width < 250 ? '14px' : '16px';
    ctx.font = `bold ${fontSize} 'Playfair Display', Georgia, serif`;
    
    // Add text shadow
    ctx.shadowColor = 'rgba(60, 47, 47, 0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText('Scratch to Reveal ✦', width / 2, height / 2);
  };

  // ResizeObserver to handle dynamic rendering sizes after Framer Motion layout animations
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
          drawCanvasCover(canvas, width, height);
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
    // Safe lookup for touch events (including touchEnd fallbacks)
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
    
    // Prevent scrolling on mobile devices while scratching
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

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 42; // Brush thickness
    
    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    }
    
    lastPoint.current = { x, y };
  };

  const checkScratchPercentage = (force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    
    // Throttle calculation calls to prevent performance degradation on continuous movements
    const now = Date.now();
    if (!force && now - lastCheckTime.current < 150) return;
    lastCheckTime.current = now;
    
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let cleared = 0;
      
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 50) {
          cleared++;
        }
      }
      
      const percent = (cleared / (width * height)) * 100;
      
      // Auto reveal at exactly 25% scratched
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
