import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  LayoutDashboard,
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
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Customer Account Portal | DevSamp Ecosystem",
  description: "Centralized client console: active licenses, pod retainers, billing invoices, support tickets, and API keys.",
};

const ACCOUNT_HUBS = [
  { id: "products", name: "My Products & Licenses", desc: "View deployed software instances, branch keys, and tenant domains.", icon: Boxes, badge: "ACTIVE" },
  { id: "subscriptions", name: "Subscriptions & Plans", desc: "Manage plan renewals, seat limits, upgrades, and billing cycles.", icon: CreditCard, badge: "BILLING" },
  { id: "invoices", name: "Billing & Invoices", desc: "Download GST tax receipts, payment histories, and update card details.", icon: FileText, badge: "RECEIPTS" },
  { id: "downloads", name: "Downloads & Releases", desc: "Desktop POS installers, offline backup utilities, and mobile APKs.", icon: Download, badge: "FILES" },
  { id: "tickets", name: "Support Tickets", desc: "Create urgent support tickets, track bug fixes, and chat with L3 engineers.", icon: LifeBuoy, badge: "24/7 SLA" },
  { id: "team", name: "Team & Permissions (RBAC)", desc: "Invite team members, assign Owner/Admin/Doctor roles, and revoke access.", icon: Users, badge: "RBAC" },
  { id: "api-keys", name: "Developer API Keys", desc: "Generate sandbox and production credentials for webhook integrations.", icon: Key, badge: "KEYS" },
  { id: "security", name: "Security & MFA Settings", desc: "Two-factor authentication (2FA), active sessions, and password resets.", icon: ShieldCheck, badge: "SECURITY" },
  { id: "audit-log", name: "Audit & Activity Log", desc: "Immutable cryptographic logs of logins, permission changes, and exports.", icon: History, badge: "AUDIT" }
];

export default function AccountPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Customer Portal", href: "/account" }]}
      badge="CENTRAL IDENTITY LAYER"
      title="DevSamp Client Account Portal"
      subtitle="One unified identity console to manage all your subscribed software platforms, engineering pod retainers, invoices, and developer credentials."
      primaryAction={{ label: "Open Support Ticket", href: "/account/tickets" }}
      secondaryAction={{ label: "Manage Subscriptions", href: "/account/subscriptions" }}
      relatedSection={{
        badge: "DEVELOPER APIS",
        title: "Developer Portal & Webhooks",
        description: "Need to connect your billing or custom software? Access full API specifications and SDKs.",
        href: "/developers",
        actionLabel: "View Developer Hub"
      }}
    >
      <div className="space-y-8">
        {/* Quick User Status Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md">
              DS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-950">DevSamp Client Organization</h2>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                  Verified Org
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Tenant ID: <span className="font-mono text-slate-700 font-bold">org_884219_prod</span> • Tier: Professional Cloud</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Sign In with Another Account
            </Link>
          </div>
        </div>

        {/* Account Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCOUNT_HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <Link
                key={hub.id}
                href={`/account/${hub.id}`}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {hub.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {hub.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {hub.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Manage {hub.name.split(" ")[0]}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </EcosystemPageShell>
  );
}
