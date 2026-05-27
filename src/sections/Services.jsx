"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

// Bento Layout mapping helper
const getBentoClasses = (idx) => {
  const layouts = [
    "md:col-span-2 md:row-span-1 h-[350px] md:h-[320px]", // Web Dev
    "md:col-span-1 md:row-span-2 h-[350px] md:h-[660px]", // UI/UX
    "md:col-span-1 md:row-span-1 h-[350px] md:h-[320px]", // SEO / Performance
    "md:col-span-1 md:row-span-1 h-[350px] md:h-[320px]", // Mobile App
    "md:col-span-1 md:row-span-1 h-[350px] md:h-[320px]", // E-Commerce
  ];
  return layouts[idx % layouts.length] || "md:col-span-1 md:row-span-1 h-[350px] md:h-[320px]";
};

// --- WIDGET 1: Web Dev Live Code Compiler Simulator ---
const WebDevWidget = () => {
  const [activeTab, setActiveTab] = useState("css");
  const [btnColor, setBtnColor] = useState("#4f46e5");
  const [isRounded, setIsRounded] = useState(true);

  return (
    <div className="w-full h-full flex flex-row gap-3 items-stretch select-none font-sans text-xs">
      {/* Code Editor Mock */}
      <div className="flex-1 bg-slate-950 text-slate-300 rounded-xl p-3 font-mono border border-white/5 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <div className="text-[9px] text-slate-500 mb-1.5">// config variables</div>
          <div className="space-y-1 text-[9px]">
            <div className="flex justify-between items-center hover:bg-white/5 px-1 py-0.5 rounded cursor-pointer" onClick={() => setBtnColor(btnColor === "#4f46e5" ? "#ec4899" : "#4f46e5")}>
              <span>--primary:</span>
              <span className="font-bold text-indigo-400">{btnColor}</span>
            </div>
            <div className="flex justify-between items-center hover:bg-white/5 px-1 py-0.5 rounded cursor-pointer" onClick={() => setIsRounded(!isRounded)}>
              <span>--rounded:</span>
              <span className="font-bold text-pink-400">{isRounded ? "999px" : "8px"}</span>
            </div>
          </div>
        </div>
        <div className="text-[8px] text-slate-600 font-bold border-t border-slate-900 pt-1.5 mt-2">
          Click lines to reload
        </div>
      </div>

      {/* Render Preview Mock */}
      <div className="w-[95px] md:w-[150px] bg-slate-50 rounded-xl border border-slate-200/60 p-2 md:p-4 flex flex-col justify-center items-center gap-2 md:gap-3 shrink-0">
        <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preview</span>
        <motion.button 
          animate={{ backgroundColor: btnColor, borderRadius: isRounded ? "999px" : "8px" }}
          className="px-2.5 md:px-4 py-1.5 md:py-2 text-white font-bold text-[8px] md:text-[10px] shadow-lg shadow-indigo-500/15"
        >
          DevSamp
        </motion.button>
      </div>
    </div>
  );
};

// --- WIDGET 2: UI/UX Prototype Wireframe/Mock Slider ---
const UIUXWidget = () => {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div className="w-full h-full flex flex-col gap-3 relative justify-between select-none">
      {/* Visual Sandbox Box */}
      <div className="h-[120px] md:h-auto md:flex-1 bg-slate-950 rounded-2xl relative overflow-hidden border border-white/5">
        
        {/* Underlay: Wireframe Sketch */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between font-mono text-[9px] text-indigo-400/50">
          <div className="border border-dashed border-indigo-500/20 p-2 rounded flex justify-between">
            <span>[HEADER_NAV]</span>
            <div className="flex gap-2"><span>[NAV_LINK]</span><span>[NAV_LINK]</span></div>
          </div>
          <div className="border-2 border-dashed border-indigo-500/30 h-28 rounded-xl flex items-center justify-center font-bold">
            [HERO_HERO_IMAGE_BOX]
          </div>
          <div className="flex gap-2">
            <div className="flex-1 border border-dashed border-indigo-500/20 h-10 rounded"></div>
            <div className="flex-1 border border-dashed border-indigo-500/20 h-10 rounded"></div>
          </div>
        </div>

        {/* Overlay: Rendered Visual UI (controlled by slider) */}
        <div 
          className="absolute inset-0 p-5 bg-[#0f172a] flex flex-col justify-between transition-all"
          style={{ opacity: sliderVal / 100 }}
        >
          <div className="flex justify-between items-center text-white font-bold text-[10px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">DevSamp</span>
            <div className="flex gap-3 text-slate-400 text-[8px] font-bold uppercase">
              <span>Work</span><span>Services</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 h-28 rounded-xl shadow-lg flex flex-col justify-end p-3 text-white">
            <h4 className="font-extrabold text-[12px] leading-tight">Interactive Systems</h4>
            <p className="text-[8px] text-slate-200">Crafting high-fidelity mockups</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-slate-900 font-bold text-[8px] py-2 rounded-lg">Launch</button>
            <button className="flex-1 bg-white/10 text-white font-bold text-[8px] py-2 rounded-lg">Prototype</button>
          </div>
        </div>

      </div>

      {/* Slider Control */}
      <div className="space-y-1.5 px-1">
        <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
          <span>Wireframe vs High-Fidelity</span>
          <span>{sliderVal}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderVal} 
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};

// --- WIDGET 3: Lighthouse performance gauge ---
const PerformanceWidget = () => {
  const [gauge, setGauge] = useState(85);

  return (
    <div 
      onMouseEnter={() => setGauge(100)}
      onMouseLeave={() => setGauge(85)}
      className="w-full h-full flex flex-col items-center justify-center gap-3 select-none"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
          <motion.circle 
            cx="48" 
            cy="48" 
            r="40" 
            stroke="#10b981" 
            strokeWidth="6" 
            fill="transparent" 
            strokeDasharray="251.2"
            animate={{ strokeDashoffset: 251.2 - (251.2 * gauge) / 100 }}
            transition={{ type: "spring", stiffness: 60 }}
          />
        </svg>
        <span className="absolute font-black text-xl text-slate-800 font-mono">{gauge}</span>
      </div>
      <div className="text-center">
        <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">PageSpeed score</span>
        <p className="text-[10px] text-emerald-500 font-bold">✓ Core Web Vitals Passed</p>
      </div>
    </div>
  );
};

const Services = ({ initialServices = [] }) => {
  const servicesData = initialServices;

  const renderWidget = (idx) => {
    // Return specific interactive widgets based on slot index
    if (idx === 0) return <WebDevWidget />;
    if (idx === 1) return <UIUXWidget />;
    if (idx === 2) return <PerformanceWidget />;
    
    // Fallback decorative elements for other slots
    return (
      <div className="w-full h-[120px] md:h-full flex items-center justify-center bg-slate-50 border border-slate-200/50 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent"></div>
        <div className="text-center font-mono text-[9px] text-slate-400 p-4">
          <span className="block font-bold uppercase tracking-wider mb-2">Micro-Services Engine</span>
          <span>✓ Ready to mount custom features</span>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative w-full py-12 md:py-28 bg-transparent text-slate-900 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[20%] right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3"
          >
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight"
          >
            Capabilities & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Bento Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm md:text-base font-semibold px-2"
          >
            Explore our architectural capabilities. Hover and drag the components to test compile speeds, prototype layouts, and lighthouse parameters.
          </motion.p>
        </div>

        {/* --- BENTO GRID SYSTEM --- */}
        <div className="grid grid-flow-col grid-rows-2 overflow-x-auto md:grid-flow-row md:grid-rows-none md:grid-cols-3 md:overflow-visible gap-6 pb-6 md:pb-0 scrollbar-none snap-x snap-mandatory">
          {servicesData.map((service, idx) => {
            const IconComponent = LucideIcons[service.icon] || LucideIcons.HelpCircle;
            const bentoClass = getBentoClasses(idx);
            
            return (
              <motion.div
                key={service._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                className={`group bg-white/40 border border-slate-200/80 p-5 md:p-8 rounded-3xl backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:border-indigo-500/30 w-[290px] sm:w-[330px] shrink-0 snap-start md:w-auto md:shrink-0 ${bentoClass}`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Top: Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-indigo-600 shadow-sm">
                      <IconComponent size={20} />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-slate-300 group-hover:text-indigo-400 transition-colors">
                      [0{idx + 1} / SERVICE]
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed line-clamp-2 md:line-clamp-none">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Interactive Sandbox Widget */}
                <div className="mt-6 flex-1 flex items-end">
                  {renderWidget(idx)}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;