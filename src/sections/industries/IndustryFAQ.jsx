"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultFaqs = [
  {
    question: "Which industries does DevSamp currently support?",
    answer: "DevSamp actively supports Healthcare (Hospital ERP, EHR, OPD telemetry), Financial Tech (Audited ledgers, payment gateways), Retail & POS (Offline-first billing, multi-location stock sync), and Startups / High-Growth SaaS platforms.",
    category: "Industries"
  },
  {
    question: "Can DevSamp work with our legacy industry database or software?",
    answer: "Yes. Our engineering pods routinely integrate with legacy on-premise relational databases, older SOAP/REST endpoints, hardware terminals (scanners, lab analyzers), and third-party accounting systems.",
    category: "Integration"
  },
  {
    question: "How do you handle industry regulatory compliance (e.g. HIPAA, PCI DSS)?",
    answer: "We design every application with zero-trust architectural boundaries: encrypted data-at-rest (AES-256), encrypted in-transit (TLS 1.3), immutable action logs, strict role-based access control (RBAC), and automated penetration test suites.",
    category: "Compliance"
  },
  {
    question: "Can we combine a DevSamp SaaS product with custom industry development?",
    answer: "Yes. We frequently deploy a core platform like MedERP Pro or DevScale Core and dispatch a dedicated engineering pod to build custom localized modules, proprietary insurance connectors, or bespoke management dashboards.",
    category: "Hybrid"
  },
  {
    question: "Do we retain 100% intellectual property (IP) for custom builds?",
    answer: "Absolutely 100%. All custom database schemas, API connectors, UI components, and proprietary workflows are fully transferred to your business with zero vendor lock-in.",
    category: "Commercial"
  },
  {
    question: "How does an industry discovery engagement begin?",
    answer: "You can reach out through our contact form. We conduct a 30-minute technical workflow audit under NDA and return a detailed system architecture proposal and timeline within 24 to 48 hours.",
    category: "Onboarding"
  }
];

const IndustryFAQ = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqList = faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
            <HelpCircle size={13} className="text-blue-600" />
            <span className="tracking-wide uppercase font-mono">FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
            Clear answers regarding our vertical domain solutions, regulatory compliance, legacy integrations, and IP ownership.
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
                className={`bg-slate-50/70 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-blue-500 shadow-md ring-1 ring-blue-500/10 bg-white" : "border-slate-200/80 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-blue-50 text-blue-600" : ""}`}>
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

export default IndustryFAQ;
