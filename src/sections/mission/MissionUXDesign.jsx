"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Sparkles, Zap, Smartphone, CheckCircle2 } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPrinciples = [
  { title: "Information Hierarchy", description: "Clean typographic scale ensuring users locate critical business data instantly without cognitive fatigue.", icon: "Sparkles" },
  { title: "Sub-100ms Feedback", description: "Instant micro-interactions, optimistic state updates, and buttery-smooth cubic-bezier transitions.", icon: "Zap" },
  { title: "Responsive Fluidity", description: "Pixel-perfect adaptation across mobile, tablet, laptop, and ultra-wide displays.", icon: "Smartphone" },
  { title: "Accessibility by Default", description: "High-contrast text ratios, semantic HTML5 hierarchy, and complete keyboard navigability.", icon: "CheckCircle2" }
];

const MissionUXDesign = ({ data = null }) => {
  const title = data?.title || "Design Built for Speed and Clarity";
  const description = data?.description || "Digital products must be intuitive, accessible, and blisteringly fast. Zero visual jitter, responsive fluid layouts, and sub-100ms interaction feedback.";
  const principles = data?.principles && data.principles.length > 0 ? data.principles : defaultPrinciples;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Sparkles size={12} /> Design Craftsmanship
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 UX Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {principles.map((pr, idx) => {
            const Icon = LucideIcons[pr.icon] || Sparkles;

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
                  ✓ UI STANDARD
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionUXDesign;
