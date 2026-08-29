"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Activity, Users, ArrowUpRight, Cpu } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function CustomerContext({ data = null }) {
  const eyebrow = data?.eyebrow || "COLLABORATION FOUNDATIONS";
  const title = data?.title || "Direct Architect Access. 100% In-House Craft. Long-Term Commitment.";
  const description = data?.description || "We treat customer relationships as strategic engineering partnerships rather than one-off transactional handoffs. Every software deployment is backed by transparent communication, audited codebases, and dedicated SLA support.";

  const principles = data?.principles && data.principles.length > 0 ? data.principles : [
    {
      title: "Zero Subcontracting",
      description: "Every line of code, API gateway, and database schema is designed and maintained by our dedicated in-house engineering pods.",
      icon: ShieldCheck,
    },
    {
      title: "Full IP Ownership",
      description: "Customers retain 100% intellectual property ownership of their custom software platforms, schema models, and digital assets.",
      icon: Lock,
    },
    {
      title: "Long-Term SLA Governance",
      description: "Continuous performance audits, automated telemetry monitoring, security patch pipelines, and direct senior architect escalations.",
      icon: Activity,
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-slate-50/50 border-b border-slate-200/60 overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider shadow-2xs"
          >
            <Users size={12} className="text-blue-600" />
            <span>{eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* 3 Foundation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((item, idx) => {
            const Icon = typeof item.icon === "function" ? item.icon : ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Standard #{idx + 1}</span>
                  <span className="text-blue-600 font-bold">Verified In-House</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
