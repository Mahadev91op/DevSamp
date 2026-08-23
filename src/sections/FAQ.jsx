"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, CornerDownRight, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const faqs = [
  {
    id: "01",
    question: "What is the DevSamp Ecosystem and how does it work?",
    answer: "DevSamp is a connected technology ecosystem that combines vertical SaaS software products, bespoke fullstack engineering services, and open developer infrastructure. Clients can license pre-built software products, commission custom engineering pods, or integrate via our developer APIs."
  },
  {
    id: "02",
    question: "Can we license a DevSamp software product (like MedERP) and request custom extensions?",
    answer: "Yes! All DevSamp products are engineered with modular microservices and open API gateways. We can deploy a dedicated private instance and customize workflows specifically for your enterprise requirements."
  },
  {
    id: "03",
    question: "What tech stack and engineering standards do you use?",
    answer: "Our core stack is built on Next.js 15 App Router, React 19, Tailwind CSS, Node.js microservices, and MongoDB Atlas. All codebases adhere to strict TypeScript/JavaScript conventions, automated CI/CD linting, and 100 PageSpeed optimization."
  },
  {
    id: "04",
    question: "Do you offer post-launch SLA, security patching, and maintenance?",
    answer: "Yes, every custom project and SaaS deployment includes dedicated post-launch warranty and SLA support. We offer tiered engineering retainers for 24/7 monitoring, security patches, and ongoing feature development."
  },
  {
    id: "05",
    question: "How do we initialize a project or schedule an architectural discovery call?",
    answer: "You can submit your project parameters directly through our interactive contact compiler below or email us at devsamp1st@gmail.com. Our engineering lead will review your specifications and schedule a discovery call within 24 hours."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const FAQ = ({ sectionData = null }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const badge = sectionData?.badge || "Diagnostics";
  const title = sectionData?.title || "Frequently Asked Questions";
  const description = sectionData?.description || "Run diagnostic queries or explore documentation regarding project scoping, product licensing, and SLA terms.";

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      {/* Inject Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background Ambience */}
      <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="ecosystem-container max-w-3xl relative z-10">
        
        {/* Header */}
        <div className="mb-10 md:mb-14 text-center select-none min-w-0">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3"
          >
            <Sparkles size={12} /> {badge}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
            className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
            className="text-slate-600 text-fluid-body font-normal max-w-lg mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* Terminal Accordion Wrapper */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden min-w-0">
          
          {/* Terminal Top Control Bar */}
          <div className="h-11 bg-slate-100/90 border-b border-slate-200/70 px-4 md:px-6 flex items-center justify-between select-none min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider truncate">
              <Terminal size={12} className="text-indigo-600 shrink-0" />
              <span className="truncate">guest@devsamp:~ $ help --ecosystem-faq</span>
            </div>
            <div className="w-6 shrink-0"></div>
          </div>

          {/* Terminal Console Panel */}
          <div className="p-3.5 md:p-5 space-y-2.5 font-mono min-w-0">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-2xl min-w-0 ${
                    isOpen 
                      ? "bg-slate-50/80 border-slate-200 shadow-xs" 
                      : "bg-transparent border-transparent hover:bg-slate-50/40"
                  }`}
                >
                  {/* Command Row */}
                  <div
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="p-3.5 md:p-4 flex items-center justify-between cursor-pointer select-none min-w-0 gap-3"
                    data-cursor="Query"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm min-w-0 flex-1">
                      <span className="text-indigo-600 font-black shrink-0">$</span>
                      <span className="text-slate-400 font-bold text-[11px] shrink-0">get faq-{faq.id}</span>
                      <h3 className={`font-sans font-bold text-xs sm:text-sm transition-colors pl-1 min-w-0 flex-1 truncate ${
                        isOpen ? "text-indigo-700 font-black" : "text-slate-800 hover:text-slate-950"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-1 rounded-full border transition-all duration-300 shrink-0 ${
                      isOpen 
                        ? "rotate-90 text-indigo-600 border-indigo-200 bg-indigo-50" 
                        : "text-slate-400 border-slate-200 bg-white"
                    }`}>
                      <ChevronRight size={13} />
                    </div>
                  </div>

                  {/* STDOUT Response Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      >
                        <div className="px-4 pb-4 pl-4 md:pl-7 text-xs text-slate-700 leading-relaxed font-mono flex items-start gap-2 border-t border-slate-200/60 pt-3 bg-slate-50/60 rounded-b-2xl min-w-0">
                          <CornerDownRight size={13} className="text-indigo-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="text-indigo-600 text-[10px] font-bold select-none">[STDOUT] &gt; </span>
                            <span className="font-sans font-normal text-slate-600 text-xs sm:text-sm pl-0.5 leading-relaxed block">{faq.answer}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;