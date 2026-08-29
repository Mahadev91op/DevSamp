import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Cookie, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | DevSamp Ecosystem",
  description: "DevSamp cookie usage, analytical cookies, and user consent management.",
};

export default function CookiePolicyPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Cookie Policy", href: "/cookie-policy" }]}
      badge="LEGAL & PRIVACY"
      title="DevSamp Cookie & Tracking Policy"
      subtitle="How DevSamp uses essential session cookies, performance analytics, and consent preferences across our software platforms."
      primaryAction={{ label: "Privacy Policy", href: "/privacy" }}
      secondaryAction={{ label: "Terms of Service", href: "/terms" }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-4xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. What Are Cookies?</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Cookies are small cryptographic text files stored on your browser when visiting websites or authenticating with SaaS portals. They enable stateful authentication, session security, and preference retention.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Categories of Cookies We Use</h2>
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Essential & Authentication Cookies (Required)</h3>
              <p className="text-xs text-slate-600 mt-1">
                Necessary for logging into your DevSamp account, tenant session verification, and CSRF token protection. Cannot be disabled.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Performance & Diagnostic Telemetry</h3>
              <p className="text-xs text-slate-600 mt-1">
                Anonymous metrics regarding API response latencies, JavaScript error rates, and cluster health to continuously improve reliability.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Managing Your Cookie Preferences</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You can modify your browser settings to reject non-essential cookies. Note that disabling essential cookies may prevent login sessions from functioning properly within MedERP Pro and Customer Portals.
          </p>
        </section>
      </div>
    </EcosystemPageShell>
  );
}
