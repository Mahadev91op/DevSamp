"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, ShieldCheck, Zap } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultOutcomes = [
  { metric: "10+", label: "CORE INDUSTRIES", desc: "Healthcare, retail, finance, supply chain, and education." },
  { metric: "<10ms", label: "GLOBAL EDGE LATENCY", desc: "Instantaneous state synchronization worldwide." },
  { metric: "100%", label: "IN-HOUSE PRECISION", desc: "No outsourced debt, zero compromised quality." }
];

const VisionFutureState = ({ data = null }) => {
  const title = data?.title || "The DevSamp 2035 Destination";
  const visionDestination = data?.visionDestination || "A global interconnected network of vertical SaaS platforms, engineering pods, and developer nodes operating with 99.99% uptime and zero friction.";
  const outcomes = data?.coreOutcomes && data.coreOutcomes.length > 0 ? data.coreOutcomes : defaultOutcomes;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container max-w-5xl">
        
        {/* Large Editorial Destination Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 md:p-12 shadow-xs text-center space-y-6 min-w-0"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest">
            <Sparkles size={12} /> Strategic Destination
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950 leading-tight">
            {title}
          </h2>

          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            &ldquo;{visionDestination}&rdquo;
          </p>

          {/* 3 Outcome Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-center min-w-0">
            {outcomes.map((out, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-mono text-purple-700">
                  {out.metric}
                </div>
                <div className="text-[11px] font-mono font-bold text-slate-950 uppercase tracking-wider">
                  {out.label}
                </div>
                <p className="text-slate-500 text-xs font-normal leading-tight pt-0.5">
                  {out.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VisionFutureState;
