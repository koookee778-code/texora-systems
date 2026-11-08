import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollY: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollY }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(scrollY);

  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Detect lower end / mobile hardware
    const isLowPower = typeof window !== 'undefined' && window.navigator.hardwareConcurrency 
      ? window.navigator.hardwareConcurrency <= 4 
      : false;

    // Scene with deep royal blue fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02091d, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Disabled for extreme performance on weak devices
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    mount.appendChild(renderer.domElement);

    // ================= 1. LIGHTWEIGHT PERSPECTIVE GRID =================
    const gridHelper = new THREE.GridHelper(260, 24, 0x38bdf8, 0x1e3a8a);
    gridHelper.position.y = -40;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    scene.add(gridHelper);

    // Ceiling Grid
    const ceilingGrid = new THREE.GridHelper(260, 24, 0x60a5fa, 0x172554);
    ceilingGrid.position.y = 40;
    (ceilingGrid.material as THREE.Material).transparent = true;
    (ceilingGrid.material as THREE.Material).opacity = 0.18;
    scene.add(ceilingGrid);

    // ================= 2. GEOMETRIC POLYHEDRA (Low poly) =================
    const icoGeo = new THREE.IcosahedronGeometry(14, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-42, 8, -25);
    scene.add(icoMesh);

    const octGeo = new THREE.OctahedronGeometry(11, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(45, -10, -20);
    scene.add(octMesh);

    // ================= 3. ULTRA LIGHTWEIGHT STARFIELD =================
    const particleCount = isLowPower ? 180 : 320;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cRoyal = new THREE.Color(0x60a5fa);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 350;

      const c = i % 3 === 0 ? cCyan : i % 3 === 1 ? cRoyal : cWhite;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
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
      mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const sy = scrollYRef.current;
      // When completely covered by the pure white stage, skip rendering to save 100% of GPU resources
      if (sy > 3500 && sy < 4900) {
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      icoMesh.rotation.x = elapsedTime * 0.08;
      icoMesh.rotation.y = elapsedTime * 0.1;

      octMesh.rotation.y = -elapsedTime * 0.12;
      octMesh.rotation.z = elapsedTime * 0.09;

      gridHelper.position.z = (elapsedTime * 5) % 20;
      ceilingGrid.position.z = (elapsedTime * 5) % 20;

      particles.rotation.y = elapsedTime * 0.01 + targetX * 0.0008;

      camera.position.y = -(sy * 0.018);
      camera.position.x = targetX * 0.25;

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
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform"
      aria-hidden="true"
    />
  );
};
