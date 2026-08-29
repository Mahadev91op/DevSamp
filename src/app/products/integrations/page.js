import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Workflow, MessageSquare, CreditCard, Activity, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Product Integrations & Connectors | DevSamp Ecosystem",
  description: "Native connectors, payment gateways, messaging tools, and ERP integrations compatible with DevSamp software.",
};

const INTEGRATIONS = [
  { name: "WhatsApp Business API", category: "Messaging", desc: "Automated OPD queue tickets, PDF bills, and appointment reminders.", badge: "POPULAR" },
  { name: "Stripe & Razorpay", category: "Payments", desc: "Multi-currency credit cards, UPI, net banking, and recurring mandates.", badge: "BILLING" },
  { name: "Laboratory Analyzer Connectors (HL7 / ASTM)", category: "Healthcare Hardware", desc: "Bidirectional sync with hematology, biochemistry, and immunoassay machines.", badge: "CLINICAL" },
  { name: "Tally & QuickBooks Sync", category: "Accounting", desc: "Automated day-end ledger sync, tax computation, and GST filing exports.", badge: "FINANCE" },
  { name: "Twilio & SendGrid", category: "Notifications", desc: "High-deliverability transactional SMS and encrypted email dispatches.", badge: "MESH" },
  { name: "Amazon S3 & Cloudflare R2", category: "Storage", desc: "Encrypted DICOM radiology scans and document backup storage.", badge: "STORAGE" }
];

export default function ProductIntegrationsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Integrations", href: "/products/integrations" }
      ]}
      badge="CONNECTIVITY MESH"
      title="Ecosystem Integrations & Connectors"
      subtitle="Easily connect DevSamp software with payment gateways, clinical lab equipment, WhatsApp bots, and enterprise ledgers."
      primaryAction={{ label: "Developer Webhooks", href: "/developers/webhooks" }}
      secondaryAction={{ label: "Explore Apps", href: "/apps" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTEGRATIONS.map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3">
            <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
              {item.badge}
            </span>
            <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{item.category}</p>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
