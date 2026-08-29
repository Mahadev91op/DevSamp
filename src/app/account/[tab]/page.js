import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Boxes,
  CreditCard,
  FileText,
  Download,
  LifeBuoy,
  Users,
  Key,
  ShieldCheck,
  History,
  Bell,
  CheckCircle2,
  ArrowRight,
  Plus,
  Copy
} from "lucide-react";

const TAB_TITLES = {
  products: { name: "My Products & Licenses", badge: "LICENSES", desc: "Manage deployed software instances and branch licenses." },
  subscriptions: { name: "Subscriptions & Plans", badge: "BILLING CYCLE", desc: "View active recurring plans, renewals, and tier upgrades." },
  invoices: { name: "Billing & Invoices", badge: "GST RECEIPTS", desc: "Download tax receipts, update payment cards, and view transaction history." },
  downloads: { name: "Downloads & Releases", badge: "INSTALLERS", desc: "Download POS desktop installers, offline backup utilities, and APKs." },
  updates: { name: "Product Updates", badge: "CHANGELOG", desc: "Release history and new features rolled out to your instances." },
  tickets: { name: "Support Tickets", badge: "24/7 SLA", desc: "Create urgent support tickets, track resolutions, and chat with L3 engineers." },
  notifications: { name: "System Notifications", badge: "ALERTS", desc: "Important billing, product update, and security alerts." },
  team: { name: "Team & Permissions (RBAC)", badge: "ORGANIZATION", desc: "Manage organization members, assign roles, and configure permissions." },
  organization: { name: "Organization Settings", badge: "SETTINGS", desc: "Configure company profile, GSTIN, timezone, and billing address." },
  security: { name: "Security & MFA Settings", badge: "SECURITY", desc: "Configure two-factor authentication, active sessions, and password security." },
  "api-keys": { name: "Developer API Keys", badge: "CREDENTIALS", desc: "Generate sandbox and production API keys and webhook secrets." },
  "audit-log": { name: "Audit & Activity Log", badge: "SECURITY LOG", desc: "Immutable records of organization actions, member invites, and data exports." }
};

export async function generateMetadata({ params }) {
  const { tab } = await params;
  const info = TAB_TITLES[tab] || { name: "Customer Portal Tab" };
  return {
    title: `${info.name} | Customer Portal • DevSamp`,
    description: info.desc || "DevSamp Customer Account Console.",
  };
}

export default async function AccountTabPage({ params }) {
  const { tab } = await params;
  const info = TAB_TITLES[tab] || {
    name: tab.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    badge: "ACCOUNT",
    desc: "Manage your DevSamp client account settings and assets."
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Customer Portal", href: "/account" },
        { label: info.name, href: `/account/${tab}` }
      ]}
      badge={info.badge}
      title={info.name}
      subtitle={info.desc}
      primaryAction={{ label: "Account Overview", href: "/account" }}
      secondaryAction={{ label: "Support Desk", href: "/account/tickets" }}
    >
      <div className="space-y-6 max-w-4xl">
        
        {/* TAB SPECIFIC CONTENT */}
        {tab === "products" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">MedERP Pro Hospital Cloud (Main Branch)</h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Active • v2.4.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Domain: <span className="font-mono text-indigo-600 font-bold">apexcare.mederp.online</span> • 100 Beds Licensed</p>
              </div>
              <Link href="/products/mederp-pro" className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs">
                Launch App
              </Link>
            </div>
          </div>
        )}

        {tab === "api-keys" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Live API Credentials</h3>
                <p className="text-xs text-slate-500">Use these keys to authenticate requests from your custom software or scripts.</p>
              </div>
              <button className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Plus size={14} />
                <span>Generate Key</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 flex items-center justify-between">
              <span>devsamp_live_pk_88301923984719283719</span>
              <button className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors" title="Copy Key">
                <Copy size={13} />
              </button>
            </div>
          </div>
        )}

        {tab === "tickets" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Support Tickets (SLA: 15 mins)</h3>
              <button className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
                <Plus size={14} />
                <span>Create New Ticket</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">#TCK-9921: Barcode scanner configuration assistance</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Resolved</span>
              </div>
              <p className="text-xs text-slate-500">Updated 2 days ago by Senior Architect</p>
            </div>
          </div>
        )}

        {/* Fallback for other tabs */}
        {tab !== "products" && tab !== "api-keys" && tab !== "tickets" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Manage {info.name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All settings, data logs, and options for {info.name.toLowerCase()} are synchronized across your DevSamp organization.
            </p>
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
              <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
              <span className="text-xs text-indigo-950 font-medium">All settings in this section are currently active and in compliance with your organization policy.</span>
            </div>
          </div>
        )}

      </div>
    </EcosystemPageShell>
  );
}
