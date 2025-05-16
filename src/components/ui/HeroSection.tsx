'use client';

import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimateOnScroll animation="fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                <span className="block">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Data & Web Presence
                </span>
              </h1>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Landometrix delivers cutting-edge data analysis and professional web services to help your business grow.
              </p>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-in-up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md text-center transition-colors"
                >
                  Our Services
                </Link>
                <Link href="/contact" 
                  className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3 rounded-md border border-blue-200 text-center transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Contact Us
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
          
          <div className="hidden lg:block">
            <AnimateOnScroll animation="fade-in" delay={300}>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-500 opacity-20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-500 opacity-20 rounded-full filter blur-3xl"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-1">
                  <div className="rounded-xl overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                      <svg className="w-32 h-32 text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
