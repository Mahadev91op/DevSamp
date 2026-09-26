"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Code2, 
  TrendingUp,
  Sparkles,
  Workflow
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const valuePillars = [
  {
    icon: Layers,
    title: "Product-First DNA",
    description: "We don't just build client projects; we build and run SaaS products. That means our engineering conventions, security standards, and architectures are battle-tested in real production.",
    highlight: "SaaS Quality"
  },
  {
    icon: Cpu,
    title: "Scalable Multi-Tenant Core",
    description: "Engineered from day one with Next.js 15, optimized database indexing, and automated tenant isolation so your software can scale without re-architecture bottlenecks.",
    highlight: "Zero Bottlenecks"
  },
  {
    icon: Workflow,
    title: "Interconnected Ecosystem",
    description: "Every product and service connects seamlessly through standardized REST APIs, webhooks, and shared authentication protocols across the entire platform.",
    highlight: "Unified Stack"
  },
  {
    icon: ShieldCheck,
    title: "Production SLA & Dedicated Pod",
    description: "We provide ongoing SLA monitoring, automated security patch pipelines, and direct engineering access to guarantee uptime and reliability.",
    highlight: "Enterprise Support"
  }
];

const WhyDevSamp = ({ sectionData = null }) => {
  const badge = sectionData?.badge || "Value Matrix";
  const title = sectionData?.title || "Why High-Growth Teams Choose DevSamp";
  const description = sectionData?.description || "Combining the speed of modern product development with the precision of custom engineering to create compounding digital value.";

  return (
    <section id="why-devsamp" className="py-16 md:py-24 bg-white text-slate-900 border-b border-slate-200/60 relative overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Sparkles size={13} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* 4 Pillars Grid - 2 Column App-Like on Phone, 2 Column on Desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto min-w-0">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="group bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-500/40 p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 sm:mb-5">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100/60 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={16} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <span className="text-[9px] sm:text-xs font-mono font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs truncate">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-2xl font-black text-slate-900 mb-1.5 sm:mb-2.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-[11px] sm:text-base text-slate-600 font-normal leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-slate-200/70 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 font-bold">
                  <span className="hidden sm:inline">SPEC: VERIFIED</span>
                  <span className="text-indigo-600 font-bold">✓ VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyDevSamp;
