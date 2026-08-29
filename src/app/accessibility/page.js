import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Eye, CheckCircle2, Heart } from "lucide-react";

export const metadata = {
  title: "Accessibility Statement | DevSamp Ecosystem",
  description: "DevSamp's commitment to digital accessibility, WCAG 2.1 AA compliance, and inclusive software.",
};

export default function AccessibilityPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Accessibility", href: "/accessibility" }]}
      badge="INCLUSIVE ENGINEERING"
      title="DevSamp Accessibility Statement"
      subtitle="We are committed to ensuring digital accessibility for all users, including individuals with visual, auditory, cognitive, and motor impairments."
      primaryAction={{ label: "Report Accessibility Feedback", href: "mailto:devsamp1st@gmail.com?subject=Accessibility%20Feedback" }}
      secondaryAction={{ label: "Platform Overview", href: "/about" }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8 max-w-4xl">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Standards & Conformance</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The DevSamp web ecosystem and SaaS application suites aim to conform with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA criteria. Our UI design system enforces high color contrast ratios (minimum 4.5:1 for normal text), scalable fonts, and responsive layout reflows.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Key Accessibility Features Implemented</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              <span>Full keyboard navigability with visible focus indicators for all interactive buttons, inputs, and modals.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              <span>ARIA roles, descriptive label attributes, and semantic HTML5 landmark tags across all screen readers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              <span>Support for OS-level reduced motion preferences and high-contrast dark/light mode switches.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Continuous Improvement & Contact</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            If you encounter any accessibility barrier on our website or within our software suites, please contact our team at <span className="font-mono text-indigo-600 font-bold">devsamp1st@gmail.com</span>. We treat accessibility bugs as critical tier-1 issues.
          </p>
        </section>
      </div>
    </EcosystemPageShell>
  );
}
