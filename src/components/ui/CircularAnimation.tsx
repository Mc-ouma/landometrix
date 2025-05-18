'use client';

import { useEffect, useRef, useState } from 'react';

type DataPoint = {
  label: string;
  value: number;
  category?: string;
};

type CircularAnimationProps = {
  width?: number;
  height?: number;
  colorScheme?: 'blue' | 'purple' | 'teal' | 'amber';
  speed?: number;
  density?: number;
  data?: DataPoint[];
  showLabels?: boolean;
  title?: string;
  subtitle?: string;
};

// Sample data if none is provided
const sampleData: DataPoint[] = [
  { label: 'Revenue', value: 85, category: 'Financial' },
  { label: 'Customer Satisfaction', value: 92, category: 'Customer' },
  { label: 'Market Growth', value: 67, category: 'Market' },
  { label: 'Innovation', value: 78, category: 'R&D' },
  { label: 'Productivity', value: 71, category: 'Operations' },
  { label: 'Employee Engagement', value: 83, category: 'HR' },
  { label: 'Cost Efficiency', value: 65, category: 'Financial' },
];

const CircularAnimation = ({
  width = 800,
  height = 800,
  colorScheme = 'blue',
  speed = 1,
  density = 1,
  data = sampleData,
  showLabels = true,
  title = 'Performance Metrics',
  subtitle = 'Animated data visualization',
}: CircularAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [currentDensity, setCurrentDensity] = useState(density);
  const [currentColorScheme, setCurrentColorScheme] = useState(colorScheme);
  const [activeDataPoint, setActiveDataPoint] = useState<DataPoint | null>(null);
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);
  
  // Animation state variables stored in refs to avoid re-renders
  const animationRef = useRef<number | null>(null);
  const ttRef = useRef<number>(0);
  const circlesRef = useRef<any[]>([]);
  const colorRef = useRef<any>(null);
  const dataRef = useRef<DataPoint[]>(data);

  const colorSchemes = {
    blue: {
      baseColor: 144,
      colorRange: 255 - 144,
      bgGradient: ['#001233', '#023e8a'],
    },
    purple: {
      baseColor: 120,
      colorRange: 255 - 120,
      bgGradient: ['#240046', '#7b2cbf'],
    },
    teal: {
      baseColor: 130,
      colorRange: 255 - 130,
      bgGradient: ['#005f73', '#0a9396'],
    },
    amber: {
      baseColor: 150,
      colorRange: 255 - 150,
      bgGradient: ['#7f5539', '#dda15e'],
    },
  };

  // Initialize animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Constants
    const TP = 2 * Math.PI;
    const CSIZE = Math.min(width, height) / 2;
    
    // Set canvas size and scale for high DPI displays
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);
    
    // Center the drawing context
    ctx.translate(width / 2, height / 2);
    ctx.lineCap = "round";
    
    // Helper functions
    const getRandomInt = (min: number, max: number, low = false) => {
      if (low) return Math.floor(Math.random() * Math.random() * (max - min)) + min;
      else return Math.floor(Math.random() * (max - min)) + min;
    };
    
    // Color management
    class Color {
      private RK1: number = 0;
      private RK2: number = 0;
      private GK1: number = 0;
      private GK2: number = 0;
      private BK1: number = 0;
      private BK2: number = 0;
      private baseColor: number;
      private colorRange: number;
      
      constructor(scheme = 'blue') {
        this.baseColor = colorSchemes[scheme as keyof typeof colorSchemes].baseColor;
        this.colorRange = colorSchemes[scheme as keyof typeof colorSchemes].colorRange;
        this.randomize();
      }
      
      getRGB(ct: number) {
        const red = Math.round(this.baseColor + this.colorRange * Math.cos(this.RK2 + ct / this.RK1));
        const grn = Math.round(this.baseColor + this.colorRange * Math.cos(this.GK2 + ct / this.GK1));
        const blu = Math.round(this.baseColor + this.colorRange * Math.cos(this.BK2 + ct / this.BK1));
        return `rgb(${red},${grn},${blu})`;
      }
      
      randomize() {
        this.RK1 = 360 + 360 * Math.random();
        this.GK1 = 360 + 360 * Math.random();
        this.BK1 = 360 + 360 * Math.random();
        this.RK2 = TP * Math.random();
        this.GK2 = TP * Math.random();
        this.BK2 = TP * Math.random();
      }
      
      updateScheme(scheme: string) {
        this.baseColor = colorSchemes[scheme as keyof typeof colorSchemes].baseColor;
        this.colorRange = colorSchemes[scheme as keyof typeof colorSchemes].colorRange;
      }
    }
    
    // Circle class for animation
    class Circle {
      dir: boolean = false;
      r: number = 80;
      ka: number = 0;
      ka2: number = 200;
      p: Circle | false = false;
      a: number = 0;
      a2: number = 0;
      x: number = 0;
      y: number = 0;
      cont: boolean = false;
      path: Path2D = new Path2D();
      dataIndex: number = -1;
      dataPoint: DataPoint | null = null;
      
      constructor(dataIndex: number = -1) {
        this.dir = false;
        this.dataIndex = dataIndex;
        
        // Assign data point if valid index
        if (dataIndex >= 0 && dataIndex < dataRef.current.length) {
          this.dataPoint = dataRef.current[dataIndex];
          // Scale radius based on data value (50-100% of base size)
          this.r = 50 + (this.dataPoint.value / 100) * 50;
        } else {
          this.r = 80;
        }
        
        this.randomize();
      }
      
      randomize() {
        this.ka = 0;
        this.ka2 = this.dataPoint ? 100 + this.dataPoint.value : 200;
      }
      
      setRA() {
        if (this.dataPoint) {
          // Use data values to influence the animation
          const valueFactor = this.dataPoint.value / 100;
          this.a2 = TP / 5 + (TP / 3) * valueFactor * (1 + Math.sin(ttRef.current / this.ka2)) / 2;
        } else {
          this.a2 = TP / 4 + 1.57 * (1 + Math.sin(ttRef.current / this.ka2)) / 2;
        }
        if (this.dir) this.a2 = -this.a2;
      }
      
      setPath2() {
        if (this.p) {
          if (this.cont) {
            this.a = TP / 2 + this.p.a - this.p.a2;
            this.x = this.p.x + (this.p.r - this.r) * Math.cos(this.p.a - this.p.a2);
            this.y = this.p.y + (this.p.r - this.r) * Math.sin(this.p.a - this.p.a2);
          } else {
            this.a = this.p.a - this.p.a2;
            this.x = this.p.x + (this.p.r + this.r) * Math.cos(this.p.a - this.p.a2);
            this.y = this.p.y + (this.p.r + this.r) * Math.sin(this.p.a - this.p.a2);
          }
        } else {
          this.x = this.r * Math.cos(this.a);
          this.y = this.r * Math.sin(this.a);
        }
        this.path = new Path2D();
        this.path.arc(this.x, this.y, this.r, TP / 2 + this.a, this.a - this.a2, this.dir);
      }
    }
    
    // Initialize the animation state
    const reset = () => {
      // Start with a center circle that incorporates the first data point if available
      circlesRef.current = [new Circle(0)];
      circlesRef.current[0].p = false;
      circlesRef.current[0].a = 0;
      circlesRef.current[0].setRA();
      circlesRef.current[0].x = circlesRef.current[0].r * Math.cos(circlesRef.current[0].a);
      circlesRef.current[0].y = circlesRef.current[0].r * Math.sin(circlesRef.current[0].a);
    };
    
    // Add child circles
    const addCircle = (c: Circle, depth: number = 0) => {
      // Use next available data point if we haven't used them all
      const nextDataIndex = depth < dataRef.current.length ? depth : -1;
      
      const c2 = new Circle(nextDataIndex);
      c2.a = c.a - c.a2;
      c2.dir = !c.dir;
      c2.p = c;
      c2.cont = false;
      
      // If we have data, use it to influence the radius
      if (c2.dataPoint) {
        c2.r = c.r * (0.5 + 0.3 * (c2.dataPoint.value / 100));
      } else {
        c2.r = c.r * 0.8;
      }
      
      if (Math.random() < 0.5) c2.ka2 = c.ka2 * 0.8;
      circlesRef.current.push(c2);
      
      // Create a companion circle
      const c3 = new Circle(-1); // No data for companion circles
      c3.a = TP / 2 + c.a - c.a2;
      c3.dir = c.dir;
      c3.p = c;
      c3.cont = true;
      c3.r = c.r * 0.8;
      if (Math.random() < 0.5) c3.ka2 = c.ka2 * 0.8;
      circlesRef.current.push(c3);
    };
    
    // Path transformations for mirroring
    const dmx = new DOMMatrix([-1, 0, 0, 1, 0, 0]);
    const dmy = new DOMMatrix([1, 0, 0, -1, 0, 0]);
    const dmxy = new DOMMatrix([-1, 0, 0, -1, 0, 0]);
    const dmq = new DOMMatrix([0, 1, -1, 0, 0, 0]);
    
    // Create XY mirrored path
    const getXYPath = (spath: Path2D) => {
      let p = new Path2D(spath);
      p.addPath(p, dmxy);
      return p;
    };
    
    // Main drawing function
    const draw = () => {
      if (!ctx) return;
      
      // Update circle positions
      circlesRef.current[0].a = ttRef.current / 1000;
      for (let i = 0; i < circlesRef.current.length; i++) circlesRef.current[i].setRA();
      for (let i = 0; i < circlesRef.current.length; i++) circlesRef.current[i].setPath2();
      
      // Group circles by level for better rendering
      let pa = new Array(8);
      for (let i = 0; i < pa.length; i++) pa[i] = new Path2D();
      for (let i = 0; i < circlesRef.current.length; i++) {
        if (i == 0) pa[0].addPath(circlesRef.current[i].path);
        else if (i < 3) pa[1].addPath(circlesRef.current[i].path);
        else if (i < 7) pa[2].addPath(circlesRef.current[i].path);
        else if (i < 15) pa[3].addPath(circlesRef.current[i].path);
        else if (i < 31) pa[4].addPath(circlesRef.current[i].path);
        else if (i < 63) pa[5].addPath(circlesRef.current[i].path);
        else if (i < 127) pa[6].addPath(circlesRef.current[i].path);
        else pa[7].addPath(circlesRef.current[i].path);
      }
      
      // Draw background gradient
      const scheme = colorSchemes[currentColorScheme as keyof typeof colorSchemes];
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, CSIZE);
      const hueShift = Math.sin(ttRef.current / 2000) * 0.2;
      
      const adjustHue = (color: string, amount: number) => {
        // Simple hue adjustment - would be more sophisticated in production
        return color; // Placeholder - would parse and shift hue
      };
      
      gradient.addColorStop(0, adjustHue(scheme.bgGradient[0], hueShift));
      gradient.addColorStop(1, adjustHue(scheme.bgGradient[1], hueShift));
      
      // Clear and fill background
      ctx.clearRect(-width / 2, -height / 2, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      
      // Draw circle paths with glow effect
      ctx.shadowBlur = 15;
      for (let i = 0; i < pa.length; i++) {
        const pth = getXYPath(pa[i]);
        const color = colorRef.current.getRGB(ttRef.current - 180 * i);
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.lineWidth = Math.max(3, 24 - 3 * i);
        ctx.stroke(pth);
      }
      ctx.shadowBlur = 0;
      
      // Add data visualization elements if showLabels is true
      if (showLabels && dataRef.current.length > 0) {
        // Save the current transform to restore later
        ctx.save();
        
        // Draw data labels for primary circles with data
        for (let i = 0; i < circlesRef.current.length; i++) {
          const circle = circlesRef.current[i];
          if (circle.dataPoint && !circle.cont && (!circle.p || circle.p === circlesRef.current[0])) {
            // Calculate position for label
            const labelDistance = circle.r * 1.2;
            const labelX = circle.x * 1.05;
            const labelY = circle.y * 1.05;
            
            // Set text properties
            ctx.font = '14px Inter, Arial, sans-serif';
            ctx.textAlign = labelX > 0 ? 'left' : 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            
            // Create text background
            const labelText = `${circle.dataPoint.label}: ${circle.dataPoint.value}%`;
            const metrics = ctx.measureText(labelText);
            const padding = 6;
            const height = 22;
            
            // Draw rounded rectangle background with glow
            ctx.save();
            ctx.shadowBlur = 8;
            ctx.shadowColor = colorRef.current.getRGB(ttRef.current - 90 * i);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.beginPath();
            ctx.roundRect(
              labelX + (labelX > 0 ? 0 : -metrics.width - 2 * padding),
              labelY - height / 2,
              metrics.width + 2 * padding, 
              height, 
              6
            );
            ctx.fill();
            ctx.restore();
            
            // Draw text
            ctx.fillStyle = colorRef.current.getRGB(ttRef.current - 90 * i);
            ctx.fillText(
              labelText,
              labelX + (labelX > 0 ? padding : -padding),
              labelY
            );
            
            // Draw line connecting circle to label
            ctx.beginPath();
            ctx.moveTo(circle.x, circle.y);
            ctx.lineTo(labelX, labelY);
            ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        
        // Restore the original transform
        ctx.restore();
        
        // Draw title and subtitle
        if (title || subtitle) {
          ctx.save();
          ctx.translate(-width / 2, -height / 2);
          
          if (title) {
            ctx.font = 'bold 24px Inter, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillText(title, width / 2, 40);
          }
          
          if (subtitle) {
            ctx.font = '16px Inter, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.fillText(subtitle, width / 2, 70);
          }
          
          ctx.restore();
        }
      }
    };
    
    // Initialize animation
    reset();
    colorRef.current = new Color(currentColorScheme);
    
    // Create initial circles
    const maxCircles = Math.min(127, Math.floor(95 * currentDensity));
    // Limit circles based on available data points
    const dataBasedMaxCircles = dataRef.current.length > 0 ? Math.min(maxCircles, 3 * dataRef.current.length) : maxCircles;
    
    for (let i = 0; i < dataBasedMaxCircles; i++) {
      if (i < circlesRef.current.length) {
        addCircle(circlesRef.current[i], i);
      }
    }
    
    // Animation loop
    const animate = () => {
      if (!isPlaying) return;
      
      ttRef.current += currentSpeed;
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animate();
    
    // Handle keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          setIsPlaying((prev) => !prev);
          break;
        case 'ArrowUp':
          setCurrentSpeed((prev) => Math.min(prev + 0.5, 3));
          break;
        case 'ArrowDown':
          setCurrentSpeed((prev) => Math.max(prev - 0.5, 0.1));
          break;
        case '+':
          setCurrentDensity((prev) => Math.min(prev + 0.2, 2));
          reset();
          const newMaxCircles1 = Math.min(127, Math.floor(95 * (currentDensity + 0.2)));
          const dataBasedMaxCircles1 = dataRef.current.length > 0 ? Math.min(newMaxCircles1, 3 * dataRef.current.length) : newMaxCircles1;
          for (let i = 0; i < dataBasedMaxCircles1; i++) {
            if (i < circlesRef.current.length) {
              addCircle(circlesRef.current[i], i);
            }
          }
          break;
        case '-':
          setCurrentDensity((prev) => Math.max(prev - 0.2, 0.2));
          reset();
          const newMaxCircles2 = Math.min(127, Math.floor(95 * (currentDensity - 0.2)));
          const dataBasedMaxCircles2 = dataRef.current.length > 0 ? Math.min(newMaxCircles2, 3 * dataRef.current.length) : newMaxCircles2;
          for (let i = 0; i < dataBasedMaxCircles2; i++) {
            if (i < circlesRef.current.length) {
              addCircle(circlesRef.current[i], i);
            }
          }
          break;
        case 'r':
          colorRef.current.randomize();
          break;
        case 'c':
          // Cycle through color schemes
          const schemes = ['blue', 'purple', 'teal', 'amber'];
          const currentIndex = schemes.indexOf(currentColorScheme);
          const nextScheme = schemes[(currentIndex + 1) % schemes.length];
          setCurrentColorScheme(nextScheme as any);
          colorRef.current.updateScheme(nextScheme);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up on unmount
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [width, height, isPlaying, currentSpeed, currentDensity, currentColorScheme]);

  // Group data by category
  const dataByCategory = data.reduce((acc, item) => {
    if (!item.category) return acc;
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, DataPoint[]>);
  
  // Calculate average by category
  const categoryAverages = Object.entries(dataByCategory).reduce((acc, [category, items]) => {
    const sum = items.reduce((total, item) => total + item.value, 0);
    acc[category] = Math.round(sum / items.length);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: Legend and data information */}
        {showLabels && data.length > 0 && (
          <div className="w-full md:w-1/3">
            <div className="bg-theme-surface-1 rounded-xl p-4 shadow-sm dark:bg-gray-800/40">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{subtitle}</p>
              
              {/* Data Metrics */}
              <div className="mb-6">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-200 mb-2">Key Performance Indicators</h4>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(categoryAverages).map(([category, average]) => (
                    <div key={category} className="flex justify-between items-center bg-theme-surface-2 dark:bg-gray-700/40 rounded-lg p-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 bg-${
                          currentColorScheme === 'blue' ? 'blue-500' : 
                          currentColorScheme === 'purple' ? 'purple-500' : 
                          currentColorScheme === 'teal' ? 'teal-500' : 'amber-500'
                        }`}></div>
                        <span className="font-medium text-sm">{category}</span>
                      </div>
                      <span className="font-bold text-sm">{average}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* All data points */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-200 mb-2">Metrics Detail</h4>
                <div className="space-y-2">
                  {data.map((point, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300"
                    >
                      <span>{point.label}</span>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                          <div 
                            className={`h-full rounded-full bg-${
                              currentColorScheme === 'blue' ? 'blue-500' : 
                              currentColorScheme === 'purple' ? 'purple-500' : 
                              currentColorScheme === 'teal' ? 'teal-500' : 'amber-500'
                            }`} 
                            style={{ width: `${point.value}%` }}
                          ></div>
                        </div>
                        <span>{point.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Right side: Animation canvas */}
        <div className={`w-full ${showLabels && data.length > 0 ? 'md:w-2/3' : ''}`}>
          <div className="flex justify-center">
            <canvas 
              ref={canvasRef} 
              className="rounded-xl shadow-lg"
              onClick={() => setIsPlaying(!isPlaying)} 
            />
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-600 dark:text-gray-300">
            <p><span className="font-medium">Click</span> to play/pause</p>
            <p><span className="font-medium">↑/↓</span> to adjust speed</p>
            <p><span className="font-medium">+/-</span> to adjust density</p>
            <p><span className="font-medium">C</span> to change colors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularAnimation;
