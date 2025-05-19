// Web Worker for AnimatedBackground calculations
// This worker helps offload expensive calculations from the main thread

// Define interfaces for messaging
interface WorkerMessage {
  type: string;
  data: any;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  z: number;
  dataValue: number;
}

interface WorkerState {
  width: number;
  height: number;
  particles: Particle[];
  performanceMode: boolean;
}

// Worker state
const state: WorkerState = {
  width: 0,
  height: 0,
  particles: [],
  performanceMode: false
};

// Handle messages from main thread
self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { type, data } = e.data;
  
  switch (type) {
    case 'init':
      state.width = data.width;
      state.height = data.height;
      state.performanceMode = data.performanceMode;
      break;
      
    case 'update_particles':
      state.particles = data.particles;
      break;
      
    case 'calculate_connections':
      calculateConnections();
      break;
      
    case 'update_positions':
      updatePositions(data.deltaTime);
      break;
      
    case 'resize':
      state.width = data.width;
      state.height = data.height;
      break;
  }
};

// Calculate particle connections using spatial grid
function calculateConnections() {
  const connections: Array<[number, number, number]> = []; // [particleIndex1, particleIndex2, distance]
  const connectionDistance = state.performanceMode ? 100 : 120;
  const gridSize = connectionDistance;
  const grid: Record<string, number[]> = {}; // Maps grid cell to array of particle indices
  
  // Place particles in grid cells
  state.particles.forEach((p, index) => {
    const cellX = Math.floor(p.x / gridSize);
    const cellY = Math.floor(p.y / gridSize);
    const cellKey = `${cellX},${cellY}`;
    
    if (!grid[cellKey]) grid[cellKey] = [];
    grid[cellKey].push(index);
  });
  
  // For each particle, only check nearby grid cells
  state.particles.forEach((p, index) => {
    const cellX = Math.floor(p.x / gridSize);
    const cellY = Math.floor(p.y / gridSize);
    
    // Check 3x3 grid around current cell
    for (let nx = cellX - 1; nx <= cellX + 1; nx++) {
      for (let ny = cellY - 1; ny <= cellY + 1; ny++) {
        const neighborKey = `${nx},${ny}`;
        const neighbors = grid[neighborKey] || [];
        
        neighbors.forEach(neighborIndex => {
          // Avoid duplicate connections and self-connections
          if (neighborIndex === index || neighborIndex > index) return;
          
          const neighbor = state.particles[neighborIndex];
          const dx = p.x - neighbor.x;
          const dy = p.y - neighbor.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < connectionDistance * connectionDistance) {
            const distance = Math.sqrt(distSq);
            connections.push([index, neighborIndex, distance]);
          }
        });
      }
    }
  });
  
  // Send connections back to main thread
  self.postMessage({ type: 'connections_result', data: connections });
}

// Update particle positions
function updatePositions(deltaTime: number) {
  const updatedParticles = state.particles.map((p, index) => {
    const speed = state.performanceMode ? 0.06 : 0.05;
    const dx = p.targetX - p.x;
    const dy = p.targetY - p.y;
    
    // Simple implementation for worker - we're just handling basic movement
    // More complex behaviors remain in main thread
    p.vx = dx * speed;
    p.vy = dy * speed;
    p.x += p.vx;
    p.y += p.vy;
    
    return p;
  });
  
  // Send updated positions back to main thread
  self.postMessage({ type: 'positions_result', data: updatedParticles });
}
