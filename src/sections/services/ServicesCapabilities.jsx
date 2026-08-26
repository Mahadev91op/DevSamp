"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Workflow, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Database, 
  Code2, 
  Boxes 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const capabilityDomains = [
  {
    title: "1. Strategy & Architecture",
    tagline: "Foundational System Blueprints",
    desc: "Domain-driven modeling, microservices boundaries, database partitioning plans, and security compliance roadmaps.",
    icon: Workflow,
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: ["Microservices topology", "Database normalization", "API schema contracts", "Zero-trust auth flow"]
  },
  {
    title: "2. UI/UX & Physics Engineering",
    tagline: "60fps Fluid Interfaces",
    desc: "Deterministic design tokens, accessibility auditing, fluid typography engines, and spring physics micro-interactions.",
    icon: Sparkles,
    color: "text-purple-600",
    bg: "bg-purple-50",
    items: ["Tailwind CSS v4 tokens", "Framer Motion physics", "WCAG 2.1 AA compliant", "0.00 CLS guaranteed"]
  },
  {
    title: "3. Full-Stack Web Platforms",
    tagline: "Modern React 19 & Next.js",
    desc: "Server-side streaming, Incremental Static Regeneration (ISR), optimized client bundles, and SEO markup.",
    icon: Code2,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    items: ["Next.js App Router", "Server actions & streaming", "Edge rendering nodes", "PWA offline caching"]
  },
  {
    title: "4. High-Concurrency Backend",
    tagline: "Sub-10ms Data Pipelines",
    desc: "Compound MongoDB indexing, transactional data integrity, Redis caching layers, and decoupled event messaging.",
    icon: Database,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    items: ["Compound B-tree indexes", "Aggregation pipelines", "WebSocket sync meshes", "Rate limit gateways"]
  },
  {
    title: "5. API & Ecosystem Gateways",
    tagline: "Universal Interoperability",
    desc: "Type-safe RESTful API gateways, webhook dispatchers, OAuth 2.0 / JWT security, and 3rd-party SaaS connectors.",
    icon: Boxes,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    items: ["REST & Webhooks", "OAuth2 & JWT auth", "Payment gateways (Stripe)", "Custom ERP bridges"]
  },
  {
    title: "6. Cloud Ops & SLA Retainers",
    tagline: "24/7 Production Resilience",
    desc: "Automated CI/CD workflows, edge CDN caching, real-time error telemetry, and performance profiling.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    items: ["CI/CD automated pipelines", "Zero-downtime deploys", "Synthetic uptime probes", "24/7 SLA monitoring"]
  },
];

const ServicesCapabilities = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <Cpu size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">TECHNICAL SCOPE</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Comprehensive Capability Overview
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            From low-level data structure design to world-class user experience engineering, here is the full spectrum of our technology capabilities.
          </p>
        </div>

        {/* 6-Grid Capabilities Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {capabilityDomains.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.06 }}
                className="bg-slate-50/70 border border-slate-200/80 hover:border-indigo-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${cap.bg} border border-slate-200/60 ${cap.color} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 tracking-tight mb-1">
                    {cap.title}
                  </h3>

                  <div className="text-xs font-bold text-indigo-600 mb-3">
                    {cap.tagline}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 space-y-1.5">
                  {cap.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesCapabilities;
