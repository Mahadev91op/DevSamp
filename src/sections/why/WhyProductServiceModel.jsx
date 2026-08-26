"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Boxes, 
  Layers, 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const WhyProductServiceModel = ({ products = [], services = [] }) => {
  return (
    <section id="product-service-model" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
          >
            <Boxes size={13} /> Dual-Engine Strategy
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            The Compounding Advantage of Products + Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Most technology firms only build one-off client websites and disappear. Because DevSamp also builds, operates, and scales proprietary SaaS products, our clients benefit from battle-tested production architectures.
          </motion.p>
        </div>

        {/* Comparison Grid: Traditional vs DevSamp */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Traditional Agency Column */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/70">
                <h3 className="text-lg font-black text-slate-700">Traditional Agency</h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  Transactional
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Builds disposable projects from scratch, delivers fragile code, and moves on to the next client with zero long-term accountability.
              </p>

              <div className="space-y-3">
                {[
                  "One-off project handoff with no ongoing SLA",
                  "Unmaintainable code written by outsourced subcontractors",
                  "Requires costly complete rewrites when scaling",
                  "No shared SaaS infrastructure or proven components",
                  "High long-term maintenance costs and vendor lock-in"
                ].map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                    <X size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/70 text-xs font-mono text-slate-400">
              RESULT: HIGH TECHNICAL DEBT
            </div>
          </motion.div>

          {/* DevSamp Ecosystem Column */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="bg-white border-2 border-indigo-500/80 p-6 sm:p-8 rounded-3xl shadow-lg shadow-indigo-500/5 flex flex-col justify-between relative"
          >
            {/* Top Accent Badge */}
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-sm">
              DevSamp Standard
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-100">
                <h3 className="text-lg font-black text-slate-950">DevSamp Ecosystem</h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Compounding
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Builds on battle-tested SaaS cores with dedicated senior engineering pods, continuous cloud operations, and guaranteed production SLAs.
              </p>

              <div className="space-y-3">
                {[
                  "Dual engine: License proven SaaS or retain custom pod",
                  "100% in-house engineering by core software architects",
                  "Multi-tenant schemas designed to scale effortlessly",
                  "Reusable authentication, telemetry, and API gateways",
                  "100% client code ownership with zero proprietary lock-in"
                ].map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-bold">
                    <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-indigo-100 flex items-center justify-between text-xs font-mono text-indigo-700 font-bold">
              <span>RESULT: COMPOUNDING VALUE</span>
              <span>✓ VERIFIED</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default WhyProductServiceModel;
