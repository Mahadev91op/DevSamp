import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { BookMarked, ArrowRight, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Business & Digital Guides | DevSamp Ecosystem",
  description: "Actionable playbooks, architectural guides, and digitization handbooks for healthcare operators and founders.",
};

const GUIDES = [
  {
    title: "The 2026 Hospital Digitization Playbook",
    category: "HEALTHCARE STRATEGY",
    desc: "A comprehensive handbook on transitioning from legacy paper charts to cloud ERP without disrupting daily OPD clinical operations."
  },
  {
    title: "Scaling Multi-Branch Retail with Offline-First POS",
    category: "RETAIL ARCHITECTURE",
    desc: "How multi-chain retailers prevent billing delays, eliminate inventory shrinkage, and centralize GST accounting."
  },
  {
    title: "Architecting Next.js 15 Multi-Tenant Platforms",
    category: "SOFTWARE ENGINEERING",
    desc: "Best practices for tenant routing, connection pooling in MongoDB, and isolating RBAC permissions."
  }
];

export default function GuidesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Guides", href: "/guides" }]}
      badge="BUSINESS & TECH PLAYBOOKS"
      title="Engineering Playbooks & Digital Guides"
      subtitle="In-depth, actionable guides curated by our senior architects to help healthcare administrators, retail founders, and software engineers."
      primaryAction={{ label: "Subscribe to Devlogs", href: "/newsletter" }}
      secondaryAction={{ label: "Technical Blog", href: "/blog" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {GUIDES.map((g, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                {g.category}
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{g.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{g.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Read Full Playbook</span>
              <ArrowRight size={13} />
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
