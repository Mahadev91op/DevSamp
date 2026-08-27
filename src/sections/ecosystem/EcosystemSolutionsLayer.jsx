"use client";

import { motion } from "framer-motion";
import { 
  Workflow, 
  Search, 
  Code2, 
  Boxes, 
  Rocket, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const solutionSteps = [
  {
    step: "01",
    title: "Operational Discovery",
    desc: "We analyze your existing business bottlenecks, manual spreadsheets, or fractured agency codebases to establish clear technical requirements.",
    icon: Search,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "02",
    title: "Architectural Blueprint",
    desc: "We map your workflow to either our existing SaaS products (e.g. MedERP Pro, FlowPulse) or design a dedicated custom pod solution.",
    icon: Code2,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "03",
    title: "Ecosystem Deployment",
    desc: "We provision private database schemas, configure multi-tenant auth, set up webhooks, and integrate with payment or cloud providers.",
    icon: Boxes,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "04",
    title: "Continuous Maintenance & SLA",
    desc: "Your system runs with 24/7 telemetry monitoring, automated security patch updates, and ongoing direct access to our core architects.",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-600"
  }
];

const EcosystemSolutionsLayer = () => {
  return (
    <section id="solutions-layer" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3"
          >
            <Workflow size={13} /> Layer 04 • Solutions
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Turning Technology into Compounding Business Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Products, services, and cloud protocols converge into real-world business solutions that optimize operations, increase revenue throughput, and eliminate tech friction.
          </motion.p>
        </div>

        {/* 4-Step Solution Delivery Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-sky-400 p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
                      PHASE {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 text-xs font-mono text-slate-400 font-bold flex items-center justify-between">
                  <span>OUTCOME VERIFIED</span>
                  <span className="text-emerald-600 font-bold">✓ READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemSolutionsLayer;
