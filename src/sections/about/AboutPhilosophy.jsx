"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { TrendingUp, Code2, Zap, Lock, Sparkles, Terminal, CheckCircle2 } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultPrinciples = [
  {
    title: "Engineered for 10x Scale",
    description: "We architect databases, schema indexes, and API contracts anticipating exponential traffic growth from day one.",
    icon: "TrendingUp",
    badge: "Scalability",
    codeSnippet: "INDEX: { tenantId: 1, createdAt: -1 } // 0ms scan"
  },
  {
    title: "Simplicity Over Cleverness",
    description: "Readable, maintainable codebases with strict conventions always beat overly complex, opaque abstractions.",
    icon: "Code2",
    badge: "Maintainability",
    codeSnippet: "CONVENTION: Modular Monolith > Microservice sprawl"
  },
  {
    title: "Zero Layout Shift & Instant 60fps",
    description: "Every interaction, animation, and layout must load instantaneously with optimal Core Web Vitals and zero visual jitter.",
    icon: "Zap",
    badge: "Performance",
    codeSnippet: "VITALS: LCP < 0.6s | CLS 0.00 | INP 12ms"
  },
  {
    title: "Security & RBAC by Default",
    description: "HTTP-only cookie sessions, granular permission scopes, and strict input sanitization at every layer.",
    icon: "Lock",
    badge: "Security",
    codeSnippet: "AUTH: JWT + Scope Enforcement Middleware"
  }
];

const AboutPhilosophy = ({ data = [] }) => {
  const principles = data && data.length > 0 ? data : defaultPrinciples;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Code2 size={12} /> Engineering Manifesto
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Our Non-Negotiable Engineering Standards
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            The technical principles that guide every pull request, database migration, and system deployment.
          </p>
        </div>

        {/* Bento Grid with Terminal Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto min-w-0">
          {principles.map((pr, idx) => {
            const Icon = LucideIcons[pr.icon] || Code2;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 sm:p-7 md:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0 group"
              >
                <div className="min-w-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 uppercase">
                      {pr.badge || `RULE 0${idx + 1}`}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 truncate">
                    {pr.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-4">
                    {pr.description}
                  </p>
                </div>

                {/* Terminal Code Snippet Bar */}
                <div className="p-3 bg-slate-950 text-slate-300 rounded-xl font-mono text-[10px] flex items-center justify-between overflow-x-auto scrollbar-none">
                  <span className="text-indigo-400 truncate font-semibold">
                    {pr.codeSnippet || `SPEC_STANDARD: ENFORCED`}
                  </span>
                  <span className="text-emerald-400 text-[9px] font-bold shrink-0 ml-2">✓ PASS</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutPhilosophy;
