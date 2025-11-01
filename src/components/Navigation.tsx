import { useState, useEffect } from 'react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-green-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-green-500">
              Portfolio
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm font-light">
                About
              </a>
              <a href="#services" className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm font-light">
                Services
              </a>
              <a href="#work" className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm font-light">
                Work
              </a>
              <a href="#contact" className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm font-light">
                Contact
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col space-y-1 w-6 h-6 justify-center"
            >
              <span className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-green-500 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-500 md:hidden ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a 
            href="#about" 
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-gray-300 hover:text-green-500 transition-colors duration-300 uppercase tracking-wider"
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-gray-300 hover:text-green-500 transition-colors duration-300 uppercase tracking-wider"
          >
            Services
          </a>
          <a 
            href="#work" 
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-gray-300 hover:text-green-500 transition-colors duration-300 uppercase tracking-wider"
          >
            Work
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-gray-300 hover:text-green-500 transition-colors duration-300 uppercase tracking-wider"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}