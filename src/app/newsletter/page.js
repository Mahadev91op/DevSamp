"use client";

import { useState } from "react";
import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Mail, CheckCircle2, Sparkles, Send, BookOpen, Clock } from "lucide-react";

const PAST_EDITIONS = [
  { issue: "Edition #24", date: "August 2026", title: "Reducing Hospital Discharge Checkout Latency to 38ms with Next.js 15 Server Actions" },
  { issue: "Edition #23", date: "July 2026", title: "Offline-First Synchronization: Handling Network Partitions in 18-Store Retail Networks" },
  { issue: "Edition #22", date: "June 2026", title: "Why We Switched to WebUSB for ESC/POS Thermal Printing (and Deleted 4 Heavy Drivers)" }
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
    }
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Newsletter", href: "/newsletter" }]}
      badge="MONTHLY DISPATCH"
      title="The DevSamp Engineering Dispatch"
      subtitle="Read by thousands of software architects, hospital IT leads, and retail operators. Curated monthly deep-dives on real-world system designs, benchmarks, and platform updates."
      primaryAction={{ label: "Read Past Devlogs", href: "/blog" }}
      secondaryAction={{ label: "Explore Guides", href: "/guides" }}
    >
      <div className="space-y-12 max-w-4xl mx-auto">
        
        {/* Subscription Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Mail size={22} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Direct to Your Inbox</h2>
            <p className="text-xs text-slate-500">Zero spam. Pure technical architecture and product release insights.</p>
          </div>

          {isSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm">You are subscribed!</h3>
              <p className="text-xs text-emerald-700">Thank you for joining. You will receive our next monthly engineering dispatch directly at {email}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:border-blue-600 outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={14} />
                <span>Subscribe to Engineering Dispatches</span>
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              You can unsubscribe at any time with 1-click. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Past Editions Teaser */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 text-center">Recent Newsletter Editions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PAST_EDITIONS.map((ed, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{ed.issue}</span>
                  <p className="text-[11px] text-slate-400 font-mono">{ed.date}</p>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{ed.title}</h4>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <Link href="/blog" className="text-[11px] font-bold text-blue-600 hover:underline">
                    Read Article →
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
