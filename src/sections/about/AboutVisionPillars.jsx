"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Compass, Boxes, Layers, Terminal, Workflow, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPillars = [
  {
    title: "Software Products",
    description: "Vertical SaaS applications engineered for specific industry domains with multi-tenant isolation.",
    icon: "Boxes",
    badge: "Core Asset"
  },
  {
    title: "Bespoke Engineering Pods",
    description: "Dedicated development squads tackling high-complexity architectures and custom client platforms.",
    icon: "Layers",
    badge: "Custom Scope"
  },
  {
    title: "Developer Gateway & SDKs",
    description: "Universal REST APIs, webhooks, and type-safe boilerplates to empower internal and third-party devs.",
    icon: "Terminal",
    badge: "Extensibility"
  },
  {
    title: "Interconnected Ecosystem Mesh",
    description: "Cross-product telemetry, shared authentication, and standardized data exchange pipelines.",
    icon: "Workflow",
    badge: "Unified Protocol"
  }
];

const AboutVisionPillars = ({ data = [] }) => {
  const pillars = data && data.length > 0 ? data : defaultPillars;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Compass size={12} /> Strategic Direction
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Four Strategic Pillars of Long-Term Growth
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The foundational architecture shaping every product, engagement, and technological initiative we pursue.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-0">
          {pillars.map((pillar, idx) => {
            const Icon = LucideIcons[pillar.icon] || Boxes;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="group bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 md:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                      {pillar.badge || `PILLAR 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors truncate">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold">
                  <span>STRATEGY: ENFORCED</span>
                  <span className="text-indigo-600">✓ COMPOUNDING</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutVisionPillars;
