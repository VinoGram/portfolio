import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeFloatingElements() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating code-like elements
    const elements: THREE.Mesh[] = [];
    
    // Create various geometric shapes representing code concepts
    const geometries = [
      new THREE.TetrahedronGeometry(0.5),
      new THREE.OctahedronGeometry(0.4),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + (i * 0.1) % 1, 0.7, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.3
      });
      
      const element = new THREE.Mesh(geometry, material);
      
      element.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      element.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatRange: Math.random() * 2 + 1
      };
      
      elements.push(element);
      scene.add(element);
    }

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      elements.forEach((element, index) => {
        // Rotation
        element.rotation.x += element.userData.rotationSpeed.x;
        element.rotation.y += element.userData.rotationSpeed.y;
        element.rotation.z += element.userData.rotationSpeed.z;
        
        // Floating motion
        const time = Date.now() * 0.001;
        element.position.y += Math.sin(time * element.userData.floatSpeed + index) * 0.01;
        element.position.x += Math.cos(time * element.userData.floatSpeed * 0.7 + index) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}