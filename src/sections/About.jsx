"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Code,
  ArrowUpRight,
  Terminal,
  Cpu
} from "lucide-react";

const techStack = [
  { 
    id: "nextjs", 
    name: "Next.js", 
    level: "Core Architecture", 
    speed: "0.08s (SSR HMR)", 
    useCase: "App Router, Server Actions, Middleware", 
    score: 98, 
    desc: "We build modern, SEO-optimized web systems using Next.js 15." 
  },
  { 
    id: "react", 
    name: "React 19", 
    level: "UI Component Engineering", 
    speed: "12ms (DOM Updates)", 
    useCase: "Suspense boundary, Context API, Actions Hook", 
    score: 99, 
    desc: "Designing fast, responsive client interfaces with reusable components." 
  },
  { 
    id: "node", 
    name: "Node.js", 
    level: "API & Microservices", 
    speed: "24ms API response", 
    useCase: "Express, WebSockets, Secure Headers", 
    score: 94, 
    desc: "Scaling back-ends and setting up high-concurrency microservices." 
  },
  { 
    id: "mongo", 
    name: "MongoDB", 
    level: "Database Optimization", 
    speed: "8ms DB lookup", 
    useCase: "Mongoose models, Aggregation grids, Indexes", 
    score: 92, 
    desc: "Modeling flexible data collections with absolute indexing integrity." 
  },
  { 
    id: "framer", 
    name: "Framer Motion", 
    level: "Interactive UX Design", 
    speed: "60fps (GPU Accelerated)", 
    useCase: "Spring physics, custom transitions, layout transition", 
    score: 96, 
    desc: "Implementing beautiful micro-interactions without causing frame drops." 
  }
];

const About = () => {
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const activeTech = techStack[activeTechIdx];

  return (
    <section id="about" className="relative py-12 md:py-28 bg-transparent text-slate-900 overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3"
          >
            Philosophy
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight"
          >
            We craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">digital excellence</span> with code & creativity.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed font-semibold"
          >
            DevSamp is not just an agency; it's a software engineering lab where ideas turn into high-performance web applications. We bridge the gap between creative visual designs and strict, complex back-end code.
          </motion.p>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1: Main Image */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative h-[250px] md:h-[420px] rounded-3xl overflow-hidden group border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
              alt="Cyberpunk Workspace"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <div className="bg-indigo-600 w-fit px-3.5 py-1 rounded-full text-[10px] font-bold text-white mb-2 tracking-wide">SINCE 2021</div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">Engineering the Future</h3>
            </div>
          </motion.div>

          {/* Card 2: Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white/85 border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-row lg:flex-col justify-between items-center lg:items-start hover:bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-50 border border-slate-100 flex items-center justify-center text-indigo-600 mb-2 md:mb-6 shadow-sm">
                <TrendingUp size={18} />
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-1 leading-none">150+</h3>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-extrabold">Projects Delivered</p>
            </div>
            
            <div className="border-l pl-6 lg:pl-0 lg:border-l-0 lg:border-t lg:pt-8 border-slate-200/60 lg:mt-8 w-auto lg:w-full">
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-1 leading-none">98%</h3>
              <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-extrabold">Client Retention</p>
            </div>
          </motion.div>

          {/* Card 3: Our Approach */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 bg-white/85 border border-slate-200/80 rounded-3xl p-6 md:p-8 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none"></div>
            
            <div className="p-2.5 w-fit rounded-xl bg-slate-50 border border-slate-100 text-indigo-600 mb-4 shadow-sm">
              <Target size={18} />
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-2">Strategy First</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-semibold">
              We do not just blindly code. We analyze your market, study your users, and engineer architecture models that build business value.
            </p>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors" data-cursor="Strategy">
              Let's talk strategy <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Card 4: Interactive Tech Stack Explorer */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white/85 border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-300"
          >
            {/* Left side: Tech Icon selector grid */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3">
                <Code className="text-indigo-600" size={20} />
                <h3 className="text-base font-extrabold text-slate-800">Tech Arsenal</h3>
              </div>

              {/* Grid of buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {techStack.map((tech, idx) => (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTechIdx(idx)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center select-none ${
                      activeTechIdx === idx
                        ? "bg-slate-950 text-white border-slate-950 shadow-md"
                        : "bg-white border-slate-200 text-slate-600 hover:border-indigo-500/30 hover:text-slate-800"
                    }`}
                  >
                    {tech.name}
                  </button>
                ))}
              </div>
              
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Click tags to explore framework metrics
              </span>
            </div>

            {/* Right side: Specialized Dev Console Panel */}
            <div className="w-full md:w-[260px] bg-slate-950 text-slate-300 p-4 rounded-2xl border border-white/5 font-mono text-[9px] flex flex-col justify-between gap-3 shadow-inner relative min-h-[160px]">
              
              <div className="absolute top-2.5 right-3.5 text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1 select-none">
                <Terminal size={10} /> diagnostics
              </div>

              <div className="space-y-2 pt-2">
                <div>
                  <span className="text-slate-500">LEVEL:</span>
                  <p className="text-indigo-400 font-bold text-[10px]">{activeTech.level}</p>
                </div>
                <div>
                  <span className="text-slate-500">SPEED:</span>
                  <p className="text-emerald-400 font-bold text-[10px]">{activeTech.speed}</p>
                </div>
                <div>
                  <span className="text-slate-500">MODULES:</span>
                  <p className="text-slate-400 leading-normal">{activeTech.useCase}</p>
                </div>
              </div>

              <div className="border-t border-slate-900 pt-2.5">
                <span className="text-slate-500">DIAGNOSTIC DESC:</span>
                <p className="text-slate-400 leading-normal text-[8px]">{activeTech.desc}</p>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;