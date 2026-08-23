"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, Layers, Database, Globe, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultStages = [
  { stage: "STAGE 01", title: "Clean Modular Monolith", description: "Maintainable schema structures with zero circular dependencies or microservice sprawl." },
  { stage: "STAGE 02", title: "Compound Database Indexing", description: "Sub-10ms query execution across 10M+ documents with tenant-keyed index trees." },
  { stage: "STAGE 03", title: "Global Multi-Tenant Edge Mesh", description: "Decentralized read replicas and edge caching for sub-15ms worldwide response times." }
];

const stageIcons = [Layers, Database, Globe];

const MissionScalability = ({ data = null }) => {
  const title = data?.title || "Architected for Exponential Growth";
  const description = data?.description || "How our multi-tenant schemas, cached database indexes, and edge routing scale effortlessly without requiring costly rewrites.";
  const stages = data?.stages && data.stages.length > 0 ? data.stages : defaultStages;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <TrendingUp size={12} /> Architectural Scale
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 3 Horizontal Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
          {stages.map((st, idx) => {
            const Icon = stageIcons[idx] || Layers;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                      {st.stage}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                    {st.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>SCALE VECTOR</span>
                  <span className="text-indigo-700">✓ COMPOUNDING</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionScalability;
