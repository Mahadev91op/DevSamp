import EcosystemPageShell from "@/components/EcosystemPageShell";
import { FolderDown, Download, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Resources & Downloadable Checklists | DevSamp",
  description: "Downloadable software architecture blueprints, hospital IT audit checklists, and RFP evaluation templates.",
};

const RESOURCES = [
  { title: "Hospital Clinical ERP RFP Evaluation Matrix (.XLSX)", desc: "A 150-point checklist to compare hospital ERP vendors on HL7 lab sync, pharmacy POS, and HIPAA compliance.", tag: "TEMPLATE" },
  { title: "Next.js 15 Multi-Tenant SaaS System Architecture Blueprint (.PDF)", desc: "Technical system design diagram detailing shard routing, caching layers, and tenant database topologies.", tag: "BLUEPRINT" },
  { title: "Clinic Data Migration & Patient Records Handover Checklist (.PDF)", desc: "Step-by-step checklist for sanitizing and importing legacy patient histories without data corruption.", tag: "CHECKLIST" }
];

export default function ResourcesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Resources", href: "/resources" }]}
      badge="FREE ARCHITECTURE ASSETS"
      title="Downloadable Engineering Resources"
      subtitle="Free blueprints, RFP evaluation spreadsheets, and audit checklists prepared by DevSamp architects."
      primaryAction={{ label: "Subscribe to Devlogs", href: "/newsletter" }}
    >
      <div className="space-y-6 max-w-4xl">
        {RESOURCES.map((res, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {res.tag}
              </span>
              <h2 className="text-base font-bold text-slate-900">{res.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{res.desc}</p>
            </div>
            <button className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0">
              <Download size={14} />
              <span>Download Asset</span>
            </button>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
