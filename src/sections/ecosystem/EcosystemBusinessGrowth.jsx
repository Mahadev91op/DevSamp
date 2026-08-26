"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Sparkles, 
  Rocket, 
  Activity, 
  Workflow, 
  ShieldCheck, 
  Maximize2,
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const growthStages = [
  {
    stage: "01",
    title: "Phase 1 • Initial Deployment",
    desc: "Rapid deployment of standard SaaS products (MedERP, FlowPulse) or initial custom MVP within weeks.",
    benefit: "Zero Technical Debt & Rapid Time-to-Market"
  },
  {
    stage: "02",
    title: "Phase 2 • Operational Integration",
    desc: "Deep integration with third-party payment gateways, accounting tools, and automated staff workflows.",
    benefit: "Elimination of Manual Friction"
  },
  {
    stage: "03",
    title: "Phase 3 • Telemetry & SLA Retention",
    desc: "24/7 edge health monitoring, automated security patches, and performance optimizations under load.",
    benefit: "Guaranteed 99.9% Uptime & Stability"
  },
  {
    stage: "04",
    title: "Phase 4 • Enterprise Scaling & Pod Expansion",
    desc: "Commissioning specialized microservice features, private APIs, and multi-branch rollouts as your business scales.",
    benefit: "Compounding Software Asset Value"
  }
];

const EcosystemBusinessGrowth = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Long-Term Value";
  const title = data?.title || "An Ecosystem That Compounds With Your Growth";
  const description = data?.description || "From initial product deployment to multi-tenant scaling and custom feature development, DevSamp stays embedded as your long-term engineering partner.";

  return (
    <section id="growth" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <TrendingUp size={13} /> {eyebrow}
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

        {/* 4-Stage Lifecycle Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {growthStages.map((stg, idx) => (
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
                    STAGE {stg.stage}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2">
                  {stg.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                  {stg.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/70">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Strategic Value
                </span>
                <p className="text-xs font-bold text-emerald-700">
                  ✓ {stg.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EcosystemBusinessGrowth;
