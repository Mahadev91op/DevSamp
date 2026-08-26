"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Workflow, 
  Boxes 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const IndustryFinalCTA = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "PARTNER WITH DEVSAMP";
  const title = data?.title || "Let's Build Around Your Business Context";
  const description = data?.description || "Partner with an engineering team that understands real-world operational friction, data security, and long-term maintainability.";
  const primaryText = data?.primaryText || "Start an Industry Project";
  const primaryLink = data?.primaryLink || "/#contact";
  const secondaryText = data?.secondaryText || "Explore Software Products";
  const secondaryLink = data?.secondaryLink || "/products";

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
          
          {/* Blueprint grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />
          
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-blue-300">
              <Sparkles size={13} className="text-blue-400" />
              <span className="tracking-wide uppercase">{eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href={primaryLink}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
                  data-cursor="Connect"
                >
                  <Building2 size={16} />
                  <span>{primaryText}</span>
                  <ArrowRight size={15} />
                </motion.button>
              </Link>

              <Link href={secondaryLink}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                  data-cursor="Products"
                >
                  <Boxes size={16} className="text-blue-300" />
                  <span>{secondaryText}</span>
                </motion.button>
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 border-t border-white/10 mt-6">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck size={14} /> Full IP Ownership Transferred
              </span>
              <span>•</span>
              <span>Zero Vendor Lock-In</span>
              <span>•</span>
              <span>Dedicated Domain Pods</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustryFinalCTA;
