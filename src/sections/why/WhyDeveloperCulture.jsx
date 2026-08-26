"use client";

import { motion } from "framer-motion";
import { 
  Terminal, 
  Sparkles, 
  Code2, 
  GitBranch, 
  FolderTree, 
  CheckCircle2, 
  FileCode2 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const developerStandards = [
  {
    icon: FolderTree,
    title: "Predictable Directory Structure",
    desc: "Strict separation between UI components, server repositories, API routes, and database models makes navigating codebases effortless."
  },
  {
    icon: FileCode2,
    title: "Documented API Contracts",
    desc: "Every endpoint adheres to OpenAPI 3.1 standards with explicit payload schemas, status codes, and error formats."
  },
  {
    icon: Code2,
    title: "Clean React 19 & Next.js 15 Patterns",
    desc: "Modern Server Components, minimal client-side state, and standard ES modules with zero spaghetti hacks."
  },
  {
    icon: GitBranch,
    title: "Effortless Team Hand-off",
    desc: "When your internal team takes over, they inherit clean, documented Git repositories that any senior engineer can build on immediately."
  }
];

const WhyDeveloperCulture = () => {
  return (
    <section id="developer-culture" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-bold text-purple-700 uppercase tracking-widest mb-3"
          >
            <Terminal size={13} /> Codebase Craft
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950"
          >
            Codebases Developers Love to Inherit &amp; Extend
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed"
          >
            We don&apos;t write clever, unreadable code that locks you into our agency. We write disciplined, elegant software engineered for clarity and long-term maintainability.
          </motion.p>
        </div>

        {/* 4 Developer Craft Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {developerStandards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-purple-400 p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shadow-xs shrink-0">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase shadow-2xs">
                      [CRAFT 0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>READABILITY: VERIFIED</span>
                  <span className="text-purple-600 font-bold">✓ ZERO DEBT</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyDeveloperCulture;
