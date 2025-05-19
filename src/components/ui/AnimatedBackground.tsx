"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

// Animation stages as numbers for simplicity
const STAGE_DATA_COLLECTION = 0;
const STAGE_ANALYSIS = 1;
const STAGE_VISUALIZATION = 2;
const STAGE_INSIGHTS = 3;

// Helper type for requestIdleCallback
type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

// Polyfill declarations
declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

// Enhanced AnimatedBackgroundProps with more performance options
interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number; // Allow customizing particle count
  performanceMode?: boolean; // Add performance mode option
  highQualityEffects?: boolean; // Toggle advanced visual effects
  connectionLines?: boolean; // Toggle connection lines between particles
}

// Define Particle type to avoid 'any'
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
  trail: Array<{ x: number; y: number; size: number; opacity: number }>;
  explosionAngle: number;
  explosionSpeed: number;
  explosionDecay: number;
  setTarget: (x: number, y: number) => void;
  explode: () => void;
  update: (
    time: number,
    currentStage: number,
    width: number,
    height: number,
    particles: Particle[],
  ) => void;
  addTrailPoint: (baseOpacity: number) => void;
  draw: (ctx: CanvasRenderingContext2D, time: number) => void;
}

// Grid cell type for spatial optimization
interface GridCell {
  particles: Particle[];
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = "",
  particleCount = 80, // Default is still 80
  performanceMode = false, // Default to high quality
  highQualityEffects = true, // Enable advanced effects by default
  connectionLines = true, // Enable connection lines by default
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<number>(STAGE_DATA_COLLECTION);
  const requestRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const stageTimeRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const stageTransitionRef = useRef<boolean>(false);
  const fpsRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      isReducedMotionRef.current = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        isReducedMotionRef.current = e.matches;
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Calculate actual particle count based on device and settings
  const actualParticleCount = useMemo(() => {
    // If reduced motion or performance mode, use fewer particles
    if (isReducedMotionRef.current || performanceMode) {
      return Math.floor(particleCount * 0.6);
    }

    // Check if device might be low powered (mobile)
    if (
      typeof navigator !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return Math.floor(particleCount * 0.7);
    }

    return particleCount;
  }, [particleCount, performanceMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Set high quality rendering for non-performance mode
    if (!performanceMode && !isReducedMotionRef.current) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    } else {
      ctx.imageSmoothingEnabled = false;
    }

    // Resize canvas to fill window with device pixel ratio consideration
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(window.innerWidth);
      const displayHeight = Math.floor(window.innerHeight);

      canvas.width = displayWidth * (performanceMode ? 1 : dpr);
      canvas.height = displayHeight * (performanceMode ? 1 : dpr);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      if (!performanceMode) {
        ctx.scale(dpr, dpr);
      }

      // Regenerate positions when resizing
      if (particlesRef.current.length > 0) {
        generateShapeForStage(
          stage,
          particlesRef.current,
          displayWidth,
          displayHeight,
        );
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class implementation
    class ParticleImplementation implements Particle {
      x: number;
      y: number;
      z: number;
      targetX: number;
      targetY: number;
      vx: number = 0;
      vy: number = 0;
      hue: number;
      saturation: number;
      lightness: number;
      baseSize: number;
      size: number;
      dataValue: number;
      trail: Array<{ x: number; y: number; size: number; opacity: number }> =
        [];
      explosionAngle: number = 0;
      explosionSpeed: number = 0;
      explosionDecay: number = 1;

      constructor(x: number, y: number, dataValue: number) {
        this.x = x;
        this.y = y;
        this.z = Math.random() * 2 + 0.5; // 0.5 to 2.5 for parallax depth
        this.targetX = x;
        this.targetY = y;
        this.dataValue = dataValue;

        // Enhanced color scheme aligned with Landometrix branding
        this.hue = 180 + (dataValue / 100) * 60;
        this.saturation = 75 + Math.random() * 25;
        this.lightness = 55 + Math.random() * 25;

        // Slightly larger particles for better visibility
        this.baseSize = 2.5 + dataValue / 18;
        this.size = this.baseSize;
      }

      setTarget(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
      }

      explode() {
        this.explosionAngle = Math.random() * Math.PI * 2;
        this.explosionSpeed = 5 + Math.random() * 5; // 5-10 units
        this.explosionDecay = 0.95;
      }

      update(
        time: number,
        currentStage: number,
        width: number,
        height: number,
        particles: Particle[],
      ) {
        // Reduced computation for performance mode
        const repelDistance = performanceMode ? 15 : 20;
        const repelForce = performanceMode ? 0.002 : 0.003;

        // Handle explosion effect
        if (this.explosionSpeed > 0.1) {
          this.x += Math.cos(this.explosionAngle) * this.explosionSpeed;
          this.y += Math.sin(this.explosionAngle) * this.explosionSpeed;
          this.explosionSpeed *= this.explosionDecay;

          // Boundary check during explosion
          if (this.x < 0) this.x = 0;
          if (this.x > width) this.x = width;
          if (this.y < 0) this.y = 0;
          if (this.y > height) this.y = height;

          // Add trail points during explosion - reduced for performance mode
          if (Math.random() > (performanceMode ? 0.7 : 0.5)) {
            this.addTrailPoint(0.7);
          }
        } else {
          // Normal movement toward target with smooth interpolation
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          const speed = performanceMode ? 0.06 : 0.05;

          this.vx = dx * speed;
          this.vy = dy * speed;

          // Apply repulsion from nearby particles
          for (const p of particles) {
            if (p !== this) {
              const repelDx = this.x - p.x;
              const repelDy = this.y - p.y;
              const distSq = repelDx * repelDx + repelDy * repelDy;

              if (distSq < repelDistance * repelDistance) {
                const distance = Math.sqrt(distSq);
                const force = (repelDistance - distance) * repelForce;
                this.vx += (repelDx * force) / distance;
                this.vy += (repelDy * force) / distance;
              }
            }
          }

          this.x += this.vx;
          this.y += this.vy;

          // Add trail based on stage - reduced for performance mode
          if (Math.random() > (performanceMode ? 0.6 : 0.3)) {
            this.addTrailPoint(
              currentStage === STAGE_DATA_COLLECTION ? 0.4 : 0.3,
            );
          }
        }

        // Update trail opacity
        const trailFadeSpeed = performanceMode ? 0.04 : 0.03;
        for (let i = this.trail.length - 1; i >= 0; i--) {
          this.trail[i].opacity -= trailFadeSpeed;
          if (this.trail[i].opacity <= 0) {
            this.trail.splice(i, 1);
          }
        }

        // Pulse effect: oscillate size based on time and data value
        if (!performanceMode) {
          const pulseSpeed = 0.002;
          const pulseAmount = this.dataValue / 30;
          this.size =
            this.baseSize +
            Math.sin(time * pulseSpeed * (this.dataValue / 20 + 0.5)) *
              pulseAmount;
        } else {
          this.size = this.baseSize;
        }
      }

      addTrailPoint(baseOpacity: number) {
        // Trail length based on current state and performance mode
        const maxTrailLength = performanceMode
          ? 3
          : this.explosionSpeed > 0.1
            ? 7
            : stage === STAGE_DATA_COLLECTION
              ? 10
              : 5;

        if (this.trail.length < maxTrailLength) {
          this.trail.push({
            x: this.x,
            y: this.y,
            size: this.size * 0.7,
            opacity: baseOpacity + Math.random() * 0.2,
          });
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${t.opacity})`;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Sparkle effect for high data values or during transitions (skip if performance mode or high quality effects disabled)
        if (
          !performanceMode &&
          highQualityEffects &&
          (this.dataValue > 75 || this.explosionSpeed > 0.1)
        ) {
          const glow = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size * 2,
          );
          glow.addColorStop(
            0,
            `hsla(${this.hue}, ${this.saturation}%, ${this.lightness + 20}%, 1)`,
          );
          glow.addColorStop(
            1,
            `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`,
          );
          ctx.fillStyle = glow;
          ctx.globalCompositeOperation = "lighter";
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }

        ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        ctx.fill();
      }
    }

    // Generate shapes based on the current animation stage
    function generateShapeForStage(
      stage: number,
      particles: Particle[],
      width: number,
      height: number,
    ) {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.4;

      switch (stage) {
        case STAGE_DATA_COLLECTION: // Scattered points with clusters
          particles.forEach((p) => {
            let angle, radius;
            if (Math.random() > 0.3) {
              // Create clusters
              const clusterCount = 4;
              const clusterIndex = Math.floor(Math.random() * clusterCount);
              const clusterAngle =
                ((Math.PI * 2) / clusterCount) * clusterIndex;
              const clusterX =
                centerX + Math.cos(clusterAngle) * (maxRadius * 0.5);
              const clusterY =
                centerY + Math.sin(clusterAngle) * (maxRadius * 0.5);

              angle = Math.random() * Math.PI * 2;
              radius = Math.random() * (maxRadius * 0.4);
              p.setTarget(
                clusterX + Math.cos(angle) * radius,
                clusterY + Math.sin(angle) * radius,
              );
            } else {
              // Random scattered position
              angle = Math.random() * Math.PI * 2;
              radius = Math.random() * maxRadius;
              p.setTarget(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius,
              );
            }
          });
          break;

        case STAGE_ANALYSIS: // Grid pattern
          const gridSize = Math.ceil(Math.sqrt(particles.length));
          const cellWidth = (Math.min(width, height) * 0.7) / gridSize;
          const startX = centerX - (cellWidth * gridSize) / 2;
          const startY = centerY - (cellWidth * gridSize) / 2;

          particles.forEach((p, i) => {
            const gridX = i % gridSize;
            const gridY = Math.floor(i / gridSize);
            p.setTarget(
              startX + gridX * cellWidth + cellWidth / 2,
              startY + gridY * cellWidth + cellWidth / 2,
            );
          });
          break;

        case STAGE_VISUALIZATION: // Circular chart
          particles.forEach((p, i) => {
            const slice = particles.length;
            const angle = ((Math.PI * 2) / slice) * i;
            const radius = maxRadius * (0.3 + (p.dataValue / 100) * 0.7);
            p.setTarget(
              centerX + Math.cos(angle) * radius,
              centerY + Math.sin(angle) * radius,
            );
          });
          break;

        case STAGE_INSIGHTS: // Arrow or trend line
          particles.forEach((p, i) => {
            const normalizedI = i / particles.length;

            if (normalizedI < 0.4) {
              // Arrow shaft
              const y =
                centerY + maxRadius * 0.6 - normalizedI * maxRadius * 1.5;
              const xOffset = (Math.random() - 0.5) * (maxRadius * 0.2);
              p.setTarget(centerX + xOffset, y);
            } else {
              // Arrow head
              const angle = ((normalizedI - 0.4) / 0.6) * Math.PI - Math.PI / 2;
              const radius = maxRadius * 0.5;
              p.setTarget(
                centerX + Math.cos(angle) * radius,
                centerY - maxRadius * 0.3 + Math.sin(angle) * radius,
              );
            }
          });
          break;
      }
    }

    // Create particles
    const particles: Particle[] = [];

    for (let i = 0; i < actualParticleCount; i++) {
      const dataValue = Math.pow(Math.random(), 0.8) * 100;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new ParticleImplementation(x, y, dataValue));
    }

    particlesRef.current = particles;
    generateShapeForStage(stage, particles, canvas.width, canvas.height);

    // Animation loop with FPS management
    const animate = (timestamp: number) => {
      if (!previousTimeRef.current) previousTimeRef.current = timestamp;
      const deltaTime = timestamp - previousTimeRef.current;
      previousTimeRef.current = timestamp;

      // FPS tracking
      frameCountRef.current++;
      if (timestamp - lastFpsUpdateRef.current >= 1000) {
        fpsRef.current = frameCountRef.current;
        frameCountRef.current = 0;
        lastFpsUpdateRef.current = timestamp;
      }

      // Adaptive animation speed based on performance
      const adaptiveFactor =
        fpsRef.current < 30 ? 0.5 : fpsRef.current < 45 ? 0.75 : 1; // Slow down animations on low FPS

      // Skip frames if performance is really bad (below 20 FPS)
      if (fpsRef.current < 20 && Math.random() < 0.3) {
        requestRef.current = requestAnimationFrame(animate);
        return; // Skip this frame
      }

      // Update stage time and check for transitions
      stageTimeRef.current += deltaTime * adaptiveFactor;
      const stageDuration = isReducedMotionRef.current ? 8000 : 6000; // Slower transitions for reduced motion

      if (stageTimeRef.current > stageDuration) {
        stageTimeRef.current = 0;
        stageTransitionRef.current = true;

        // Cycle through stages
        const nextStage = (stage + 1) % 4;
        setStage(nextStage);

        // If transitioning back to data collection, trigger explosion effect
        if (nextStage === STAGE_DATA_COLLECTION) {
          particles.forEach((p) => p.explode());
        }

        // Generate new shape for the next stage
        generateShapeForStage(
          nextStage,
          particles,
          canvas.width,
          canvas.height,
        );

        // Reset transition flag after a delay
        setTimeout(() => {
          stageTransitionRef.current = false;
        }, 1000);
      }

      // Performance-optimized motion blur effect
      if (performanceMode) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "rgba(15, 23, 42, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw connection lines for Analysis and Visualization stages (optimized)
      if (
        (stage === STAGE_ANALYSIS || stage === STAGE_VISUALIZATION) &&
        !isReducedMotionRef.current &&
        connectionLines
      ) {
        // Using spatial grid optimization for better performance
        const connectionDistance = performanceMode ? 100 : 120;
        const gridSize = connectionDistance;
        const grid: Record<string, GridCell> = {};

        // Place particles in grid cells
        particles.forEach((p) => {
          const cellX = Math.floor(p.x / gridSize);
          const cellY = Math.floor(p.y / gridSize);
          const cellKey = `${cellX},${cellY}`;

          if (!grid[cellKey]) grid[cellKey] = { particles: [] };
          grid[cellKey].particles.push(p);
        });

        // Batch connections for better performance
        const connections: Array<[Particle, Particle, number]> = [];

        // For each particle, only check nearby grid cells
        particles.forEach((p) => {
          const cellX = Math.floor(p.x / gridSize);
          const cellY = Math.floor(p.y / gridSize);

          // Check 3x3 grid around current cell
          for (let nx = cellX - 1; nx <= cellX + 1; nx++) {
            for (let ny = cellY - 1; ny <= cellY + 1; ny++) {
              const neighborKey = `${nx},${ny}`;
              const neighbors = grid[neighborKey]?.particles || [];

              neighbors.forEach((neighbor) => {
                // Avoid duplicate connections and self-connections
                if (neighbor === p || neighbor.x > p.x) return; // Only process each pair once

                const dx = p.x - neighbor.x;
                const dy = p.y - neighbor.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < connectionDistance * connectionDistance) {
                  const distance = Math.sqrt(distSq);
                  connections.push([p, neighbor, distance]);
                }
              });
            }
          }
        });

        // Draw all connections in a single batch
        connections.forEach(([p, neighbor, distance]) => {
          const opacity = 0.15 * (1 - distance / connectionDistance);
          ctx.strokeStyle = `hsla(${(p.hue + neighbor.hue) / 2}, 70%, 60%, ${opacity})`;
          ctx.lineWidth =
            0.3 + ((p.dataValue + neighbor.dataValue) / 200) * 0.3;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.stroke();
        });
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update(timestamp, stage, canvas.width, canvas.height, particles);
        p.draw(ctx, timestamp);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [stage, performanceMode, actualParticleCount]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* CSS-based decorative elements for subtle background effects */}
      <div
        className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 opacity-30 animate-blob-move"
        style={{ animationDelay: "0s" }}
      />

      <div
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-teal-400/5 opacity-20 animate-blob-move"
        style={{ animationDelay: "-10s" }}
      />

      <div
        className="absolute top-2/3 right-1/3 w-64 h-64 rounded-full bg-indigo-500/5 opacity-25 animate-blob-move"
        style={{ animationDelay: "-5s" }}
      />

      <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-blue-300/5 opacity-20 animate-float-slow" />

      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-full ${className}`}
        style={{
          background:
            "radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(10,15,30,0.95) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
