"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Workflow, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Sparkles 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const deliverySteps = [
  {
    num: "01",
    title: "Domain Discovery Call",
    desc: "30-minute deep dive into your operational workflows, legacy software debt, and integration endpoints under NDA.",
    icon: Users,
  },
  {
    num: "02",
    title: "Architectural Blueprint Proposal",
    desc: "Clear system schema diagrams, API contracts, fixed milestones, and SLA guarantees delivered within 24 to 48 hours.",
    icon: Workflow,
  },
  {
    num: "03",
    title: "Dedicated Pod Sprint Execution",
    desc: "Senior fullstack engineers assigned with bi-weekly sprint reviews, direct communication channels, and live staging demos.",
    icon: Cpu,
  },
  {
    num: "04",
    title: "Production Cutover & SLA Guard",
    desc: "Seamless zero-downtime deployment, staff onboarding, full IP code handover, and 24/7 reliability monitoring.",
    icon: ShieldCheck,
  },
];

const IndustryDeliveryApproach = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "DOMAIN DELIVERY";
  const title = data?.title || "Enterprise Delivery Grounded in Industry Reality";
  const description = data?.description || "From legacy database refactoring to real-time telemetry streaming and dedicated 24/7 SLA governance.";

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
            <Users size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">{eyebrow}</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            {title}
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-105 transition-transform shadow-xs">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      STEP {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-950 tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span>TRANSPARENT SPRINT</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustryDeliveryApproach;
