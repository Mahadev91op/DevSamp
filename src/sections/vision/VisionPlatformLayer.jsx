"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Layers, Lock, ShieldCheck, Workflow, Activity, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultCapabilities = [
  { name: "Universal Identity & RBAC", description: "Single sign-on, cryptographic JWT cookie sessions, and granular permission scopes.", icon: "Lock" },
  { name: "Multi-Tenant Isolation", description: "Zero cross-tenant data leakage with automated collection indexing and schema security.", icon: "ShieldCheck" },
  { name: "Event Mesh & Webhooks", description: "Real-time pub/sub event dispatchers with retry backoff and idempotency guarantees.", icon: "Workflow" },
  { name: "Global Telemetry & Health", description: "Sub-second error telemetry, runtime vital logging, and automated SLA health alerts.", icon: "Activity" }
];

const VisionPlatformLayer = ({ data = null }) => {
  const title = data?.title || "One Unified Infrastructure Underneath Multiple Vertical Products";
  const description = data?.description || "Shared core services—including universal authentication, tenant isolation, automated telemetry, global billing, and event webhooks—power every application we ship.";
  const capabilities = data?.sharedCapabilities && data.sharedCapabilities.length > 0 ? data.sharedCapabilities : defaultCapabilities;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
            <Layers size={12} /> Platform Foundation
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Shared Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {capabilities.map((cap, idx) => {
            const Icon = LucideIcons[cap.icon] || Lock;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-purple-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-xs mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {cap.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-purple-700 font-bold">
                  SHARED INFRASTRUCTURE
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionPlatformLayer;
