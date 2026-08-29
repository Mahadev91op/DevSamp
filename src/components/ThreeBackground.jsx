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
    camera.position.z = 70;

    // WebGL Renderer with alpha enabled for transparent page integration
    const renderer = new THREE.WebGLRenderer({ 
      canvas: containerRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // --- GRID DIMENSIONS ---
    const gridRows = isMobile ? 14 : 26;
    const gridCols = isMobile ? 14 : 28;
    const spacing = isMobile ? 7 : 5.2;
    const particleCount = gridRows * gridCols;

    // --- COLORFUL LUMINOUS GLOW DOT TEXTURE ---
    const createLuminousTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(125, 211, 252, 0.95)"); // Bright Sky / Cyan Core
      gradient.addColorStop(0.45, "rgba(99, 102, 241, 0.7)");  // Luminous Indigo
      gradient.addColorStop(0.7, "rgba(217, 70, 239, 0.35)");  // Aurora Violet/Magenta Accent
      gradient.addColorStop(1, "rgba(37, 99, 235, 0)");        // Electric Blue fade
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createLuminousTexture();

    // --- HARMONIC MULTI-COLOR PALETTE (Blue Anchored + Cyan + Indigo + Violet + Magenta) ---
    const palette = [
      new THREE.Color("#2563eb"), // Electric Royal Blue (Anchor)
      new THREE.Color("#06b6d4"), // Neon Cyan
      new THREE.Color("#4f46e5"), // Deep Indigo
      new THREE.Color("#8b5cf6"), // Vivid Cyber Violet
      new THREE.Color("#0284c7"), // Bright Ocean Blue
      new THREE.Color("#d946ef"), // Radiant Aurora Magenta
      new THREE.Color("#00f2fe"), // Aqua Cyan Glow
      new THREE.Color("#3b82f6"), // Vibrant Blue
    ];

    // --- GEOMETRY & BUFFERS ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseColors = [];
    const gridData = [];

    let index = 0;
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = (c - gridCols / 2) * spacing;
        const y = (r - gridRows / 2) * spacing;
        const z = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Rich spatial color distribution: combines diagonal gradient + concentric harmonic variation
        const colorIdx1 = (r + c) % palette.length;
        const color1 = palette[colorIdx1];

        colors[index * 3] = color1.r;
        colors[index * 3 + 1] = color1.g;
        colors[index * 3 + 2] = color1.b;

        baseColors.push({
          r: color1.r,
          g: color1.g,
          b: color1.b,
          colorIdx: colorIdx1
        });

        gridData.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          waveOffset: (r * 0.18) + (c * 0.18),
          freqOffset: Math.sqrt(x * x + y * y) * 0.04
        });

        index++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Points Material using vertex colors and additive glow
    const material = new THREE.PointsMaterial({
      size: isMobile ? 2.4 : 3.6,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- SECONDARY FLOATING CONSTELLATION MESH (Subtle Connecting Waves) ---
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    const lineColors = new Float32Array(particleCount * 6);

    let lineIndex = 0;
    for (let r = 0; r < gridRows; r += (isMobile ? 3 : 2)) {
      for (let c = 0; c < gridCols - 1; c += (isMobile ? 3 : 2)) {
        const i1 = r * gridCols + c;
        const i2 = r * gridCols + (c + 1);

        if (i1 < particleCount && i2 < particleCount) {
          linePositions[lineIndex * 3] = positions[i1 * 3];
          linePositions[lineIndex * 3 + 1] = positions[i1 * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positions[i1 * 3 + 2];

          linePositions[(lineIndex + 1) * 3] = positions[i2 * 3];
          linePositions[(lineIndex + 1) * 3 + 1] = positions[i2 * 3 + 1];
          linePositions[(lineIndex + 1) * 3 + 2] = positions[i2 * 3 + 2];

          const cObj = palette[(r + c) % palette.length];
          lineColors[lineIndex * 3] = cObj.r;
          lineColors[lineIndex * 3 + 1] = cObj.g;
          lineColors[lineIndex * 3 + 2] = cObj.b;

          lineColors[(lineIndex + 1) * 3] = cObj.r;
          lineColors[(lineIndex + 1) * 3 + 1] = cObj.g;
          lineColors[(lineIndex + 1) * 3 + 2] = cObj.b;

          lineIndex += 2;
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 3), 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors.slice(0, lineIndex * 3), 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    const handleMouseMove = (event) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.016;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Camera parallax
      camera.position.x = mouse.x * 10;
      camera.position.y = mouse.y * 10;
      camera.lookAt(scene.position);

      const positionsAttr = geometry.attributes.position;
      const positionsArray = positionsAttr.array;

      const colorsAttr = geometry.attributes.color;
      const colorsArray = colorsAttr.array;

      const mouse3D = !isMobile ? new THREE.Vector3(mouse.x * 45, mouse.y * 28, 0) : null;

      // Dynamic multi-wave sine mathematics + harmonic dynamic color oscillation
      for (let i = 0; i < particleCount; i++) {
        const data = gridData[i];
        const baseC = baseColors[i];
        
        // Fluid ripple wave
        let z = Math.sin(time + data.waveOffset) * 3.2;
        z += Math.cos(time * 0.7 + data.freqOffset) * 2.0;
        z += Math.sin(time * 1.2 + (data.baseX + data.baseY) * 0.05) * 1.5;

        // Dynamic mouse displacement
        if (!isMobile && mouse3D) {
          const px = positionsArray[i * 3];
          const py = positionsArray[i * 3 + 1];
          const dx = px - mouse3D.x;
          const dy = py - mouse3D.y;
          const distSqr = dx * dx + dy * dy;

          if (distSqr < 480) {
            const dist = Math.sqrt(distSqr);
            const force = (22 - dist) / 22; // 0 to 1
            z += force * 14 * Math.sin(time * 2.5);

            // Dynamically boost neon cyan/magenta under cursor
            colorsArray[i * 3] = THREE.MathUtils.lerp(colorsArray[i * 3], 0.2, 0.1);     // R
            colorsArray[i * 3 + 1] = THREE.MathUtils.lerp(colorsArray[i * 3 + 1], 0.9, 0.1); // G (Cyan)
            colorsArray[i * 3 + 2] = THREE.MathUtils.lerp(colorsArray[i * 3 + 2], 1.0, 0.1); // B
          } else {
            // Harmonic color cycle over time
            const nextIdx = (baseC.colorIdx + 1) % palette.length;
            const targetColor = palette[nextIdx];
            const blendRatio = (Math.sin(time * 0.5 + data.waveOffset) + 1) * 0.5;

            colorsArray[i * 3] = THREE.MathUtils.lerp(baseC.r, targetColor.r, blendRatio);
            colorsArray[i * 3 + 1] = THREE.MathUtils.lerp(baseC.g, targetColor.g, blendRatio);
            colorsArray[i * 3 + 2] = THREE.MathUtils.lerp(baseC.b, targetColor.b, blendRatio);
          }
        }

        positionsArray[i * 3 + 2] = z;
      }

      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;

      // Slow majestic rotation
      particles.rotation.z = time * 0.015;
      lines.rotation.z = time * 0.015;

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

      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent"
      style={{ opacity: 0.92 }}
    />
  );
};

export default ThreeBackground;
