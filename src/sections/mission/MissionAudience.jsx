"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Users, Zap, Building2, Activity, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultAudiences = [
  {
    title: "Ambitious Startups",
    description: "Founders needing production-ready SaaS architectures, rapid iteration, and clean codebase foundations.",
    targetNeed: "Rapid MVP to SaaS Scale",
    icon: "Zap",
    badge: "VELOCITY",
    order: 1
  },
  {
    title: "Growing Businesses & Retail",
    description: "Multi-branch operators requiring automated billing, real-time inventory sync, and unified ERPs.",
    targetNeed: "Operational Automation",
    icon: "Building2",
    badge: "AUTOMATION",
    order: 2
  },
  {
    title: "Healthcare & Clinical Networks",
    description: "Hospitals and diagnostic labs demanding HIPAA-ready compliance, doctor workflows, and high security.",
    targetNeed: "Compliance & Availability",
    icon: "Activity",
    badge: "COMPLIANCE",
    order: 3
  },
  {
    title: "Enterprise Engineering Pods",
    description: "Companies seeking dedicated, in-house software architects to build custom high-complexity web platforms.",
    targetNeed: "Dedicated SLA Retainers",
    icon: "Users",
    badge: "DEDICATED PODS",
    order: 4
  }
];

const MissionAudience = ({ data = [] }) => {
  const audiences = data && data.length > 0 ? data : defaultAudiences;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Users size={12} /> Target Customers
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Who We Build For
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Partnering with founders, clinic directors, retail networks, and enterprise teams who value engineering excellence.
          </p>
        </div>

        {/* 4 Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {audiences.map((aud, idx) => {
            const Icon = LucideIcons[aud.icon] || Users;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {aud.badge || "PARTNER"}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    {aud.targetNeed}
                  </span>

                  <h3 className="text-base font-black text-slate-950 mb-2 truncate">
                    {aud.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {aud.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200/70">
                  <Link href="/#contact">
                    <button className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                      <span>Explore Scope</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MissionAudience;
