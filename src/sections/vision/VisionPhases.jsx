"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Clock, CheckCircle2, ChevronRight, Sparkles, ArrowRight, Target } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPhases = [
  {
    phaseKey: "phase-01",
    title: "Vertical SaaS Foundations",
    timeframe: "2023 – 2025",
    description: "Deploying high-impact vertical products (MedERP Pro, DevScale Core) while executing bespoke enterprise platforms.",
    objectives: [
      "Establish HIPAA-ready hospital ERP architecture",
      "Deploy multi-tenant billing & role-based access",
      "Deliver 100% in-house client platforms with zero technical debt"
    ],
    milestones: [
      "MedERP Pro clinical suite in production",
      "Standardized Next.js 15 + MongoDB core library"
    ],
    badge: "PHASE 01 • ACTIVE FOUNDATION",
    order: 1
  },
  {
    phaseKey: "phase-02",
    title: "The Unified Platform Mesh",
    timeframe: "2026 – 2028",
    description: "Interconnecting all standalone software products through a universal REST API gateway, shared telemetry, and developer SDKs.",
    objectives: [
      "Launch public developer API gateway with sub-25ms response time",
      "Deploy unified identity & single sign-on across all DevSamp apps",
      "Expand vertical SaaS into retail POS (FlowPulse) and invoicing"
    ],
    milestones: [
      "Universal Developer Hub live",
      "Global multi-region edge mesh operational"
    ],
    badge: "PHASE 02 • IN PROGRESS",
    order: 2
  },
  {
    phaseKey: "phase-03",
    title: "Autonomous Workflow Orchestration",
    timeframe: "2029 – 2031",
    description: "Introducing automated event streams, deterministic decision pipelines, and edge-native intelligence across business nodes.",
    objectives: [
      "Automate cross-product financial reconciliation and inventory sync",
      "Deploy zero-configuration developer extensions & plugins",
      "Establish enterprise SLA pods with automated self-healing clusters"
    ],
    milestones: [
      "Real-time event streaming network",
      "Automated operational workflows across 500+ enterprises"
    ],
    badge: "PHASE 03 • PLANNED",
    order: 3
  },
  {
    phaseKey: "phase-04",
    title: "Global Autonomous Operating Layer",
    timeframe: "2032 – 2035",
    description: "DevSamp becomes the default decentralized operating layer for next-generation digital businesses worldwide.",
    objectives: [
      "Power mission-critical operations across 10+ core industries",
      "Sub-10ms global edge synchronization",
      "Fully open-source and modular developer infrastructure"
    ],
    milestones: [
      "Global interconnected technology backbone",
      "Ecosystem powering millions of daily transactional workflows"
    ],
    badge: "PHASE 04 • STRATEGIC DESTINATION",
    order: 4
  }
];

const VisionPhases = ({ data = [] }) => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const phases = data && data.length > 0 ? data : defaultPhases;
  const current = phases[selectedPhase] || phases[0];

  return (
    <section id="phases" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
            <Clock size={12} /> 10–15 Year Horizon
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            The 4 Evolutionary Phases (2026–2035)
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            A staged, disciplined roadmap that scales our technical capabilities from specialized vertical SaaS to a global operating layer.
          </p>
        </div>

        {/* Horizontal Stepper Selector (Desktop & Tablet) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mb-8 select-none min-w-0">
          {phases.map((ph, idx) => {
            const isSelected = selectedPhase === idx;

            return (
              <div
                key={idx}
                onClick={() => setSelectedPhase(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-w-0 ${
                  isSelected 
                    ? "bg-slate-950 text-white border-slate-900 shadow-md ring-2 ring-purple-500/20" 
                    : "bg-slate-50/80 border-slate-200/90 text-slate-700 hover:bg-white hover:border-purple-300 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-[10px] font-mono font-bold uppercase ${
                      isSelected ? "text-purple-400" : "text-purple-700"
                    }`}>
                      PHASE 0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${
                      isSelected ? "text-slate-300" : "text-slate-500"
                    }`}>
                      {ph.timeframe}
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-black truncate ${
                    isSelected ? "text-white" : "text-slate-900"
                  }`}>
                    {ph.title}
                  </h3>
                </div>

                <div className={`mt-3 pt-2 border-t text-[9px] font-mono font-bold flex items-center justify-between ${
                  isSelected ? "border-white/15 text-purple-300" : "border-slate-200 text-slate-400"
                }`}>
                  <span>STATUS</span>
                  <span>{idx === 0 ? "FOUNDATION" : idx === 1 ? "ACTIVE" : "FUTURE"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Phase Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPhase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 max-w-5xl mx-auto shadow-xs min-w-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-w-0">
              
              {/* Left Side: Summary & Description */}
              <div className="lg:col-span-5 space-y-4 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase">
                    {current.timeframe}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                    {current.badge || `PHASE 0${selectedPhase + 1}`}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                  {current.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  {current.description}
                </p>

                <div className="pt-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Verified Milestones
                  </span>
                  <div className="space-y-1.5 font-mono text-xs text-slate-700">
                    {current.milestones && current.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span className="text-[11px] font-semibold">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Key Objectives & Deliverables Matrix */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs min-w-0">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase text-slate-950 flex items-center gap-1.5">
                    <Target size={14} className="text-purple-600" /> Architectural Objectives
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 font-bold">
                    SPEC_CONTRACT: {current.phaseKey?.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  {current.objectives && current.objectives.map((obj, oIdx) => (
                    <div key={oIdx} className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl flex items-start gap-3">
                      <span className="w-5 h-5 rounded-md bg-purple-50 text-purple-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{oIdx + 1}
                      </span>
                      <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed">
                        {obj}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span>EXECUTION POSTURE: DISCIPLINED</span>
                  <span className="text-purple-700 font-extrabold">✦ PHASE ALIGNED</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default VisionPhases;
