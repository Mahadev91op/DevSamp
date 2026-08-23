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
    linkUrl: "/#work"
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
  const description = sectionData?.description || "Explore how software products, custom services, developer platforms, and integrations interoperate under DevSamp's unified architecture.";

  return (
    <section id="ecosystem" className="py-16 md:py-28 bg-transparent text-slate-900 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3.5"
          >
            <Activity size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-3 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-sm md:text-base font-semibold"
          >
            {description}
          </motion.p>
        </div>

        {/* Interactive Layout: Graph Mesh Grid + Active Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left / Main: Visual Interactive Nodes Orbit */}
          <div className="lg:col-span-8 bg-white/90 border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[440px]">
            
            {/* Top Toolbar */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Live Topology Mesh
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                Nodes active: {nodes.length}
              </span>
            </div>

            {/* Nodes Grid Display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 my-auto">
              {nodes.map((node) => {
                const NodeIcon = LucideIcons[node.icon] || Cpu;
                const isSelected = selectedNodeId === node.nodeId;

                return (
                  <motion.div
                    key={node.nodeId}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedNodeId(node.nodeId)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[120px] select-none ${
                      isSelected
                        ? "bg-slate-950 text-white border-slate-950 shadow-lg"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-white text-slate-800"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected 
                          ? "bg-white/10 text-indigo-400" 
                          : "bg-white text-indigo-600 shadow-xs border border-slate-100"
                      }`}>
                        <NodeIcon size={16} />
                      </div>
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-white/10 text-slate-300" : "bg-slate-200/60 text-slate-500"
                      }`}>
                        {node.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-black truncate">{node.title}</h4>
                      <p className={`text-[9px] font-mono font-bold truncate mt-0.5 ${
                        isSelected ? "text-slate-400" : "text-slate-450"
                      }`}>
                        {node.statusBadge || "Active"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="border-t border-slate-100 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 font-bold gap-2">
              <span className="flex items-center gap-1.5">
                <Workflow size={12} className="text-indigo-500" />
                Inter-node latency: &lt;12ms
              </span>
              <span>Click nodes above to inspect live module specifications</span>
            </div>

          </div>

          {/* Right: Active Node Detail Inspector */}
          <div className="lg:col-span-4 bg-white border border-indigo-100/70 p-6 md:p-8 rounded-3xl shadow-lg relative flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${selectedNode.color || "from-blue-600 to-indigo-600"} shadow-md`}>
                    <SelectedIcon size={22} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                      Module Details
                    </span>
                    <h3 className="text-lg font-black text-slate-900">{selectedNode.title}</h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl">
                <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                  {selectedNode.shortDesc}
                </p>
              </div>

              {/* Node Metrics Specs */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">NODE_CATEGORY</span>
                  <span className="text-slate-800 font-bold uppercase">{selectedNode.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">TELEMETRY_SLA</span>
                  <span className="text-emerald-600 font-bold">{selectedNode.metrics || "99.9% Uptime"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-bold">STATUS_STATE</span>
                  <span className="text-indigo-600 font-bold">{selectedNode.statusBadge || "Active Core"}</span>
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link href={selectedNode.linkUrl || "#contact"}>
                <button 
                  className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
                  data-cursor="Open"
                >
                  <span>Explore {selectedNode.title}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
