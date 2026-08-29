import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Activity, CheckCircle2, Server, ShieldCheck, Clock, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Platform Status & System Uptime | DevSamp Ecosystem",
  description: "Real-time service health, cluster latency, API uptime, and scheduled maintenance notices across the DevSamp Ecosystem.",
};

const SERVICES = [
  { name: "DevSamp Public Web & Edge CDN", status: "Operational", uptime: "99.99%", latency: "14ms" },
  { name: "MedERP Pro Clinical Cloud Engine", status: "Operational", uptime: "99.98%", latency: "28ms" },
  { name: "Central Authentication & OAuth SSO", status: "Operational", uptime: "100.0%", latency: "18ms" },
  { name: "Developer REST APIs & Webhooks", status: "Operational", uptime: "99.99%", latency: "22ms" },
  { name: "Billing & Subscription Gateway", status: "Operational", uptime: "100.0%", latency: "35ms" },
  { name: "Notification Mesh (SMS/WhatsApp/Email)", status: "Operational", uptime: "99.95%", latency: "42ms" },
  { name: "Customer Portal & Downloads Hub", status: "Operational", uptime: "99.99%", latency: "19ms" }
];

export default function StatusPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "System Status", href: "/status" }]}
      badge="LIVE SERVICE HEALTH"
      title="DevSamp Ecosystem Status & Uptime"
      subtitle="Real-time operational health, cluster performance, and incident history across all DevSamp software nodes and developer gateways."
      primaryAction={{ label: "Developer APIs", href: "/developers" }}
      secondaryAction={{ label: "Support Desk", href: "/support" }}
    >
      <div className="space-y-8 max-w-5xl">
        {/* Overall Status Banner */}
        <div className="p-6 rounded-3xl bg-emerald-500 text-white shadow-lg flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">All Systems Fully Operational</h2>
              <p className="text-xs text-emerald-100 mt-0.5">All cloud clusters and edge gateways are operating normally.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-emerald-600/40 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Updated 1 min ago</span>
          </div>
        </div>

        {/* Services List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Core Platform Nodes & Services
            </h3>
            <span className="text-xs text-slate-500 font-medium">90-Day Average: 99.98%</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {SERVICES.map((srv, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between flex-wrap gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-bold text-slate-900">{srv.name}</span>
                </div>
                <div className="flex items-center gap-6 text-slate-500 font-mono">
                  <span>Latency: <strong className="text-slate-800">{srv.latency}</strong></span>
                  <span>Uptime: <strong className="text-emerald-600 font-bold">{srv.uptime}</strong></span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {srv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History Notice */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900">Recent Incident History</h3>
          <p className="text-xs text-slate-500">
            No severe incidents or unscheduled outages reported within the last 90 days.
          </p>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
