"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, CornerDownRight } from "lucide-react";

const faqs = [
  {
    id: "01",
    question: "How much does a website cost?",
    answer: "Every project is unique. A basic website starts at $499, while custom web applications depend on the complexity. We provide a detailed quote after our initial discovery call."
  },
  {
    id: "02",
    question: "How long does it take to build a website?",
    answer: "On average, a standard business website takes 2-4 weeks. Larger custom projects or e-commerce platforms can take 6-10 weeks depending on the features required."
  },
  {
    id: "03",
    question: "Do you provide support after launch?",
    answer: "Absolutely! We offer 1 month of free support with every project to ensure everything runs smoothly. After that, you can subscribe to our maintenance packages."
  },
  {
    id: "04",
    question: "Will my website be mobile-friendly?",
    answer: "Yes. We follow a 'Mobile-First' approach. Your website will look and perform perfectly on all devices—phones, tablets, and desktops."
  },
  {
    id: "05",
    question: "Can I update the website content myself?",
    answer: "Yes! We build websites using modern CMS (Content Management Systems) or provide a custom dashboard, so you can easily edit text and images without coding."
  }
];

// AI Schema for FAQ
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

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 md:py-24 bg-transparent text-slate-900 relative overflow-hidden">
      
      {/* Inject Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background Ambience */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="mb-10 md:mb-16 text-center select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
            Diagnostics
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
            Common <span className="text-indigo-650 font-extrabold">Queries</span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-semibold">
            Run diagnostic parameters or review the standard documentation logs below.
          </p>
        </div>

        {/* Terminal Accordion Wrapper (Light Theme browser console) */}
        <div className="bg-white/80 rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden backdrop-blur-xl">
          
          {/* Terminal Top Control Bar */}
          <div className="h-11 bg-slate-100/80 border-b border-slate-200/60 px-4 md:px-6 flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            </div>
            <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-mono text-slate-455 font-bold uppercase tracking-wider">
              <Terminal size={11} className="text-indigo-500" />
              <span>guest@devsamp:~ $ help --faq</span>
            </div>
            <div className="w-10"></div>
          </div>

          {/* Terminal Console Panel */}
          <div className="p-4 md:p-6 space-y-3 font-mono">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-2xl ${
                    isOpen 
                      ? "bg-slate-50/50 border-slate-200 shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-slate-50/30"
                  }`}
                >
                  {/* Command Row */}
                  <div
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="p-4 flex items-center justify-between cursor-pointer select-none"
                    data-cursor="Query"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                      <span className="text-indigo-600 font-black">$</span>
                      <span className="text-slate-450 font-bold text-[9px] md:text-xs">get faq-{faq.id}</span>
                      <span className="text-slate-400 select-none">--title</span>
                      <h3 className={`font-sans font-bold text-xs md:text-sm transition-colors pl-1 md:pl-2 ${
                        isOpen ? "text-indigo-650 font-black" : "text-slate-750 hover:text-slate-900"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-1 rounded-full border transition-all duration-305 ${
                      isOpen 
                        ? "rotate-90 text-indigo-600 border-indigo-250 bg-indigo-50" 
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
                        <div className="px-4 pb-4 pl-4 md:pl-7 text-xs text-slate-650 leading-relaxed font-mono flex items-start gap-2 border-t border-slate-200/50 pt-3 bg-white/40 rounded-b-2xl">
                          <CornerDownRight size={12} className="text-indigo-500 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <span className="text-indigo-600 text-[9px] font-bold select-none">[STDOUT] &gt; </span>
                            <span className="font-sans font-medium text-slate-700 text-xs md:text-sm pl-0.5">{faq.answer}</span>
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