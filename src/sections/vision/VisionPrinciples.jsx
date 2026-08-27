"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Compass, Code2, Target, Zap, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPrinciples = [
  {
    title: "Think in Decades, Build for Tomorrow",
    description: "We make architectural decisions that compound in value over 10+ years rather than taking quick shortcuts.",
    icon: "Compass",
    order: 1
  },
  {
    title: "Radical Simplicity Over Complexity",
    description: "The best systems are readable, modular, and easy to maintain by any senior software engineer.",
    icon: "Code2",
    order: 2
  },
  {
    title: "Build What Solves Real Operational Pain",
    description: "We don't build vaporware or speculative toys. Every tool solves genuine business bottlenecks.",
    icon: "Target",
    order: 3
  },
  {
    title: "Uncompromising Quality & 60fps Speed",
    description: "Every pixel, database query, and animation must be tuned for instantaneous, butter-smooth execution.",
    icon: "Zap",
    order: 4
  }
];

const VisionPrinciples = ({ data = [] }) => {
  const principles = data && data.length > 0 ? data : defaultPrinciples;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Compass size={12} /> Guiding Philosophy
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Principles Guiding Our Future
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The core convictions that will govern our technical investments and operational roadmap over the next 15 years.
          </p>
        </div>

        {/* 4 Guiding Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {principles.map((pr, idx) => {
            const Icon = LucideIcons[pr.icon] || Compass;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {pr.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {pr.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-indigo-700 font-bold">
                  FUTURE COMPASS
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionPrinciples;
