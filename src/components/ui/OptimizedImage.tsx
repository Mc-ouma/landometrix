'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  lowQualitySrc?: string;
  fallbackSrc?: string;
}

/**
 * Optimized image component with improved loading behavior
 * - Lazy loads images by default
 * - Handles loading states
 * - Uses Next.js Image component for optimization
 * - Provides low-quality image placeholder support
 * - Handles errors gracefully
 */
const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  lowQualitySrc,
  fallbackSrc
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Create intersection observer to track when image enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Get the current element to observe
    const element = document.getElementById(`image-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  // Performance optimization: avoid unnecessary renders when props change
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <div 
      id={`image-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Low quality image placeholder during loading */}
      {lowQualitySrc && !isLoaded && !hasError && (
        <div className="absolute inset-0 backdrop-blur-sm">
          <Image
            src={lowQualitySrc}
            alt={alt}
            fill
            className="object-cover transition-opacity opacity-50"
            unoptimized
          />
        </div>
      )}
      
      {/* Primary image with lazy loading */}
      {(priority || isIntersecting) && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sizes={sizes}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">Image not available</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;