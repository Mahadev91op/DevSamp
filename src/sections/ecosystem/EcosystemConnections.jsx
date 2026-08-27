"use client";

import { motion } from "framer-motion";
import { 
  GitBranch, 
  Sparkles, 
  Boxes, 
  Layers, 
  Cpu, 
  Users, 
  TrendingUp, 
  Workflow,
  ArrowRight,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const flywheelSteps = [
  {
    step: "01",
    label: "Customer Need",
    detail: "Businesses encounter scaling limits, manual fragmentation, or need a custom web platform.",
    icon: Users,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "02",
    label: "Product / Service Match",
    detail: "We evaluate whether a pre-built SaaS product fits or if a dedicated engineering pod is required.",
    icon: Boxes,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "03",
    label: "Shared Technology Stack",
    detail: "Implementation builds on our battle-tested Next.js 15, Auth, and Multi-tenant database foundation.",
    icon: Cpu,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "04",
    label: "Live Production Operation",
    detail: "Workload runs with automated CI/CD, telemetry monitors, and guaranteed SLA support.",
    icon: GitBranch,
    color: "from-indigo-600 to-blue-500"
  },
  {
    step: "05",
    label: "Telemetry & Feedback Loop",
    detail: "Performance telemetry and operational feedback inform core architectural upgrades.",
    icon: RefreshCw,
    color: "from-amber-600 to-orange-600"
  },
  {
    step: "06",
    label: "Compounding Capability",
    detail: "Upgrades roll back into the shared ecosystem, making every future deployment faster and more resilient.",
    icon: TrendingUp,
    color: "from-emerald-600 to-teal-600"
  }
];

const EcosystemConnections = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Ecosystem Flywheel";
  const title = data?.title || "How Every Component Connects & Compounds Value";
  const description = data?.description || "Customer feedback powers product innovation, custom engineering expands our shared technology base, and shared APIs accelerate every new client deployment.";

  return (
    <section id="connections" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
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
            <RefreshCw size={13} className="animate-spin-slow text-indigo-600" /> {eyebrow}
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

        {/* 6-Stage Flywheel Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flywheelSteps.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${node.color} shadow-xs shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs">
                      STEP {node.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {node.label}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {node.detail}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-mono text-slate-400 font-bold flex items-center justify-between">
                  <span>FLYWHEEL LINK</span>
                  <span className="text-indigo-600 font-bold">→ CONNECTED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemConnections;
