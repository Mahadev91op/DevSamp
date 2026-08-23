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
    <section id="developers" className="py-16 md:py-28 bg-transparent text-slate-900 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Developer Overview & Features */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-bold text-purple-700 uppercase tracking-widest"
            >
              <Terminal size={12} /> {badge}
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black tracking-tight leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Developer feature points */}
            <div className="space-y-3.5 pt-2">
              {[
                { icon: Key, title: "Standardized Auth & RBAC", desc: "JWT + API tokens with granular permission scopes." },
                { icon: Webhook, title: "Universal Event Webhooks", desc: "Real-time dispatch on product, billing, and system events." },
                { icon: GitBranch, title: "Zero-Config Boilerplates", desc: "Production templates with Next.js 15, Tailwind, and MongoDB." }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 bg-white/70 border border-slate-200/70 p-3.5 rounded-2xl shadow-xs">
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                      <ItemIcon size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                      <p className="text-slate-500 text-[11px] font-medium leading-normal mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Developer CTA */}
            <div className="pt-3">
              <Link href="/#contact">
                <button 
                  className="px-7 py-3.5 rounded-full bg-slate-950 hover:bg-purple-700 text-white font-bold text-xs md:text-sm transition-all shadow-sm flex items-center gap-2 group"
                  data-cursor="Docs"
                >
                  <span>Build with DevSamp</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Code Sandbox */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-slate-950 text-slate-300 rounded-3xl border border-white/10 shadow-2xl overflow-hidden font-mono text-xs"
          >
            {/* Terminal Top Window Bar */}
            <div className="h-12 bg-slate-900/90 border-b border-white/10 px-4 md:px-6 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
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
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
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
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[10px] font-bold"
                title="Copy code"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 md:p-6 overflow-x-auto custom-scrollbar">
              <pre className="text-[11px] md:text-xs leading-relaxed text-purple-200">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>

            {/* Terminal Footer */}
            <div className="border-t border-white/10 bg-slate-900/50 px-5 py-3 flex justify-between items-center text-[10px] text-slate-500 font-bold select-none">
              <span className="flex items-center gap-1.5">
                <Code2 size={12} className="text-purple-400" />
                SDK Version: v2.4.0 (Stable)
              </span>
              <span className="text-emerald-400">✓ API Gateway: 100% Online</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default DeveloperSection;
