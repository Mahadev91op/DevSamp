"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Terminal, Workflow, Code2, Boxes, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultTools = [
  { name: "Open REST API Gateway", description: "Uniform JSON payloads, rate-limiting, and comprehensive OpenAPI 3.1 documentation.", icon: "Terminal" },
  { name: "Webhook Dispatcher", description: "Cryptographically signed HTTP POST webhooks with delivery guarantees and replay logs.", icon: "Workflow" },
  { name: "Type-Safe Client SDKs", description: "Lightweight JavaScript and Node.js SDKs with zero third-party dependencies.", icon: "Code2" },
  { name: "Starter Architecture Kits", description: "Production boilerplates for Next.js 15, Tailwind, and MongoDB Atlas.", icon: "Boxes" }
];

const VisionDeveloperEcosystem = ({ data = null }) => {
  const title = data?.title || "An Open Platform for Global Builders";
  const description = data?.description || "Opening our REST gateways, event webhooks, and modular SDKs so external engineering teams can build custom applications directly on DevSamp infrastructure.";
  const tools = data?.tools && data.tools.length > 0 ? data.tools : defaultTools;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Terminal size={12} /> Developer Platform
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            {description}
          </p>
        </div>

        {/* 4 Developer Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
          {tools.map((tool, idx) => {
            const Icon = LucideIcons[tool.icon] || Terminal;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-950 mb-1.5 truncate">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[10px] font-mono text-indigo-700 font-bold">
                  OPEN PROTOCOL
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Developer Action CTA */}
        <div className="mt-8 text-center">
          <Link href="/#developers">
            <button className="px-6 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer">
              <Terminal size={14} />
              <span>Explore Developer Architecture Hub</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default VisionDeveloperEcosystem;
