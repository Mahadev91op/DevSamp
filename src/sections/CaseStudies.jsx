"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, ArrowUpRight, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

const CaseStudies = ({ initialCaseStudies = [], sectionData = null }) => {
  const caseStudies = Array.isArray(initialCaseStudies) ? initialCaseStudies : [];

  // If no verified case studies exist in DB, we hide or show clean configurable state
  if (caseStudies.length === 0) {
    return null;
  }

  const badge = sectionData?.badge || "Proven Impact";
  const title = sectionData?.title || "Customer Impact & Case Studies";
  const description = sectionData?.description || "Real-world engineering deliverables and measurable business outcomes powered by the DevSamp ecosystem.";

  return (
    <section id="case-studies" className="py-16 md:py-28 bg-transparent text-slate-900 relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5"
          >
            <Sparkles size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-3 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base font-semibold"
          >
            {description}
          </motion.p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study._id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white/90 border border-slate-200/80 hover:border-indigo-500/40 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 uppercase">
                    {study.industry}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{study.clientName}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                  {study.title}
                </h3>

                <div className="space-y-3 mb-6 text-xs">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">The Challenge</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">{study.problem}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">The Solution</span>
                    <p className="text-slate-600 font-medium leading-relaxed mt-0.5">{study.solution}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Outcome & Metrics</span>
                    <p className="text-slate-800 font-bold leading-relaxed mt-0.5">{study.outcome}</p>
                  </div>
                </div>

                {/* Metrics Badges */}
                {study.metrics && study.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                    {study.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-center">
                        <span className="text-base font-black font-mono text-indigo-600 block">{m.value}</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={study.link || "#contact"}
                  className="w-full py-2.5 rounded-xl bg-slate-950 text-white hover:bg-indigo-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
