"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Boxes, Users } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function CustomerFinalCTA({ data = null }) {
  const eyebrow = data?.eyebrow || "JOIN THE DEVSAMP ECOSYSTEM";
  const title = data?.title || "Ready to Build Your Next Mission-Critical Platform?";
  const description = data?.description || "Collaborate with dedicated senior engineers to architect high-performance software products, custom APIs, and automated business workflows.";
  const primaryText = data?.primaryText || "Initialize Engineering Pod";
  const primaryLink = data?.primaryLink || "/#contact";
  const secondaryText = data?.secondaryText || "Explore Software Portfolio";
  const secondaryLink = data?.secondaryLink || "/products";

  return (
    <section className="py-20 md:py-28 bg-white text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container relative z-10 text-center">
        
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest"
          >
            <Sparkles size={13} /> {eyebrow}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: smoothEase, delay: 0.24 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <Link href={primaryLink}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-slate-950/15 flex items-center gap-2 cursor-pointer"
                data-cursor="Connect"
              >
                <Sparkles size={16} className="text-blue-400" />
                <span>{primaryText}</span>
                <ArrowRight size={15} />
              </motion.button>
            </Link>

            <Link href={secondaryLink}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                data-cursor="Products"
              >
                <Boxes size={16} className="text-blue-600" />
                <span>{secondaryText}</span>
              </motion.button>
            </Link>
          </motion.div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-bold text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% In-House Craft
            </span>
            <span>•</span>
            <span>Zero Subcontracting</span>
            <span>•</span>
            <span>24/7 SLA Governance</span>
          </div>
        </div>

      </div>
    </section>
  );
}
