"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Boxes, 
  Cpu, 
  Terminal, 
  GitBranch, 
  Play, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Layers,
  Activity
} from "lucide-react";

const telemetryNodes = [
  { 
    id: "products", 
    label: "SaaS Products", 
    icon: Boxes, 
    color: "from-blue-600 to-cyan-500",
    status: "4 Live",
    logs: [
      "> routing /api/v1/products...",
      "✓ MedERP Pro: Health check 200 OK (14ms)",
      "✓ DevScale Core: Multi-tenant mesh initialized",
      "✓ FlowPulse POS: Offline sync engine ready"
    ]
  },
  { 
    id: "services", 
    label: "Tech Services", 
    icon: Layers, 
    color: "from-indigo-600 to-purple-600",
    status: "60fps HMR",
    logs: [
      "> building custom engineering pod...",
      "✓ Next.js App Router & Server Actions compiled",
      "✓ Database indexes optimized: 8ms latency",
      "✓ UI/UX Micro-interactions: Active"
    ]
  },
  { 
    id: "developers", 
    label: "Dev Platform", 
    icon: Terminal, 
    color: "from-purple-600 to-pink-500",
    status: "REST/Hooks",
    logs: [
      "> validating developer auth gateways...",
      "✓ OpenAPI 3.1 specifications mounted",
      "✓ Event-driven webhooks: 0 queued drops",
      "✓ SDK Packages: Node, Python, React ready"
    ]
  },
  { 
    id: "ecosystem", 
    label: "Cloud Mesh", 
    icon: GitBranch, 
    color: "from-emerald-500 to-teal-500",
    status: "99.9% SLA",
    logs: [
      "> establishing global edge mesh...",
      "✓ Vercel & AWS Edge clusters synchronized",
      "✓ Core Web Vitals: LCP 0.5s / FID 10ms",
      "✓ DevSamp Connected Ecosystem: ONLINE"
    ]
  }
];

const Hero = ({ sectionData = null, siteSettings = null }) => {
  const [activeNode, setActiveNode] = useState("products");
  const [terminalLogs, setTerminalLogs] = useState(telemetryNodes[0].logs);
  const [compiling, setCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  // Dynamic content resolution
  const eyebrow = sectionData?.badge || siteSettings?.heroEyebrow || "Technology • Products • Ecosystem";
  const heading = sectionData?.title || siteSettings?.heroTitle || "Building, Operating & Scaling Digital Ecosystems with Next-Gen Products & Engineering";
  const description = sectionData?.description || siteSettings?.heroDescription || "DevSamp powers forward-thinking enterprises with scalable software products, fullstack digital solutions, and an interconnected developer ecosystem.";
  const primaryCta = {
    text: sectionData?.ctaText || siteSettings?.heroPrimaryCta?.text || "Explore Products",
    link: sectionData?.ctaLink || siteSettings?.heroPrimaryCta?.link || "/#products",
  };
  const secondaryCta = {
    text: sectionData?.secondaryCtaText || siteSettings?.heroSecondaryCta?.text || "Explore Ecosystem",
    link: sectionData?.secondaryCtaLink || siteSettings?.heroSecondaryCta?.link || "/#ecosystem",
  };

  useEffect(() => {
    if (activeNode) {
      const selected = telemetryNodes.find(n => n.id === activeNode);
      if (selected) {
        setTerminalLogs(selected.logs);
      }
    }
  }, [activeNode]);

  const triggerFullBuild = async () => {
    if (compiling) return;
    setCompiling(true);
    setCompileProgress(0);
    setTerminalLogs(["> initiating global ecosystem compilation pipeline..."]);

    const steps = [
      { progress: 25, node: "products", log: "> [1/4] Inspecting SaaS product cluster health..." },
      { progress: 50, node: "services", log: "> [2/4] Verifying engineering microservices & SSR boundary..." },
      { progress: 75, node: "developers", log: "> [3/4] Validating developer API gateway & webhooks..." },
      { progress: 100, node: "ecosystem", log: "> [4/4] Synchronizing global edge nodes & telemetry..." }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setCompileProgress(steps[i].progress);
      setActiveNode(steps[i].node);
      const matched = telemetryNodes.find(n => n.id === steps[i].node);
      setTerminalLogs(prev => [...prev, steps[i].log, ...(matched ? matched.logs : [])]);
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    setTerminalLogs(prev => [
      ...prev, 
      "✓ ECOSYSTEM SYNCHRONIZATION COMPLETE!",
      "✓ All 4 nodes operational across DevSamp network."
    ]);
    setCompiling(false);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Soft color highlights */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* --- LEFT SIDE: HIGH-IMPACT ECOSYSTEM HERO --- */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Status Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="tracking-wide">{eyebrow}</span>
            </motion.div>

            {/* Main Dynamic Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] md:leading-[1.08]"
            >
              Building, operating & scaling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                digital ecosystems.
              </span>
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed font-semibold"
            >
              {description}
            </motion.p>

            {/* Ecosystem Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {[
                "SaaS Software Products",
                "Fullstack Engineering",
                "REST APIs & Webhooks",
                "Cloud & DevOps Mesh",
                "HIPAA / ERP Systems",
                "Sub-second Latency"
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white/80 border border-slate-200/80 text-[11px] font-bold text-slate-600 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3.5 pt-3"
            >
              <Link href={primaryCta.link} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 group"
                  data-cursor="Products"
                >
                  <Boxes size={16} />
                  <span>{primaryCta.text}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href={secondaryCta.link} className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-7 py-4 rounded-full border border-slate-300 bg-white/90 hover:bg-slate-50 text-slate-800 font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 shadow-sm" 
                  data-cursor="Ecosystem"
                >
                  <Cpu size={16} className="text-indigo-600" />
                  <span>{secondaryCta.text}</span>
                </motion.button>
              </Link>
            </motion.div>

          </div>

          {/* --- RIGHT SIDE: INTERACTIVE ECOSYSTEM HUD --- */}
          <div className="lg:col-span-5 relative">
            <div className="w-full bg-white/90 border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-xl relative overflow-hidden flex flex-col gap-5">
              
              {/* Top controls */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Activity size={14} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs md:text-sm text-slate-900 tracking-wide uppercase">Ecosystem Telemetry</h3>
                    <p className="text-[9px] text-slate-450 font-bold">Interactive node orchestrator</p>
                  </div>
                </div>
                
                <button 
                  onClick={triggerFullBuild} 
                  disabled={compiling}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 disabled:opacity-50 text-xs font-bold transition-all shadow-sm"
                >
                  <Play size={11} className={compiling ? "animate-spin" : ""} />
                  <span>{compiling ? "Syncing..." : "Sync Nodes"}</span>
                </button>
              </div>

              {/* Connected node selector */}
              <div className="grid grid-cols-2 gap-2.5">
                {telemetryNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isActive = activeNode === node.id;
                  return (
                    <div 
                      key={node.id} 
                      onClick={() => !compiling && setActiveNode(node.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive 
                          ? "bg-slate-950 text-white border-slate-950 shadow-md" 
                          : "bg-slate-50/70 border-slate-200/70 hover:bg-white text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          isActive ? "bg-white/10 text-indigo-400" : "bg-white text-slate-500 shadow-xs"
                        }`}>
                          <NodeIcon size={14} />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-black truncate leading-tight">{node.label}</p>
                          <p className={`text-[8px] font-mono font-bold ${isActive ? "text-slate-400" : "text-slate-450"}`}>{node.status}</p>
                        </div>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? "bg-emerald-400 animate-pulse" : "bg-slate-300"
                      }`} />
                    </div>
                  );
                })}
              </div>

              {/* Terminal Logs Window */}
              <div className="bg-slate-950 text-slate-300 font-mono text-[10px] p-4 rounded-2xl h-40 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 shadow-inner relative border border-white/5">
                <div className="absolute top-2 right-3 text-[8px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 select-none">
                  <Terminal size={10} /> ecosystem-console
                </div>
                
                <AnimatePresence mode="popLayout">
                  {terminalLogs.map((log, index) => (
                    <motion.div 
                      key={log + index}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`${
                        log.startsWith("✓") 
                          ? "text-emerald-400 font-bold" 
                          : log.startsWith(">") 
                            ? "text-blue-400 font-medium" 
                            : "text-slate-400"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Compilation Progress Bar */}
              {compiling && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase font-mono">
                    <span>Mesh Packets Sync</span>
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