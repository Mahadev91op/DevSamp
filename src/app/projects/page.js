// src/app/projects/page.js
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ExternalLink, Terminal, Cpu } from "lucide-react";
import { PortfolioSkeleton } from "@/components/Skeletons";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <main className="bg-transparent min-h-screen text-slate-900 selection:bg-indigo-500/20">
      
      <div className="pt-32 pb-16 px-6 container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-55 border border-indigo-100 text-[10px] font-bold text-indigo-655 uppercase tracking-widest mb-3"
          >
            Archive Index
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 font-extrabold">Masterpieces</span>
          </motion.h1>
          <p className="text-slate-500 text-xs md:text-sm font-semibold max-w-md mx-auto">
            A complete compiled archive of our customized software components and interface designs.
          </p>
        </div>

        {/* Filter Buttons */}
        {!loading && (
          <div className="flex flex-wrap justify-center gap-2 mb-12 select-none">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-305 border ${
                    activeCategory === cat
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                      : "bg-white/60 text-slate-655 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                  }`}
                  data-cursor="Category"
                >
                  {cat}
                </button>
              ))}
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <PortfolioSkeleton count={6} />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {

              const version = `2.${(index + 1) % 4}.${(index * 3) % 9}`;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project._id}
                  className="group relative rounded-3xl overflow-hidden bg-white/85 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] h-[410px] flex flex-col justify-between"
                  data-cursor="Project"
                >
                  <div className="relative h-[220px] w-full overflow-hidden bg-slate-100/50">
                    {/* Console Header */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-slate-950/90 z-20 px-3 flex items-center justify-between text-[9px] font-mono text-slate-400 select-none">
                      <span className="flex items-center gap-1"><Terminal size={10} className="text-indigo-400" /> index.js</span>
                      <span className="text-indigo-400">v{version}</span>
                    </div>

                    <Image
                      src={getGoogleDriveImage(project.image)}
                      alt={project.title}
                      fill
                      unoptimized={true} // Bypasses blurred remote optimizations
                      className="object-cover group-hover:scale-105 transition-transform duration-500 pt-8"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-4 z-20 flex gap-2">
                      <span className="bg-slate-900/85 text-[8px] text-slate-300 font-mono font-bold px-1.5 py-0.5 rounded border border-white/10 uppercase">
                        V: {version}
                      </span>
                      <span className="bg-indigo-650/95 text-[8px] text-white font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1 relative z-20 bg-transparent">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-indigo-650 text-[9px] font-extrabold uppercase tracking-widest">
                          {project.category}
                        </span>
                        <span className="text-slate-405 text-[9px] font-mono flex items-center gap-1">
                          <Cpu size={10} /> compiled
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
                      <a href={project.link} target="_blank" className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors">
                          Launch Demo <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        )}

      </div>

      <Footer />
    </main>
  );
}
