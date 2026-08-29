import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Users, MessageSquare, Sparkles, ArrowRight, Github, Heart } from "lucide-react";

export const metadata = {
  title: "DevSamp Community & User Forums | DevSamp Ecosystem",
  description: "Connect with fellow software builders, healthcare operators, system integrators, and product architects in the DevSamp Community.",
};

const DISCUSSIONS = [
  { topic: "Best practices for setting up offline Bluetooth thermal printers in busy clinics", author: "Dr. Alok Verma", replies: 14, category: "HARDWARE" },
  { topic: "Next.js 15 Server Actions vs Webhooks for asynchronous billing notifications", author: "Priya Sundaram (Lead Architect)", replies: 28, category: "ENGINEERING" },
  { topic: "How to automate lab test package discounts in MedERP Pro pharmacy POS", author: "Rajesh K.", replies: 9, category: "WORKFLOW" }
];

export default function CommunityPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Community", href: "/community" }]}
      badge="USER & BUILDER COMMUNITY"
      title="DevSamp Ecosystem Community"
      subtitle="Join discussions, share architectural feedback, learn workflow tips from other operators, and contribute to open-source tools."
      primaryAction={{ label: "Join Discussion Forum", href: "#discussions" }}
      secondaryAction={{ label: "Developer Portal", href: "/developers" }}
    >
      <div className="space-y-8 max-w-4xl">
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-bold">DevSamp Builders & Operators Exchange</h2>
            <p className="text-xs text-slate-300 mt-0.5">Over 1,200+ healthcare managers, retail operators, and developers collaborating daily.</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md">
            Start New Topic
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Trending Discussions</h3>
          <div className="space-y-3">
            {DISCUSSIONS.map((disc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {disc.category}
                    </span>
                    <span className="text-xs text-slate-400">Started by {disc.author}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{disc.topic}</h4>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-mono shrink-0">
                  <MessageSquare size={13} className="text-indigo-600" />
                  <span>{disc.replies} replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
