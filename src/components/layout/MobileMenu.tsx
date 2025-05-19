'use client';

import { forwardRef, useRef, RefObject, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GetStartedButton } from './Header';

// CSS constants
const MOBILE_LINK_CLASS = "block text-gray-200 hover:text-white py-4 px-6 text-lg font-medium transition-all duration-300 relative";

// Define navigation links outside component to prevent recreation on each render
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

interface MobileMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  prefersReducedMotion: boolean;
}

// Memoize NavLink component to prevent unnecessary re-renders
const NavLink = memo(({ 
  href, 
  label, 
  isActive, 
  index, 
  prefersReducedMotion, 
  closeMenu 
}: { 
  href: string; 
  label: string; 
  isActive: boolean; 
  index: number; 
  prefersReducedMotion: boolean; 
  closeMenu: () => void;
}) => (
  <motion.div
    key={href}
    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
    animate={{ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * (prefersReducedMotion ? 0.01 : 0.07),
        duration: 0.3
      }
    }}
    exit={{
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      transition: {
        delay: (NAV_LINKS.length - index) * 0.05
      }
    }}
    className="w-full text-center"
    role="menuitem"
  >
    <Link 
      href={href} 
      className={`${MOBILE_LINK_CLASS} ${isActive ? 'text-white relative' : ''} inline-flex items-center justify-center w-full`}
      onClick={closeMenu}
      aria-current={isActive ? 'page' : undefined}
      prefetch={false}  // Disable prefetch for lower priority routes
    >
      {label}
      {isActive && (
        <motion.span 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-teal-300 w-12 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"
          layoutId="mobileNavIndicator"
        />
      )}
    </Link>
  </motion.div>
));
NavLink.displayName = 'NavLink';

// Memoize decorative element to prevent re-renders
const DecorativeElements = memo(() => (
  <>
    <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
    <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-32 bg-gradient-to-r from-blue-500/5 via-transparent to-teal-500/5 blur-3xl -rotate-45" />
  </>
));
DecorativeElements.displayName = 'DecorativeElements';

const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ isMenuOpen, closeMenu, prefersReducedMotion }, ref) => {
    const pathname = usePathname();
    
    // Cache motion variants to avoid recreating objects on each render
    const menuVariants = useMemo(() => ({
      hidden: { 
        opacity: 0, 
        clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" 
      },
      visible: { 
        opacity: 1, 
        clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
        transition: { 
          duration: prefersReducedMotion ? 0.3 : 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      },
      exit: { 
        opacity: 0, 
        clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        transition: { 
          duration: prefersReducedMotion ? 0.2 : 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    }), [prefersReducedMotion]);

    // For button animation
    const buttonVariants = useMemo(() => ({
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          delay: NAV_LINKS.length * 0.07 + 0.1,
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : -20
      }
    }), [prefersReducedMotion]);

    return (
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            ref={ref}
            id="mobile-menu"
            className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-800 z-[90] md:hidden flex flex-col justify-center items-center overflow-hidden"
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible" 
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Use memoized decorative elements */}
            <DecorativeElements />

            <div 
              className="flex flex-col items-center justify-center space-y-8 pt-20 pb-10 w-full max-w-sm z-[91] relative"
              role="menu"
            >
              {NAV_LINKS.map(({ href, label }, index) => {
                const isActive = pathname === href;
                return (
                  <NavLink 
                    key={href}
                    href={href}
                    label={label}
                    isActive={isActive}
                    index={index}
                    prefersReducedMotion={prefersReducedMotion}
                    closeMenu={closeMenu}
                  />
                );
              })}
              
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible" 
                exit="exit"
                className="w-full px-6"
                role="menuitem"
              >
                <GetStartedButton isMobile={true} onClick={closeMenu} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MobileMenu.displayName = 'MobileMenu';

// Export memoized component to prevent unnecessary re-renders from parent components
export default memo(MobileMenu);