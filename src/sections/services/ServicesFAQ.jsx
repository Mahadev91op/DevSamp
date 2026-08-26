"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultFaqs = [
  {
    question: "What engineering services does DevSamp specialize in?",
    answer: "DevSamp specializes in high-throughput fullstack web application development (Next.js & React 19), custom SaaS architecture, complex backend API gateways, database performance tuning (MongoDB / Redis), and healthcare / enterprise ERP engineering.",
    category: "Services"
  },
  {
    question: "Can DevSamp work with our existing codebase or legacy systems?",
    answer: "Yes. Our engineering pods frequently audit, refactor, and modernize legacy monolithic applications into decoupled microservices, optimize slow database queries, or build standalone API middleware to integrate existing infrastructure with modern web frontends.",
    category: "Architecture"
  },
  {
    question: "Do we own the full intellectual property (IP) and source code?",
    answer: "Absolutely 100%. Upon completion and payment of milestones, full intellectual property, source code, database schemas, Figma design systems, and deployment configurations are transferred entirely to your organization with zero vendor lock-in.",
    category: "Commercial"
  },
  {
    question: "How do your engineering pods operate on a day-to-day basis?",
    answer: "Our pods operate in 2-week sprint cycles with daily asynchronous updates, direct private Slack/Discord channel access, sprint backlog prioritization, and weekly live demo sessions with your team.",
    category: "Delivery"
  },
  {
    question: "Does DevSamp provide ongoing maintenance and SLA support after launch?",
    answer: "Yes. We offer continuous SLA retainers covering 24/7 uptime monitoring, critical security patching, library upgrades, quarterly performance audits, and dedicated monthly hours for new feature iterations.",
    category: "SLA"
  },
  {
    question: "How do we get started with a new project or custom architectural scope?",
    answer: "You can book a discovery call through our contact section. We typically schedule a 30-minute technical discovery call, review requirements under NDA, and provide a comprehensive architecture blueprint and proposal within 24 to 48 hours.",
    category: "Onboarding"
  }
];

const ServicesFAQ = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqList = faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
            <HelpCircle size={13} className="text-indigo-600" />
            <span className="tracking-wide uppercase font-mono">FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Clear answers regarding our engineering pods, IP ownership, project lifecycle, and delivery standards.
          </p>
        </div>

        {/* Accordion FAQ Container */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: smoothEase, delay: idx * 0.04 }}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-indigo-500 shadow-md ring-1 ring-indigo-500/10" : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-indigo-50 text-indigo-600" : ""}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm font-normal leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesFAQ;
