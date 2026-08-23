"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Cpu, Database, Layers, Sparkles, Terminal } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPillars = [
  {
    title: "Next.js & React Core",
    description: "The industry standard for server-rendered web applications, optimal SEO indexing, and hybrid streaming architectures.",
    icon: "Cpu"
  },
  {
    title: "MongoDB Atlas & Node.js",
    description: "Battle-tested document storage with optimized index trees, aggregations, and resilient multi-tenant scaling.",
    icon: "Database"
  },
  {
    title: "Tailwind CSS Design System",
    description: "Utility-first design tokens ensuring micro-precision layout consistency, responsive fluid typography, and zero dead CSS payload.",
    icon: "Layers"
  },
  {
    title: "Framer Motion Physics",
    description: "GPU-accelerated cubic-bezier and spring physics that enrich user experience with buttery-smooth 60fps transitions.",
    icon: "Sparkles"
  }
];

const AboutTechApproach = ({ data = null }) => {
  const title = data?.title || "Our Approach to Technology Selection";
  const description = data?.description || "We don't chase transient framework trends. We carefully evaluate tools on production stability, long-term maintainability, developer speed, and runtime performance.";
  const pillars = data?.pillars && data.pillars.length > 0 ? data.pillars : defaultPillars;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Terminal size={12} /> Technology Strategy
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {pillars.map((pil, idx) => {
            const Icon = LucideIcons[pil.icon] || Cpu;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1.5 truncate">
                    {pil.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {pil.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>STACK LEVEL</span>
                  <span className="text-indigo-600">CORE FOUNDATION</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutTechApproach;
