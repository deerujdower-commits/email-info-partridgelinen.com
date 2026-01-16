import { useState, useRef, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  draggable?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
}

const LazyImage = memo(({
  src,
  alt,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  draggable = true,
  priority = false,
  width,
  height,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div 
      ref={imgRef}
      className={cn('bg-muted', className)}
      style={{ ...style, contain: 'layout paint' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-200',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ ...style, willChange: isLoaded ? 'auto' : 'opacity' }}
          onLoad={() => setIsLoaded(true)}
          draggable={draggable}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
