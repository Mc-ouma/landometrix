'use client';

import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import CursorEffect from '@/components/ui/CursorEffect';

export default function AnimationShowcase() {
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
  ];

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

      {/* Animation Types */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Animation Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animationTypes.map((type, index) => (
            <AnimateOnScroll
              key={type}
              animation={type}
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
