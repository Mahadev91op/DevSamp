"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Boxes, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Activity 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ProductCapabilities = ({ products = [] }) => {
  // Aggregate all unique capabilities dynamically from real product models
  const aggregatedCapabilities = useMemo(() => {
    const caps = new Set();
    products.forEach((p) => {
      if (Array.isArray(p.capabilities)) {
        p.capabilities.forEach((c) => caps.add(c));
      }
    });
    return Array.from(caps);
  }, [products]);

  if (aggregatedCapabilities.length === 0) {
    return null;
  }

  return (
    <section id="capabilities" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
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
            <Cpu size={13} /> Capability Layer
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Operational Capabilities Across Our Platforms
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Derived directly from our live software systems, these modules power automation, enterprise security, and multi-tenant billing.
          </motion.p>
        </div>

        {/* Dynamic Capabilities Pill Cloud */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {aggregatedCapabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: smoothEase, delay: (idx % 12) * 0.04 }}
              className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 text-xs font-bold text-slate-800 shadow-2xs hover:shadow-sm transition-all flex items-center gap-2"
            >
              <CheckCircle2 size={14} className="text-blue-600" />
              <span>{cap}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductCapabilities;
