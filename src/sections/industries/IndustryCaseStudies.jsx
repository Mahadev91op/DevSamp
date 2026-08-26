"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Briefcase, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  Activity
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryCaseStudies = ({ caseStudies = [] }) => {
  if (!caseStudies.length) return null;

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
            <Briefcase size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">PROVEN IMPACT</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Real Customer Impact by Sector
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Verified case studies illustrating how DevSamp software platforms and engineering pods solve domain friction.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={cs._id || idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
              className="bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono font-bold">
                    {cs.industry || "Case Study"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    VERIFIED
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {cs.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {cs.summary || cs.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  href="/#case-studies"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors group/link"
                >
                  <span>Read Full Study</span>
                  <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustryCaseStudies;
