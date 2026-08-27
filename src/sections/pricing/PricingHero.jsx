"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  Receipt, 
  ShieldCheck, 
  Workflow, 
  Activity, 
  CheckCircle2,
  Lock,
  Zap
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const PricingHero = ({ data = null, planCount = 0 }) => {
  const eyebrow = data?.eyebrow || "DEVSAMP COMMERCIAL ARCHITECTURE";
  const title = data?.title || "Transparent Pricing Built Around Your Product and Scale";
  const description = data?.description || "From turnkey SaaS software licenses to dedicated engineering pod retainers and custom enterprise platforms with 100% intellectual property ownership.";
  const badge = data?.badge || "Commercial Architecture";
  const primaryCta = {
    text: data?.primaryCta?.text || "Explore Pricing Blueprints",
    link: data?.primaryCta?.link || "#catalog",
  };
  const secondaryCta = {
    text: data?.secondaryCta?.text || "Custom Scope Evaluator",
    link: data?.secondaryCta?.link || "#calculator",
  };

  return (
    <section className="relative w-full min-h-[90dvh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200/60">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute top-[12%] left-[15%] w-[450px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
          
          {/* Left Column: Commercial Manifesto */}
          <div className="lg:col-span-7 space-y-5 text-left min-w-0">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
            >
              <CreditCard size={13} className="text-blue-600 animate-pulse" />
              <span className="tracking-wide uppercase text-[11px] font-mono text-blue-700">{eyebrow}</span>
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
              Predictable Engineering Costs.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                Zero Hidden Surprises.
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1.5"
            >
              <a href={primaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-slate-950/15 flex items-center gap-2 group cursor-pointer"
                  data-cursor="Pricing"
                >
                  <CreditCard size={16} />
                  <span>{primaryCta.text}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>

              <a href={secondaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  data-cursor="Calculator"
                >
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span>{secondaryCta.text}</span>
                </motion.button>
              </a>
            </motion.div>

            {/* Live Count & Metric Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.32 }}
              className="pt-1.5 flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-500"
            >
              <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {planCount > 0 ? `${planCount} Configured Plans Live` : "Active Commercial Layer"}
              </span>
              <span>•</span>
              <span>100% IP Transfer</span>
              <span>•</span>
              <span>Sub-10ms DB SLAs</span>
            </motion.div>

          </div>

          {/* Right Column: Commercial Protocol Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-5 bg-slate-950 text-slate-200 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl font-mono text-xs space-y-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-300 font-bold uppercase text-[11px]">
                  devsamp://commercial-protocol
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                STATUS: ENFORCED
              </span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-2.5 text-slate-300 text-xs leading-relaxed">
              <div className="text-blue-400 font-bold flex items-center gap-1.5">
                <Receipt size={14} /> DEVSAMP FINANCIAL GOVERNANCE
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero retainer lock-in: Pause or scale anytime</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Full IP & repository access from Sprint 01</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>No per-seat developer markups or proxy layers</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-400 font-bold">
                <Lock size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Escrow-safe milestone deliverables available</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-slate-400 text-[11px] pt-2 border-t border-white/10">
              <span>BILLING: DIRECT & MONTHLY</span>
              <span className="text-blue-300 font-bold">✓ TRANSPARENT SCOPE</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PricingHero;
