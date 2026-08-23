"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const MissionEvidence = ({ data = [] }) => {
  const publicEvidence = (data || []).filter(item => item.public !== false);
  if (!publicEvidence || publicEvidence.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Activity size={12} /> Operational Metrics
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Verified Production Metrics
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Real production benchmarks validating our software delivery and availability standards.
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 min-w-0">
          {publicEvidence.map((ev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
              className="p-6 sm:p-8 bg-slate-50 border border-slate-200/90 rounded-3xl text-center space-y-2 hover:border-indigo-400 transition-all min-w-0"
            >
              <div className="text-3xl sm:text-4xl font-black font-mono text-indigo-600">
                {ev.value}
              </div>
              <div className="text-xs font-mono font-bold text-slate-950 uppercase tracking-wider">
                {ev.label}
              </div>
              <p className="text-slate-500 text-xs font-normal leading-relaxed pt-1">
                {ev.description}
              </p>
              {ev.source && (
                <div className="pt-2 text-[10px] font-mono text-slate-400">
                  SOURCE: {ev.source}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MissionEvidence;
