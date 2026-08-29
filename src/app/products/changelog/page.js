import EcosystemPageShell from "@/components/EcosystemPageShell";
import { History, Tag, CheckCircle2, Calendar } from "lucide-react";

export const metadata = {
  title: "Product Changelog & Releases | DevSamp Ecosystem",
  description: "Continuous version releases, performance updates, and changelogs across DevSamp platforms.",
};

const RELEASES = [
  {
    version: "v2.4.0",
    date: "August 2026",
    product: "MedERP Pro",
    title: "AI Clinical Summaries & Faster OPD Billing",
    changes: [
      "Integrated automated speech-to-text and AI consultation notes generator.",
      "Reduced OPD checkout rendering latency from 180ms to 42ms.",
      "Added support for direct Thermal Receipt POS printers via USB and Bluetooth.",
      "Enhanced role-based permissions matrix for emergency triage staff."
    ]
  },
  {
    version: "v2.1.2",
    date: "July 2026",
    product: "Platform Core",
    title: "Tenant Isolation & Webhook Mesh Hardening",
    changes: [
      "Implemented HMAC-SHA256 signature verification for outgoing webhook events.",
      "Added automated geo-replicated backup verification checks.",
      "Upgraded Next.js 15 runtime and React 19 server actions compatibility."
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
      title="Product Release Changelog"
      subtitle="Detailed log of continuous enhancements, bug fixes, new capabilities, and performance optimizations shipped across our ecosystem."
      primaryAction={{ label: "Product Roadmap", href: "/products/roadmap" }}
      secondaryAction={{ label: "Explore Products", href: "/products" }}
    >
      <div className="space-y-8 max-w-4xl">
        {RELEASES.map((rel, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  {rel.product} {rel.version}
                </span>
                <span className="text-xs text-slate-400 font-mono">{rel.date}</span>
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900">{rel.title}</h2>

            <ul className="space-y-2 text-xs text-slate-600">
              {rel.changes.map((change, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
