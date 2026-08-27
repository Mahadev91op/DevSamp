"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Cpu, ArrowRight, Layers, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

// Bento Layout mapping helper
const getBentoClasses = (idx) => {
  const layouts = [
    "lg:col-span-2 lg:row-span-1 min-h-[320px]", // Web Dev
    "lg:col-span-1 lg:row-span-2 min-h-[320px] lg:min-h-[650px]", // UI/UX
    "lg:col-span-1 lg:row-span-1 min-h-[320px]", // SEO / Performance
    "lg:col-span-1 lg:row-span-1 min-h-[320px]", // Mobile App
    "lg:col-span-1 lg:row-span-1 min-h-[320px]", // E-Commerce
  ];
  return layouts[idx % layouts.length] || "lg:col-span-1 lg:row-span-1 min-h-[320px]";
};

// --- WIDGET 1: Web Dev Live Code Compiler Simulator ---
const WebDevWidget = () => {
  const [btnColor, setBtnColor] = useState("#2563eb");
  const [isRounded, setIsRounded] = useState(true);

  return (
    <div className="w-full h-full flex flex-row gap-3 items-stretch select-none font-sans text-xs min-w-0">
      <div className="flex-1 bg-slate-950 text-slate-200 rounded-2xl p-3.5 font-mono border border-white/10 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <div className="text-xs text-slate-400 mb-1.5">{"// config parameters"}</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer transition-colors" onClick={() => setBtnColor(btnColor === "#2563eb" ? "#0ea5e9" : "#2563eb")}>
              <span>--primary:</span>
              <span className="font-bold text-blue-400 truncate">{btnColor}</span>
            </div>
            <div className="flex justify-between items-center hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer transition-colors" onClick={() => setIsRounded(!isRounded)}>
              <span>--rounded:</span>
              <span className="font-bold text-sky-400">{isRounded ? "999px" : "8px"}</span>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 font-bold border-t border-slate-800 pt-1.5 mt-2">
          Click lines to reload theme
        </div>
      </div>

      <div className="w-[110px] md:w-[140px] bg-white rounded-2xl border border-slate-200 p-3.5 md:p-4 flex flex-col justify-center items-center gap-2.5 shrink-0 shadow-xs">
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Preview</span>
        <motion.button 
          animate={{ backgroundColor: btnColor, borderRadius: isRounded ? "999px" : "8px" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-3.5 md:px-4 py-2 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 truncate"
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
    <div className="w-full h-full flex flex-col gap-3 relative justify-between select-none min-w-0">
      <div className="h-[140px] md:h-[230px] lg:h-auto lg:flex-1 bg-slate-950 rounded-2xl relative overflow-hidden border border-white/10">
        
        {/* Underlay: Wireframe */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[11px] text-indigo-400/60">
          <div className="border border-dashed border-indigo-500/30 p-1.5 rounded-lg flex justify-between">
            <span>[HEADER_NAV]</span>
            <div className="flex gap-1.5"><span>[NAV_LINK]</span></div>
          </div>
          <div className="border-2 border-dashed border-indigo-500/35 h-20 rounded-xl flex items-center justify-center font-bold">
            [HERO_ENGINE_NODE]
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1 border border-dashed border-indigo-500/30 h-8 rounded-lg"></div>
          </div>
        </div>

        {/* Overlay: Rendered Visual UI */}
        <div 
          className="absolute inset-0 p-4 bg-[#0f172a] flex flex-col justify-between transition-all duration-300"
          style={{ opacity: sliderVal / 100 }}
        >
          <div className="flex justify-between items-center text-white font-bold text-xs sm:text-sm">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-extrabold">DevSamp</span>
            <span className="text-slate-400 text-xs font-bold uppercase">UI Engine</span>
          </div>
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 h-20 rounded-xl shadow-lg flex flex-col justify-end p-3 text-white">
            <h4 className="font-extrabold text-xs sm:text-sm leading-tight">Ecosystem Architecture</h4>
            <p className="text-xs text-slate-200">High-fidelity responsive UI</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-slate-900 font-bold text-xs py-1.5 rounded-lg shadow-sm">Deploy</button>
          </div>
        </div>

      </div>

      <div className="space-y-1.5 px-1">
        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
          <span>Wireframe vs Rendered</span>
          <span className="font-mono text-indigo-600">{sliderVal}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderVal} 
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};

// --- WIDGET 3: Lighthouse performance gauge ---
const PerformanceWidget = () => {
  const [gauge, setGauge] = useState(90);

  return (
    <div 
      onMouseEnter={() => setGauge(100)}
      onMouseLeave={() => setGauge(90)}
      className="w-full h-full flex flex-col items-center justify-center gap-3 select-none"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="5" fill="transparent" />
          <motion.circle 
            cx="40" 
            cy="40" 
            r="32" 
            stroke="#10b981" 
            strokeWidth="5" 
            fill="transparent" 
            strokeDasharray="201"
            animate={{ strokeDashoffset: 201 - (201 * gauge) / 100 }}
            transition={{ type: "spring", stiffness: 60 }}
          />
        </svg>
        <span className="absolute font-black text-2xl text-slate-900 font-mono">{gauge}</span>
      </div>
      <div className="text-center">
        <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider block">PageSpeed Score</span>
        <p className="text-xs sm:text-sm text-emerald-600 font-bold mt-0.5">✓ Core Web Vitals Passed</p>
      </div>
    </div>
  );
};

const Services = ({ initialServices = [], sectionData = null }) => {
  const servicesData = initialServices;

  const badge = sectionData?.badge || "Capabilities";
  const title = sectionData?.title || "Engineering Services & Capabilities";
  const description = sectionData?.description || "Explore our architectural capabilities. Test compiler parameters, prototype layouts, and inspect performance metrics in real-time.";

  const renderWidget = (idx) => {
    if (idx === 0) return <WebDevWidget />;
    if (idx === 1) return <UIUXWidget />;
    if (idx === 2) return <PerformanceWidget />;
    
    return (
      <div className="w-full h-[120px] md:h-full flex items-center justify-center bg-white border border-slate-200/80 rounded-2xl relative overflow-hidden p-4">
        <div className="text-center font-mono text-xs text-slate-600">
          <span className="block font-bold uppercase tracking-wider mb-1 text-slate-900">Microservices Engine</span>
          <span>✓ Ready for high-concurrency production</span>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative w-full py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-5 min-w-0">
          <div className="max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
            >
              <Layers size={13} /> {badge}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-2.5"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-body font-normal max-w-xl"
            >
              {description}
            </motion.p>
          </div>

          <div className="shrink-0">
            <Link href="/services">
              <button 
                className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-300 hover:border-slate-950 text-slate-900 hover:bg-slate-950 hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                data-cursor="Services"
              >
                <span>View All Services</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* --- BENTO GRID SYSTEM --- */}
        {servicesData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
            {servicesData.map((service, idx) => {
              const IconComponent = LucideIcons[service.icon] || LucideIcons.HelpCircle;
              const bentoClass = getBentoClasses(idx);
              
              return (
                <motion.div
                  key={service._id || idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: smoothEase, delay: (idx % 3) * 0.08 }}
                  className={`group bg-slate-50/80 border border-slate-200/90 p-6 md:p-8 rounded-3xl shadow-xs flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:bg-white hover:border-indigo-500/40 hover:shadow-md min-w-0 ${bentoClass}`}
                >
                  <div className="space-y-3.5 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-indigo-600 shadow-xs shrink-0">
                        <IconComponent size={22} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                        [0{idx + 1} / SERVICE]
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-1.5 group-hover:text-indigo-600 transition-colors truncate">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed line-clamp-2 md:line-clamp-3">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex-1 flex items-end min-w-0">
                    {renderWidget(idx)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-10 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-black text-slate-900 mb-1.5">Services in Configuration</h3>
            <p className="text-slate-500 text-xs font-medium">
              Bespoke services are currently being cataloged. Contact our engineering team for custom architectural quotes.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Services;