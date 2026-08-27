"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Terminal, 
  Layers,
  Sparkles,
  Zap
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const techStacks = [
  {
    category: "Frontend & Interface",
    icon: Code2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    techs: ["React 19", "Next.js 16 (App Router)", "Tailwind CSS v4", "Framer Motion", "TypeScript / Modern ES6+", "Lucide React"]
  },
  {
    category: "Backend & Concurrency",
    icon: Terminal,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    techs: ["Node.js (LTS)", "Next.js Route Handlers", "Express API Gateways", "RESTful Architecture", "JSON-LD & OpenGraph", "Worker Threads"]
  },
  {
    category: "Data Layer & Storage",
    icon: Database,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    techs: ["MongoDB Atlas", "Mongoose ORM", "Redis Memory Store", "Compound B-Tree Indexes", "Document Partitioning", "Automated Backups"]
  },
  {
    category: "Cloud, Edge & Security",
    icon: Cloud,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    techs: ["Vercel Edge Network", "AWS S3 / Cloudflare R2", "JWT Auth with Secure Cookies", "SSL / TLS 1.3", "CORS & Rate Limiting", "PWA Service Workers"]
  }
];

const ServicesTechLayer = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <Zap size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">STANDARDS & FRAMEWORKS</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Engineered on Proven Modern Technology Stacks
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            We avoid fragile experimental dependencies in production. Every service stack is built on battle-tested frameworks ensuring high concurrency, edge performance, and seamless maintainability.
          </p>
        </div>

        {/* 4-Column Tech Stacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStacks.map((stack, idx) => {
            const Icon = stack.icon;
            return (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-white border border-slate-200/80 hover:border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${stack.bg} ${stack.color} border border-slate-200/60 shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-950 tracking-tight mb-4">
                    {stack.category}
                  </h3>

                  <div className="space-y-2">
                    {stack.techs.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>DEPLOYED ON DEMAND</span>
                  <span className="text-emerald-600">✓ VERIFIED</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesTechLayer;
