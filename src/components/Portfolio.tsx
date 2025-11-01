import { useEffect } from "react";
import { Hero } from "./Hero";
import { AboutPage } from "./AboutPage";
import { About } from "./About";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Navigation } from "./Navigation";
import { CustomCursor } from "./CustomCursor";


export function Portfolio() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Only apply custom scrolling on desktop
    if (isMobile) return;
    
    let isScrolling = false;
    
    const smoothScroll = (e: WheelEvent) => {
      const currentScrollY = window.scrollY;
      const heroSection = document.getElementById('hero');
      const aboutPageSection = document.getElementById('about-page');
      
      if (!heroSection || !aboutPageSection) return;
      
      const heroHeight = heroSection.offsetHeight;
      const aboutPageHeight = aboutPageSection.offsetHeight;
      const heroAndAboutHeight = heroHeight + aboutPageHeight;
      
      // Only apply slow scrolling in Hero and AboutPage sections
      if (currentScrollY < heroAndAboutHeight) {
        if (isScrolling) return;
        
        e.preventDefault();
        isScrolling = true;
        
        const delta = e.deltaY;
        const scrollAmount = delta * 0.7;
        
        window.scrollBy({
          top: scrollAmount,
          behavior: 'auto'
        });
        
        setTimeout(() => {
          isScrolling = false;
        }, 30);
      }
    };
    
    window.addEventListener('wheel', smoothScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', smoothScroll);
    };
  }, []);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div className={`relative bg-black ${isMobile ? '' : 'cursor-none'}`} style={{ cursor: isMobile ? 'auto' : 'none' }}>
      {!isMobile && <CustomCursor />}

      <Navigation />
      
      <Hero />
      <AboutPage />
      
      <section id="about">
        <About />
      </section>
      
      <section id="work">
        <Projects />
      </section>
      
      <section id="services">
        <Services />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
      
      <footer className="py-12 px-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">created by Gramtime Logic</p>
      </footer>
    </div>
  );
}
