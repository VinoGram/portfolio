import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Torus shapes
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.TorusGeometry(0.5, 0.2, 8, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + i * 0.1, 0.7, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const torus = new THREE.Mesh(geometry, material);
      
      torus.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      shapes.push(torus);
      scene.add(torus);
    }

    // Icosahedron shapes
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.IcosahedronGeometry(0.8, 0);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.8 + i * 0.05, 0.8, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const icosahedron = new THREE.Mesh(geometry, material);
      
      icosahedron.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      );
      
      shapes.push(icosahedron);
      scene.add(icosahedron);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate and move shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001;
        shape.rotation.y += 0.008 + index * 0.001;
        
        // Floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        shape.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    } catch (error) {
      console.warn('WebGL not supported, falling back to 2D canvas');
      // Fallback to 2D canvas animation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx || !mountRef.current) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.className = 'absolute inset-0 z-0';
      mountRef.current.appendChild(canvas);

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
      }> = [];

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      function animate() {
        if (!ctx || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
          ctx.fill();
        });

        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          });
        });

        requestAnimationFrame(animate);
      }

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && canvas) {
          mountRef.current.removeChild(canvas);
        }
      };
    }
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}