"use client";

import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Search, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Workflow 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultStages = [
  {
    stage: "01",
    label: "FRICTION",
    title: "Operational Discovery",
    desc: "We analyze high-friction business bottlenecks in healthcare, retail billing, and workflow orchestration.",
    icon: Lightbulb,
    color: "from-blue-600 to-cyan-500"
  },
  {
    stage: "02",
    label: "ARCHITECT",
    title: "Modular Schema Design",
    desc: "We engineer strict multi-tenant database models, sub-10ms query indexes, and clean OpenAPI contracts.",
    icon: Search,
    color: "from-blue-600 to-indigo-600"
  },
  {
    stage: "03",
    label: "BUILD",
    title: "Disciplined Engineering",
    desc: "Built with Next.js 15, React 19, PBKDF2 hashing, and isolated tenant routing by senior architects.",
    icon: Code2,
    color: "from-blue-600 to-indigo-600"
  },
  {
    stage: "04",
    label: "BETA & LIVE",
    title: "Production Deployment",
    desc: "Rigorous load testing, security auditing, and automated regression suites prior to live release.",
    icon: CheckCircle2,
    color: "from-indigo-600 to-blue-500"
  },
  {
    stage: "05",
    label: "COMPOUND",
    title: "Continuous SLA Upgrades",
    desc: "Real telemetry and usage feedback roll continuous performance patches back to all active deployments.",
    icon: RefreshCw,
    color: "from-emerald-600 to-teal-600"
  }
];

const ProductLifecycle = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Product Engineering Philosophy";
  const title = data?.title || "From Real Business Friction to Live Production SaaS";
  const description = data?.description || "How we identify operational bottlenecks, design multi-tenant architectures, test in live environments, and roll continuous updates back to all users.";

  return (
    <section id="lifecycle" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
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
            <Workflow size={13} /> {eyebrow}
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

        {/* 5-Step Lifecycle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {defaultStages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-white border border-slate-200/90 hover:border-blue-400 p-5 sm:p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
                  <span>STAGE {item.stage}</span>
                  <span className="text-blue-600">✓ STANDARD</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductLifecycle;
