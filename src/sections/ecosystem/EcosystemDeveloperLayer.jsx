"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Key, 
  Webhook, 
  GitBranch, 
  ArrowRight 
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const developerSnippets = {
  node: `import { DevSamp } from "@devsamp/sdk";

const devsamp = new DevSamp({
  apiKey: process.env.DEVSAMP_SECRET_KEY,
});

// Deploy an isolated tenant microservice
const tenant = await devsamp.ecosystem.provision({
  product: "mederp-pro",
  cluster: "production-asia",
  plan: "enterprise"
});

console.log("Tenant Provisioned:", tenant.endpointUrl);`,
  python: `from devsamp import DevSamp

client = DevSamp(api_key="ds_live_sec_993821")

# Subscribe to real-time ecosystem webhook events
webhook = client.webhooks.create(
    event="tenant.invoice.generated",
    target_url="https://api.yourdomain.com/webhooks/devsamp"
)
print(f"Webhook Active: {webhook.id}")`,
  curl: `curl -X POST https://api.devsamp.online/v1/ecosystem/provision \\
  -H "Authorization: Bearer ds_live_sec_993821" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product": "mederp-pro",
    "cluster": "production-asia"
  }'`
};

const EcosystemDeveloperLayer = ({ data = null }) => {
  const [activeLang, setActiveLang] = useState("node");
  const [copied, setCopied] = useState(false);

  const eyebrow = data?.eyebrow || "Developer First";
  const title = data?.title || "Open APIs, Event Webhooks & Type-Safe SDKs";
  const description = data?.description || "Engineered from day one for extensibility. Developers can consume REST endpoints, subscribe to real-time events, and integrate with any external stack.";

  const handleCopy = () => {
    navigator.clipboard.writeText(developerSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer-layer" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Developer Features */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-bold text-purple-700 uppercase tracking-widest"
            >
              <Terminal size={13} /> {eyebrow}
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
              className="text-slate-600 text-fluid-lead font-normal leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Feature Cards */}
            <div className="space-y-3.5 pt-1">
              {[
                { icon: Key, title: "Standardized API Keys & Scopes", desc: "Granular read/write permissions per microservice." },
                { icon: Webhook, title: "Universal Webhook Bus", desc: "Real-time payload dispatch on billing and state transitions." },
                { icon: GitBranch, title: "Modular SDKs & Boilerplates", desc: "Type-safe clients for Node.js, Python, and React." }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 bg-white border border-slate-200/90 p-4 rounded-2xl shadow-xs">
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                      <ItemIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Sandbox Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="lg:col-span-7 bg-slate-950 text-slate-200 rounded-3xl border border-white/15 shadow-2xl overflow-hidden font-mono text-xs min-w-0"
          >
            {/* Terminal Window Header */}
            <div className="h-12 bg-slate-900/90 border-b border-white/10 px-4 md:px-6 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>

              {/* Language Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10">
                {[
                  { id: "node", label: "Node.js" },
                  { id: "python", label: "Python" },
                  { id: "curl", label: "cURL" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLang(tab.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      activeLang === tab.id
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
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1 text-xs font-bold shrink-0 cursor-pointer"
                title="Copy code"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 md:p-6 overflow-x-auto scrollbar-none">
              <pre className="text-xs sm:text-[13px] leading-relaxed text-purple-200 font-mono">
                <code>{developerSnippets[activeLang]}</code>
              </pre>
            </div>

            {/* Terminal Footer */}
            <div className="border-t border-white/10 bg-slate-900/50 px-5 py-3 flex justify-between items-center text-xs text-slate-400 font-bold select-none">
              <span className="flex items-center gap-1.5 truncate">
                <Code2 size={13} className="text-purple-400 shrink-0" />
                OpenAPI 3.1 Specification: Active
              </span>
              <span className="text-emerald-400 shrink-0 font-extrabold">✓ 100% Online Gateway</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default EcosystemDeveloperLayer;
