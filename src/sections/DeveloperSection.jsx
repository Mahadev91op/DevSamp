"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  GitBranch,
  Key,
  Webhook
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const codeSnippets = {
  curl: `curl -X POST https://api.devsamp.online/v1/ecosystem/deploy \\
  -H "Authorization: Bearer ds_live_sec_993821" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cluster": "mederp-production",
    "tier": "enterprise",
    "region": "asia-south-1"
  }'`,
  node: `import { DevSampClient } from "@devsamp/sdk";

const client = new DevSampClient({
  apiKey: process.env.DEVSAMP_SECRET_KEY,
});

// Deploy an isolated tenant microservice
const deployment = await client.ecosystem.deploy({
  cluster: "mederp-production",
  tier: "enterprise",
  autoScale: true,
});

console.log("Tenant Online:", deployment.clusterUrl);`,
  python: `from devsamp import DevSampClient

client = DevSampClient(api_key="ds_live_sec_993821")

# Initialize telemetry handshake
telemetry = client.telemetry.get_status(cluster="mederp-production")
print(f"Cluster SLA: {telemetry.uptime_percentage}%")`
};

const DeveloperSection = ({ sectionData = null }) => {
  const [activeTab, setActiveTab] = useState("node");
  const [copied, setCopied] = useState(false);

  const badge = sectionData?.badge || "Developer First";
  const title = sectionData?.title || "Build, Extend & Integrate with DevSamp";
  const description = sectionData?.description || "Empower your engineering team with production-ready REST APIs, event-driven webhooks, modular SDKs, and developer-first documentation.";

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-w-0">
          
          {/* Left Column: Developer Overview & Features */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest"
            >
              <Terminal size={12} /> {badge}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950"
            >
              {title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-body font-normal leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Developer feature points */}
            <div className="space-y-3 pt-1">
              {[
                { icon: Key, title: "Standardized Auth & RBAC", desc: "JWT + API tokens with granular permission scopes." },
                { icon: Webhook, title: "Universal Event Webhooks", desc: "Real-time dispatch on product, billing, and system events." },
                { icon: GitBranch, title: "Zero-Config Boilerplates", desc: "Production templates with Next.js 15, Tailwind, and MongoDB." }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 bg-white border border-slate-200/90 p-3.5 rounded-2xl shadow-xs min-w-0">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                      <ItemIcon size={16} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-slate-900 truncate">{item.title}</h4>
                      <p className="text-slate-500 text-[11px] font-normal leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Developer CTA */}
            <div className="pt-2">
              <Link href="/#contact">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
                  data-cursor="Docs"
                >
                  <span>Build with DevSamp</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Code Sandbox */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-7 bg-slate-950 text-slate-200 rounded-3xl border border-white/15 shadow-2xl overflow-hidden font-mono text-xs min-w-0"
          >
            {/* Terminal Top Window Bar */}
            <div className="h-12 bg-slate-900/90 border-b border-white/10 px-4 md:px-6 flex items-center justify-between select-none min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>

              {/* Language Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10">
                {[
                  { id: "node", label: "Node.js" },
                  { id: "curl", label: "cURL" },
                  { id: "python", label: "Python" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1 text-[11px] font-bold shrink-0 cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 md:p-6 overflow-x-auto scrollbar-none">
              <pre className="text-xs leading-relaxed text-purple-200 font-mono">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>

            {/* Terminal Footer */}
            <div className="border-t border-white/10 bg-slate-900/50 px-5 py-3 flex justify-between items-center text-[10px] text-slate-400 font-bold select-none">
              <span className="flex items-center gap-1.5 truncate">
                <Code2 size={12} className="text-purple-400 shrink-0" />
                SDK Version: v2.4.0 (Stable)
              </span>
              <span className="text-emerald-400 shrink-0 font-extrabold">✓ API Gateway: 100% Online</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default DeveloperSection;
