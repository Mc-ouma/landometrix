// filepath: /home/luizzy/NextJS/landometrix/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 100%',
      },
      colors: {
        // Dark theme colors only (as default)
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'primary': 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        'primary-hover': 'var(--primary-hover)',
        'secondary': 'var(--secondary)',
        'secondary-light': 'var(--secondary-light)',
        'secondary-dark': 'var(--secondary-dark)',
        'secondary-hover': 'var(--secondary-hover)',
        'accent': 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'accent-dark': 'var(--accent-dark)',
        'accent-hover': 'var(--accent-hover)',
        'success': 'var(--success)',
        'success-light': 'var(--success-light)',
        'success-dark': 'var(--success-dark)',
        'warning': 'var(--warning)',
        'warning-light': 'var(--warning-light)',
        'warning-dark': 'var(--warning-dark)',
        'error': 'var(--error)',
        'error-light': 'var(--error-light)',
        'error-dark': 'var(--error-dark)',
        'gray-50': 'var(--gray-50)',
        'gray-100': 'var(--gray-100)',
        'gray-200': 'var(--gray-200)',
        'gray-300': 'var(--gray-300)',
        'gray-400': 'var(--gray-400)',
        'gray-500': 'var(--gray-500)',
        'gray-600': 'var(--gray-600)',
        'gray-700': 'var(--gray-700)',
        'gray-800': 'var(--gray-800)',
        'gray-900': 'var(--gray-900)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
      },
      backgroundImage: {
        // Gradients
        'theme-gradient-1': 'var(--bg-gradient-light-1)',
        'theme-gradient-2': 'var(--bg-gradient-light-2)',
        'theme-gradient-primary': 'var(--bg-gradient-primary)',
        'theme-gradient-accent': 'var(--bg-gradient-accent)',
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 15s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'text-shimmer': 'textShimmer 3.5s ease-in-out infinite',
        'border-flow': 'borderFlow 2s ease-in-out infinite',
        'blob-move': 'blobMove 30s ease infinite',
        'orbit': 'orbit 20s linear infinite',
        'sway': 'sway 6s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 3s ease infinite',
        'waving': 'waving 5s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blobMove: {
          '0%': { 
            transform: 'translate(0px, 0px) scale(1)',
            filter: 'blur(80px)',
          },
          '33%': { 
            transform: 'translate(30px, -30px) scale(1.1)',
            filter: 'blur(90px)',
          },
          '66%': { 
            transform: 'translate(-20px, 20px) scale(0.9)',
            filter: 'blur(70px)',
          },
          '100%': { 
            transform: 'translate(0px, 0px) scale(1)',
            filter: 'blur(80px)',
          },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(45, 212, 191, 0.7)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        borderFlow: {
          '0%, 100%': { borderImage: 'linear-gradient(to right, rgba(59, 130, 246, 0), rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0)) 1' },
          '50%': { borderImage: 'linear-gradient(to right, rgba(45, 212, 191, 0), rgba(45, 212, 191, 0.7), rgba(45, 212, 191, 0)) 1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        waving: {
          '0%, 100%': { transform: 'skewX(0) scale(1)' },
          '25%': { transform: 'skewX(3deg) scale(0.98)' },
          '75%': { transform: 'skewX(-3deg) scale(0.98)' }
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 50% 70%/70% 40% 50% 40%' },
          '75%': { borderRadius: '40% 60% 70% 30%/40% 40% 60% 50%' }
        },
      },
    },
  },
  safelist: [
    // Animation durations
    'duration-300',
    'duration-500',
    'duration-700',
    'duration-1000',
    'duration-1500',
    'duration-2000',
    // Animations
    'animate-ping-slow',
    'animate-float',
    'animate-float-slow',
    'animate-pulse-slow',
    'animate-shimmer',
    'animate-fade-in-down',
    'animate-glow-pulse',
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-text-shimmer',
    'animate-border-flow',
    'animate-blob-move',
    'animate-orbit',
    'animate-sway',
    'animate-bounce-gentle',
    'animate-waving',
    'animate-morph',
    // Classes used by AnimateOnScroll
    'opacity-0',
    'translate-y-8',
    '-translate-x-8',
    'translate-x-8',
    'scale-95',
    'rotate-12',
    'blur-lg',
    '-rotate-3',
    'origin-top',
  ],
  plugins: [],
};

export default config;
