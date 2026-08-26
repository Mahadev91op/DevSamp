"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  Workflow, 
  Boxes, 
  CheckCircle2, 
  Activity 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const WhyHero = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "WHY DEVSAMP";
  const title = data?.title || "Technology Built Around How Your Business Needs to Grow.";
  const description = data?.description || "DevSamp is not a traditional agency building throwaway websites. We combine proprietary SaaS products, dedicated engineering pods, and unified cloud operations into a compounding software ecosystem.";
  const badge = data?.badge || "Architectural Advantage";
  const statusPill = data?.statusPill || "Product-First DNA • In-House Engineering • 24/7 SLA";
  const primaryCta = {
    text: data?.primaryCta?.text || "Explore the Ecosystem",
    link: data?.primaryCta?.link || "/ecosystem",
  };
  const secondaryCta = {
    text: data?.secondaryCta?.text || "Talk to DevSamp",
    link: data?.secondaryCta?.link || "/#contact",
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-transparent overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16 border-b border-slate-200/60">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-[10%] left-[15%] w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
          
          {/* Left Column: Hero Manifesto */}
          <div className="lg:col-span-7 space-y-5 text-left min-w-0">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
            >
              <ShieldCheck size={13} className="text-indigo-600 animate-pulse" />
              <span className="tracking-wide uppercase text-[11px] font-mono text-indigo-700">{eyebrow}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-bold text-[11px]">{badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-display font-black tracking-tight text-slate-950 leading-[1.12]"
            >
              Engineering Software That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Compounds Over Time.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1.5"
            >
              <Link href={primaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-slate-950/15 flex items-center gap-2 group cursor-pointer"
                  data-cursor="Ecosystem"
                >
                  <Workflow size={16} />
                  <span>{primaryCta.text}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href={secondaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  data-cursor="Connect"
                >
                  <ShieldCheck size={16} className="text-indigo-600" />
                  <span>{secondaryCta.text}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Live Reliability Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.32 }}
              className="pt-1.5 flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-500"
            >
              <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Architectural Standard
              </span>
              <span>•</span>
              <span>{statusPill}</span>
            </motion.div>

          </div>

          {/* Right Column: Interactive Value Matrix Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                  DevSamp Engineering Matrix
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
                  Zero Technical Debt
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Product-First DNA", desc: "We run live SaaS products. Our engineering standards are tested in real daily production.", icon: Boxes, color: "text-blue-600 bg-blue-50" },
                  { title: "Dedicated Engineering Pods", desc: "Direct access to senior fullstack architects. No junior hand-offs or outsourced agency layers.", icon: Layers, color: "text-indigo-600 bg-indigo-50" },
                  { title: "Unified Platform Engine", desc: "Shared authentication, database indexes, and edge SLA that compound value across systems.", icon: Cpu, color: "text-purple-600 bg-purple-50" },
                  { title: "100% Client Code Ownership", desc: "Clean, documented Git repositories with zero proprietary lock-in upon milestone completion.", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-indigo-300 transition-all duration-200">
                      <div className={`p-2 rounded-xl ${item.color} shrink-0 shadow-2xs`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-snug">{item.title}</h4>
                        <p className="text-slate-600 text-xs font-normal leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                <span>CONTRACT: VERIFIED</span>
                <span className="text-indigo-600">✓ 100% IN-HOUSE</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyHero;
