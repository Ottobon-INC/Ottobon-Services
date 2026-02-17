import { useEffect, useRef, useState } from 'react';

interface HeroBackgroundEffectProps {
  className?: string;
}

export default function HeroBackgroundEffect({ className = '' }: HeroBackgroundEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInViewport, setIsInViewport] = useState(false);
  
  // Handle mouse movement when component is in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Only respond to mouse movements if the element is in viewport
      if (!isInViewport) return;
      
      // Calculate mouse position relative to the container
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;  // normalized 0-1
      const y = (e.clientY - rect.top) / rect.height;  // normalized 0-1
      
      setMousePosition({ x, y });
    };
    
    // Use Intersection Observer to detect when the hero is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    
    observer.observe(container);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInViewport]);
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Primary glow */}
      <div 
        className="absolute w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full blur-3xl opacity-30 transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.7) 0%, rgba(56, 189, 248, 0) 70%)',
          left: `calc(${mousePosition.x * 100}% - 30vw)`,
          top: `calc(${mousePosition.y * 100}% - 30vw)`,
          transform: isInViewport ? 'scale(1)' : 'scale(0.8)',
          opacity: isInViewport ? 0.3 : 0.1,
        }}
      ></div>
      
      {/* Secondary glow */}
      <div 
        className="absolute w-[50vw] h-[50vw] rounded-full blur-3xl opacity-20 transition-all duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%)',
          right: `calc(${(1 - mousePosition.x) * 100}% - 25vw)`,
          bottom: `calc(${(1 - mousePosition.y) * 100}% - 25vw)`,
          transform: isInViewport ? 'scale(1)' : 'scale(0.5)',
          opacity: isInViewport ? 0.2 : 0.05,
        }}
      ></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white opacity-80"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: isInViewport ? (Math.random() * 0.4 + 0.1) : 0,
              transition: 'opacity 1s ease-out',
            }}
          ></div>
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: isInViewport ? 0.2 : 0,
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          transition: 'transform 0.5s ease-out, opacity 1s ease-out',
        }}
      ></div>
    </div>
  );
}