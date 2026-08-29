import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Calendar, Video, Users, ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Events & Webinars | DevSamp Ecosystem",
  description: "Join upcoming engineering deep-dives, keynote product launches, and developer meetups.",
};

const UPCOMING_EVENTS = [
  {
    title: "MedERP Pro v2.5 Keynote: The Autonomous Hospital Workflow",
    date: "September 18, 2026 • 6:00 PM IST",
    type: "Live Keynote & Stream",
    desc: "Demonstrating automated AI discharge summaries, real-time lab analyzer bridging, and voice-assisted clinical charting."
  },
  {
    title: "Architecting Next.js 15 Multi-Tenant SaaS with Zero Technical Debt",
    date: "October 02, 2026 • 7:30 PM IST",
    type: "Engineering Masterclass",
    desc: "Senior architect deep-dive into database sharding, RBAC permission caches, and server action concurrency."
  }
];

export default function EventsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Events", href: "/events" }]}
      badge="LIVE WEBINARS & KEYNOTES"
      title="DevSamp Ecosystem Events"
      subtitle="Connect with our founders, senior architects, and industry leaders during live product demonstrations and engineering masterclasses."
      primaryAction={{ label: "Subscribe for Invites", href: "/newsletter" }}
      secondaryAction={{ label: "Community Forum", href: "/community" }}
    >
      <div className="space-y-6 max-w-4xl">
        {UPCOMING_EVENTS.map((evt, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                {evt.type}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <Clock size={12} />
                <span>{evt.date}</span>
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900">{evt.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{evt.desc}</p>

            <div className="pt-2">
              <Link href="/book-demo">
                <button className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
                  <span>Register Free Attendee Seat</span>
                  <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
