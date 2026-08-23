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
    <section id="trust" className="py-16 md:py-28 bg-transparent text-slate-900 relative overflow-hidden">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-3.5"
          >
            <ShieldCheck size={12} /> {badge}
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

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white/85 border border-slate-200/80 hover:border-emerald-500/40 p-6 md:p-7 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-600 uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-black text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>GUARANTEE</span>
                  <span className="text-emerald-600">✓ ENFORCED</span>
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
