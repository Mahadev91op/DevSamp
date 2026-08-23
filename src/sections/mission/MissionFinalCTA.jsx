"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const MissionFinalCTA = ({ data = null }) => {
  const title = data?.title || "Build Reliable, Scalable Software with DevSamp.";
  const description = data?.description || "Whether you need to deploy production-ready vertical SaaS platforms or partner with a dedicated engineering pod, we are ready to build.";
  const primaryCta = {
    text: data?.primaryCta?.text || "Explore Services",
    link: data?.primaryCta?.link || "/#services"
  };
  const secondaryCta = {
    text: data?.secondaryCta?.text || "Start a Conversation",
    link: data?.secondaryCta?.link || "/#contact"
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 !text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 !text-white rounded-3xl md:rounded-[2.25rem] p-8 sm:p-10 md:p-14 lg:p-16 overflow-hidden shadow-xl border border-slate-800"
        >
          {/* Ambient inner lights */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5 min-w-0">
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold !text-indigo-300 uppercase tracking-widest backdrop-blur-sm">
              <Sparkles size={12} /> Partner with DevSamp
            </div>

            <h2 className="text-fluid-h1 font-black tracking-tight leading-[1.14] !text-white">
              {title}
            </h2>

            <p className="!text-slate-200 text-fluid-body font-normal max-w-lg mx-auto leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-2 min-w-0">
              <Link href={primaryCta.link} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 !text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 group cursor-pointer"
                  data-cursor="Services"
                >
                  <Layers size={16} />
                  <span className="!text-white">{primaryCta.text}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform shrink-0 !text-white" />
                </motion.button>
              </Link>

              <Link href={secondaryCta.link} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 !text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
                  data-cursor="Connect"
                >
                  <Mail size={16} className="!text-indigo-400" />
                  <span className="!text-white">{secondaryCta.text}</span>
                </motion.button>
              </Link>
            </div>

            {/* Reassurance line */}
            <div className="pt-3 flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs font-mono !text-slate-300 font-bold">
              <span>✓ 100% In-House Engineers</span>
              <span>✓ Zero Architectural Debt</span>
              <span>✓ Enterprise SLAs</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MissionFinalCTA;
