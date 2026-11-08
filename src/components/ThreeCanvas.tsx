import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollY: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollY }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Deep Royal Blue Fog & Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02091d, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.z = 90;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ================= 1. GEOMETRIC WIREFRAME PERSPECTIVE FLOOR =================
    const gridHelper = new THREE.GridHelper(300, 40, 0x38bdf8, 0x1e3a8a);
    gridHelper.position.y = -45;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    scene.add(gridHelper);

    // Geometric Wireframe Ceiling
    const ceilingGrid = new THREE.GridHelper(300, 40, 0x60a5fa, 0x172554);
    ceilingGrid.position.y = 45;
    (ceilingGrid.material as THREE.Material).transparent = true;
    (ceilingGrid.material as THREE.Material).opacity = 0.22;
    scene.add(ceilingGrid);

    // ================= 2. FLOATING GEOMETRIC WIREFRAME POLYHEDRA =================
    // Large Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(18, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-45, 10, -30);
    scene.add(icoMesh);

    // Rotating Octahedron
    const octGeo = new THREE.OctahedronGeometry(14, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(48, -12, -20);
    scene.add(octMesh);

    // Concentric Cybernetic Rings
    const ringGeo = new THREE.TorusGeometry(36, 0.4, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    scene.add(ringMesh);

    // ================= 3. CONNECTED GEOMETRIC STARFIELD & NODES =================
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cRoyal = new THREE.Color(0x60a5fa);
    const cLight = new THREE.Color(0xdbeafe);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      const c = i % 3 === 0 ? cCyan : i % 3 === 1 ? cRoyal : cLight;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate geometric objects
      icoMesh.rotation.x = elapsedTime * 0.12;
      icoMesh.rotation.y = elapsedTime * 0.18;

      octMesh.rotation.y = -elapsedTime * 0.2;
      octMesh.rotation.z = elapsedTime * 0.15;

      ringMesh.rotation.z = elapsedTime * 0.05;

      // Grid flowing movement (Infinite highway effect)
      gridHelper.position.z = (elapsedTime * 8) % 20;
      ceilingGrid.position.z = (elapsedTime * 8) % 20;

      // Particle constellation rotation
      particles.rotation.y = elapsedTime * 0.02 + targetX * 0.001;
      particles.rotation.x = elapsedTime * 0.01 + targetY * 0.001;

      // Camera responds smoothly to scroll
      camera.position.y = -(scrollY * 0.025);
      camera.position.x = targetX * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
