"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Workflow, 
  Boxes, 
  Cpu, 
  CheckCircle2, 
  Activity,
  Layers,
  Terminal
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const VisionHero = ({ data = null }) => {
  const eyebrow = data?.eyebrow || "DevSamp Vision 2035";
  const title = data?.title || "Engineering the Global Operating Layer for Connected Enterprise Software.";
  const description = data?.description || "A 10–15 year strategic horizon to unify vertical SaaS applications, autonomous engineering pods, and universal developer protocols into an interconnected software ecosystem.";
  const badge = data?.badge || "Strategic Horizon 2026–2035";

  const horizonNodes = [
    { label: "STRATEGIC HORIZON", value: "2026 – 2035", desc: "Long-term architecture roadmapped across 4 distinct evolutionary phases" },
    { label: "CORE OBJECTIVE", value: "Decentralized Operating Layer", desc: "Unifying independent business software under shared identity, billing, and events" },
    { label: "ENGINEERING POSTURE", value: "Sub-10ms Edge Architecture", desc: "Zero layout shift, immutable state, and deterministic automated pipelines" },
    { label: "ECOSYSTEM MESH", value: "Universal Protocol", desc: "Open REST gateways and type-safe SDKs for global developers" }
  ];

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200/60">
      
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[380px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[380px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
          
          {/* --- LEFT COLUMN: VISION MANIFESTO --- */}
          <div className="lg:col-span-7 space-y-5 text-left min-w-0">
            
            {/* Origin & Horizon Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
            >
              <Compass size={13} className="text-purple-600 animate-spin-slow" />
              <span className="tracking-wide uppercase text-[11px] font-mono text-purple-700">{eyebrow}</span>
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
              Engineering the Global{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                Operating Layer
              </span>{" "}
              for Connected Software
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1.5"
            >
              <Link href="#phases">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-purple-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                  data-cursor="Phases"
                >
                  <span>10–15 Year Roadmap</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="#ecosystem-future">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  data-cursor="Topology"
                >
                  <Workflow size={15} className="text-purple-600" />
                  <span>Future Architecture</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Horizon Reassurance Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.32 }}
              className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-500"
            >
              <span className="flex items-center gap-1 text-purple-700 font-extrabold">
                <CheckCircle2 size={13} /> 15-Year Horizon
              </span>
              <span>•</span>
              <span>4 Evolutionary Phases</span>
              <span>•</span>
              <span>Sub-10ms Edge Protocol</span>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: 2035 STRATEGIC HORIZON LEDGER CARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-5 bg-slate-950 text-slate-200 rounded-3xl border border-white/15 shadow-2xl p-5 md:p-6 font-mono text-xs flex flex-col justify-between h-[430px] min-h-[430px] max-h-[430px] relative overflow-hidden shrink-0"
          >
            {/* Inner background glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Ledger Header */}
            <div className="shrink-0 border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[11px] font-black uppercase text-white tracking-wider">
                    DEVSAMP 2035 HORIZON LEDGER
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/10 text-purple-300 font-bold border border-white/10">
                  STRATEGIC CORE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans font-normal leading-tight">
                Architectural parameters guiding the next decade of development.
              </p>
            </div>

            {/* 4 Horizon Pillars in Ledger */}
            <div className="space-y-2 overflow-y-auto scrollbar-none flex-1 pr-1">
              {horizonNodes.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 hover:border-purple-500/50 p-2.5 rounded-xl transition-all"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider">{item.label}</span>
                    <span className="text-[10px] font-bold text-white font-mono">{item.value}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans font-normal leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ledger Footer */}
            <div className="shrink-0 border-t border-white/10 pt-2.5 mt-2.5 flex items-center justify-between text-[10px] text-slate-400 font-bold">
              <span className="flex items-center gap-1 text-slate-300">
                <Activity size={12} className="text-purple-400" />
                LONG-TERM SYSTEM HORIZON
              </span>
              <span className="text-purple-400">HORIZON: 2035</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VisionHero;
