"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Workflow, 
  Database, 
  ShieldCheck, 
  Zap, 
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const problemAreas = [
  {
    challenge: "1. Fragmented Legacy Silos",
    pain: "Departments using disconnected systems, requiring manual copy-pasting of patient records or inventory spreadsheets.",
    techReq: "Unified API Mesh & Identity Normalization",
    capability: "DevSamp micro-gateways & OAuth2 JWT single sign-on across all legacy sub-systems.",
    icon: Database,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    challenge: "2. Real-Time Telemetry Lag",
    pain: "Slow operational decisions due to batch database processing and delayed billing reconciliations.",
    techReq: "Sub-10ms Event Pipelines & WebSocket Sync",
    capability: "High-concurrency MongoDB compound indexing with Redis memory-cached transaction streams.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    challenge: "3. Sector Regulatory Compliance",
    pain: "Risk of hefty compliance fines (HIPAA, PCI DSS, GDPR) from improper data isolation and audit logging.",
    techReq: "Zero-Trust Encryption & Audit Trails",
    capability: "End-to-end encrypted tenant isolation with immutable timestamped action audit ledgers.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    challenge: "4. Slow Multi-Branch Scalability",
    pain: "New location onboarding taking weeks with high infrastructure setup overhead and sync conflicts.",
    techReq: "Multi-Tenant Edge Mesh & Cloud Native",
    capability: "Zero-config branch tenant provisioning with instant database isolation and localized pricing.",
    icon: Layers,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const IndustryProblemAreas = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
            <Cpu size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">PROBLEM → SOLUTION MATRIX</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Solving Sector-Specific Technology Bottlenecks
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            How our engineering pods systematically eliminate operational friction points through purpose-built digital architectures.
          </p>
        </div>

        {/* 4 Problem-to-Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {problemAreas.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.challenge}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50 border border-slate-200/80 hover:border-blue-500/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${item.bg} ${item.color} border border-slate-200/60 shadow-xs`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      RESOLVED AT RUNTIME
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-950 tracking-tight mb-2">
                    {item.challenge}
                  </h3>

                  <div className="bg-red-50/70 border border-red-100 rounded-2xl p-3.5 mb-4 text-xs text-red-900 font-medium leading-relaxed">
                    <strong className="text-red-700">Operational Friction:</strong> {item.pain}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <strong className="text-blue-700 shrink-0 font-mono">Tech Standard:</strong>
                      <span>{item.techReq}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <strong className="text-emerald-700 shrink-0 font-mono">DevSamp Solution:</strong>
                      <span>{item.capability}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-500 font-bold">
                  <span>ARCHITECTURE GUARANTEE</span>
                  <span className="text-emerald-600">✓ SUB-10MS LATENCY</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustryProblemAreas;
