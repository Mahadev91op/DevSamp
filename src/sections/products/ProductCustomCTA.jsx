"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Workflow, 
  Cpu 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const ProductCustomCTA = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Bespoke Engineering";
  const title = data?.title || "Need Something Built Specifically for Your Operations?";
  const description = data?.description || "When off-the-shelf software doesn't fit 100% of your workflow, our dedicated engineering pods can customize our SaaS core or build a bespoke platform from scratch.";
  const primaryText = data?.primaryText || "Request Custom Pod Scope";
  const primaryLink = data?.primaryLink || "/services";
  const secondaryText = data?.secondaryText || "Schedule Discovery Call";
  const secondaryLink = data?.secondaryLink || "/#contact";

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        <div className="bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10 min-w-0">
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-blue-300 uppercase tracking-widest"
            >
              <Layers size={13} /> {eyebrow}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-white"
            >
              {title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-300 text-fluid-lead font-normal leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href={primaryLink}>
                <button className="px-6 py-3.5 rounded-full bg-white text-slate-950 hover:bg-blue-50 font-black text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer">
                  <Layers size={16} className="text-blue-600" />
                  <span>{primaryText}</span>
                  <ArrowRight size={15} />
                </button>
              </Link>

              <Link href={secondaryLink}>
                <button className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer">
                  <Workflow size={16} className="text-blue-300" />
                  <span>{secondaryText}</span>
                </button>
              </Link>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductCustomCTA;
