'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import CursorEffect from '@/components/ui/CursorEffect';
import CircularAnimation from '@/components/ui/CircularAnimation';

export default function AnimationShowcase() {
  // Define animation types with proper typing
  const animationTypes = [
    'fade-in-up',
    'fade-in',
    'slide-in-left',
    'slide-in-right',
    'zoom-in',
    'rotate-in',
    'blur-in',
    'bounce-in',
    'swing-in',
    'stagger-fade'
  ] as const;
  
  // Animation type for TypeScript
  type AnimationType = typeof animationTypes[number];
  
  // CircularAnimation state
  const [colorScheme, setColorScheme] = useState<'blue' | 'purple' | 'teal' | 'amber'>('blue');
  const [speed, setSpeed] = useState(1);
  const [density, setDensity] = useState(1);
  const [animationSize, setAnimationSize] = useState(600);
  const [showDataLabels, setShowDataLabels] = useState(true);
  
  // Sample business intelligence data for visualization
  const landometrixData = [
    { label: 'User Growth', value: 87, category: 'Growth' },
    { label: 'Customer Retention', value: 92, category: 'Customers' },
    { label: 'Revenue Increase', value: 76, category: 'Financial' },
    { label: 'Platform Uptime', value: 99, category: 'Technical' },
    { label: 'Support Response', value: 94, category: 'Service' },
    { label: 'Feature Adoption', value: 81, category: 'Product' },
    { label: 'Mobile Usage', value: 68, category: 'Usage' },
    { label: 'Desktop Usage', value: 73, category: 'Usage' },
    { label: 'Cost Efficiency', value: 85, category: 'Financial' },
  ];
  
  // Adjust animation size on window resize
  useEffect(() => {
    const handleResize = () => {
      setAnimationSize(Math.min(600, window.innerWidth - 64));
    };
    
    // Initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="py-16 px-6 md:px-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Animation Showcase</h1>
      
      {/* Introduction */}
      <AnimateOnScroll animation="fade-in-up">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-xl mb-4">
            Experience beautiful animations and cursor effects we've added to Landometrix!
          </p>
          <p>
            Move your mouse around to see the custom cursor effect. Try clicking and hovering over buttons to see how it changes.
          </p>
        </div>
      </AnimateOnScroll>
      
      {/* Circular Animation Section */}
      <AnimateOnScroll animation="fade-in">
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Interactive Circular Animation</h2>
          
          <div className="bg-theme-surface-1 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-6">
              <p className="mb-4">
                Experience our new interactive circular animation with dynamic gradients and particle effects.
                This animation responds to keyboard controls for an enhanced interactive experience.
              </p>
              <div className="flex justify-center mb-4">
                <div className="bg-theme-surface-2 p-4 rounded-md inline-block">
                  <h4 className="text-lg font-medium mb-2">Keyboard Controls:</h4>
                  <ul className="text-sm text-left space-y-1">
                    <li><kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd> - Play/Pause animation</li>
                    <li><kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">←/→</kbd> - Decrease/Increase speed</li>
                    <li><kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">-/+</kbd> - Decrease/Increase particle density</li>
                    <li><kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">1-4</kbd> - Switch between color schemes</li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center items-center flex-wrap gap-4 mb-6">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
                  onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))}
                >
                  Toggle Play/Pause
                </button>
                <button 
                  className={`${showDataLabels ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white font-medium px-4 py-2 rounded-md`}
                  onClick={() => setShowDataLabels(!showDataLabels)}
                >
                  {showDataLabels ? 'Hide Data Labels' : 'Show Data Labels'}
                </button>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      className="bg-theme-surface-2 hover:bg-theme-surface-3 font-medium px-3 py-1 rounded-md"
                      onClick={() => {
                        setSpeed(Math.max(0.2, speed - 0.2));
                        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
                      }}
                    >
                      Slower
                    </button>
                    <span>Speed</span>
                    <button 
                      className="bg-theme-surface-2 hover:bg-theme-surface-3 font-medium px-3 py-1 rounded-md"
                      onClick={() => {
                        setSpeed(Math.min(3, speed + 0.2));
                        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
                      }}
                    >
                      Faster
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="bg-theme-surface-2 hover:bg-theme-surface-3 font-medium px-3 py-1 rounded-md"
                      onClick={() => {
                        setDensity(Math.max(0.2, density - 0.2));
                        window.dispatchEvent(new KeyboardEvent('keydown', { key: '-' }));
                      }}
                    >
                      Less
                    </button>
                    <span>Density</span>
                    <button 
                      className="bg-theme-surface-2 hover:bg-theme-surface-3 font-medium px-3 py-1 rounded-md"
                      onClick={() => {
                        setDensity(Math.min(3, density + 0.2));
                        window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
                      }}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-[800px]">
                <CircularAnimation 
                  width={animationSize} 
                  height={animationSize} 
                  colorScheme={colorScheme}
                  speed={speed}
                  density={density}
                  data={landometrixData}
                  showLabels={showDataLabels}
                  title="Landometrix Platform Metrics"
                  subtitle="Visualized performance indicators across departments"
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="flex flex-wrap justify-center gap-6 items-center mb-4">
                <div className="bg-theme-surface-2 px-3 py-1 rounded-md flex items-center gap-2">
                  <span className="text-sm font-medium">Speed:</span>
                  <span className="text-sm bg-theme-surface-3 px-2 py-0.5 rounded">{speed.toFixed(1)}x</span>
                </div>
                <div className="bg-theme-surface-2 px-3 py-1 rounded-md flex items-center gap-2">
                  <span className="text-sm font-medium">Density:</span>
                  <span className="text-sm bg-theme-surface-3 px-2 py-0.5 rounded">{density.toFixed(1)}x</span>
                </div>
                <div className="bg-theme-surface-2 px-3 py-1 rounded-md flex items-center gap-2">
                  <span className="text-sm font-medium">Theme:</span>
                  <span className="text-sm bg-theme-surface-3 px-2 py-0.5 rounded capitalize">{colorScheme}</span>
                </div>
              </div>
              
              <p className="mb-3">
                Try different color schemes:
              </p>
              <div className="flex justify-center gap-3 mb-4">
                <button 
                  className={`w-8 h-8 rounded-full bg-blue-600 ${colorScheme === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`} 
                  onClick={() => setColorScheme('blue')}
                  aria-label="Blue color scheme"
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-purple-600 ${colorScheme === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                  onClick={() => setColorScheme('purple')}
                  aria-label="Purple color scheme"
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-teal-500 ${colorScheme === 'teal' ? 'ring-2 ring-offset-2 ring-teal-400' : ''}`}
                  onClick={() => setColorScheme('teal')}
                  aria-label="Teal color scheme"
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-amber-500 ${colorScheme === 'amber' ? 'ring-2 ring-offset-2 ring-amber-400' : ''}`}
                  onClick={() => setColorScheme('amber')}
                  aria-label="Amber color scheme"
                ></button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click on the animation and use keyboard shortcuts for the full interactive experience!
              </p>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Animation Types */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Animation Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animationTypes.map((type, index) => (
            <AnimateOnScroll
              key={type}
              animation={type as AnimationType}
              delay={index * 100}
              className="h-full"
            >
              <div className="bg-theme-surface-1 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full hover-lift">
                <h3 className="text-xl font-bold mb-4">{type}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This card demonstrates the {type} animation effect that can be applied to elements.
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Cursor Effect Controls */}
      <AnimateOnScroll animation="fade-in">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Interactive Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <AnimateOnScroll animation="slide-in-left" delay={200}>
              <div className="bg-theme-surface-1 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full hover-glow">
                <h3 className="text-xl font-bold mb-4">Hover Effects</h3>
                <p className="mb-4">
                  Cards use hover-lift and hover-glow effects. Try hovering over different elements!
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md hover-lift">
                  Hover Me
                </button>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slide-in-right" delay={300}>
              <div className="bg-theme-surface-1 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full hover-lift">
                <h3 className="text-xl font-bold mb-4">Button States</h3>
                <p className="mb-4">
                  Notice how the cursor changes when you hover over clickable elements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/" className="bg-theme-surface-2 text-gray-900 dark:text-gray-100 font-medium px-6 py-2 rounded-md hover-glow">
                    Back to Home
                  </Link>
                  <Link href="#" className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover-lift">
                    Another Link
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Staggered Animation Example */}
      <AnimateOnScroll animation="stagger-fade">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Staggered Animation</h2>
          
          <div className="bg-theme-surface-1 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">1</span>
                <span>This is the first item to animate</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">2</span>
                <span>The second item follows shortly after</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">3</span>
                <span>Then the third item appears</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">4</span>
                <span>And finally the fourth item completes the sequence</span>
              </li>
            </ul>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
