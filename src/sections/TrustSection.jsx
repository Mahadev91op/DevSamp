"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Activity, 
  RefreshCw, 
  Headphones,
  Sparkles
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const trustPillars = [
  {
    icon: Lock,
    title: "Data Privacy & RBAC",
    description: "Multi-layered role-based access control with secure HTTP-only session tokens and isolated database indexing.",
    badge: "Access Security"
  },
  {
    icon: Server,
    title: "High-Availability Edge Mesh",
    description: "Global edge CDN deployment on Vercel and AWS nodes with automated failover and sub-50ms regional response times.",
    badge: "Uptime 99.9%"
  },
  {
    icon: RefreshCw,
    title: "Automated Build CI/CD",
    description: "Strict automated linting, schema validation, and zero-downtime deployment pipelines for every release.",
    badge: "CI/CD Pipeline"
  },
  {
    icon: Headphones,
    title: "Dedicated SLA Maintenance",
    description: "Direct engineering escalation, regular security dependency patching, and continuous performance telemetry.",
    badge: "Engineering Pod"
  }
];

const TrustSection = ({ sectionData = null }) => {
  const badge = sectionData?.badge || "Trust & Reliability";
  const title = sectionData?.title || "Engineered for Security, Speed & Reliability";
  const description = sectionData?.description || "Technical rigor and infrastructure guarantees built directly into our software products and custom deployments.";

  return (
    <section id="trust" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3"
          >
            <ShieldCheck size={13} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-2.5 tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-body font-normal"
          >
            {description}
          </motion.p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 min-w-0">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="group bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-emerald-500/40 p-6 md:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors truncate">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm font-normal leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold">
                  <span>GUARANTEE</span>
                  <span className="text-emerald-600 font-extrabold">✓ ENFORCED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
