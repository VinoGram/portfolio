import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeCube() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create animated cube with edges
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });
    
    const cube = new THREE.LineSegments(edges, lineMaterial);
    scene.add(cube);

    // Add inner rotating wireframe
    const innerGeometry = new THREE.OctahedronGeometry(1.2);
    const innerEdges = new THREE.EdgesGeometry(innerGeometry);
    const innerMaterial = new THREE.LineBasicMaterial({ 
      color: 0xff00ff,
      transparent: true,
      opacity: 0.6
    });
    
    const innerShape = new THREE.LineSegments(innerEdges, innerMaterial);
    scene.add(innerShape);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Auto rotation
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      innerShape.rotation.x -= 0.015;
      innerShape.rotation.y += 0.02;

      // Mouse interaction
      cube.rotation.x += mouseY * 0.02;
      cube.rotation.y += mouseX * 0.02;
      
      innerShape.rotation.x += mouseY * 0.01;
      innerShape.rotation.y -= mouseX * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-[300px] h-[300px] mx-auto cursor-pointer hover:scale-110 transition-transform duration-300"
    />
  );
}