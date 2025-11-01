import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import DecryptedText from "./DecryptedText";
import TrueFocus from "./TrueFocus";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // GSAP button animation
    if (buttonRef.current) {
      const button = buttonRef.current;
      
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          rotationX: 5,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(button.querySelector('.button-bg'), {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(button.querySelector('.button-text'), {
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(button.querySelector('.button-bg'), {
          scaleX: 0,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(button.querySelector('.button-text'), {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-15"
        src="/videos/zoom-sequence.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-950/20 z-10"></div>
      
      {/* Interactive cursor follower */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-30"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          transition: 'all 0.1s ease-out'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Hero content */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-12 pt-24">
          <div className="max-w-6xl w-full">
            <div className="space-y-8">
              {/* Main heading */}
              <div className="space-y-4">
                <h1 className={`text-7xl md:text-9xl font-light text-white leading-none transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <DecryptedText 
                    text="Full Stack" 
                    animateOn="view"
                    speed={150}
                    maxIterations={25}
                    className="text-white"
                  />
                </h1>
                <h2 className={`text-7xl md:text-9xl font-light text-emerald-400 leading-none transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <DecryptedText 
                    text="Developer" 
                    animateOn="view"
                    speed={150}
                    maxIterations={25}
                    className="text-emerald-400"
                  />
                </h2>
              </div>
              
              {/* Subtitle */}
              <div className={`text-xl md:text-2xl max-w-2xl font-light leading-relaxed transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <TrueFocus 
                  sentence="Crafting exceptional digital experiences with modern technologies"
                  manualMode={false}
                  blurAmount={3}
                  borderColor="#10b981"
                  glowColor="rgba(16, 185, 129, 0.6)"
                  animationDuration={1.5}
                  pauseBetweenAnimations={2}
                  className="text-gray-400 block mb-2"
                />
                <TrueFocus 
                  sentence="Frontend • Backend • Full Stack Solutions"
                  manualMode={false}
                  blurAmount={3}
                  borderColor="#10b981"
                  glowColor="rgba(16, 185, 129, 0.6)"
                  animationDuration={1.5}
                  pauseBetweenAnimations={2.5}
                  className="text-emerald-400 block"
                />
              </div>
              
              {/* CTA Button */}
              <div className={`pt-8 transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <button 
                  ref={buttonRef}
                  onClick={() => {
                    if (buttonRef.current) {
                      gsap.to(buttonRef.current, {
                        y: -50,
                        duration: 0.4,
                        ease: "back.out(2)",
                        onComplete: () => {
                          gsap.to(buttonRef.current, {
                            y: 0,
                            duration: 0.6,
                            ease: "bounce.out",
                            onComplete: () => {
                              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                            }
                          });
                        }
                      });
                    }
                  }}
                  className="relative px-8 py-4 border border-emerald-400/30 text-emerald-400 text-sm uppercase tracking-wider overflow-hidden cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="button-text relative z-10 block">View My Work</span>
                  <div className="button-bg absolute inset-0 bg-emerald-400/10 transform scale-x-0 origin-left"></div>
                  
                  {/* Corner brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-emerald-400/50"></div>
                  <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-emerald-400/50"></div>
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-emerald-400/50"></div>
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-emerald-400/50"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        

        
        {/* Side elements */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col space-y-6 text-emerald-400/40">
            <div className="w-px h-16 bg-emerald-400/20"></div>
            <span className="text-xs uppercase tracking-wider transform rotate-90 origin-center whitespace-nowrap">Portfolio 2024</span>
            <div className="w-px h-16 bg-emerald-400/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
