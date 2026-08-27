"use client";

import { motion } from "framer-motion";
import { Target, Compass, Sparkles, ArrowRight, CheckCircle2, Flag } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const AboutMissionVision = ({ missionData = null, visionData = null }) => {
  const missionTitle = missionData?.title || "Our Mission";
  const missionStatement = missionData?.statement || "To engineer scalable software products and resilient digital infrastructure that empower businesses to compound digital value.";
  const missionDescription = missionData?.description || "We eliminate technical debt and execution friction by unifying SaaS products, bespoke engineering pods, and open developer protocols under one reliable ecosystem.";

  const visionTitle = visionData?.title || "Our Vision";
  const visionStatement = visionData?.statement || "To become the central technology operating system for modern high-growth enterprises.";
  const presentState = visionData?.presentState || "Operating 4 flagship vertical SaaS platforms and deploying custom engineering solutions.";
  const buildingState = visionData?.buildingState || "Unifying API gateways, multi-tenant boilerplate foundations, and autonomous workflow nodes.";
  const futureState = visionData?.futureState || "A global interconnected developer and product ecosystem powering mission-critical commerce, healthcare, and finance.";

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Target size={12} /> Purpose & Destination
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Mission, Vision & Evolutionary Roadmap
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            What drives our everyday engineering sprints and where the DevSamp ecosystem is heading.
          </p>
        </div>

        {/* 2 Major Pillars: Left Mission Card + Right Vision Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-w-0">
          
          {/* Left Column: Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xs min-w-0"
          >
            <div className="space-y-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <Target size={22} />
              </div>

              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                OPERATIONAL PURPOSE
              </span>

              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                &quot;{missionStatement}&quot;
              </h3>

              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                {missionDescription}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 space-y-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Zero legacy technical debt</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>100% Type-safe & tested code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Compounding enterprise asset value</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3-Phase Vision Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xs min-w-0"
          >
            <div className="space-y-4 min-w-0">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                  <Compass size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">
                  3-PHASE ROADMAP
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                {visionStatement}
              </h3>

              {/* 3 Step Progression List */}
              <div className="space-y-3 pt-2">
                
                {/* Phase 1: Present */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase shrink-0 mt-0.5">
                    PHASE 01
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-slate-900">Vertical SaaS & Specialized Pods</h4>
                    <p className="text-slate-500 text-[11px] font-normal leading-normal mt-0.5">{presentState}</p>
                  </div>
                </div>

                {/* Phase 2: Building */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 flex items-start gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 uppercase shrink-0 mt-0.5">
                    PHASE 02
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-indigo-950">Unified Developer Mesh & Gateways</h4>
                    <p className="text-indigo-900/80 text-[11px] font-normal leading-normal mt-0.5">{buildingState}</p>
                  </div>
                </div>

                {/* Phase 3: Future */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 flex items-start gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 uppercase shrink-0 mt-0.5">
                    PHASE 03
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-indigo-950">Global Autonomous Business Operating Layer</h4>
                    <p className="text-indigo-900/80 text-[11px] font-normal leading-normal mt-0.5">{futureState}</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
              <span>TARGET TRAJECTORY</span>
              <span className="text-indigo-600">✦ EXPONENTIAL SCALE</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutMissionVision;
