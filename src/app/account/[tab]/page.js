import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import AccountTabConsole from "@/components/AccountTabConsole";

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
      primaryAction={{ label: "Account Console", href: "/account" }}
      secondaryAction={{ label: "Support Desk", href: "/account/tickets" }}
    >
      <div className="max-w-4xl">
        <AccountTabConsole tab={tab} />
      </div>
    </EcosystemPageShell>
  );
}
