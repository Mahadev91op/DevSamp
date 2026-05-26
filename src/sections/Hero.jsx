"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Paintbrush, 
  Cpu, 
  Database, 
  Globe, 
  Play, 
  Terminal,
  CheckCircle2
} from "lucide-react";

const nodes = [
  { 
    id: "design", 
    label: "Creative UX/UI", 
    icon: Paintbrush, 
    color: "from-blue-500 to-cyan-500",
    logs: [
      "> compiling design assets...",
      "✓ Figma prototypes exported",
      "✓ CSS layout grid compiled: 60fps achieved",
      "✓ Micro-interactions: Active"
    ]
  },
  { 
    id: "engine", 
    label: "Next.js Core", 
    icon: Cpu, 
    color: "from-purple-500 to-pink-500",
    logs: [
      "> building server components...",
      "✓ SSR & Hydration pipeline initialised",
      "✓ Route components compiled in 0.08s",
      "✓ Server Actions security check: Passed"
    ]
  },
  { 
    id: "apis", 
    label: "Secure APIs", 
    icon: Database, 
    color: "from-orange-500 to-red-500",
    logs: [
      "> establishing secure handshake...",
      "✓ Database connection pooled successfully",
      "✓ JWT + httpOnly sessions validated",
      "✓ API Latency: 24ms (Ultra-fast)"
    ]
  },
  { 
    id: "deploy", 
    label: "Edge Deploy", 
    icon: Globe, 
    color: "from-emerald-500 to-green-500",
    logs: [
      "> deploying to edge networks...",
      "✓ Global CDN caching warm-up complete",
      "✓ Core Web Vitals: LCP 0.6s / FID 12ms",
      "✓ PageSpeed Index: 100/100 (Perfect)"
    ]
  }
];

const Hero = () => {
  const [activeNode, setActiveNode] = useState("design");
  const [terminalLogs, setTerminalLogs] = useState(nodes[0].logs);
  const [compiling, setCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  useEffect(() => {
    if (activeNode) {
      const selected = nodes.find(n => n.id === activeNode);
      if (selected) {
        setTerminalLogs(selected.logs);
      }
    }
  }, [activeNode]);

  const triggerFullBuild = async () => {
    if (compiling) return;
    setCompiling(true);
    setCompileProgress(0);
    setTerminalLogs(["> starting full system compilation..."]);

    const steps = [
      { progress: 25, node: "design", log: "> [1/4] Compiling responsive layout assets..." },
      { progress: 50, node: "engine", log: "> [2/4] Optimizing Next.js client/server boundary..." },
      { progress: 75, node: "apis", log: "> [3/4] Auditing API route handshake protocols..." },
      { progress: 100, node: "deploy", log: "> [4/4] Deploying production bundle to Vercel edge..." }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCompileProgress(steps[i].progress);
      setActiveNode(steps[i].node);
      setTerminalLogs(prev => [...prev, steps[i].log, ...nodes.find(n => n.id === steps[i].node).logs]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setTerminalLogs(prev => [...prev, "✓ BUILD SUCCESSFUL! Mainframe engine deployed.", "✓ DevSamp main core active."]);
    setCompiling(false);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      
      {/* Architect Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none"></div>
      
      {/* Soft color highlights */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- LEFT SIDE: HIGH-END COPYWRITING --- */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs md:text-sm text-slate-600 font-bold shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Engineering Digital Masterpieces
            </motion.div>

            {/* Custom Interactive Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] md:leading-[1.05]">
              We code the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">complex.</span> <br />
              We design the <span className="underline decoration-indigo-500/30 decoration-8 underline-offset-4">creative.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-semibold">
              We are a team of professional website developers and designers who build blazing fast, custom-engineered softwares and websites that set new industry standards.
            </p>

            {/* Interactive tag clouds */}
            <div className="flex flex-wrap gap-2.5 max-w-xl">
              {["Next.js 15", "MERN Stack", "Creative UI/UX", "High Performance", "SaaS Core", "SEO & PageSpeed 100"].map((tag, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, borderColor: "rgba(99, 102, 241, 0.4)" }}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-500 cursor-default shadow-sm select-none transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto pt-4">
              <Link href="#contact" className="w-full sm:w-auto group px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25" data-cursor="Hire">
                Hire Dev Agency 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="#portfolio" className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg transition-all flex justify-center shadow-sm" data-cursor="Work">
                View Portfolio
              </Link>
            </div>

          </div>

          {/* --- RIGHT SIDE: PIPELINE HUD SANDBOX --- */}
          <div className="lg:col-span-5 relative">
            <div className="w-full bg-white/40 border border-slate-200/80 p-6 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col gap-6">
              
              {/* Top controls */}
              <div className="flex justify-between items-center border-b border-slate-200/55 pb-4">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800 tracking-wide uppercase">Sandbox Console</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Interactive pipeline interface</p>
                </div>
                
                <button 
                  onClick={triggerFullBuild} 
                  disabled={compiling}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 disabled:opacity-50 text-xs font-bold transition-all"
                >
                  <Play size={12} className={compiling ? "animate-spin" : ""} />
                  {compiling ? "Compiling..." : "Run Build"}
                </button>
              </div>

              {/* SVG connection wire system */}
              <div className="relative h-24 flex justify-between items-center px-4">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 40,48 L 320,48" 
                    stroke="#e2e8f0" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                  {compiling && (
                    <motion.path 
                      d="M 40,48 L 320,48" 
                      stroke="url(#wireGrad)" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeDasharray="15 35"
                      animate={{ strokeDashoffset: [-100, 0] }}
                      transition={{ ease: "linear", duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <defs>
                    <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {nodes.map((node, idx) => {
                  const NodeIcon = node.icon;
                  const isActive = activeNode === node.id;
                  return (
                    <div 
                      key={node.id} 
                      onMouseEnter={() => !compiling && setActiveNode(node.id)}
                      className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <motion.div 
                        animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                          isActive 
                            ? `bg-gradient-to-br ${node.color} text-white border-transparent shadow-lg shadow-indigo-500/20` 
                            : "bg-white text-slate-400 border-slate-200 hover:border-indigo-500/40 hover:text-slate-700"
                        }`}
                      >
                        <NodeIcon size={18} />
                      </motion.div>
                      <span className={`text-[9px] font-extrabold uppercase tracking-wide transition-colors ${
                        isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                      }`}>
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Terminal Screen */}
              <div className="bg-slate-950 text-slate-300 font-mono text-[10px] p-4 rounded-2xl h-44 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 shadow-inner relative border border-white/5">
                <div className="absolute top-2 right-3 text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1 select-none">
                  <Terminal size={10} /> bash
                </div>
                
                <AnimatePresence mode="popLayout">
                  {terminalLogs.map((log, index) => (
                    <motion.div 
                      key={log + index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`${
                        log.startsWith("✓") 
                          ? "text-emerald-400 font-semibold" 
                          : log.startsWith(">") 
                            ? "text-blue-400" 
                            : "text-slate-400"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Progress Bar (Compiling UI) */}
              {compiling && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                    <span>Compiling Node Packets</span>
                    <span>{compileProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <motion.div 
                      animate={{ width: `${compileProgress}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;