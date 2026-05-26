"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; 
import { ExternalLink, Terminal, Cpu, HardDrive } from "lucide-react";

// Google Drive Image Formatter to prevent blurry thumbnails
const getGoogleDriveImage = (url) => {
  if (!url) return "";
  try {
    const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${fileDMatch[1]}&sz=w1000`;
    }
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }
  } catch (e) {
    console.error("Link Error:", e);
  }
  return url;
};

// --- 3D TILT WRAPPER COMPONENT ---
const TiltCard = ({ children, className, ...props }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightX, setLightX] = useState(0);
  const [lightY, setLightY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rX = -((mouseY - height / 2) / height) * 12;
    const rY = ((mouseX - width / 2) / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
    setLightX((mouseX / width) * 100);
    setLightY((mouseY / height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {hovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-25 bg-[radial-gradient(circle_at_var(--light-x)_var(--light-y),_rgba(99,102,241,0.45)_0%,_transparent_60%)]"
          style={{
            "--light-x": `${lightX}%`,
            "--light-y": `${lightY}%`,
          }}
        />
      )}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const Portfolio = ({ initialProjects = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = Array.isArray(initialProjects) ? initialProjects : [];
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const displayedProjects = filteredProjects.slice(0, 6); 

  return (
    <section id="work" className="py-12 md:py-28 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3"
            >
              Showcase
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Masterpieces</span>
            </motion.h2>
            <p className="text-slate-500 text-sm md:text-base font-semibold">Exemplifying visual precision and software complexity.</p>
          </div>

          {/* Filter Categories */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex gap-2 whitespace-nowrap">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white/60 text-slate-655 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible pb-6 md:pb-0 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-none">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              // Mock versions & statuses to enhance the coder theme
              const version = `1.${(index + 3) % 5}.${(index * 2) % 9}`;
              const buildStatus = index % 3 === 0 ? "STABLE" : "PASSING";
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project._id}
                  className="h-full shrink-0 w-[85vw] sm:w-[350px] md:w-auto snap-center"
                >
                  <TiltCard 
                    className="group relative rounded-3xl overflow-hidden bg-white/40 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-xl h-[410px] flex flex-col justify-between"
                    data-cursor="View"
                  >
                    {/* Project Image Box */}
                    <div className="relative h-[220px] w-full overflow-hidden bg-slate-100/50">
                      {/* Coder Console Header Bar on Image */}
                      <div className="absolute top-0 left-0 right-0 h-8 bg-slate-950/80 backdrop-blur-sm z-20 px-3 flex items-center justify-between text-[9px] font-mono text-slate-400 select-none">
                        <span className="flex items-center gap-1"><Terminal size={10} className="text-indigo-400" /> main.min.js</span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                          <span className="text-green-400">{buildStatus}</span>
                        </span>
                      </div>

                      <Image
                        src={getGoogleDriveImage(project.image)}
                        alt={project.title}
                        fill
                        unoptimized={true} // Prevents blurry remote patterns downscaling
                        className="object-cover group-hover:scale-105 transition-transform duration-500 pt-8"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Floating build label */}
                      <div className="absolute bottom-3 left-4 z-20 flex gap-2">
                        <span className="bg-slate-900/60 backdrop-blur-sm text-[8px] text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded border border-white/10 uppercase">
                          Build: {version}
                        </span>
                        <span className="bg-indigo-650/85 backdrop-blur-sm text-[8px] text-white font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Meta details */}
                    <div className="p-5 flex flex-col justify-between flex-1 relative z-20 bg-white/20">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-indigo-600 text-[9px] font-extrabold uppercase tracking-widest">
                            {project.category}
                          </span>
                          <span className="text-slate-400 text-[9px] font-mono flex items-center gap-1">
                            <Cpu size={10} /> v{version}
                          </span>
                        </div>
                        <h3 className="text-base md:text-lg font-extrabold text-slate-800 leading-tight mb-2.5 line-clamp-1">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 h-[50px] overflow-hidden content-start">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-[8px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-500 font-bold whitespace-nowrap shadow-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200/60">
                        <a href={project.link} target="_blank" className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors">
                          Launch Project <ExternalLink size={12} />
                        </a>
                        <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                          <HardDrive size={10} /> CDN://READY
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer Link */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link href="/projects">
            <button className="px-8 py-3 text-sm md:text-base border border-slate-300 bg-white/40 backdrop-blur-sm rounded-full text-slate-700 font-bold hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all shadow-sm" data-cursor="All Works">
              View All Masterpieces
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;