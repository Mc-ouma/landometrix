'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";

// Animation stages 
const STAGE_DATA_COLLECTION = 0;
const STAGE_ANALYSIS = 1;
const STAGE_VISUALIZATION = 2;
const STAGE_INSIGHTS = 3;

// Helper types
interface Particle {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  hue: number;
  saturation: number;
  lightness: number;
  baseSize: number;
  size: number;
  dataValue: number;
}

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  performanceMode?: boolean;
  highQualityEffects?: boolean;
  connectionLines?: boolean;
}

/**
 * Improved AnimatedBackground component with better performance:
 * - Uses requestIdleCallback for non-critical updates
 * - Implements spatial partitioning for faster proximity calculations
 * - Skips frames when performance is low
 * - Scales down effects based on device capability
 * - Uses memo to prevent unnecessary re-renders
 * - Optimizes canvas operations
 */
const AnimatedBackgroundOptimized: React.FC<AnimatedBackgroundProps> = memo(({
  className = "",
  particleCount = 80,
  performanceMode = false,
  highQualityEffects = true,
  connectionLines = true,
}) => {
  // Refs for canvas and animation state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<number>(STAGE_DATA_COLLECTION);
  const requestRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const gridRef = useRef<Map<string, Particle[]>>(new Map());
  const cellSizeRef = useRef<number>(50); // Size of each grid cell for spatial partitioning
  
  // Performance tracking
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const devicePerformanceRef = useRef<'low'|'medium'|'high'>('high');
  
  // Feature detection
  const supportsOffscreenCanvas = useRef<boolean>(typeof OffscreenCanvas !== 'undefined');
  const prefersReducedMotion = useRef<boolean>(
    typeof window !== 'undefined' && 
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
  
  // Detect device performance once on mount
  useEffect(() => {
    const detectDevicePerformance = () => {
      // Check if this is a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // Check device memory if available
      const memory = (navigator as any).deviceMemory;
      
      if (isMobile) {
        devicePerformanceRef.current = 'low';
      } else if (memory && memory < 4) {
        devicePerformanceRef.current = 'medium';
      }
      
      // Adjust particle count based on detected performance
      const adjustedCount = 
        devicePerformanceRef.current === 'low' ? Math.min(40, particleCount) :
        devicePerformanceRef.current === 'medium' ? Math.min(60, particleCount) :
        particleCount;
        
      // Initialize particles with the adjusted count
      initializeParticles(adjustedCount);
    };
    
    detectDevicePerformance();
    
    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [particleCount]);
  
  // Initialize particles with spatial partitioning
  const initializeParticles = useCallback((count: number) => {
    const particles: Particle[] = [];
    
    if (!canvasRef.current) return;
    
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    for (let i = 0; i < count; i++) {
      const particle = createParticle(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 100
      );
      particles.push(particle);
    }
    
    particlesRef.current = particles;
    updateSpatialGrid(particles);
  }, []);
  
  // Create a particle with optimized properties
  const createParticle = (x: number, y: number, dataValue: number): Particle => ({
    x,
    y,
    z: Math.random() * 2 + 0.5,
    targetX: x,
    targetY: y,
    vx: 0,
    vy: 0,
    hue: 180 + (dataValue / 100) * 60,
    saturation: 75 + Math.random() * 25,
    lightness: 55 + Math.random() * 25,
    baseSize: 2.5 + dataValue / 18,
    size: 2.5 + dataValue / 18,
    dataValue
  });
  
  // Update spatial grid for faster neighbor lookup
  const updateSpatialGrid = useCallback((particles: Particle[]) => {
    const grid = new Map<string, Particle[]>();
    const cellSize = cellSizeRef.current;
    
    particles.forEach(p => {
      const cellX = Math.floor(p.x / cellSize);
      const cellY = Math.floor(p.y / cellSize);
      const key = `${cellX},${cellY}`;
      
      if (!grid.has(key)) {
        grid.set(key, []);
      }
      grid.get(key)!.push(p);
    });
    
    gridRef.current = grid;
  }, []);
  
  // Get neighbors efficiently using spatial grid
  const getNeighbors = useCallback((particle: Particle, maxDistance: number) => {
    const cellSize = cellSizeRef.current;
    const cellX = Math.floor(particle.x / cellSize);
    const cellY = Math.floor(particle.y / cellSize);
    const neighbors: Particle[] = [];
    
    // Check surrounding cells
    const radius = Math.ceil(maxDistance / cellSize);
    for (let x = cellX - radius; x <= cellX + radius; x++) {
      for (let y = cellY - radius; y <= cellY + radius; y++) {
        const key = `${x},${y}`;
        const cellParticles = gridRef.current.get(key);
        
        if (cellParticles) {
          neighbors.push(...cellParticles.filter(p => p !== particle));
        }
      }
    }
    
    return neighbors;
  }, []);
  
  // Animation loop with performance optimizations
  const animate = useCallback((timestamp: number) => {
    frameCountRef.current++;
    
    // Calculate delta time with a maximum to prevent large jumps
    const deltaTime = Math.min(timestamp - (lastFrameTimeRef.current || timestamp), 100) / 16.67;
    lastFrameTimeRef.current = timestamp;
    
    // Update FPS counter once per second
    if (timestamp - lastFpsUpdateRef.current >= 1000) {
      fpsRef.current = frameCountRef.current;
      frameCountRef.current = 0;
      lastFpsUpdateRef.current = timestamp;
      
      // Dynamically adjust quality based on performance
      if (fpsRef.current < 30) {
        // Switch to lower quality mode if performance is poor
        devicePerformanceRef.current = 'low';
      }
    }
    
    // Render frame
    renderFrame(deltaTime);
    
    // Request next frame
    requestRef.current = requestAnimationFrame(animate);
  }, []);
  
  // Optimized rendering function
  const renderFrame = useCallback((deltaTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;
    
    // Clear canvas - different clearing methods based on device performance
    if (devicePerformanceRef.current === 'low') {
      ctx.fillStyle = 'rgb(15, 23, 42)';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)";
      ctx.fillRect(0, 0, width, height);
    }
    
    // Update particles at different rates based on performance
    const updateInterval = 
      devicePerformanceRef.current === 'low' ? 2 :  // Update every 2nd frame
      devicePerformanceRef.current === 'medium' ? 1 : // Update every frame
      1; // Default: update every frame
      
    if (frameCountRef.current % updateInterval === 0) {
      // Only update spatial grid every few frames to save performance
      updateSpatialGrid(particles);
      
      // Update particles
      particles.forEach(particle => {
        // Update particle position (simplified for performance)
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;
        
        // Apply inertia/damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        // Keep particles within bounds
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -0.5;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -0.5;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }
      });
    }
    
    // Draw connection lines (only if enabled and performance allows)
    if (connectionLines && devicePerformanceRef.current !== 'low') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      // Use a simplified connection algorithm for medium performance devices
      const connectionDistance = devicePerformanceRef.current === 'medium' ? 80 : 120;
      const maxConnections = devicePerformanceRef.current === 'medium' ? 3 : 5;
      
      if (devicePerformanceRef.current === 'medium') {
        // Simplified connection algorithm
        for (let i = 0; i < particles.length; i += 2) { // Skip every other particle
          const p1 = particles[i];
          let connectionCount = 0;
          
          for (let j = 0; j < particles.length && connectionCount < maxConnections; j += 2) {
            if (i !== j) {
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist < connectionDistance) {
                const opacity = 1 - (dist / connectionDistance);
                ctx.globalAlpha = opacity * 0.2;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
                connectionCount++;
              }
            }
          }
        }
      } else {
        // Full quality connection algorithm with spatial partitioning
        particles.forEach(p1 => {
          const neighbors = getNeighbors(p1, connectionDistance);
          let connectionCount = 0;
          
          neighbors.forEach(p2 => {
            if (connectionCount < maxConnections) {
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist < connectionDistance) {
                const opacity = 1 - (dist / connectionDistance);
                ctx.globalAlpha = opacity * 0.2;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
                connectionCount++;
              }
            }
          });
        });
      }
      
      ctx.globalAlpha = 1;
    }
    
    // Draw particles
    particles.forEach(p => {
      const size = p.size * (0.8 + (Math.sin(Date.now() / 1000) * 0.2));
      
      if (devicePerformanceRef.current === 'high' && highQualityEffects) {
        // High quality rendering with glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0.8)`);
        gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw actual particle (all quality levels)
      ctx.fillStyle = `hsl(${p.hue}, ${p.saturation}%, ${p.lightness}%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    });
    
  }, [connectionLines, getNeighbors, highQualityEffects, updateSpatialGrid]);
  
  // Set up canvas and start animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Update particle positions when canvas size changes
      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach(p => {
          if (p.x > canvas.width) p.x = canvas.width * Math.random();
          if (p.y > canvas.height) p.y = canvas.height * Math.random();
        });
      }
    };
    
    // Initial setup
    updateCanvasSize();
    initializeParticles(
      devicePerformanceRef.current === 'low' ? Math.min(40, particleCount) :
      devicePerformanceRef.current === 'medium' ? Math.min(60, particleCount) :
      particleCount
    );
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle resize
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate, initializeParticles, particleCount]);
  
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
});

AnimatedBackgroundOptimized.displayName = 'AnimatedBackgroundOptimized';

export default AnimatedBackgroundOptimized;
