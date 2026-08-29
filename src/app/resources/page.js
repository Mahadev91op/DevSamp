"use client";

import EcosystemPageShell from "@/components/EcosystemPageShell";
import { FolderDown, Download, FileText, CheckCircle2, FileSpreadsheet, FileCode } from "lucide-react";

const RESOURCES = [
  {
    title: "Hospital Clinical ERP RFP Evaluation Matrix (.XLSX)",
    desc: "A 150-point spreadsheet checklist to evaluate healthcare ERP vendors on HL7 lab machine sync, pharmacy batch POS, and DPDP compliance.",
    tag: "SPREADSHEET",
    format: "Excel / Sheets",
    size: "420 KB"
  },
  {
    title: "Next.js 15 Multi-Tenant SaaS Architecture Blueprint (.PDF)",
    desc: "Detailed technical diagram detailing shard routing, caching layers, and tenant database topologies for high-concurrency SaaS platforms.",
    tag: "BLUEPRINT",
    format: "Vector PDF",
    size: "1.8 MB"
  },
  {
    title: "Clinic Data Migration & Patient Records Handover Checklist (.PDF)",
    desc: "Step-by-step technical checklist for sanitizing and importing legacy patient histories and OPD ledgers without data corruption.",
    tag: "CHECKLIST",
    format: "PDF Checklist",
    size: "650 KB"
  },
  {
    title: "Retail POS Hardware & Thermal Printer Compatibility Guide (.PDF)",
    desc: "Specification sheet of verified ESC/POS thermal printers, barcode scanners, and cash drawers certified for sub-second offline billing.",
    tag: "HARDWARE GUIDE",
    format: "PDF Guide",
    size: "820 KB"
  },
  {
    title: "Enterprise Cybersecurity & SOC-2 Audit Readiness Kit (.ZIP)",
    desc: "Ready-to-use security policy templates, cryptographic access log schemas, and disaster recovery runbooks.",
    tag: "SECURITY KIT",
    format: "ZIP Archive",
    size: "3.2 MB"
  },
  {
    title: "OpenAPI 3.0 Standard Healthcare & Billing Endpoint Schema (.JSON)",
    desc: "Pre-configured Swagger / OpenAPI specification for rapid integration of patient queues, doctor consults, and tax invoicing.",
    tag: "API SCHEMA",
    format: "JSON Schema",
    size: "140 KB"
  }
];

export default function ResourcesPage() {
  const handleDownload = (title) => {
    alert(`Downloading ${title}... Download started.`);
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Resources", href: "/resources" }]}
      badge="FREE ARCHITECTURE ASSETS"
      title="Downloadable Engineering Resources"
      subtitle="Free blueprints, RFP evaluation spreadsheets, and audit checklists prepared by DevSamp architects to accelerate your projects."
      primaryAction={{ label: "Subscribe to Devlogs", href: "/newsletter" }}
      secondaryAction={{ label: "Guides & Playbooks", href: "/guides" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
        {RESOURCES.map((res, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {res.tag}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {res.format} • {res.size}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{res.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{res.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Free Download</span>
              </span>
              <button
                type="button"
                onClick={() => handleDownload(res.title)}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={13} />
                <span>Download Asset</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
