import EcosystemPageShell from "@/components/EcosystemPageShell";
import { HelpCircle, Search } from "lucide-react";

export const metadata = {
  title: "Technology & SaaS Glossary | DevSamp",
  description: "A-Z encyclopedia of modern SaaS architecture, healthcare IT terms, and cloud infrastructure concepts.",
};

const GLOSSARY_TERMS = [
  { term: "Multi-Tenancy", def: "A software architecture in which a single instance of software runs on a server and serves multiple distinct customer organizations (tenants), with strict logical data isolation." },
  { term: "HL7 / ASTM", def: "International standards for electronic data exchange in healthcare environments, enabling medical and laboratory analyzer devices to transmit test results directly to ERPs." },
  { term: "Offline-First Sync", def: "An application design philosophy where client apps write data directly to a local database (like SQLite) first, allowing full offline operation, and synchronize with the cloud when connected." },
  { term: "Role-Based Access Control (RBAC)", def: "A security method that restricts system access to authorized users based on predefined roles (e.g. Doctor, Nurse, Billing Clerk, Super Admin)." },
  { term: "Idempotent Webhooks", def: "Webhook handling logic engineered so that receiving duplicate delivery events produces the exact same outcome without creating duplicate invoices or orders." }
];

export default function GlossaryPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Glossary", href: "/glossary" }]}
      badge="TECH ENCYCLOPEDIA"
      title="Technology & SaaS Glossary"
      subtitle="Clear definitions of key concepts in modern SaaS architectures, healthcare IT systems, and cloud infrastructure."
      primaryAction={{ label: "Developer Docs", href: "/docs" }}
    >
      <div className="space-y-4 max-w-4xl">
        {GLOSSARY_TERMS.map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1.5">
            <h2 className="text-base font-bold text-slate-900">{item.term}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.def}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
