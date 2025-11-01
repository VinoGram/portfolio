import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const [stats, setStats] = useState({
    experience: 0,
    projects: 0,
    availability: 0
  });
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portfolioButtonRef = useRef<HTMLAnchorElement>(null);

  const thanosVanish = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Play snap sound
    const playSnapSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };
    
    playSnapSound();
    
    // Get all visible elements
    const allElements = Array.from(document.querySelectorAll('*:not(script):not(style):not(meta):not(link):not(title)'));
    
    // Random selection - only half disappear (authentic to movie)
    const selectedElements = allElements.filter(() => Math.random() < 0.5);
    
    // Create dust particles for selected elements
    const particles: HTMLDivElement[] = [];
    selectedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'fixed bg-emerald-400 rounded-full pointer-events-none z-[9999] opacity-70';
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        document.body.appendChild(particle);
        particles.push(particle);
      }
    });

    // Staggered disintegration animation
    gsap.timeline({
      onComplete: () => {
        particles.forEach(p => p.remove());
        window.open('https://gramtimevisuals.netlify.app', '_blank');
        gsap.set(selectedElements, { opacity: 1, scale: 1 });
      }
    })
    // Elements start fading with staggered timing (wave effect)
    .to(selectedElements, {
      opacity: 0.3,
      scale: 0.95,
      duration: 2.5,
      stagger: {
        amount: 4,
        from: "random"
      },
      ease: "power2.out"
    })
    // Dust particles float away
    .to(particles, {
      y: "-=100",
      x: () => (Math.random() - 0.5) * 200,
      opacity: 0,
      scale: 0,
      duration: 2.5,
      stagger: 0.03,
      ease: "power1.out"
    }, "-=1")
    // Final disappearance
    .to(selectedElements, {
      opacity: 0,
      scale: 0.8,
      duration: 3,
      stagger: {
        amount: 2.5,
        from: "random"
      },
      ease: "power2.in"
    }, "-=3");
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const targets = { experience: 5, projects: 100, availability: 24 };
      const startTime = Date.now();
      
      const updateStats = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          experience: Math.floor(targets.experience * progress),
          projects: Math.floor(targets.projects * progress),
          availability: Math.floor(targets.availability * progress)
        });
        
        if (progress < 1) {
          requestAnimationFrame(updateStats);
        }
      };
      
      updateStats();
    };

    const ctx = gsap.context(() => {
      // Panel animations with ScrollTrigger
      const panels = [titleRef.current, descRef.current, cardsRef.current, statsRef.current];
      
      panels.forEach((panel, index) => {
        if (panel) {
          gsap.fromTo(panel, 
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                onEnter: index === 3 ? () => animateStats() : undefined
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8 bg-black relative overflow-hidden" id="about">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-950/20 z-0"></div>
      
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
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/5 via-transparent to-emerald-950/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-20 relative">
          {/* Camera landing spot indicator */}
          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 opacity-30">
            <div className="w-16 h-16 border-2 border-dashed border-emerald-400 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-emerald-400/20 rounded-full"></div>
            </div>
          </div>
          
          <h2 ref={titleRef} className="text-6xl md:text-7xl font-light text-white mb-6">
            About
            <span className="block text-emerald-400">Me</span>
          </h2>
          <p ref={descRef} className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
            Certified professional photographer and cinematographer with an integrated digital ecosystem. 
            Specializing in commercial photography, event documentation, and cinematic storytelling through 
            advanced camera systems, professional lighting setups, and post-production workflows. 
            Verified member of professional photography associations with a comprehensive client management 
            system and automated booking platform.
          </p>
        </div>
        
        <div ref={cardsRef} className="text-center mb-20">
          <a 
            ref={portfolioButtonRef}
            href="https://gramtimevisuals.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={thanosVanish}
            className="inline-flex items-center px-8 py-4 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-lg font-light rounded-lg hover:bg-emerald-400/20 hover:border-emerald-400/50 transition-all duration-300 group relative overflow-hidden cursor-pointer"
          >
            <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View My Portfolio
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl border border-emerald-500/20">
            <div className="text-6xl font-light text-emerald-400 mb-2">{stats.experience}+</div>
            <div className="text-white text-lg font-light mb-1">Years Experience</div>
            <div className="text-gray-400 text-sm">Building innovative solutions</div>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl border border-emerald-500/20">
            <div className="text-6xl font-light text-emerald-400 mb-2">{stats.projects}+</div>
            <div className="text-white text-lg font-light mb-1">Projects Delivered</div>
            <div className="text-gray-400 text-sm">Across multiple industries</div>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl border border-emerald-500/20">
            <div className="text-6xl font-light text-emerald-400 mb-2">{stats.availability}/7</div>
            <div className="text-white text-lg font-light mb-1">Availability</div>
            <div className="text-gray-400 text-sm">Ready for new challenges</div>
          </div>
        </div>
      </div>
    </section>
  );
}