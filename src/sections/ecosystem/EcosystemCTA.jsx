"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Boxes, 
  Layers, 
  Terminal, 
  ShieldCheck,
  Activity
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const EcosystemCTA = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "Join the Ecosystem";
  const title = data?.title || "Ready to Build, Scale, or License on the DevSamp Ecosystem?";
  const description = data?.description || "Partner with software architects who design, operate, and maintain high-performance digital products and dedicated engineering pods.";
  const primaryText = data?.primaryText || "Initialize Discovery Pod";
  const primaryLink = data?.primaryLink || "/#contact";
  const secondaryText = data?.secondaryText || "Explore SaaS Products";
  const secondaryLink = data?.secondaryLink || "/products";

  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 min-w-0">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-indigo-300 shadow-xs"
          >
            <Activity size={13} className="text-emerald-400 animate-pulse" />
            <span className="uppercase tracking-wider">{eyebrow}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h1 font-black tracking-tight leading-[1.12] text-white"
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-300 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Link href={primaryLink}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full bg-white text-slate-950 hover:bg-indigo-50 font-black text-xs sm:text-sm transition-all shadow-xl shadow-white/10 flex items-center gap-2.5 group cursor-pointer"
                data-cursor="Connect"
              >
                <Workflow size={16} className="text-indigo-600" />
                <span>{primaryText}</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link href={secondaryLink}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-xs sm:text-sm transition-all flex items-center gap-2.5 backdrop-blur-md cursor-pointer"
                data-cursor="Products"
              >
                <Boxes size={16} className="text-indigo-300" />
                <span>{secondaryText}</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Live System Trust Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.32 }}
            className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono font-bold text-slate-400"
          >
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={14} /> 100% In-House Engineering
            </span>
            <span>•</span>
            <span>Zero Agency Hand-off</span>
            <span>•</span>
            <span>24/7 Production SLA</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EcosystemCTA;
