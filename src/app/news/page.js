import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Bell, ArrowRight, Calendar, Sparkles } from "lucide-react";

export const metadata = {
  title: "News & Company Announcements | DevSamp Ecosystem",
  description: "Official DevSamp press releases, product updates, and ecosystem milestones.",
};

const NEWS_ITEMS = [
  {
    date: "Aug 2026",
    tag: "PRODUCT LAUNCH",
    title: "MedERP Pro v2.4 Released with AI-Assisted Clinical Notes & Automated ICD-10 Coding",
    desc: "Major update introducing automated discharge summaries, real-time lab analyzer connectors, and multi-branch inventory reordering."
  },
  {
    date: "July 2026",
    tag: "ECOSYSTEM EXPANSION",
    title: "DevSamp Platform Core Unifies Developer Portals and Webhook Mesh",
    desc: "Centralized identity and event bus architecture enables third-party software developers to build extensions directly for DevSamp platforms."
  },
  {
    date: "June 2026",
    tag: "PARTNERSHIP",
    title: "DevSamp Announces Enterprise Cloud Partnership with Geo-Redundant Tier-4 Data Centers",
    desc: "Enhanced data sovereignty and 99.99% uptime SLAs guarantee mission-critical reliability for healthcare networks across Asia and EMEA."
  }
];

export default function NewsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "News & Announcements", href: "/news" }]}
      badge="OFFICIAL DISPATCHES"
      title="Company Announcements & Releases"
      subtitle="The latest news, ecosystem updates, executive announcements, and platform release dispatches from DevSamp."
      primaryAction={{ label: "Subscribe to Devlogs", href: "/newsletter" }}
      secondaryAction={{ label: "Engineering Blog", href: "/blog" }}
    >
      <div className="space-y-6 max-w-4xl">
        {NEWS_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                {item.tag}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Calendar size={12} />
                <span>{item.date}</span>
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {item.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
