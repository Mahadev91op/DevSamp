"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { 
  Sparkles, 
  Workflow, 
  Cpu, 
  Boxes, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  CheckCircle2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPillars = [
  {
    pillarId: "01",
    title: "Ecosystem Thinking",
    eyebrow: "CONNECTED CAPABILITIES",
    shortDescription: "Structured around connected software products, dedicated pods, and platform APIs rather than isolated, disposable client projects.",
    icon: "Workflow",
    color: "from-blue-600 to-indigo-600"
  },
  {
    pillarId: "02",
    title: "Engineering First",
    eyebrow: "ARCHITECTURAL RIGOR",
    shortDescription: "Solutions are designed from day one around clean database schemas, sub-10ms query indexes, strict RBAC, and zero architectural debt.",
    icon: "Cpu",
    color: "from-indigo-600 to-purple-600"
  },
  {
    pillarId: "03",
    title: "Product Mindset",
    eyebrow: "LONG-TERM VALUE",
    shortDescription: "Technology is treated as an appreciating business asset that must generate measurable operational ROI, not merely check a launch box.",
    icon: "Boxes",
    color: "from-purple-600 to-pink-600"
  },
  {
    pillarId: "04",
    title: "Business Awareness",
    eyebrow: "OUTCOME-DRIVEN",
    shortDescription: "We evaluate every line of code against actual business goals—reducing operational friction, preventing outages, and enabling scale.",
    icon: "TrendingUp",
    color: "from-pink-600 to-rose-600"
  },
  {
    pillarId: "05",
    title: "Long-Term Thinking",
    eyebrow: "SUSTAINABILITY",
    shortDescription: "We build systems that can evolve smoothly for years without forcing costly total rewrites when your business experiences 10x growth.",
    icon: "ShieldCheck",
    color: "from-amber-600 to-orange-600"
  },
  {
    pillarId: "06",
    title: "Reusable Technology",
    eyebrow: "MAXIMUM EFFICIENCY",
    shortDescription: "Leveraging battle-tested auth gateways, billing webhooks, and UI foundations allows our pods to ship bespoke platforms 60% faster.",
    icon: "Layers",
    color: "from-emerald-600 to-teal-600"
  }
];

const WhyDifferentiation = ({ data = [] }) => {
  const pillars = data && data.length > 0 ? data : defaultPillars;

  return (
    <section id="differentiation" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <Sparkles size={13} /> Core Differentiation
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            What Fundamentally Sets DevSamp Apart
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            We are not a disposable freelance team or a generic IT outsourcer. Here are the six pillars that define our technology company.
          </motion.p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = LucideIcons[pillar.icon] || ShieldCheck;

            return (
              <motion.div
                key={pillar.pillarId || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.07 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      [PILLAR 0{idx + 1}]
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                    {pillar.eyebrow}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {pillar.shortDescription || pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>STANDARD: ACTIVE</span>
                  <span className="text-indigo-600 font-bold">✓ 100% IN-HOUSE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyDifferentiation;
