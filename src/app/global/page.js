import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Globe, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Global Regions & Data Residency | DevSamp",
  description: "DevSamp multi-region cloud deployment zones, data residency compliance, and localization support.",
};

const REGIONS = [
  { region: "Asia-Pacific (Mumbai, India)", code: "ap-south-1", desc: "Primary sovereign cloud zone with low latency for Indian hospital networks & retail chains.", status: "Primary Active" },
  { region: "Europe (Frankfurt, Germany)", code: "eu-central-1", desc: "GDPR compliant data storage zone with end-to-end encrypted medical record vaults.", status: "Active" },
  { region: "Middle East (Dubai, UAE)", code: "me-central-1", desc: "Regional low-latency gateway for Gulf healthcare providers and logistics operations.", status: "Active" }
];

export default function GlobalPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Global Regions", href: "/global" }]}
      badge="MULTI-REGION INFRASTRUCTURE"
      title="Global Deployment Regions & Sovereignty"
      subtitle="Run DevSamp products and custom platforms in your country of operation with strict in-region data residency and compliance."
      primaryAction={{ label: "Request Dedicated Region", href: "/contact" }}
      secondaryAction={{ label: "Platform Architecture", href: "/platform" }}
    >
      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REGIONS.map((reg, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{reg.code}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{reg.status}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">{reg.region}</h2>
              <p className="text-xs text-slate-600 font-normal">{reg.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </EcosystemPageShell>
  );
}
