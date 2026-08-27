"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  Search, 
  Layers, 
  Terminal, 
  Rocket, 
  RefreshCw, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const philosophyPillars = [
  {
    step: "01",
    title: "Understand",
    subtitle: "Deep Domain Discovery",
    desc: "We analyze your commercial model, user friction points, and bottlenecks before proposing technical architecture.",
    icon: Search,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Schema & Architecture Contracts",
    desc: "Strict type boundaries, database schema normalizations, and API endpoint contracts drafted prior to code execution.",
    icon: Compass,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    step: "03",
    title: "Design",
    subtitle: "60fps Fluid UI/UX Physics",
    desc: "Responsive design token systems with fluid typography, zero layout shift, and intuitive user navigation workflows.",
    icon: Layers,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    step: "04",
    title: "Engineer",
    subtitle: "High-Throughput Fullstack",
    desc: "Modular React 19 & Next.js App Router codebases paired with sub-10ms indexed MongoDB data pipelines.",
    icon: Terminal,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    step: "05",
    title: "Deploy",
    subtitle: "Edge CI/CD & Production Hardening",
    desc: "Automated regression pipelines, edge DNS routing, SSL certificates, and security penetration checks.",
    icon: Rocket,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    step: "06",
    title: "Improve",
    subtitle: "Continuous Optimization & SLA",
    desc: "Proactive database indexing, memory optimization, and quarterly roadmap scaling guarantees.",
    icon: RefreshCw,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const ServicesPhilosophy = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "ENGINEERING PHILOSOPHY";
  const title = data?.title || "Solving Real Business Friction Through Technical Rigor";
  const description = data?.description || "We treat custom client codebases with the same engineering discipline as our own SaaS platforms—guaranteeing 100% in-house craft and full IP ownership.";

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <Sparkles size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">{eyebrow}</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            {title}
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* 6-Pillar Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {philosophyPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50/70 border border-slate-200/80 hover:border-indigo-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${pillar.bg} ${pillar.border} border ${pillar.color} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      [{pillar.step} / PHASE]
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 tracking-tight mb-1">
                    {pillar.title}
                  </h3>
                  
                  <div className="text-xs font-bold text-indigo-600 mb-3">
                    {pillar.subtitle}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>ZERO TECHNICAL COMPROMISE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesPhilosophy;
