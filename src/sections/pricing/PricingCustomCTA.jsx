"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  MessageSquare 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const PricingCustomCTA = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "BESPOKE SCOPING";
  const title = data?.title || "Require a Tailored Architectural Scope?";
  const description = data?.description || "If your operational workflow requires unique multi-tenant isolation, legacy ERP migration, or custom API gateways, our architects will create a custom transparent blueprint.";
  const primaryText = data?.primaryText || "Initialize Discovery Consultation";
  const primaryLink = data?.primaryLink || "/#contact";
  const secondaryText = data?.secondaryText || "Explore Engineering Services";
  const secondaryLink = data?.secondaryLink || "/services";

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden">
      
      {/* Glow ambient background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 md:p-14 text-center shadow-2xl backdrop-blur-xl">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
            <Cpu size={13} /> {eyebrow}
          </div>

          <h2 className="text-fluid-h2 font-black mb-4 tracking-tight leading-tight text-white max-w-2xl mx-auto">
            {title}
          </h2>

          <p className="text-slate-300 text-fluid-lead font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={primaryLink}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
              >
                <span>{primaryText}</span>
                <ArrowRight size={15} />
              </motion.button>
            </Link>

            <Link href={secondaryLink}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sliders size={15} className="text-blue-400" />
                <span>{secondaryText}</span>
              </motion.button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              ✓ Direct Lead Architect Access
            </span>
            <span>•</span>
            <span>Sub-24h Initial Proposal</span>
            <span>•</span>
            <span>Zero Obligations</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingCustomCTA;
