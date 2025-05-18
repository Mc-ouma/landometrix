'use client';

import React, { useEffect, useRef, useState } from 'react';

// Animation stages as numbers for simplicity
const STAGE_DATA_COLLECTION = 0;
const STAGE_ANALYSIS = 1;
const STAGE_VISUALIZATION = 2;
const STAGE_INSIGHTS = 3;

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<number>(STAGE_DATA_COLLECTION);
  const requestRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<any[]>([]);
  const stageTimeRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const stageTransitionRef = useRef<boolean>(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Regenerate positions when resizing
      if (particlesRef.current.length > 0) {
        generateShapeForStage(stage, particlesRef.current, canvas.width, canvas.height);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
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
      trail: Array<{ x: number, y: number, size: number, opacity: number }> = [];
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
        // Values will be in blue to teal range (180-240 degrees in HSL)
        this.hue = 180 + (dataValue / 100) * 60;
        this.saturation = 75 + Math.random() * 25; // More saturated colors
        this.lightness = 55 + Math.random() * 25; // Brighter particles
        
        // Slightly larger particles for better visibility
        this.baseSize = 2.5 + (dataValue / 18);
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
      
      update(time: number, currentStage: number, width: number, height: number, particles: Particle[]) {
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
          
          // Add trail points during explosion
          if (Math.random() > 0.5) {
            this.addTrailPoint(0.7);
          }
        } else {
          // Normal movement toward target with smooth interpolation
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          const speed = 0.05;
          
          this.vx = dx * speed;
          this.vy = dy * speed;
          
          // Apply repulsion from nearby particles
          for (const p of particles) {
            if (p !== this) {
              const repelDx = this.x - p.x;
              const repelDy = this.y - p.y;
              const distance = Math.sqrt(repelDx * repelDx + repelDy * repelDy);
              
              if (distance < 20) {
                const repelForce = (20 - distance) * 0.003;
                this.vx += repelDx * repelForce / distance;
                this.vy += repelDy * repelForce / distance;
              }
            }
          }
          
          this.x += this.vx;
          this.y += this.vy;
          
          // Add trail based on stage
          if (Math.random() > 0.3) {
            this.addTrailPoint(currentStage === STAGE_DATA_COLLECTION ? 0.4 : 0.3);
          }
        }
        
        // Update trail opacity
        for (let i = this.trail.length - 1; i >= 0; i--) {
          this.trail[i].opacity -= 0.03;
          if (this.trail[i].opacity <= 0) {
            this.trail.splice(i, 1);
          }
        }
        
        // Pulse effect: oscillate size based on time and data value
        const pulseSpeed = 0.002;
        const pulseAmount = this.dataValue / 30;
        this.size = this.baseSize + Math.sin(time * pulseSpeed * (this.dataValue / 20 + 0.5)) * pulseAmount;
      }
      
      addTrailPoint(baseOpacity: number) {
        // Trail length depends on explosion or stage
        const maxTrailLength = this.explosionSpeed > 0.1 ? 7 : 
                          (stage === STAGE_DATA_COLLECTION ? 10 : 5);
                          
        if (this.trail.length < maxTrailLength) {
          this.trail.push({
            x: this.x,
            y: this.y,
            size: this.size * 0.7,
            opacity: baseOpacity + Math.random() * 0.2
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
        
        // Sparkle effect for high data values or during transitions
        if (this.dataValue > 75 || this.explosionSpeed > 0.1) {
          const glow = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
          );
          glow.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness + 20}%, 1)`);
          glow.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`);
          ctx.fillStyle = glow;
          ctx.globalCompositeOperation = 'lighter';
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }
        
        ctx.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        ctx.fill();
      }
    }
    
    // Generate shapes based on the current animation stage
    function generateShapeForStage(stage: number, particles: any[], width: number, height: number) {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.4;
      
      switch (stage) {
        case STAGE_DATA_COLLECTION: // Scattered points with clusters
          particles.forEach(p => {
            let angle, radius;
            if (Math.random() > 0.3) {
              // Create clusters
              const clusterCount = 4;
              const clusterIndex = Math.floor(Math.random() * clusterCount);
              const clusterAngle = (Math.PI * 2 / clusterCount) * clusterIndex;
              const clusterX = centerX + Math.cos(clusterAngle) * (maxRadius * 0.5);
              const clusterY = centerY + Math.sin(clusterAngle) * (maxRadius * 0.5);
              
              angle = Math.random() * Math.PI * 2;
              radius = Math.random() * (maxRadius * 0.4);
              p.setTarget(
                clusterX + Math.cos(angle) * radius,
                clusterY + Math.sin(angle) * radius
              );
            } else {
              // Random scattered position
              angle = Math.random() * Math.PI * 2;
              radius = Math.random() * maxRadius;
              p.setTarget(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
              );
            }
          });
          break;
          
        case STAGE_ANALYSIS: // Grid pattern
          const gridSize = Math.ceil(Math.sqrt(particles.length));
          const cellWidth = Math.min(width, height) * 0.7 / gridSize;
          const startX = centerX - (cellWidth * gridSize) / 2;
          const startY = centerY - (cellWidth * gridSize) / 2;
          
          particles.forEach((p, i) => {
            const gridX = i % gridSize;
            const gridY = Math.floor(i / gridSize);
            p.setTarget(
              startX + gridX * cellWidth + cellWidth / 2,
              startY + gridY * cellWidth + cellWidth / 2
            );
          });
          break;
          
        case STAGE_VISUALIZATION: // Circular chart
          particles.forEach((p, i) => {
            const slice = particles.length;
            const angle = (Math.PI * 2 / slice) * i;
            const radius = maxRadius * (0.3 + (p.dataValue / 100) * 0.7);
            p.setTarget(
              centerX + Math.cos(angle) * radius,
              centerY + Math.sin(angle) * radius
            );
          });
          break;
          
        case STAGE_INSIGHTS: // Arrow or trend line
          particles.forEach((p, i) => {
            const normalizedI = i / particles.length;
            
            if (normalizedI < 0.4) {
              // Arrow shaft
              const y = centerY + maxRadius * 0.6 - normalizedI * maxRadius * 1.5;
              const xOffset = (Math.random() - 0.5) * (maxRadius * 0.2);
              p.setTarget(centerX + xOffset, y);
            } else {
              // Arrow head
              const angle = ((normalizedI - 0.4) / 0.6) * Math.PI - Math.PI / 2;
              const radius = maxRadius * 0.5;
              p.setTarget(
                centerX + Math.cos(angle) * radius,
                centerY - maxRadius * 0.3 + Math.sin(angle) * radius
              );
            }
          });
          break;
      }
    }
    
    // Create particles
    const numberOfParticles = 100; // Increased particle count for more dynamic effect
    const particles: any[] = [];
    
    for (let i = 0; i < numberOfParticles; i++) {
      // Distribution favoring higher data values for more vibrant visuals
      const dataValue = Math.pow(Math.random(), 0.8) * 100;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y, dataValue));
    }
    
    particlesRef.current = particles;
    generateShapeForStage(stage, particles, canvas.width, canvas.height);
    
    // Animation loop
    const animate = (timestamp: number) => {
      if (!previousTimeRef.current) previousTimeRef.current = timestamp;
      const deltaTime = timestamp - previousTimeRef.current;
      previousTimeRef.current = timestamp;
      
      // Update stage time and check for transitions
      stageTimeRef.current += deltaTime;
      if (stageTimeRef.current > 6000) { // Change stage every 6 seconds
        stageTimeRef.current = 0;
        stageTransitionRef.current = true;
        
        // Cycle through stages
        const nextStage = (stage + 1) % 4;
        setStage(nextStage);
        
        // If transitioning back to data collection, trigger explosion effect
        if (nextStage === STAGE_DATA_COLLECTION) {
          particles.forEach(p => p.explode());
        }
        
        // Generate new shape for the next stage
        generateShapeForStage(nextStage, particles, canvas.width, canvas.height);
        
        // Reset transition flag after a delay
        setTimeout(() => {
          stageTransitionRef.current = false;
        }, 1000);
      }
      
      // Enhanced motion blur effect for smoother trails with slight color tint
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)'; // Slight blue tint matching background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connection lines for Analysis and Visualization stages
      if (stage === STAGE_ANALYSIS || stage === STAGE_VISUALIZATION) {
        for (let a = 0; a < particles.length; a++) {
          for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Increased connection distance and enhanced styling
            if (distance < 120) {
              // Mix colors from both particles for more dynamic connections
              const hue1 = particles[a].hue;
              const hue2 = particles[b].hue;
              const avgHue = (hue1 + hue2) / 2;
              
              const opacity = 0.2 * (1 - distance / 120);
              ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${opacity})`;
              
              // Line width based on particle data values
              const combinedValue = (particles[a].dataValue + particles[b].dataValue) / 200;
              ctx.lineWidth = 0.3 + combinedValue * 0.4;
              
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Update and draw particles
      particles.forEach(p => {
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
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stage]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{ background: 'radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(10,15,30,0.95) 100%)' }}
    />
  );
};

export default AnimatedBackground;
