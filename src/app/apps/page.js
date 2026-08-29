import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Grid, Layers, Workflow, ArrowRight } from "lucide-react";

export const metadata = {
  title: "App & Integrations Directory | DevSamp Ecosystem",
  description: "Searchable directory of verified third-party connectors and certified ecosystem tools.",
};

const DIRECTORY_ITEMS = [
  { name: "WhatsApp Business API", type: "Official Connector", desc: "Automated queue tokens and PDF lab report dispatches." },
  { name: "Stripe Payment Gateway", type: "Billing Engine", desc: "Recurring credit card and international billing processing." },
  { name: "Razorpay Payments & UPI", type: "Indian Fintech", desc: "Instant UPI QR codes, net banking, and auto-debit mandates." },
  { name: "Roche & Beckman Analyzer HL7 Bridge", type: "Diagnostics Hardware", desc: "Automated bidirectional lab instrument test imports." }
];

export default function AppDirectoryPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "App Directory", href: "/apps" }]}
      badge="ECOSYSTEM DIRECTORY"
      title="App & Integrations Directory"
      subtitle="Discover all verified software integrations, billing connectors, and medical hardware bridges certified for DevSamp platforms."
      primaryAction={{ label: "Marketplace Hub", href: "/marketplace" }}
      secondaryAction={{ label: "Developer APIs", href: "/developers" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {DIRECTORY_ITEMS.map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase">
              {item.type}
            </span>
            <h2 className="text-base font-bold text-slate-900">{item.name}</h2>
            <p className="text-xs text-slate-600 font-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
