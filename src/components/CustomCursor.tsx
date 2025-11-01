import { useState, useEffect, useRef } from "react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      setMousePosition({ x, y });
      
      // Add trail point - much faster with more points
      setTrail(prev => {
        const newTrail = [...prev, { x, y, id: trailIdRef.current++ }];
        return newTrail.slice(-15); // Keep last 15 points for faster erasure
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <>

      
      {/* Line Trail */}
      {trail.map((point, index) => {
        if (index === 0) return null;
        const prevPoint = trail[index - 1];
        const length = Math.sqrt(
          Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
        );
        const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * 180 / Math.PI;
        
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: prevPoint.x,
              top: prevPoint.y,
              width: `${length}px`,
              height: '3px',
              background: `linear-gradient(90deg, rgba(34, 197, 94, ${0.8 - index * 0.08}) 0%, rgba(16, 185, 129, ${0.7 - index * 0.07}) 30%, rgba(5, 150, 105, ${0.6 - index * 0.06}) 70%, rgba(34, 197, 94, ${0.3 - index * 0.05}) 100%)`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%',
              boxShadow: `0 0 ${6 + index * 0.3}px rgba(16, 185, 129, ${0.7 - index * 0.08}), 0 0 ${3 + index * 0.2}px rgba(34, 197, 94, ${0.5 - index * 0.06})`,
              filter: 'blur(0.2px)'
            }}
          ></div>
        );
      })}
    </>
  );
}