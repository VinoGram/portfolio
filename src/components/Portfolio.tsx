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
