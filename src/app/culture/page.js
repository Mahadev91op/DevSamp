import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Heart, Zap, ShieldCheck, CheckCircle2, Code2, Users } from "lucide-react";

export const metadata = {
  title: "Engineering Culture & Craft | DevSamp",
  description: "Our core ethos: extreme craftsmanship, zero technical debt, autonomous pods, and engineering excellence.",
};

const PRINCIPLES = [
  {
    title: "1. Relentless Software Craftsmanship",
    desc: "We write code that is clean, readable, and self-documenting. We do not tolerate quick hacks or messy prototypes disguised as production systems."
  },
  {
    title: "2. Zero Compromise on Latency",
    desc: "Every interaction, query, and API call is benchmarked. We measure performance in milliseconds and optimize for 60fps rendering across all viewports."
  },
  {
    title: "3. Complete Pod Autonomy & Ownership",
    desc: "Engineers have full architectural freedom and responsibility for their systems from design to deployment."
  },
  {
    title: "4. Building for 10–15 Year Longevity",
    desc: "We do not chase transient tech fads. We invest in stable, durable foundations that compound value over decades."
  }
];

export default function CulturePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Culture", href: "/culture" }]}
      badge="ENGINEERING VALUES"
      title="How We Build at DevSamp"
      subtitle="Our cultural operating system is simple: hire extraordinary engineers, give them immense trust, and focus obsessively on product craft."
      primaryAction={{ label: "View Open Roles", href: "/careers" }}
      secondaryAction={{ label: "About Founders", href: "/about" }}
    >
      <div className="space-y-6 max-w-4xl">
        {PRINCIPLES.map((pr, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h2 className="text-lg font-bold text-slate-900">{pr.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{pr.desc}</p>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
