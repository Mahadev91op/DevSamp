import EcosystemPageShell from "@/components/EcosystemPageShell";
import { HelpCircle, Search, BookOpen, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Technology & SaaS Architecture Glossary | DevSamp",
  description: "A-Z encyclopedia of modern SaaS architecture, clinical healthcare IT terms, and cloud infrastructure concepts.",
};

const GLOSSARY_TERMS = [
  {
    term: "Multi-Tenancy",
    category: "Architecture",
    def: "A software architecture in which a single physical instance of software serves multiple distinct customer organizations (tenants), with strict logical database and schema isolation."
  },
  {
    term: "HL7 / ASTM Device Protocol",
    category: "Healthcare IT",
    def: "International data standards for healthcare and pathology instruments, enabling medical analyzers to automatically transmit patient test specimens and results directly to the clinical ERP."
  },
  {
    term: "Offline-First Local Sync",
    category: "Retail Architecture",
    def: "An application design philosophy where POS terminals write transactions directly to an encrypted local database (like SQLite) first, allowing full speed billing during internet outages with background cloud reconciliation."
  },
  {
    term: "Role-Based Access Control (RBAC)",
    category: "Security",
    def: "A security method that restricts system access to authorized users based on predefined organizational roles (e.g. Hospital Director, Chief Clinician, Pharmacy Manager, Billing Staff)."
  },
  {
    term: "Idempotent Webhook Relays",
    category: "Developer APIs",
    def: "Webhook handling logic engineered so that receiving duplicate network retry events produces the exact same outcome without duplicating patient tokens, invoices, or payment transactions."
  },
  {
    term: "ESC/POS Thermal Raster Driver",
    category: "Hardware",
    def: "A standardized command protocol developed for controlling receipt printers. DevSamp includes WebUSB and Bluetooth drivers to print sub-second receipts directly without driver bloat."
  },
  {
    term: "ICD-10 Diagnostic Coding",
    category: "Clinical Standards",
    def: "The International Classification of Diseases 10th Revision used by medical practitioners and insurance providers to classify diseases, symptoms, and clinical procedures."
  },
  {
    term: "Retrieval-Augmented Generation (RAG)",
    category: "Applied AI",
    def: "An AI architecture that enhances large language models by retrieving factual records from private vector embeddings (such as clinical medical logs) before generating responses."
  },
  {
    term: "Zero-Downtime Blue-Green Deployment",
    category: "Cloud & DevOps",
    def: "A deployment strategy where two identical production environments (Blue and Green) exist. Traffic is switched instantly via DNS/Nginx once the new version is verified."
  },
  {
    term: "Token Bucket Rate Limiting",
    category: "API Gateway",
    def: "An algorithm used in DevSamp developer gateways to limit the rate of API calls, preventing burst traffic from exhausting server capacity while allowing brief spikes."
  },
  {
    term: "DICOM (Digital Imaging in Medicine)",
    category: "Radiology",
    def: "The international standard protocol for storing, printing, and transmitting medical imaging information like X-Rays, CT scans, and MRI data."
  },
  {
    term: "DPDP Act & HIPAA Compliance",
    category: "Data Privacy",
    def: "Digital Personal Data Protection and Health Insurance Portability legislation governing data sovereignty, patient consent, encryption at rest, and audit trail logs."
  }
];

export default function GlossaryPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Glossary", href: "/glossary" }]}
      badge="TECH ENCYCLOPEDIA"
      title="Technology & SaaS Architecture Glossary"
      subtitle="Clear, authoritative definitions of key concepts in modern SaaS architectures, healthcare IT systems, and cloud infrastructure."
      primaryAction={{ label: "Developer Docs", href: "/docs" }}
      secondaryAction={{ label: "Guides & Playbooks", href: "/guides" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl">
        {GLOSSARY_TERMS.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900">{item.term}</h2>
                <span className="text-[9px] sm:text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase shrink-0">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.def}</p>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
