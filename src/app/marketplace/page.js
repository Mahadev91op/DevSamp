import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { ShoppingBag, Sparkles, Download, ArrowRight, CheckCircle2, Star, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "DevSamp Marketplace | Apps & Extensions",
  description: "Discover community apps, verified integrations, hospital ERP modules, and connector plugins for the DevSamp Ecosystem.",
};

const APPS = [
  {
    name: "Radiology DICOM Cloud Viewer",
    category: "Clinical Extension",
    author: "DevSamp Labs",
    rating: "4.9",
    installs: "140+ clinics",
    badge: "FEATURED",
    desc: "Embed high-resolution CT/MRI DICOM viewers directly inside MedERP patient history charts with multi-angle slice inspection."
  },
  {
    name: "Thermal Printer ESC/POS Bridge",
    category: "Hardware Connector",
    author: "Hardware Pod",
    rating: "5.0",
    installs: "420+ stores",
    badge: "VERIFIED",
    desc: "Native desktop bridge daemon enabling raw high-speed thermal receipt and barcode printing over USB, Bluetooth, and LAN."
  },
  {
    name: "Automated GST 1 & 3B Exporter",
    category: "Tax & Finance",
    author: "Finance Pod",
    rating: "4.8",
    installs: "310+ orgs",
    badge: "GST READY",
    desc: "Export pharmacy sales, purchase orders, and hospital clinical invoices formatted for direct government GST portal upload."
  },
  {
    name: "WhatsApp Patient Token & Report Bot",
    category: "Communication",
    author: "DevSamp Labs",
    rating: "4.9",
    installs: "290+ hospitals",
    badge: "POPULAR",
    desc: "Automate appointment confirmations, live OPD queue token updates, and PDF diagnostic report dispatches via official WhatsApp Business API."
  },
  {
    name: "Biometric Staff Attendance Sync",
    category: "Operations & HR",
    author: "Hardware Pod",
    rating: "4.7",
    installs: "180+ clinics",
    badge: "VERIFIED",
    desc: "Sync eSSL and Matrix fingerprint/face biometric devices directly with staff shift rosters and payroll ledgers."
  },
  {
    name: "Counter UPI Dynamic QR Terminal",
    category: "Fintech",
    author: "DevSamp Fintech",
    rating: "5.0",
    installs: "500+ counters",
    badge: "FINTECH",
    desc: "Generate dynamic customer-facing UPI QR codes on secondary display screens with instant payment webhook confirmation."
  }
];

export default function MarketplacePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Marketplace", href: "/marketplace" }]}
      badge="ECOSYSTEM EXTENSIONS"
      title="DevSamp Marketplace & Extensions"
      subtitle="Extend the power of MedERP Pro, Retail POS, and custom platforms with certified add-ons, hardware connectors, and clinical tools."
      primaryAction={{ label: "Publish an Extension", href: "/developers" }}
      secondaryAction={{ label: "App Directory", href: "/apps" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {APPS.map((app, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {app.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{app.category}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {app.name}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>By {app.author}</span>
                <span>•</span>
                <span className="text-amber-500 font-bold flex items-center gap-0.5">
                  ★ {app.rating}
                </span>
                <span>({app.installs})</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {app.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Verified Add-on</span>
              </span>
              <button className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                Install Add-on
              </button>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
