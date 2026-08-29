import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Workflow,
  MessageSquare,
  CreditCard,
  Activity,
  ArrowRight,
  Printer,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Integrations & Certified Connectors | DevSamp Ecosystem",
  description: "Native connectors, payment gateways, messaging tools, medical device bridges, and ERP integrations certified for DevSamp platforms.",
};

const INTEGRATION_CATEGORIES = [
  {
    category: "Messaging & Patient Telemetry",
    connectors: [
      { name: "WhatsApp Business Cloud API", desc: "Automated queue tokens, lab report PDF delivery, and doctor appointment reminders.", badge: "OFFICIAL", type: "Webhooks" },
      { name: "Twilio SMS & Voice Gateway", desc: "Transactional SMS fallback and automated IVR patient appointment confirmations.", badge: "VERIFIED", type: "REST API" },
      { name: "SendGrid Encrypted Email Relay", desc: "HIPAA-ready encrypted clinical discharge summaries and billing receipts.", badge: "VERIFIED", type: "SMTP / API" }
    ]
  },
  {
    category: "Fintech, Banking & Tax Ledgers",
    connectors: [
      { name: "Razorpay & UPI Instant Settlement", desc: "Dynamic QR code generation on billing counters, auto-reconciliation, and refunds.", badge: "CERTIFIED", type: "Gateway" },
      { name: "Stripe Global Multi-Currency", desc: "Recurring credit card subscriptions, invoicing, and cross-border billing mandates.", badge: "CERTIFIED", type: "Gateway" },
      { name: "Tally ERP & Prime Ledger Sync", desc: "Automated daily sales sync, batch inventory vouchers, and GST tax ledger posting.", badge: "ERP BRIDGE", type: "Local Bridge" }
    ]
  },
  {
    category: "Clinical Diagnostics & Laboratory Devices",
    connectors: [
      { name: "Roche Cobas & Elecsys Bridge", desc: "Bidirectional ASTM/HL7 interface importing raw serum sample analyzer results.", badge: "HL7 HARDWARE", type: "Bidirectional" },
      { name: "Beckman Coulter Access & AU", desc: "Real-time automated specimen barcode query and diagnostic result capture.", badge: "HL7 HARDWARE", type: "TCP/IP Socket" },
      { name: "Mindray Hematology Analyzer Sync", desc: "Complete CBC parameter parsing with automated quality control flags.", badge: "HARDWARE", type: "Serial / IP" }
    ]
  },
  {
    category: "Printers, Barcodes & Cloud Storage",
    connectors: [
      { name: "ESC/POS Thermal Receipt Printers", desc: "Sub-second 80mm/58mm thermal receipt printing via direct USB, Bluetooth & Network.", badge: "HARDWARE", type: "WebUSB" },
      { name: "Zebra ZPL Barcode Printers", desc: "Instant patient wristband and specimen vial cryogenic barcode printing.", badge: "HARDWARE", type: "ZPL Stream" },
      { name: "AWS S3 & Cloudflare R2 Vault", desc: "Encrypted DICOM radiology scan storage and immutable hourly database backups.", badge: "STORAGE", type: "S3 API" }
    ]
  }
];

export default function ProductIntegrationsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Integrations", href: "/products/integrations" }
      ]}
      badge="CONNECTIVITY MESH"
      title="Ecosystem Integrations & Certified Connectors"
      subtitle="Connect DevSamp software with payment gateways, clinical laboratory machines, WhatsApp bots, and enterprise ledgers with zero custom coding."
      primaryAction={{ label: "Developer Webhooks", href: "/developers/webhooks" }}
      secondaryAction={{ label: "App Directory", href: "/apps" }}
    >
      <div className="space-y-10 max-w-5xl">
        {INTEGRATION_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide text-xs">
                {cat.category}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cat.connectors.map((conn, cIdx) => (
                <div
                  key={cIdx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {conn.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {conn.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {conn.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {conn.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                    <CheckCircle2 size={13} />
                    <span>Certified Compatible</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
