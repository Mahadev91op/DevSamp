import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Newspaper, Download, Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const metadata = {
  title: "Press & Media Resources | DevSamp",
  description: "Official press kit, executive bios, brand logos, and media inquiry channels for DevSamp.",
};

const FAST_FACTS = [
  { label: "Company Name", value: "DevSamp Technologies", sub: "Software Ecosystem & Engineering" },
  { label: "Flagship Software", value: "MedERP Pro", sub: "Clinical ERP, Lab Sync & Pharmacy POS" },
  { label: "Geographic Reach", value: "India & Global", sub: "Distributed engineering pods & multi-region cloud" },
  { label: "Core Model", value: "Vertical SaaS & Pods", sub: "Proprietary IP & dedicated sprint retainers" }
];

const PRESS_RELEASES = [
  {
    date: "August 2026",
    title: "DevSamp Announces MedERP Pro v2.4 with Automated AI Clinical Summaries & Direct HL7 Lab Bridges",
    link: "/news"
  },
  {
    date: "July 2026",
    title: "DevSamp Unveils Unified Platform Core Architecture with Multi-Tenant Mesh and Central Identity",
    link: "/news"
  },
  {
    date: "June 2026",
    title: "DevSamp Expands Dedicated Engineering Pod Retainers for High-Growth Healthcare & Retail Networks",
    link: "/news"
  }
];

export default function PressPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Press & Media", href: "/press" }]}
      badge="PRESS & MEDIA ROOM"
      title="DevSamp Newsroom & Media Kit"
      subtitle="Official resources, press releases, company backgrounders, and leadership contacts for journalists, analysts, and media publishers."
      primaryAction={{ label: "Download Brand Assets", href: "/brand-assets" }}
      secondaryAction={{ label: "Company Announcements", href: "/news" }}
    >
      <div className="space-y-10 max-w-5xl">
        
        {/* Fast Facts Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">DevSamp Fast Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {FAST_FACTS.map((fact, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{fact.label}</span>
                <p className="text-base font-bold text-slate-900">{fact.value}</p>
                <p className="text-xs text-slate-500 font-normal">{fact.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Press Releases */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Press Releases & Dispatches</h2>
          <div className="divide-y divide-slate-100">
            {PRESS_RELEASES.map((pr, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {pr.date}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{pr.title}</h3>
                </div>
                <Link href={pr.link} className="text-xs font-bold text-blue-600 hover:underline shrink-0 flex items-center gap-1">
                  <span>Read Release</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white space-y-4 shadow-xl border border-indigo-500/30">
          <h3 className="text-lg font-bold">Media & Executive Inquiries</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            For press briefings, executive interviews, or commentary on vertical SaaS architectures and healthcare digitization, contact our corporate media desk directly.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="mailto:devsamp1st@gmail.com?subject=Press%20Inquiry%20-%20DevSamp"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center gap-2"
            >
              <Mail size={14} />
              <span>Contact devsamp1st@gmail.com</span>
            </a>
          </div>
        </div>

      </div>
    </EcosystemPageShell>
  );
}
