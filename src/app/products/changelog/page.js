import EcosystemPageShell from "@/components/EcosystemPageShell";
import { History, Tag, CheckCircle2, Calendar, Zap, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Product Changelog & Continuous Releases | DevSamp Ecosystem",
  description: "Continuous version releases, performance benchmarks, security patches, and changelogs across DevSamp software platforms.",
};

const RELEASES = [
  {
    version: "v2.4.0",
    date: "August 24, 2026",
    product: "MedERP Pro",
    title: "AI Clinical Summaries, Direct ESC/POS Driver & Faster OPD Billing",
    badge: "MAJOR RELEASE",
    changes: [
      { type: "FEATURE", text: "Integrated automated speech-to-text and AI doctor consultation notes generator with ICD-10 suggestions." },
      { type: "PERF", text: "Reduced OPD patient checkout page rendering latency from 180ms to 38ms using server actions." },
      { type: "HARDWARE", text: "Added zero-dependency WebUSB and Bluetooth thermal receipt printer drivers for Windows and Android." },
      { type: "SECURITY", text: "Enhanced cryptographic access logs for sensitive patient diagnostic reports." }
    ]
  },
  {
    version: "v2.2.0",
    date: "August 10, 2026",
    product: "Retail POS",
    title: "Offline SQLite Synchronization Mesh & Multi-Warehouse Manifests",
    badge: "FEATURE RELEASE",
    changes: [
      { type: "FEATURE", text: "Offline-first SQLite local caching enabling uninterrupted sales during complete internet outages." },
      { type: "FEATURE", text: "Automated inter-branch stock replenishment transfers with batch expiry controls." },
      { type: "PERF", text: "Sub-second barcode search index supporting 100,000+ SKU catalogs." }
    ]
  },
  {
    version: "v2.1.2",
    date: "July 28, 2026",
    product: "Platform Core",
    title: "Tenant Isolation & Webhook Mesh Hardening",
    badge: "SECURITY UPDATE",
    changes: [
      { type: "SECURITY", text: "Implemented HMAC-SHA256 signature headers for all outgoing event webhooks." },
      { type: "RELIABILITY", text: "Added automated Redis Stream exponential backoff retry queues for webhook delivery." },
      { type: "CORE", text: "Upgraded Next.js 15 runtime and React 19 server actions compatibility." }
    ]
  },
  {
    version: "v1.9.0",
    date: "June 15, 2026",
    product: "Developer Portal",
    title: "Interactive OpenAPI REST Sandbox & Flutter Client SDK",
    badge: "DEV TOOLS",
    changes: [
      { type: "FEATURE", text: "Launched live browser-based API playground with multi-language code generation." },
      { type: "SDK", text: "Released official Dart / Flutter client library for mobile integrations." },
      { type: "DOCS", text: "Added automated cURL copy snippets across all 40+ REST endpoints." }
    ]
  }
];

export default function ProductChangelogPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Changelog", href: "/products/changelog" }
      ]}
      badge="RELEASE HISTORY"
      title="Continuous Product Release Changelog"
      subtitle="Detailed log of continuous enhancements, bug fixes, new capabilities, and performance optimizations shipped across our ecosystem."
      primaryAction={{ label: "Product Roadmap", href: "/products/roadmap" }}
      secondaryAction={{ label: "Explore Products", href: "/products" }}
    >
      <div className="space-y-6 max-w-4xl">
        {RELEASES.map((rel, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  {rel.product} • {rel.version}
                </span>
                <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {rel.badge}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Calendar size={12} />
                <span>{rel.date}</span>
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {rel.title}
            </h2>

            <div className="space-y-2 pt-1">
              {rel.changes.map((ch, cIdx) => (
                <div key={cIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded shrink-0 mt-0.5 ${
                    ch.type === "FEATURE"
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : ch.type === "PERF"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : ch.type === "SECURITY"
                      ? "bg-purple-50 text-purple-700 border border-purple-100"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}>
                    {ch.type}
                  </span>
                  <span className="leading-relaxed font-normal">{ch.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
