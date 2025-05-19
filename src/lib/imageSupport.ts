/**
 * This utility detects browser image format support and enables delivery optimization
 */

export function detectImageSupport() {
  if (typeof window === 'undefined') return null;
  
  try {
    // Create object to store browser capabilities
    const imageSupport: Record<string, boolean> = {
      webp: false,
      avif: false, 
      jpegXl: false
    };
    
    // Set support flags
    if (document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0) {
      imageSupport.webp = true;
    }
    
    // AVIF detection
    const avifImg = new Image();
    avifImg.onload = () => {
      if (avifImg.width > 0 && avifImg.height > 0) {
        imageSupport.avif = true;
        document.documentElement.classList.add('avif');
      }
    };
    avifImg.onerror = () => {
      document.documentElement.classList.add('no-avif');
    };
    avifImg.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    
    // Set image format in HTML tag for CSS usage
    if (imageSupport.webp) {
      document.documentElement.classList.add('webp');
    } else {
      document.documentElement.classList.add('no-webp');
    }
    
    return imageSupport;
  } catch (e) {
    console.error('Image format detection failed:', e);
    return null;
  }
}

export function getOptimalImageFormat() {
  // For server-side, always default to modern formats
  if (typeof window === 'undefined') {
    return { format: 'webp', quality: 85 };
  }
  
  try {
    const support = detectImageSupport();
    
    if (!support) {
      return { format: 'jpg', quality: 85 }; // Default fallback
    }
    
    if (support.avif) {
      return { format: 'avif', quality: 75 }; // AVIF can use lower quality
    }
    
    if (support.webp) {
      return { format: 'webp', quality: 80 };
    }
    
    if (support.jpegXl) {
      return { format: 'jxl', quality: 80 };
    }
    
    return { format: 'jpg', quality: 85 };
  } catch (e) {
    return { format: 'jpg', quality: 85 }; // Safe fallback
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    detectImageSupport();
  } else {
    window.addEventListener('load', detectImageSupport);
  }
}
