import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Sparkles, Star, Quote, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Testimonials & Reviews | DevSamp Ecosystem",
  description: "Verified reviews and client feedback on DevSamp software platforms and engineering pods.",
};

const REVIEWS = [
  {
    name: "Dr. Arvind Mehta",
    role: "Managing Director",
    org: "Lifeline Specialty Hospital",
    feedback: "MedERP Pro transformed our entire hospital workflow. OPD billing is instant, doctors access reports without lag, and our inventory leakage dropped to zero. DevSamp's team is extraordinarily responsive.",
    rating: 5,
    verified: true
  },
  {
    name: "Pooja Singhania",
    role: "Chief Technology Officer",
    org: "ZestRetail Outlets",
    feedback: "We replaced our legacy billing software with DevSamp's offline POS. Billing runs at sub-second speed even during network outages. The automated multi-branch sync saved our accounting team hundreds of hours.",
    rating: 5,
    verified: true
  },
  {
    name: "Marcus Vance",
    role: "Founder & CEO",
    org: "AuraCloud Platforms (London)",
    feedback: "DevSamp's dedicated engineering pod built our Next.js 15 SaaS architecture with extreme care. Zero technical debt, impeccable code standards, and seamless delivery.",
    rating: 5,
    verified: true
  }
];

export default function TestimonialsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Testimonials", href: "/testimonials" }]}
      badge="VERIFIED CUSTOMER VOICE"
      title="Trusted by Doctors, Retailers & Founders"
      subtitle="Read verified feedback from operators and technical leaders who power their mission-critical operations with the DevSamp Ecosystem."
      primaryAction={{ label: "Read Case Studies", href: "/case-studies" }}
      secondaryAction={{ label: "Explore Customers", href: "/customers" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 size={11} />
                    <span>Verified Client</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{rev.feedback}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="font-bold text-sm text-slate-950">{rev.name}</p>
              <p className="text-xs text-slate-500">{rev.role} • {rev.org}</p>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
