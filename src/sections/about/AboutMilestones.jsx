"use client";

import { motion } from "framer-motion";
import { Flag, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultMilestones = [
  {
    year: "2023",
    title: "DevSamp Inception",
    description: "Founded as an agile technology engineering company delivering high-complexity web platforms.",
    badge: "Foundation"
  },
  {
    year: "2024",
    title: "MedERP Pro Launch",
    description: "Released first flagship vertical SaaS for hospital, diagnostic lab, and clinical management.",
    badge: "Flagship SaaS"
  },
  {
    year: "2025",
    title: "Ecosystem Architecture",
    description: "Unified multi-tenant foundations, developer SDKs, telemetry mesh, and REST gateway.",
    badge: "Ecosystem"
  },
  {
    year: "2026",
    title: "Global Scaling & Multi-Product Mesh",
    description: "Serving high-growth businesses and scaling the connected software platform globally.",
    badge: "Scale"
  }
];

const AboutMilestones = ({ data = [] }) => {
  const milestones = data && data.length > 0 ? data : defaultMilestones;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Flag size={12} /> Trajectory
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Key Architectural & Product Milestones
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The major checkpoints marking our progression from custom engineering to an interconnected ecosystem.
          </p>
        </div>

        {/* 4 Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono font-black text-indigo-600">
                    {m.year}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                    {m.badge || `STEP 0${idx + 1}`}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1.5 truncate">
                  {m.title}
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  {m.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono text-emerald-600 font-bold">
                ✓ MILESTONE ACHIEVED
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutMilestones;
