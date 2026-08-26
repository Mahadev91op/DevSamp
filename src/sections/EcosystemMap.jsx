"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { 
  Cpu, 
  Boxes, 
  Layers, 
  Terminal, 
  Users, 
  Workflow, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  ArrowUpRight,
  Activity,
  GitBranch
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

// Fallback nodes if database is yet to be seeded
const defaultNodes = [
  {
    nodeId: "core",
    title: "DevSamp Hub",
    category: "core",
    shortDesc: "Central orchestration engine coordinating SaaS products, engineering pods, and developer gateways.",
    icon: "Cpu",
    statusBadge: "Active Core",
    metrics: "99.9% Uptime",
    color: "from-blue-600 to-indigo-600",
    linkUrl: "/#ecosystem"
  },
  {
    nodeId: "products",
    title: "Software Products",
    category: "product",
    shortDesc: "Production-ready vertical ERPs, multi-tenant SaaS boilerplates, and offline-first POS systems.",
    icon: "Boxes",
    statusBadge: "4 Live Apps",
    metrics: "Enterprise SLA",
    color: "from-indigo-500 to-purple-500",
    linkUrl: "/#products"
  },
  {
    nodeId: "services",
    title: "Technology Services",
    category: "service",
    shortDesc: "Bespoke full-stack web development, AI workflow automation, and custom software engineering.",
    icon: "Layers",
    statusBadge: "Fullstack Pod",
    metrics: "Custom Scope",
    color: "from-blue-500 to-cyan-500",
    linkUrl: "/#services"
  },
  {
    nodeId: "developers",
    title: "Developer Platform",
    category: "developer",
    shortDesc: "Open REST APIs, event-driven webhooks, modular SDKs, and developer-first boilerplates.",
    icon: "Terminal",
    statusBadge: "Open SDKs",
    metrics: "REST & Webhooks",
    color: "from-purple-500 to-pink-500",
    linkUrl: "/#developers"
  },
  {
    nodeId: "integrations",
    title: "Ecosystem Mesh",
    category: "integration",
    shortDesc: "Deep interoperability connectors for payment gateways, cloud edge nodes, and database clusters.",
    icon: "GitBranch",
    statusBadge: "Universal Mesh",
    metrics: "20+ Protocols",
    color: "from-emerald-500 to-teal-500",
    linkUrl: "/#ecosystem"
  },
  {
    nodeId: "customers",
    title: "Client Network",
    category: "customer",
    shortDesc: "Enterprises, clinics, startups, and institutions operating their mission-critical digital workloads.",
    icon: "Users",
    statusBadge: "Global Clients",
    metrics: "150+ Deployed",
    color: "from-amber-500 to-orange-500",
    linkUrl: "/#contact"
  },
  {
    nodeId: "support",
    title: "Long-term Support",
    category: "support",
    shortDesc: "Dedicated SLA maintenance, security patch pipelines, and direct engineering escalation.",
    icon: "ShieldCheck",
    statusBadge: "24/7 SLA",
    metrics: "Dedicated Pod",
    color: "from-cyan-500 to-blue-600",
    linkUrl: "/#contact"
  }
];

const EcosystemMap = ({ initialEcosystem = [], sectionData = null }) => {
  const nodes = initialEcosystem.length > 0 ? initialEcosystem : defaultNodes;
  const [selectedNodeId, setSelectedNodeId] = useState("core");

  const selectedNode = nodes.find(n => n.nodeId === selectedNodeId) || nodes[0];
  const SelectedIcon = LucideIcons[selectedNode.icon] || Cpu;

  const badge = sectionData?.badge || "Interactive Graph";
  const title = sectionData?.title || "The DevSamp Connected Ecosystem";
  const description = sectionData?.description || "Explore how products, services, developers, integrations, and partners interoperate seamlessly within our infrastructure.";

  return (
    <section id="ecosystem" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Activity size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-2.5 tracking-tight leading-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-body font-normal"
          >
            {description}
          </motion.p>
        </div>

        {/* Interactive Layout: Graph Mesh Grid + Active Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch min-w-0">
          
          {/* Left / Main: Visual Interactive Nodes Orbit */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 p-5 sm:p-6 md:p-8 rounded-3xl shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[420px] min-w-0">
            
            {/* Top Toolbar */}
            <div className="flex justify-between items-center border-b border-slate-200/70 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Live Topology Mesh
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 font-bold">
                Nodes active: {nodes.length}
              </span>
            </div>

            {/* Nodes Grid Display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-auto min-w-0">
              {nodes.map((node) => {
                const NodeIcon = LucideIcons[node.icon] || Cpu;
                const isSelected = selectedNodeId === node.nodeId;

                return (
                  <motion.div
                    key={node.nodeId}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNodeId(node.nodeId)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[125px] select-none min-w-0 ${
                      isSelected
                        ? "!bg-slate-950 !border-slate-800 shadow-md ring-2 ring-indigo-500/50"
                        : "bg-slate-50/80 border-slate-200 hover:bg-white text-slate-800 hover:border-slate-300 shadow-xs"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected 
                          ? "!bg-indigo-600 !text-white shadow-xs" 
                          : "bg-white text-indigo-600 shadow-xs border border-slate-200"
                      }`}>
                        <NodeIcon size={16} />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded truncate max-w-[80px] uppercase ${
                        isSelected ? "!bg-white/20 !text-white font-extrabold" : "!bg-slate-200/80 !text-slate-700 font-bold"
                      }`}>
                        {node.category}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs sm:text-sm font-black truncate ${
                        isSelected ? "!text-white font-extrabold" : "!text-slate-900"
                      }`}>
                        {node.title}
                      </h4>
                      <p className={`text-[11px] font-mono font-bold truncate mt-0.5 ${
                        isSelected ? "!text-indigo-300 font-extrabold" : "!text-slate-500"
                      }`}>
                        {node.statusBadge || "Active"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="border-t border-slate-200/70 pt-3.5 mt-5 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 font-bold gap-2">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Workflow size={13} className="text-indigo-600" />
                Inter-node latency: &lt;12ms
              </span>
              <span className="text-center sm:text-right">Click nodes above to inspect module specifications</span>
            </div>

          </div>

          {/* Right: Active Node Detail Inspector */}
          <div className="lg:col-span-4 bg-white border border-indigo-100 p-6 md:p-8 rounded-3xl shadow-sm relative flex flex-col justify-between min-w-0">
            <div className="space-y-5 min-w-0">
              
              {/* Header */}
              <div className="flex items-start justify-between min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${selectedNode.color || "from-blue-600 to-indigo-600"} shadow-sm shrink-0`}>
                    <SelectedIcon size={22} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-600 block">
                      Module Details
                    </span>
                    <h3 className="text-lg font-black text-slate-900 truncate">{selectedNode.title}</h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
                <p className="text-slate-700 text-xs sm:text-sm font-normal leading-relaxed">
                  {selectedNode.shortDesc}
                </p>
              </div>

              {/* Node Metrics Specs */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">CATEGORY</span>
                  <span className="text-slate-800 font-bold uppercase">{selectedNode.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">TELEMETRY</span>
                  <span className="text-emerald-600 font-bold">{selectedNode.metrics || "99.9% Uptime"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">STATUS</span>
                  <span className="text-indigo-600 font-bold">{selectedNode.statusBadge || "Active Core"}</span>
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-5 mt-5 border-t border-slate-100">
              <Link href={selectedNode.linkUrl || "#contact"}>
                <button 
                  className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-indigo-600 text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                  data-cursor="Open"
                >
                  <span className="truncate">Explore {selectedNode.title}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EcosystemMap;
