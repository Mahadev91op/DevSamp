import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { ShoppingBag, Sparkles, Download, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "DevSamp Marketplace | Apps & Extensions",
  description: "Discover community apps, verified integrations, hospital ERP modules, and connector plugins for the DevSamp Ecosystem.",
};

const APPS = [
  { name: "Radiology DICOM Cloud Viewer", category: "Clinical Extension", author: "DevSamp Labs", rating: "4.9", badge: "FEATURED", desc: "Embed high-resolution CT/MRI DICOM viewers directly inside MedERP patient history charts." },
  { name: "Thermal Printer ESC/POS Bridge", category: "Hardware Connector", author: "Hardware Pod", rating: "5.0", badge: "VERIFIED", desc: "Native desktop bridge daemon enabling raw high-speed thermal printing over USB and LAN." },
  { name: "Automated GST 1 & 3B Exporter", category: "Tax & Finance", author: "Finance Pod", rating: "4.8", badge: "GST COMPLIANT", desc: "Export pharmacy sales and clinical hospital invoices formatted for direct government portal filing." }
];

export default function MarketplacePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Marketplace", href: "/marketplace" }]}
      badge="ECOSYSTEM EXTENSIONS"
      title="DevSamp Marketplace"
      subtitle="Extend the power of MedERP Pro and DevSamp platforms with verified apps, hardware connectors, and clinical workflows."
      primaryAction={{ label: "Publish an App", href: "/developers" }}
      secondaryAction={{ label: "App Directory", href: "/apps" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {APPS.map((app, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                  {app.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{app.category}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{app.name}</h2>
              <p className="text-xs text-slate-500">By {app.author} • Rating: ★ {app.rating}</p>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{app.desc}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600">Free with Pro</span>
              <button className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs">
                Install App
              </button>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
