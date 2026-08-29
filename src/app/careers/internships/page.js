import EcosystemPageShell from "@/components/EcosystemPageShell";
import { GraduationCap, Sparkles, CheckCircle2, Code2, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Internships & Apprenticeships | DevSamp Ecosystem",
  description: "DevSamp early-career engineering program: build production software with senior architects.",
};

export default function InternshipsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Careers", href: "/careers" },
        { label: "Internships & Apprenticeships", href: "/careers/internships" }
      ]}
      badge="TALENT INCUBATOR"
      title="DevSamp Engineering Apprenticeship Program"
      subtitle="Forget making coffee and doing toy tutorials. At DevSamp, apprentices ship real code to production SaaS platforms within their first two weeks under 1-on-1 mentorship."
      primaryAction={{ label: "Apply for Cohort", href: "mailto:devsamp1st@gmail.com?subject=Apprenticeship%20Application%20-%20DevSamp" }}
      secondaryAction={{ label: "View Senior Roles", href: "/careers" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">How the Apprenticeship Works</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We select candidates with a passion for software craftsmanship. You will be paired with a dedicated lead architect and given real responsibility across frontend UI, server actions, REST APIs, or cloud deployment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-indigo-700">Month 1: Foundation & Review</span>
                <p className="text-xs text-slate-600">Deep dive into Next.js 15, atomic CSS, Git workflows, and code review standards.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-indigo-700">Month 2–3: Core Feature Delivery</span>
                <p className="text-xs text-slate-600">Build and deploy production modules for MedERP Pro or client engineering projects.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">What We Look For</h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <span>Strong fundamentals in JavaScript/TypeScript, React, HTML, and CSS layout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <span>High curiosity, attention to detail, and desire to write clean, maintainable software.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <span>Ability to take constructive feedback in code reviews and iterate quickly.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Application Card */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold uppercase">
              Cohort Intake
            </div>
            <h3 className="text-lg font-bold">Rolling Admissions</h3>
            <p className="text-xs text-slate-300">
              We review applications on a rolling weekly basis. Stipend provided based on technical proficiency.
            </p>
            <div className="pt-2">
              <a
                href="mailto:devsamp1st@gmail.com?subject=Apprenticeship%20Application%20-%20DevSamp"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Submit Application (CV + GitHub)</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
