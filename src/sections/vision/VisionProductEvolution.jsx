"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Boxes, ArrowRight, ArrowUpRight, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultEvolutionSteps = [
  {
    from: "Isolated Agency Builds",
    to: "Reusable Architectural Foundations",
    description: "Transitioning one-off client builds into standardized, hardened Next.js and MongoDB templates.",
    status: "COMPLETED"
  },
  {
    from: "Fragmented Standalone Tools",
    to: "Vertical SaaS Flagships (MedERP Pro)",
    description: "Engineering dedicated, industry-specific SaaS platforms that solve deep operational workflows.",
    status: "ACTIVE"
  },
  {
    from: "Single-App Deployments",
    to: "The Interconnected Product Mesh",
    description: "Unifying all apps under shared authentication, cross-product data sync, and single billing.",
    status: "IN PROGRESS"
  },
  {
    from: "Manual Business Ops",
    to: "Autonomous Business Operating Layer",
    description: "Software that self-reconciles, monitors telemetry, and triggers deterministic actions globally.",
    status: "2030+ HORIZON"
  }
];

const VisionProductEvolution = ({ data = null }) => {
  const title = data?.title || "The Evolution of DevSamp Software";
  const description = data?.description || "How our software model transitions from custom project development to reusable multi-tenant platforms, specialized vertical SaaS suites, and a self-orchestrating product mesh.";
  const steps = data?.evolutionSteps && data.evolutionSteps.length > 0 ? data.evolutionSteps : defaultEvolutionSteps;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Boxes size={12} /> Product Horizon
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Evolutionary Step Blocks */}
        <div className="space-y-4 min-w-0">
          {steps.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 min-w-0"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
                  <span className="text-slate-400 line-through">{st.from}</span>
                  <ArrowRight size={13} className="text-indigo-600 shrink-0" />
                  <span className="text-indigo-700 font-black">{st.to}</span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase border ${
                  st.status === "COMPLETED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : st.status === "ACTIVE"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : st.status === "IN PROGRESS"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}>
                  {st.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Link to Products */}
        <div className="mt-8 text-center">
          <Link href="/products">
            <button className="px-6 py-3 rounded-full bg-white hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-300 font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer">
              <span>View Active Software Products</span>
              <ArrowUpRight size={14} />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VisionProductEvolution;
