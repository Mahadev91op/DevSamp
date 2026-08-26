"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Workflow, 
  Sparkles, 
  Boxes, 
  Layers, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  Zap,
  ShieldCheck 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const engagementPaths = [
  {
    title: "1. License a Software Product",
    target: "Direct Operational Deployment",
    badge: "FASTEST DEPLOYMENT",
    description: "Adopt an existing flagship SaaS platform (e.g. MedERP Pro or FlowPulse POS) deployed to your private subdomain with standard SLA.",
    icon: Boxes,
    color: "from-blue-600 to-cyan-500",
    features: ["Instant Tenant Provisioning", "Pre-Built Regulatory Workflows", "Automated Daily Backups", "SaaS Subscription Pricing"],
    ctaText: "Explore Products",
    ctaLink: "/products"
  },
  {
    title: "2. Commission a Custom Pod",
    target: "Bespoke High-Scale Platforms",
    badge: "CUSTOM SPECIFICATION",
    description: "Pair directly with a dedicated fullstack engineering pod to build custom web applications, internal dashboards, and scalable APIs.",
    icon: Layers,
    color: "from-indigo-600 to-purple-600",
    features: ["Direct Architect Pairing", "100% Custom Scope", "Source Code Ownership", "Milestone-Based Delivery"],
    ctaText: "Request Pod Scope",
    ctaLink: "/services"
  },
  {
    title: "3. Hybrid: License + Custom Extension",
    target: "Enterprise Adaptation",
    badge: "MOST POPULAR",
    description: "Start from a battle-tested DevSamp SaaS core and retain our pod to build specialized custom modules, private APIs, and bespoke integrations.",
    icon: Zap,
    color: "from-purple-600 to-pink-500",
    features: ["60% Faster Time-to-Market", "Custom Industry Extensions", "Dedicated Support Retainer", "Enterprise SLA Agreement"],
    ctaText: "Configure Enterprise Solution",
    ctaLink: "/#contact"
  },
  {
    title: "4. Developer API Integration",
    target: "Third-Party & Internal Dev Teams",
    badge: "DEVELOPER FIRST",
    description: "Integrate with our open REST APIs, trigger event webhooks, and utilize our type-safe SDK packages within your existing codebase.",
    icon: Terminal,
    color: "from-emerald-600 to-teal-500",
    features: ["OpenAPI 3.1 Documentation", "Real-Time Webhook Relays", "Node & Python Client SDKs", "Developer Sandboxes"],
    ctaText: "Inspect Developer Gateway",
    ctaLink: "#developer-layer"
  }
];

const EcosystemFlow = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Engagement Paths";
  const title = data?.title || "Flexible Ways to Engage With the DevSamp Ecosystem";
  const description = data?.description || "Whether you need an off-the-shelf vertical SaaS platform, a dedicated engineering pod, or a hybrid enterprise solution, our ecosystem adapts to your growth stage.";

  return (
    <section id="flow" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
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
            <Workflow size={13} /> {eyebrow}
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

        {/* 4 Flexible Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {engagementPaths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${path.color} shadow-xs shrink-0`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 uppercase shadow-2xs">
                      {path.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1">
                    {path.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider block mb-3">
                    {path.target}
                  </span>

                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    {path.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-3.5 border-t border-slate-200/70 mb-6">
                    {path.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <CheckCircle2 size={13} className="text-indigo-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70">
                  <Link href={path.ctaLink}>
                    <button className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer">
                      <span>{path.ctaText}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

export default EcosystemFlow;
