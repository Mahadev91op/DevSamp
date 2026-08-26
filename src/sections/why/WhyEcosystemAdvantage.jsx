"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Boxes, 
  Layers, 
  Cpu, 
  Users, 
  TrendingUp, 
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const lifecycleSteps = [
  {
    step: "01",
    title: "Operational Need",
    desc: "We analyze your exact bottlenecks, workflows, and goals.",
    icon: Users,
    color: "from-blue-600 to-indigo-600"
  },
  {
    step: "02",
    title: "Product / Pod Match",
    desc: "Deploy existing SaaS or commission a dedicated pod.",
    icon: Boxes,
    color: "from-indigo-600 to-purple-600"
  },
  {
    step: "03",
    title: "Platform Engineering",
    desc: "Built on Next.js 15, sub-10ms DB indexes, and RBAC.",
    icon: Cpu,
    color: "from-purple-600 to-pink-600"
  },
  {
    step: "04",
    title: "Production SLA",
    desc: "24/7 telemetry monitoring and automated security patches.",
    icon: Workflow,
    color: "from-pink-600 to-rose-600"
  },
  {
    step: "05",
    title: "Compounding Growth",
    desc: "Upgrades roll back to keep your software modern for years.",
    icon: TrendingUp,
    color: "from-emerald-600 to-teal-600"
  }
];

const WhyEcosystemAdvantage = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Ecosystem Advantage";
  const title = data?.title || "How All Capabilities Converge for Your Business";
  const description = data?.description || "You never have to manage fractured freelancers or isolated agencies. Products, custom pods, platform APIs, and continuous cloud ops work as one unified engine.";

  return (
    <section id="ecosystem-advantage" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 min-w-0">
          <div className="max-w-2xl min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
            >
              <Workflow size={13} /> {eyebrow}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950 mb-3"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal"
            >
              {description}
            </motion.p>
          </div>

          <div className="shrink-0">
            <Link href="/ecosystem">
              <button 
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                data-cursor="Ecosystem"
              >
                <span>Explore Ecosystem Architecture</span>
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>

        {/* 5-Step Lifecycle Progression Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {lifecycleSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-5 sm:p-6 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs shrink-0`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      0{idx + 1}
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
                  <span>STAGE {item.step}</span>
                  <span className="text-indigo-600">✓ SYNC</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyEcosystemAdvantage;
