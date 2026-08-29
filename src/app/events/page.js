import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Calendar, Video, Users, ArrowRight, Clock, Play, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Events & Engineering Keynotes | DevSamp Ecosystem",
  description: "Join upcoming engineering deep-dives, keynote product launches, hospital IT summits, and developer masterclasses.",
};

const UPCOMING_EVENTS = [
  {
    title: "MedERP Pro v2.5 Keynote: The Autonomous Hospital Workflow",
    date: "September 18, 2026 • 6:00 PM IST",
    type: "Live Keynote & Stream",
    badge: "FLAGSHIP LAUNCH",
    speaker: "Senior Architecture Team",
    desc: "Demonstrating automated AI discharge summaries, real-time lab analyzer bridging, and voice-assisted clinical charting for 100+ bed hospitals."
  },
  {
    title: "Architecting Next.js 15 Multi-Tenant SaaS with Zero Technical Debt",
    date: "October 02, 2026 • 7:30 PM IST",
    type: "Engineering Masterclass",
    badge: "TECHNICAL DEEP DIVE",
    speaker: "Lead Infrastructure Architect",
    desc: "Senior architect walkthrough of multi-tenant database sharding, RBAC permission caches, and server action concurrency optimizations."
  },
  {
    title: "Offline-First POS Masterclass: Building Resilient Edge Retail Systems",
    date: "October 20, 2026 • 5:00 PM IST",
    type: "Retail Engineering",
    badge: "WORKSHOP",
    speaker: "POS Core Pod",
    desc: "How to handle SQLite local storage, conflict resolution algorithms, and WebUSB thermal printing during prolonged internet drops."
  }
];

const PAST_RECORDINGS = [
  {
    title: "DevSamp Platform Core Architecture Unveiling",
    duration: "45 mins",
    views: "1,800+ engineers",
    desc: "The initial blueprint of our unified identity layer, event bus mesh, and multi-tenant schema isolation."
  },
  {
    title: "Connecting Pathology Analyzers via HL7/ASTM to Next.js",
    duration: "38 mins",
    views: "1,240+ healthcare IT leads",
    desc: "Live code walkthrough of reading raw serial and TCP streams from Roche Cobas and Mindray analyzers."
  }
];

export default function EventsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Events", href: "/events" }]}
      badge="LIVE WEBINARS & KEYNOTES"
      title="DevSamp Ecosystem Events & Masterclasses"
      subtitle="Connect with our founders, senior architects, and industry leaders during live product demonstrations, architecture reviews, and engineering workshops."
      primaryAction={{ label: "Subscribe for Invites", href: "/newsletter" }}
      secondaryAction={{ label: "Community Forum", href: "/community" }}
    >
      <div className="space-y-12 max-w-5xl">
        
        {/* Upcoming Events */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Upcoming Live Sessions</h2>
          <div className="space-y-4">
            {UPCOMING_EVENTS.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 hover:border-blue-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                      {evt.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                      <Clock size={12} />
                      <span>{evt.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {evt.desc}
                  </p>

                  <div className="text-[11px] text-slate-500 font-semibold">
                    Speaker: <strong className="text-slate-800">{evt.speaker}</strong>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link href="/book-demo">
                    <button className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                      <span>Register Free Seat</span>
                      <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Recordings */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">On-Demand Keynotes & Recordings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAST_RECORDINGS.map((rec, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Duration: {rec.duration}</span>
                    <span>{rec.views}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{rec.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{rec.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <Link href="/blog" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Play size={12} fill="currentColor" />
                    <span>Watch Recording on YouTube</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </EcosystemPageShell>
  );
}
