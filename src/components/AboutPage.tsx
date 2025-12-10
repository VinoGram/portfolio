import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const [scrollComplete, setScrollComplete] = useState(false);
  const [horizontalComplete, setHorizontalComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const backgroundImage = backgroundImageRef.current;
    if (!container) return;



    // Manual horizontal scroll control
    let currentSection = 0;
    const maxSections = 3;
    let touchStartY = 0;
    
    // Initialize at first section
    gsap.set(sectionsRef.current, { xPercent: 0 });
    
    const navigateToSection = (newSection: number) => {
      if (newSection !== currentSection) {
        currentSection = newSection;
        gsap.to(sectionsRef.current, {
          xPercent: -100 * currentSection,
          duration: 4,
          ease: "power2.out",
          onComplete: () => {
            // Mark horizontal journey as complete when reaching last section
            if (currentSection === maxSections - 1) {
              setHorizontalComplete(true);
            }
          }
        });
      }
    };
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Allow scrolling back to hero if at first section and scrolling up
      if (currentSection === 0 && e.deltaY < 0) {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      
      // Only allow scrolling to next page if horizontal journey is complete
      if (currentSection === maxSections - 1 && e.deltaY > 0) {
        if (horizontalComplete) {
          setScrollComplete(true);
          // Scroll to next section (About)
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        } else {
          // Block scrolling until horizontal journey is complete
          return;
        }
      }
      
      // Bidirectional navigation: from last section up goes to first, from first down goes to last
      if (currentSection === maxSections - 1 && e.deltaY < 0) {
        navigateToSection(0);
        return;
      }
      
      if (currentSection === 0 && e.deltaY > 0) {
        navigateToSection(maxSections - 1);
        setHorizontalComplete(true);
        return;
      }
      
      const delta = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(maxSections - 1, currentSection + delta));
      navigateToSection(newSection);
      
      // Mark horizontal journey as complete when reaching last section
      if (newSection === maxSections - 1) {
        setHorizontalComplete(true);
      }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      // Minimum swipe distance
      if (Math.abs(deltaY) < 50) return;
      
      // Allow scrolling back to hero if at first section and swiping down
      if (currentSection === 0 && deltaY < 0) {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      
      // Only allow scrolling to next page if horizontal journey is complete
      if (currentSection === maxSections - 1 && deltaY > 0) {
        if (horizontalComplete) {
          setScrollComplete(true);
          // Scroll to next section (About)
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        } else {
          // Block scrolling until horizontal journey is complete
          return;
        }
      }
      
      // Bidirectional navigation: from last section down goes to first, from first up goes to last
      if (currentSection === maxSections - 1 && deltaY < 0) {
        e.preventDefault();
        navigateToSection(0);
        return;
      }
      
      if (currentSection === 0 && deltaY > 0) {
        e.preventDefault();
        navigateToSection(maxSections - 1);
        setHorizontalComplete(true);
        return;
      }
      
      e.preventDefault();
      const delta = deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(maxSections - 1, currentSection + delta));
      navigateToSection(newSection);
      
      // Mark horizontal journey as complete when reaching last section
      if (newSection === maxSections - 1) {
        setHorizontalComplete(true);
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className="h-screen overflow-hidden relative" id="about-page">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/10 via-transparent to-emerald-950/5 z-0"></div>
      <div ref={containerRef} className="flex h-full relative z-20">
        {/* Section 1: About Me Title */}
        <div 
          ref={el => { if (el) sectionsRef.current[0] = el; }}
          className="min-w-full h-full flex items-center justify-center bg-black relative"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-6 md:mb-8">
              <DecryptedText 
                text="About Me" 
                animateOn="view"
                speed={100}
                maxIterations={15}
                className="text-white"
              />
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
              Passionate full-stack developer crafting digital experiences that bridge creativity and functionality.
            </p>
          </div>
        </div>

        {/* Section 2: Image & Bio */}
        <div 
          ref={el => { if (el) sectionsRef.current[1] = el; }}
          className="min-w-full h-full flex items-center bg-black relative"
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div 
                ref={imageRef}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[600px] lg:h-[600px] mx-auto lg:mx-0 overflow-hidden"
              >
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6">
                <DecryptedText 
                  text="Promise Albert" 
                  animateOn="view"
                  speed={120}
                  maxIterations={20}
                  className="text-emerald-400"
                />
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-400 font-light leading-relaxed">
                <p>
                  Full-stack developer with a passion for creating seamless digital experiences. 
                  I specialize in modern web technologies and love bringing ideas to life through code.
                </p>
                <p>
                  With expertise in React, Node.js, and cutting-edge frameworks, I build applications 
                  that are not only functional but also visually stunning and user-friendly.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
              
              {/* Skills */}
              <div className="pt-4 md:pt-6">
                <h4 className="text-lg md:text-xl text-emerald-400 mb-3 md:mb-4 font-light">Core Technologies</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'MongoDB'].map((skill) => (
                    <span key={skill} className="px-3 md:px-4 py-1.5 md:py-2 bg-emerald-400/10 text-emerald-400 text-xs md:text-sm rounded-full border border-emerald-400/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Journey */}
        <div 
          ref={el => { if (el) sectionsRef.current[2] = el; }}
          className="min-w-full h-full flex items-center bg-black relative"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 md:mb-8">
              <DecryptedText 
                text="My Journey" 
                animateOn="view"
                speed={100}
                maxIterations={15}
                className="text-white"
              />
            </h3>
            <div className="space-y-6 md:space-y-8 text-left max-w-2xl mx-auto">
              <div className="border-l-2 border-emerald-400/30 pl-6">
                <h4 className="text-lg md:text-xl text-emerald-400 mb-2">2024 - Present</h4>
                <p className="text-sm md:text-base text-gray-400 font-light">
                  Full-Stack Developer focusing on modern web applications and user experience design.
                </p>
              </div>
              <div className="border-l-2 border-emerald-400/30 pl-6">
                <h4 className="text-lg md:text-xl text-emerald-400 mb-2">2023</h4>
                <p className="text-sm md:text-base text-gray-400 font-light">
                  Started specializing in React ecosystem and advanced JavaScript frameworks.
                </p>
              </div>
              <div className="border-l-2 border-emerald-400/30 pl-6">
                <h4 className="text-lg md:text-xl text-emerald-400 mb-2">2022</h4>
                <p className="text-sm md:text-base text-gray-400 font-light">
                  Began my journey in web development, learning the fundamentals of programming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}