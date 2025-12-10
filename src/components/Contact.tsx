import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function GameIcon({ src, index, allIcons, globalShake }: { src: string; index: number; allIcons: React.RefObject<HTMLDivElement[]>; globalShake: boolean }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(Math.random() * 360);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    // Enhanced initial setup with space-like properties
    const initialX = Math.random() * (window.innerWidth - 120);
    const initialY = Math.random() * (window.innerHeight - 120);
    const initialScale = 0.6 + Math.random() * 0.8;
    const depth = Math.random();
    
    gsap.set(icon, {
      x: initialX,
      y: initialY,
      rotation: rotation,
      scale: initialScale,
      opacity: 0.4 + depth * 0.4,
      filter: `blur(${(1 - depth) * 2}px) brightness(${0.8 + depth * 0.4})`,
      zIndex: Math.floor(depth * 10)
    });

    // Space-like floating with momentum
    let currentVelocity = { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 };
    
    const spaceFloat = () => {
      gsap.to(icon, {
        x: `+=${currentVelocity.x * 100}`,
        y: `+=${currentVelocity.y * 100}`,
        rotation: `+=${currentVelocity.x * 20}`,
        duration: 8 + Math.random() * 12,
        ease: "none",
        onComplete: () => {
          // Gradual velocity change for realistic space physics
          currentVelocity.x += (Math.random() - 0.5) * 0.2;
          currentVelocity.y += (Math.random() - 0.5) * 0.2;
          currentVelocity.x *= 0.98; // Space friction
          currentVelocity.y *= 0.98;
          spaceFloat();
        }
      });
    };
    
    setTimeout(() => spaceFloat(), Math.random() * 3000);

    // Enhanced collision detection with momentum transfer
    const checkCollisions = () => {
      if (!allIcons.current || !icon) return;
      
      const iconRect = icon.getBoundingClientRect();
      const iconCenterX = iconRect.left + iconRect.width / 2;
      const iconCenterY = iconRect.top + iconRect.height / 2;
      
      allIcons.current.forEach((otherIcon, otherIndex) => {
        if (otherIndex === index || !otherIcon) return;
        
        const otherRect = otherIcon.getBoundingClientRect();
        const otherCenterX = otherRect.left + otherRect.width / 2;
        const otherCenterY = otherRect.top + otherRect.height / 2;
        
        const distance = Math.sqrt(
          (iconCenterX - otherCenterX) ** 2 + (iconCenterY - otherCenterY) ** 2
        );
        
        if (distance < 60) {
          const angle = Math.atan2(iconCenterY - otherCenterY, iconCenterX - otherCenterX);
          const force = (60 - distance) * 2;
          
          gsap.to(icon, {
            x: `+=${Math.cos(angle) * force}`,
            y: `+=${Math.sin(angle) * force}`,
            rotation: `+=${Math.random() * 180 - 90}`,
            duration: 3 + Math.random() * 2,
            ease: "power1.out"
          });
        }
      });
    };

    // Gentle mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = icon.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - iconCenterX, 2) + Math.pow(e.clientY - iconCenterY, 2)
      );

      if (distance < 150) {
        const angle = Math.atan2(iconCenterY - e.clientY, iconCenterX - e.clientX);
        const force = (150 - distance) * 0.5;
        
        gsap.to(icon, {
          x: `+=${Math.cos(angle) * force}`,
          y: `+=${Math.sin(angle) * force}`,
          duration: 4,
          ease: "power1.out",
          rotation: `+=${Math.random() * 60 - 30}`,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Periodic collision checks
    const collisionInterval = setInterval(checkCollisions, 500);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(collisionInterval);
    };
  }, []);

  // Global shake effect
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon || !globalShake) return;

    gsap.to(icon, {
      x: `+=${Math.random() * 80 - 40}`,
      y: `+=${Math.random() * 80 - 40}`,
      rotation: `+=${Math.random() * 120 - 60}`,
      scale: `+=${Math.random() * 0.3 - 0.15}`,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });
  }, [globalShake]);

  const size = Math.random() > 0.6 ? 'w-12 h-12' : Math.random() > 0.3 ? 'w-10 h-10' : 'w-8 h-8';
  const borderRadius = Math.random() > 0.4 ? 'rounded-2xl' : 'rounded-full';

  return (
    <div
      ref={(el) => {
        iconRef.current = el;
        if (el && allIcons.current) allIcons.current[index] = el;
      }}
      className={`absolute ${size} ${borderRadius} overflow-hidden shadow-2xl border-2 border-emerald-400/20 backdrop-blur-sm bg-gradient-to-br from-black/60 via-emerald-950/30 to-black/40 hover:border-emerald-400/60 transition-all duration-700 hover:shadow-emerald-400/20 hover:shadow-lg`}
      style={{
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.1), inset 0 0 20px rgba(16, 185, 129, 0.05)'
      }}
    >
      <img
        src={src}
        alt="Programming Language"
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
        onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 via-transparent to-emerald-400/5 opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "frontend",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalShake, setGlobalShake] = useState(false);
  const allIconsRef = useRef<HTMLDivElement[]>([]);

  // Global device motion detection
  useEffect(() => {
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    let shakeTimeout: NodeJS.Timeout;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!event.accelerationIncludingGravity) return;

      const { x, y, z } = event.accelerationIncludingGravity;
      const acceleration = Math.sqrt(x! * x! + y! * y! + z! * z!);
      const lastAccel = Math.sqrt(
        lastAcceleration.x * lastAcceleration.x +
        lastAcceleration.y * lastAcceleration.y +
        lastAcceleration.z * lastAcceleration.z
      );

      const delta = Math.abs(acceleration - lastAccel);

      if (delta > 15) {
        setGlobalShake(true);
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => setGlobalShake(false), 1000);
      }

      lastAcceleration = { x: x || 0, y: y || 0, z: z || 0 };
    };

    if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    return () => {
      if (typeof DeviceMotionEvent !== 'undefined') {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      }
      clearTimeout(shakeTimeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format message for WhatsApp and Gmail
    const messageText = `Hi! I'm ${formData.name}\n\nProject Type: ${formData.projectType}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
    
    // WhatsApp URL (replace with your WhatsApp number)
    const whatsappNumber = "+233548345568"; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    
    // Gmail URL
    const gmailSubject = `New Project Inquiry - ${formData.projectType}`;
    const gmailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`;
    const gmailUrl = `mailto:Promisevino@gmail.com?subject=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;
    
    // Open both WhatsApp and Gmail
    window.open(whatsappUrl, '_blank');
    window.open(gmailUrl, '_blank');
    
    // Reset form after sending
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        projectType: "frontend",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 bg-zinc-950 relative overflow-hidden" id="contact">
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
      
      {/* Complex Interactive Floating Icons */}
      <div className="absolute inset-0 z-0">
        {[
          '/images/React.jpeg', '/images/js.jpeg', '/images/typescript.jpeg',
          '/images/nodejs.jpeg', '/images/python.jpeg', '/images/java.jpeg',
          '/images/html.jpeg', '/images/css.jpeg', '/images/c++.jpeg',
          '/images/Mongodb.jpeg', '/images/mysql.jpeg', '/images/git.jpeg',
          '/images/swift.jpeg', '/images/aws.jpeg', '/images/nestjs.jpeg',
          '/images/Unity 3d Engine.jpeg', '/images/c.jpeg', '/images/php.jpeg',
          '/images/Unreal Engine.jpeg', '/images/django.jpeg', '/images/ruby.jpeg',
          '/images/firebase.jpeg', '/images/postgresql.jpeg', '/images/c#.jpeg',
          '/images/posman.jpeg', '/images/android.jpeg', '/images/Docker.jpeg', 
          '/images/solidity.jpeg','/images/vue.jpeg','/images/flutter.jpeg',
          '/images/Bootstrap.jpeg', '/images/intellij.jpeg', '/images/vscode.jpeg',
          '/images/sql.jpeg','/images/figma.jpeg', '/images/nextjs.jpeg'
        ].slice(0, 25).map((iconPath, index) => (
          <GameIcon key={index} src={iconPath} index={index} allIcons={allIconsRef} globalShake={globalShake} />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/10 via-transparent to-emerald-950/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 md:mb-6">
            Let's Work
            <span className="block text-emerald-400">Together</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto px-4">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-12 md:mb-20">
          <div className="group p-8 bg-black/30 border border-gray-800 rounded-lg hover:border-emerald-400/30 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-400/20 transition-colors">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-white mb-2">Email</h3>
            <a href="mailto:Promisevino@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-colors break-all">
              Promisevino@gmail.com
            </a>
          </div>
          
          <div className="group p-8 bg-black/30 border border-gray-800 rounded-lg hover:border-emerald-400/30 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-400/20 transition-colors">
              <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <h3 className="text-lg font-light text-white mb-2">LinkedIn</h3>
            <a href="https://www.linkedin.com/in/promise-albert-758061329" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors break-all">
              linkedin.com/in/promise-albert
            </a>
          </div>
          
          <div className="group p-8 bg-black/30 border border-gray-800 rounded-lg hover:border-emerald-400/30 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-400/20 transition-colors">
              <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <h3 className="text-lg font-light text-white mb-2">GitHub</h3>
            <a href="https://github.com/VinoGram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
              github.com/VinoGram
            </a>
          </div>
        </div>
        

        
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/40 p-6 md:p-8 lg:p-12 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-6 md:mb-8 text-center">Get In Touch</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-2 font-light">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2 font-light">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-sm text-gray-400 mb-2 font-light">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-emerald-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="fullstack">Full Stack Application</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2 font-light">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-emerald-400 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-emerald-400 text-black font-medium rounded-lg hover:bg-emerald-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}