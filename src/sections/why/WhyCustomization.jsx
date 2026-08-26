"use client";

import { motion } from "framer-motion";
import { 
  Layers, 
  Sparkles, 
  Boxes, 
  Cpu, 
  Workflow, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const WhyCustomization = () => {
  return (
    <section id="customization" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Layers size={13} /> Modular Craft
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Customization Without Architectural Chaos
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Custom development does not mean rebuilding everything from zero. We combine our battle-tested SaaS infrastructure with tailored pods to ship 60% faster with zero fragility.
          </motion.p>
        </div>

        {/* 3 Step Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: Boxes,
              title: "1. Reusable Platform Core",
              desc: "Standardized authentication, database schema indexing, automated backups, and billing webhook relays.",
              tag: "SOLID BASELINE"
            },
            {
              icon: Cpu,
              title: "2. Tailored Business Logic",
              desc: "Dedicated engineering pods write custom clinical workflows, POS hardware scanners, or proprietary calculation engines.",
              tag: "CUSTOM SCOPE"
            },
            {
              icon: ShieldCheck,
              title: "3. Continuous SLA Operations",
              desc: "Automated regression testing, zero layout shift guarantees, and ongoing SLA retainers to ensure long-term stability.",
              tag: "24/7 SLA"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>ARCHITECTURE: CLEAN</span>
                  <span className="text-indigo-600 font-bold">✓ MAINTAINABLE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyCustomization;
