"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultCustomerFaqs = [
  {
    question: "How does DevSamp protect customer privacy and confidential architectures?",
    answer: "We operate under strict Non-Disclosure Agreements (NDAs). Customer logos, public profiles, and relationship details are only published with explicit written consent. All proprietary database schemas, source code, and internal IP remain 100% confidential and secure.",
    category: "Privacy",
  },
  {
    question: "Do customer organizations own the intellectual property (IP) of bespoke systems?",
    answer: "Yes, absolutely. All custom software platforms, backend microservices, cloud deployments, and UI/UX assets engineered for your organization are 100% owned by your company upon project milestone completion.",
    category: "Ownership",
  },
  {
    question: "What long-term support and SLA options are available after deployment?",
    answer: "DevSamp provides continuous SLA monitoring, automated vulnerability scanning, cloud maintenance, and prioritized feature sprint iterations through monthly engineering retainers.",
    category: "Support",
  },
  {
    question: "How do we initialize a new customer relationship or pod retainer?",
    answer: "You can submit an inquiry through our portal or book an architectural scoping consultation. Our senior engineering leads will evaluate your technical specifications and respond within 24 hours.",
    category: "Onboarding",
  },
];

export default function CustomerFAQ({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const displayFaqs = Array.isArray(faqs) && faqs.length > 0 ? faqs : defaultCustomerFaqs;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="ecosystem-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
            <HelpCircle size={13} /> RELATIONSHIP FAQ
          </div>
          <h2 className="text-fluid-h2 font-black mb-3.5 tracking-tight leading-tight text-slate-950">
            Frequently Answered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-fluid-lead font-normal max-w-2xl mx-auto leading-relaxed">
            Clear insights regarding confidentiality, IP transfer, SLA governance, and onboarding protocols.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`border rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-blue-50/20 border-blue-300 shadow-sm" 
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: smoothEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-blue-100/60 pt-4">
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
}
