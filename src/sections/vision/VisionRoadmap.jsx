"use client";

import { motion } from "framer-motion";
import { Flag, Sparkles, CheckCircle2, Clock } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultRoadmap = [
  {
    title: "MedERP Pro Clinical Suite v2.0",
    category: "Product",
    timeframe: "Q2 2026",
    description: "Offline-first clinical synchronization, automated pharmacy billing, and diagnostic PACS integration.",
    status: "in-progress",
    public: true,
    order: 1
  },
  {
    title: "Universal Developer REST Gateway",
    category: "Developer",
    timeframe: "Q3 2026",
    description: "Public API portal with automated API key generation, rate limits, and webhook listeners.",
    status: "planned",
    public: true,
    order: 2
  },
  {
    title: "FlowPulse Multi-Branch Retail POS",
    category: "Product",
    timeframe: "Q4 2026",
    description: "Cloud POS with sub-50ms barcode scanning, thermal printing drivers, and multi-store inventory sync.",
    status: "planned",
    public: true,
    order: 3
  },
  {
    title: "Global Multi-Tenant Edge Mesh",
    category: "Platform",
    timeframe: "2027",
    description: "Decentralized read replicas and global session edge caching for sub-15ms worldwide latency.",
    status: "future",
    public: true,
    order: 4
  }
];

const VisionRoadmap = ({ data = [] }) => {
  const publicRoadmap = (data && data.length > 0 ? data : defaultRoadmap).filter(item => item.public !== false);

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
            <Flag size={12} /> Milestone Timeline
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Public Technical Roadmap
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Upcoming architectural releases, platform upgrades, and vertical product milestones.
          </p>
        </div>

        {/* 4 Roadmap Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {publicRoadmap.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 hover:border-purple-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 uppercase">
                    {item.timeframe}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border ${
                    item.status === "in-progress" 
                      ? "bg-amber-50 text-amber-700 border-amber-200" 
                      : item.status === "completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {item.status}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {item.category}
                </span>

                <h3 className="text-base font-black text-slate-950 mb-2 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono text-purple-700 font-bold">
                ✓ SCHEDULED RELEASE
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VisionRoadmap;
