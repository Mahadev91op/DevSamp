"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Code2, ShieldCheck, Rocket, Terminal, Play } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your business model, understand your audience, and design an architectural blueprint for success.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "group-hover:border-blue-500/30",
    logs: [
      "[SYSTEM] Initialising discovery protocol...",
      "[ANALYSIS] Auditing client market competitors...",
      "[INFO] Recommended Tech Stack: Next.js + MongoDB",
      "✓ Architectural roadmap successfully defined"
    ]
  },
  {
    id: "02",
    title: "High-Fidelity UI/UX",
    desc: "We build wireframes and interactive prototypes. This is where your brand gets its modern visual identity.",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "group-hover:border-purple-500/30",
    logs: [
      "[SYSTEM] Launching Figma assets compiler...",
      "[RENDER] Creating interactive component layout...",
      "[INFO] Responsive break-points validated: 60fps",
      "✓ High-fidelity UI systems approved"
    ]
  },
  {
    id: "03",
    title: "Next-Gen Coding",
    desc: "Our senior developers code your software using clean, production-grade Next.js and MERN architecture.",
    icon: Code2,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "group-hover:border-pink-500/30",
    logs: [
      "[SYSTEM] git checkout -b production-branch",
      "[COMPILE] Bundling client & server files...",
      "[INFO] Hydration optimization check: 100% OK",
      "✓ Clean code compiled with zero lints"
    ]
  },
  {
    id: "04",
    title: "Rigorous QA Testing",
    desc: "We test code responsiveness, security parameters, and run automated audits across all screens.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "group-hover:border-emerald-500/30",
    logs: [
      "[SYSTEM] Launching Cypress e2e suite...",
      "[AUDIT] Verifying SSL handshake & api security...",
      "[INFO] Google Lighthouse Audit: 100 PageSpeed",
      "✓ All unit tests passed successfully"
    ]
  },
  {
    id: "05",
    title: "Edge Launch & Support",
    desc: "We deploy your project to Vercel/AWS edge nodes and offer constant maintenance checks.",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "group-hover:border-orange-500/30",
    logs: [
      "[SYSTEM] triggering vercel production build...",
      "[INFO] Warming up global edge CDN routing...",
      "[SUCCESS] Site live at canonical domains",
      "✓ System Online. Support protocols active."
    ]
  },
];

const Process = () => {
  const [runningStep, setRunningStep] = useState(null);
  const [logsState, setLogsState] = useState({});

  const runPipelineStep = async (idx) => {
    if (runningStep !== null) return;
    setRunningStep(idx);
    
    const stepLogs = steps[idx].logs;
    // Clear logs for this step to animate them
    setLogsState(prev => ({ ...prev, [idx]: [] }));

    for (let i = 0; i < stepLogs.length; i++) {
      await new Promise(res => setTimeout(res, 500));
      setLogsState(prev => ({
        ...prev,
        [idx]: [...(prev[idx] || []), stepLogs[i]]
      }));
    }
    
    setRunningStep(null);
  };

  return (
    <section id="process" className="relative py-12 md:py-28 bg-transparent text-slate-900 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3"
          >
            Workflow
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight"
          >
            DevOps <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Release Pipeline</span>
          </motion.h2>
          <p className="text-slate-500 text-sm md:text-base font-semibold px-2">
            Click "Run Pipeline" on any stage card to simulate our software build logs and see how we deliver precision.
          </p>
        </div>

        {/* --- PIPELINE CARDS GRID --- */}
        <div className="max-w-5xl mx-auto space-y-8 relative">
          
          {/* Central Line connecting cards (Desktop only) */}
          <div className="absolute left-[34px] md:left-1/2 top-10 bottom-10 w-[2px] bg-slate-200/60 -translate-x-1/2 md:translate-x-0 -z-10"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const currentLogs = logsState[idx] || step.logs;
            const isCompiling = runningStep === idx;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-12 relative ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                
                {/* 1. Left/Right card content (takes half size) */}
                <div className="w-full md:w-5/12 flex flex-col justify-center">
                  <div className={`group relative bg-white/85 border border-slate-200/80 p-6 md:p-8 rounded-3xl transition-all duration-500 hover:shadow-xl ${step.borderColor}`}>
                    
                    {/* Node bubble inside card */}
                    <div className="flex justify-between items-center mb-5">
                      <div className={`p-2.5 rounded-xl ${step.bgColor} text-indigo-600 shadow-sm border border-slate-100`}>
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-[9px] font-bold text-slate-300">
                        [PIPELINE_STG_{step.id}]
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-500 text-xs md:text-sm font-semibold leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    <button 
                      onClick={() => runPipelineStep(idx)}
                      disabled={runningStep !== null}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-50 text-[10px] font-bold tracking-wide uppercase transition-all shadow-md shadow-slate-900/10"
                    >
                      <Play size={10} className={isCompiling ? "animate-spin text-indigo-400" : ""} />
                      {isCompiling ? "Running..." : "Run Pipeline"}
                    </button>
                  </div>
                </div>

                {/* 2. Central Line Indicator (The visual index node) */}
                <div className="absolute left-[34px] md:left-1/2 top-8 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                  <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-mono text-[9px] font-extrabold`}>
                    {step.id}
                  </div>
                </div>

                {/* 3. Simulated Terminal logs box (takes other half size) */}
                <div className={`${
                  logsState[idx] !== undefined || isCompiling ? "flex" : "hidden md:flex"
                } w-full md:w-5/12 pl-16 md:pl-0 flex flex-col justify-center animate-fade-in`}>
                  <div className="bg-slate-950 text-slate-300 font-mono text-[10px] p-5 rounded-2xl h-[135px] overflow-hidden border border-white/5 flex flex-col gap-1.5 justify-center shadow-inner relative group/term">
                    
                    <div className="absolute top-2.5 right-3.5 text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1">
                      <Terminal size={10} /> console
                    </div>

                    <div className="flex flex-col gap-1">
                      <AnimatePresence>
                        {currentLogs.map((log, lIdx) => (
                          <motion.div 
                            key={lIdx}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${
                              log.startsWith("✓") || log.startsWith("[SUCCESS]")
                                ? "text-emerald-400 font-semibold" 
                                : log.startsWith("[SYSTEM]") 
                                  ? "text-blue-400" 
                                  : "text-slate-400"
                            }`}
                          >
                            {log}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Process;