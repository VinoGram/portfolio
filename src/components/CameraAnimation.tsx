import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CameraAnimation() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    // Set initial position (right side)
    gsap.set(camera, {
      x: window.innerWidth - 400,
      y: 200,
      rotation: 0,
      scale: 1,
      opacity: 1
    });

    // Scroll-triggered animation
    gsap.to(camera, {
      x: window.innerWidth / 2 - 200,
      y: window.innerHeight * 1.5,
      rotation: 720,
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "center center",
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cameraRef}
      className="fixed z-[9999] pointer-events-none"
    >
      <img
        src="/images/camera.png"
        alt="Camera"
        className="w-96 h-96 object-contain drop-shadow-2xl"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<div class="w-96 h-96 bg-emerald-400 rounded-lg flex items-center justify-center text-9xl text-white">📷</div>';
        }}
      />
    </div>
  );
}