import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  HelpCircle,
  BookOpen,
  FileText,
  MessageSquare,
  Wrench,
  Video,
  Users,
  PhoneCall,
  ArrowRight,
  Sparkles
} from "lucide-react";
import SupportKnowledgeSearch from "@/components/SupportKnowledgeSearch";

export const metadata = {
  title: "Support & Help Center | DevSamp Ecosystem",
  description: "Search-first customer knowledge base, task guides, troubleshooting, FAQs, and ticket desk.",
};

const SUPPORT_CATEGORIES = [
  { id: "getting-started", name: "Getting Started & Onboarding", desc: "First-time hospital setup, user creation, and database initialization.", icon: BookOpen, badge: "START" },
  { id: "guides", name: "Task-Based Product Guides", desc: "Step-by-step manuals for billing, lab test entry, and barcode printing.", icon: FileText, badge: "DOCS" },
  { id: "faqs", name: "Frequently Asked Questions", desc: "Instant answers on data safety, hardware compatibility, and billing.", icon: MessageSquare, badge: "FAQS" },
  { id: "troubleshooting", name: "Troubleshooting & Error Codes", desc: "Printer offline fixes, sync error resolutions, and network recovery.", icon: Wrench, badge: "FIXES" },
  { id: "videos", name: "Video Tutorials", desc: "High-definition visual walkthroughs of all major software modules.", icon: Video, badge: "VIDEOS" },
  { id: "contact", name: "Contact Support Desk", desc: "Submit urgent tickets or talk with L3 engineering support staff.", icon: PhoneCall, badge: "ASSIST" }
];

export default function SupportPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Support Center", href: "/support" }]}
      badge="CUSTOMER HELP CENTER"
      title="How Can We Assist You Today?"
      subtitle="Search our task guides, onboarding documentation, troubleshooting manuals, or connect directly with our support engineers."
      primaryAction={{ label: "Open Support Ticket", href: "/account/tickets" }}
      secondaryAction={{ label: "System Status", href: "/status" }}
      relatedSection={{
        badge: "USER FORUM",
        title: "Join the DevSamp Community Forum",
        description: "Discuss best practices, share workflows, and connect with healthcare operators and developers.",
        href: "/community",
        actionLabel: "Join Discussions"
      }}
    >
      <div className="space-y-12">
        
        {/* Interactive Search & FAQ Accordion Engine */}
        <SupportKnowledgeSearch />

        {/* Support Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/support/${cat.id}`}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Explore {cat.name.split(" ")[0]}</span>
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
