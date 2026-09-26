"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Cpu, ArrowRight, Layers, Sparkles, ChevronRight } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

// Bento Layout mapping helper
const getBentoClasses = (idx) => {
  const layouts = [
    "lg:col-span-2 lg:row-span-1 min-h-[220px] sm:min-h-[300px] lg:min-h-[320px]", // Web Dev
    "lg:col-span-1 lg:row-span-2 min-h-[220px] sm:min-h-[300px] lg:min-h-[650px]", // UI/UX
    "lg:col-span-1 lg:row-span-1 min-h-[220px] sm:min-h-[300px] lg:min-h-[320px]", // SEO / Performance
    "lg:col-span-1 lg:row-span-1 min-h-[220px] sm:min-h-[300px] lg:min-h-[320px]", // Mobile App
    "lg:col-span-1 lg:row-span-1 min-h-[220px] sm:min-h-[300px] lg:min-h-[320px]", // E-Commerce
  ];
  return layouts[idx % layouts.length] || "lg:col-span-1 lg:row-span-1 min-h-[220px] sm:min-h-[300px] lg:min-h-[320px]";
};

// --- WIDGET 1: Web Dev Live Code Compiler Simulator ---
const WebDevWidget = () => {
  const [btnColor, setBtnColor] = useState("#2563eb");
  const [isRounded, setIsRounded] = useState(true);

  return (
    <div className="w-full h-full flex flex-row gap-3 items-stretch select-none font-sans text-xs min-w-0">
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-slate-200 rounded-2xl p-3.5 font-mono border border-indigo-500/30 flex flex-col justify-between min-w-0 shadow-md">
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
              <span className="font-bold underline text-cyan-400">{btnColor}</span>
            </div>
            <div className="flex justify-between items-center hover:bg-white/10 px-1 py-0.5 rounded cursor-pointer transition-colors" onClick={() => setIsRounded(!isRounded)}>
              <span>--rounded:</span>
              <span className="font-bold underline text-cyan-400">{isRounded ? "1rem" : "0.25rem"}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>--framework:</span>
              <span className="text-slate-400">Next.js 15</span>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 mt-2 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Click parameter to test live hot-reload</span>
        </div>
      </div>
      
      {/* Visual Live Preview Box */}
      <div className="w-28 bg-white border border-slate-200/90 rounded-2xl p-2 flex flex-col items-center justify-center gap-2 shadow-xs shrink-0">
        <div 
          className="w-10 h-10 flex items-center justify-center shadow-xs text-white transition-all duration-300 transform active:scale-95"
          style={{ 
            backgroundColor: btnColor, 
            borderRadius: isRounded ? "1rem" : "0.25rem" 
          }}
        >
          <Cpu size={18} />
        </div>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center font-mono">
          Component
        </span>
      </div>
    </div>
  );
};

// --- WIDGET 2: UI/UX Interactive Split Canvas Simulator ---
const UIUXWidget = () => {
  const [sliderVal, setSliderVal] = useState(50);

  return (
    <div className="w-full h-full flex flex-col justify-between select-none py-1">
      <div className="relative w-full h-[180px] lg:h-[360px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner">
        {/* Under layer: Wireframe Blueprint */}
        <div className="absolute inset-0 bg-slate-900 p-4 flex flex-col justify-between font-mono text-[10px] text-indigo-400">
          <div className="flex justify-between border-b border-indigo-900/60 pb-1">
            <span>[WIREFRAME.SCHEMA]</span>
            <span>GRID: 8PT</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-auto">
            <div className="h-10 border border-dashed border-indigo-500/40 rounded flex items-center justify-center bg-indigo-950/30">
              <span>Figma Spec</span>
            </div>
            <div className="h-10 border border-dashed border-indigo-500/40 rounded flex items-center justify-center bg-indigo-950/30">
              <span>Tokens</span>
            </div>
          </div>
          <div className="h-4 bg-indigo-950/50 border border-indigo-900/50 rounded w-2/3"></div>
        </div>

        {/* Top Layer: Rendered High-Fidelity UI */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-br from-indigo-600 to-blue-600 p-4 flex flex-col justify-between text-white overflow-hidden shadow-2xl transition-all duration-75"
          style={{ width: `${sliderVal}%` }}
        >
          <div className="w-64">
            <div className="flex justify-between border-b border-white/20 pb-1 text-[10px] font-bold">
              <span>LIVE UI VIEW</span>
              <Sparkles size={12} className="text-cyan-300" />
            </div>
            <div className="grid grid-cols-2 gap-2 my-auto pt-4">
              <div className="h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xs shadow-xs">
                <span>Production</span>
              </div>
              <div className="h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xs shadow-xs">
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Handle visual indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderVal}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center">
            <span className="text-[8px] text-indigo-600 font-bold">⟷</span>
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
  const router = useRouter();
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
    <section id="services" className="relative w-full py-10 sm:py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-14 gap-4 sm:gap-5 min-w-0">
          <div className="max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] sm:text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2.5 sm:mb-3"
            >
              <Layers size={13} /> {badge}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-2"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-body font-normal max-w-xl text-xs sm:text-sm md:text-base"
            >
              {description}
            </motion.p>
          </div>

          <div className="shrink-0">
            <Link href="/services">
              <button 
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-50 border border-slate-300 hover:border-blue-600 text-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 min-w-0">
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
                  onClick={() => router.push(service.slug ? `/services/${service.slug}` : "/services")}
                  className={`group bg-slate-50/80 border border-slate-200/90 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:bg-white hover:border-blue-400 hover:shadow-xl min-w-0 cursor-pointer ${bentoClass}`}
                >
                  <div className="space-y-2.5 sm:space-y-3.5 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-blue-600 shadow-xs shrink-0">
                        <IconComponent size={20} />
                      </div>
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                        [0{idx + 1} / SERVICE]
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors truncate flex items-center justify-between">
                        <span>{service.title}</span>
                        <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed line-clamp-2 md:line-clamp-3">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 flex-1 flex items-end min-w-0" onClick={(e) => e.stopPropagation()}>
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