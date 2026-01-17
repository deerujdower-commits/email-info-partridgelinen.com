import { useState, useRef, useEffect, memo } from 'react';

interface LazyMapProps {
  src: string;
  title: string;
  height?: number;
}

const LazyMap = memo(({ src, title, height = 150 }: LazyMapProps) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="rounded-lg overflow-hidden border border-border bg-muted"
      style={{ height }}
    >
      {isInView ? (
        <iframe
          src={src}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center text-muted-foreground text-sm"
          style={{ height }}
        >
          Loading map...
        </div>
      )}
    </div>
  );
});

LazyMap.displayName = 'LazyMap';

export default LazyMap;
