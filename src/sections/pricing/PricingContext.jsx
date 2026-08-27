"use client";

import { motion } from "framer-motion";
import { 
  Boxes, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  Receipt, 
  Clock, 
  Sparkles 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const PricingContext = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "COMMERCIAL FRAMEWORK";
  const title = data?.title || "How DevSamp Commercial Engagements Work";
  const description = data?.description || "We eliminate opaque agency billing with transparent, performance-guaranteed commercial structures. Whether licensing our SaaS cores or hiring dedicated engineering pods, every deliverable is bound to clear milestones and zero technical debt.";

  const pillars = [
    {
      icon: Boxes,
      title: "SaaS Software Products",
      tag: "TURNKEY PLATFORMS",
      desc: "Instant access to pre-built, production-hardened vertical platforms like MedERP Pro and FlowPulse POS with multi-tenant database isolation, regular updates, and cloud hosting.",
    },
    {
      icon: Layers,
      title: "Dedicated Engineering Pods",
      tag: "SPRINT RETAINERS",
      desc: "Full-stack engineering pods paired to your product roadmap. Ideal for custom platform builds, feature scaling, and continuous deployment with zero management overhead.",
    },
    {
      icon: Cpu,
      title: "Custom Solutions Architecture",
      tag: "FIXED MILESTONE",
      desc: "Fixed-price, milestone-governed custom builds. Architectural discovery, fullstack Next.js implementation, API gateways, and 30-day post-launch warranty.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white/50 border-b border-slate-200/60 relative overflow-hidden">
      
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <Receipt size={13} /> {eyebrow}
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 3 Core Commercial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: smoothEase }}
                className="bg-white border border-slate-200/80 rounded-3xl p-7 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                  <span className="text-blue-600">TRANSPARENT TERMS</span>
                  <span>100% IN-HOUSE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PricingContext;
