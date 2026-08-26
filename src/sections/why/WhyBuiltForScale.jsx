"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Database, 
  Cpu, 
  Workflow, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const scalePillars = [
  {
    stage: "01",
    title: "Modular Schema Architecture",
    description: "Component and database models are decoupled into clean domain modules, preventing spaghetti dependencies as features expand.",
    benefit: "Zero Dependency Tangling"
  },
  {
    stage: "02",
    title: "Tenant Schema Isolation",
    description: "Multi-tenant routing isolates customer data structures, allowing individual tenants to scale without impacting overall platform throughput.",
    benefit: "Predictable Concurrency"
  },
  {
    stage: "03",
    title: "Optimized Compound Indexing",
    description: "Database collections are indexed for high-volume read/write query patterns, maintaining sub-10ms latency under 10x traffic growth.",
    benefit: "Zero Query Bottlenecks"
  },
  {
    stage: "04",
    title: "Edge-Ready Micro-Gateways",
    description: "Stateless API routes and distributed serverless endpoints handle dynamic requests close to global users.",
    benefit: "Global Edge SLA"
  }
];

const WhyBuiltForScale = () => {
  return (
    <section id="built-for-scale" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3"
          >
            <TrendingUp size={13} /> Scalable Foundations
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Designed to Scale Without Costly Rewrites
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            We don&apos;t promise magical &quot;infinite scalability&quot;—we build honest, disciplined software architectures designed to handle 10x traffic expansion cleanly.
          </motion.p>
        </div>

        {/* 4 Scale Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scalePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
              className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-emerald-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-black text-slate-900 font-mono">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    TIER {pillar.stage}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/70">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Architectural Benefit
                </span>
                <p className="text-xs font-bold text-emerald-700">
                  ✓ {pillar.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyBuiltForScale;
