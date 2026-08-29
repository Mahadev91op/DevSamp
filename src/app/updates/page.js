import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { BellRing, Sparkles, CheckCircle2, Calendar } from "lucide-react";

export const metadata = {
  title: "Product Updates & Release Notes | DevSamp Ecosystem",
  description: "Official launch notes and feature announcements across DevSamp software products.",
};

const UPDATES = [
  {
    version: "MedERP Pro v2.4.0",
    date: "August 2026",
    title: "AI Clinical Consultation Summaries & Multi-Language Voice Notes",
    desc: "Physicians can now record voice notes during consultations; MedERP automatically summarizes diagnoses, formats prescriptions, and extracts ICD-10 codes."
  },
  {
    version: "FlowPulse POS v1.8.0",
    date: "July 2026",
    title: "Sub-Second Offline SQLite Sync Engine",
    desc: "Complete architectural upgrade allowing cashiers to ring up 100+ items without active internet; background sync resolves conflicts when reconnected."
  }
];

export default function UpdatesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Product Updates", href: "/updates" }]}
      badge="LAUNCH ANNOUNCEMENTS"
      title="Product Updates & Releases"
      subtitle="Discover the latest capabilities, performance boosts, and feature updates shipped across our software ecosystem."
      primaryAction={{ label: "Product Roadmap", href: "/products/roadmap" }}
      secondaryAction={{ label: "Explore Products", href: "/products" }}
    >
      <div className="space-y-6 max-w-4xl">
        {UPDATES.map((upd, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                {upd.version}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Calendar size={12} />
                <span>{upd.date}</span>
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{upd.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{upd.desc}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
