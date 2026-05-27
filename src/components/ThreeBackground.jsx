"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!containerRef.current) return;

    // --- SETUP ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 75;

    // WebGL Renderer with alpha enabled for background color transparency
    const renderer = new THREE.WebGLRenderer({ 
      canvas: containerRef.current,
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- DETECT DEVICE & ADJUST COMPLEXITY ---
    const gridRows = isMobile ? 15 : 30;
    const gridCols = isMobile ? 15 : 30;
    const spacing = 4;
    const particleCount = gridRows * gridCols;

    // --- CREATE CUSTOM ROUND DOT TEXTURE ---
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    // --- GEOMETRY & MATERIALS ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Store original grid layout for calculations
    const gridData = [];

    // Pastel colors: Soft Blue, Soft Violet, Soft Pink
    const palette = [
      new THREE.Color("#60a5fa"), // Blue
      new THREE.Color("#a78bfa"), // Violet
      new THREE.Color("#f472b6"), // Pink
    ];

    let index = 0;
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        // Center the grid around origin
        const x = (c - gridCols / 2) * spacing;
        const y = (r - gridRows / 2) * spacing;
        const z = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Assign a color from palette based on position
        const colorIndex = (r + c) % palette.length;
        const color = palette[colorIndex];
        
        colors[index * 3] = color.r;
        colors[index * 3 + 1] = color.g;
        colors[index * 3 + 2] = color.b;

        gridData.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          waveOffset: (r * 0.15) + (c * 0.15)
        });

        index++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Points Material using vertex colors
    const material = new THREE.PointsMaterial({
      size: isMobile ? 1.5 : 2.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.015;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Rotate camera gently based on mouse
      camera.position.x = mouse.x * 12;
      camera.position.y = mouse.y * 12;
      camera.lookAt(scene.position);

      const positionsAttr = geometry.attributes.position;
      const positionsArray = positionsAttr.array;

      // Update particle heights based on wave formula and mouse interaction
      for (let i = 0; i < particleCount; i++) {
        const data = gridData[i];
        
        // Dynamic Sine Wave math
        let z = Math.sin(time + data.waveOffset) * 2.5;
        z += Math.cos(time * 0.8 + data.waveOffset * 1.5) * 1.5;

        // Apply mouse distortion if cursor is active
        const px = positionsArray[i * 3];
        const py = positionsArray[i * 3 + 1];

        // Project mouse coordinates into 3D world approximate coordinates
        const mouse3D = new THREE.Vector3(mouse.x * 40, mouse.y * 25, 0);
        const dist = Math.sqrt((px - mouse3D.x) ** 2 + (py - mouse3D.y) ** 2);

        if (dist < 20) {
          const force = (20 - dist) / 20; // 0 to 1
          z += force * 12 * Math.sin(time * 2);
        }

        positionsArray[i * 3 + 2] = z;
      }

      positionsAttr.needsUpdate = true;

      // Rotate grid slowly
      particles.rotation.z = time * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- RESIZE EVENT ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose of ThreeJS resources
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent"
      style={{ mixBlendMode: "multiply", opacity: 0.8 }}
    />
  );
};

export default ThreeBackground;
