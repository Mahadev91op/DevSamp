"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Activity, 
  ArrowRight, 
  Boxes, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Workflow, 
  Sparkles,
  GitBranch,
  Terminal,
  Play
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const liveTelemetry = [
  { id: "products", label: "SaaS Layer", status: "4 Live", metric: "<14ms SLA", color: "from-blue-600 to-cyan-500", icon: Boxes },
  { id: "services", label: "Engineering Pods", status: "Active", metric: "60fps HMR", color: "from-indigo-600 to-purple-600", icon: Layers },
  { id: "platform", label: "Shared Protocol", status: "REST / Hooks", metric: "Zero Auth Drop", color: "from-purple-600 to-pink-500", icon: Terminal },
  { id: "mesh", label: "Global Edge", status: "99.9% Uptime", metric: "Vercel + AWS", color: "from-emerald-500 to-teal-500", icon: GitBranch },
];

const EcosystemHero = ({ data = null }) => {
  const [activeTelemetry, setActiveTelemetry] = useState("products");
  const [syncStatus, setSyncStatus] = useState("SYNCHRONIZED");

  const eyebrow = data?.eyebrow || "DEVSAMP ECOSYSTEM";
  const title = data?.title || "One Interconnected Digital Ecosystem. Multiple Software Capabilities.";
  const description = data?.description || "DevSamp brings together proprietary software products, bespoke engineering pods, open developer infrastructure, and continuous cloud operations into a unified digital operating layer.";
  const badge = data?.badge || "Enterprise Architecture";
  const statusPill = data?.statusPill || "4 Live SaaS • Multi-Tenant Mesh • Global Edge SLA";
  const primaryCta = {
    text: data?.primaryCta?.text || "Explore Architecture",
    link: data?.primaryCta?.link || "#architecture",
  };
  const secondaryCta = {
    text: data?.secondaryCta?.text || "View Topology Map",
    link: data?.secondaryCta?.link || "#topology",
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200/60">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[15%] w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
          
          {/* --- LEFT COLUMN: ECOSYSTEM MANIFESTO --- */}
          <div className="lg:col-span-7 space-y-5 text-left min-w-0">
            
            {/* Origin & Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
            >
              <Activity size={13} className="text-indigo-600 animate-pulse" />
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
              One Connected Ecosystem.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Multiple Capabilities.
              </span>
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
              <Link href={primaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-slate-950/15 flex items-center gap-2 group cursor-pointer"
                  data-cursor="Arch"
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
                  data-cursor="Topology"
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
                Live Network Active
              </span>
              <span>•</span>
              <span>{statusPill}</span>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: LIVE INTERCONNECTED TOPOLOGY HUD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-5 bg-slate-950 text-slate-200 rounded-3xl border border-white/15 shadow-2xl p-5 md:p-6 font-mono text-xs flex flex-col justify-between h-[430px] min-h-[430px] max-h-[430px] relative overflow-hidden shrink-0"
          >
            {/* Inner ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* HUD Top Bar */}
            <div className="shrink-0">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pl-1.5">
                    devsamp://ecosystem-orchestrator
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  {syncStatus}
                </span>
              </div>

              {/* 4 Interactive Layer Telemetry Nodes */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {liveTelemetry.map((item) => {
                  const NodeIcon = item.icon;
                  const isSelected = activeTelemetry === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTelemetry(item.id)}
                      className={`p-2.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? "bg-white/15 border-indigo-400 shadow-md shadow-indigo-500/20"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs`}>
                          <NodeIcon size={13} />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400">{item.metric}</span>
                      </div>
                      <span className="text-xs font-bold text-white block truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle Realtime Console Window */}
            <div className="bg-black/75 rounded-2xl border border-white/10 p-3 h-[135px] min-h-[135px] max-h-[135px] text-[11px] space-y-1 leading-relaxed text-slate-300 font-mono overflow-y-auto scrollbar-none shrink-0">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold border-b border-white/10 pb-1 mb-1">
                <span>INSPECTING: {activeTelemetry.toUpperCase()}</span>
                <span>STATE: OPTIMIZED</span>
              </div>
              <p className="text-indigo-300 font-semibold">&gt; validating inter-layer contract sync...</p>
              <p className="text-slate-300">✓ REST APIs &amp; webhook relays: Active</p>
              <p className="text-slate-300">✓ Multi-tenant database indexes: 8ms response</p>
              <p className="text-emerald-400 font-bold">✓ DevSamp Operating Layer: 100% OPERATIONAL</p>
            </div>

            {/* Bottom Pipeline Bar */}
            <div className="h-9 border-t border-white/10 pt-2 flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-slate-400 font-medium truncate">Universal protocol across all 4 nodes</span>
              <a
                href="#topology"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                <span>Inspect Mesh</span>
                <ArrowRight size={12} />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EcosystemHero;
