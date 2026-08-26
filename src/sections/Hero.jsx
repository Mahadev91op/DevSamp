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

const smoothEase = [0.16, 1, 0.3, 1];

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
      await new Promise(resolve => setTimeout(resolve, 400));
      setCompileProgress(steps[i].progress);
      setActiveNode(steps[i].node);
      const matched = telemetryNodes.find(n => n.id === steps[i].node);
      setTerminalLogs(prev => [...prev, steps[i].log, ...(matched ? matched.logs : [])]);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    setTerminalLogs(prev => [
      ...prev, 
      "✓ ECOSYSTEM SYNCHRONIZATION COMPLETE!",
      "✓ All 4 nodes operational across DevSamp network."
    ]);
    setCompiling(false);
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Soft color highlights */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* --- LEFT SIDE: HIGH-IMPACT ECOSYSTEM HERO --- */}
          <div className="lg:col-span-7 space-y-5 text-left min-w-0">
            
            {/* Status Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="tracking-wide">{eyebrow}</span>
            </motion.div>

            {/* Headline with calibrated fluid typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-display font-black tracking-tight text-slate-950 leading-[1.12]"
            >
              Building, Operating & Scaling{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Digital Ecosystems
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1.5"
            >
              <Link href={primaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-slate-950/15 flex items-center gap-2 group cursor-pointer"
                  data-cursor="Products"
                >
                  <Boxes size={16} />
                  <span>{primaryCta.text}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href={secondaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  data-cursor="Map"
                >
                  <Cpu size={16} className="text-indigo-600" />
                  <span>{secondaryCta.text}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Live Ecosystem Telemetry Micro-Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.32 }}
              className="pt-1.5 flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-500"
            >
              <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                4 Live Flagship SaaS
              </span>
              <span>•</span>
              <span>Next.js 15 App Architecture</span>
              <span>•</span>
              <span>Global Edge SLA</span>
            </motion.div>

          </div>

          {/* --- RIGHT SIDE: STRICT FIXED-DIMENSION ZERO-SHIFT HUD SANDBOX --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-5 bg-slate-950 text-slate-200 rounded-3xl border border-white/15 shadow-2xl p-5 sm:p-6 font-mono text-xs flex flex-col justify-between h-[460px] min-h-[460px] max-h-[460px] relative overflow-hidden shrink-0"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar */}
            <div className="shrink-0">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider pl-1.5">
                    devsamp://telemetry-hud
                  </span>
                </div>

                <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  LIVE MESH
                </span>
              </div>

              {/* 4 Interactive Telemetry Nodes Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                {telemetryNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isSelected = activeNode === node.id;

                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNode(node.id)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? "bg-white/15 border-indigo-400 shadow-md shadow-indigo-500/20"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr ${node.color} shadow-xs`}>
                          <NodeIcon size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">
                          {node.status}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white block truncate">
                        {node.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fixed-Height Console Output Screen */}
            <div className="bg-black/75 rounded-2xl border border-white/10 p-3.5 h-[145px] min-h-[145px] max-h-[145px] text-xs space-y-1.5 leading-relaxed text-slate-300 font-mono overflow-y-auto scrollbar-none shrink-0">
              <div className="flex justify-between text-[11px] text-slate-500 font-bold border-b border-white/10 pb-1 mb-1">
                <span>ACTIVE NODE: {activeNode.toUpperCase()}</span>
                <span>LATENCY: &lt;15ms</span>
              </div>
              {terminalLogs.map((log, idx) => (
                <p key={idx} className={log.startsWith("✓") ? "text-emerald-400 font-bold" : log.startsWith(">") ? "text-indigo-300 font-semibold" : "text-slate-300"}>
                  {log}
                </p>
              ))}
            </div>

            {/* Fixed-Height Bottom Pipeline Trigger */}
            <div className="h-10 border-t border-white/10 pt-2 flex items-center justify-between gap-3 shrink-0">
              {compiling ? (
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs text-slate-300 font-bold">
                    <span>Syncing Ecosystem Mesh...</span>
                    <span>{compileProgress}%</span>
                  </div>
                  <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-300"
                      style={{ width: `${compileProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-xs text-slate-400 font-medium">Sync all 4 nodes in real-time</span>
                  <button
                    onClick={triggerFullBuild}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    <Play size={12} className="fill-current" />
                    <span>Run Sync Pipeline</span>
                  </button>
                </>
              )}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;