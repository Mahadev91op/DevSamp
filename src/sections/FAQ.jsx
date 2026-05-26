"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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

// 🚀 AI Schema for FAQ
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
      
      {/* 🚀 Inject Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background Ambience */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="mb-8 md:mb-16 md:text-center">
          <h2 className="text-3xl md:text-6xl font-black mb-2 md:mb-4 tracking-tight">
            Common <span className="text-indigo-600 font-extrabold">Queries</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-lg font-semibold">
            Got questions? We've got answers.
          </p>
        </div>

        {/* --- FAQ GRID --- */}
        <div className="grid grid-cols-1 gap-3 md:gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className={`group relative rounded-xl md:rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                activeIndex === index 
                  ? "bg-indigo-50/50 border-indigo-200 shadow-sm" 
                  : "bg-white/70 border-slate-200/80 hover:border-slate-350 shadow-sm"
              }`}
              data-cursor="Query"
            >
              
              <div className="relative z-10 p-4 md:p-8 flex items-center gap-3 md:gap-6">
                <span className={`text-lg md:text-2xl font-bold font-mono transition-colors duration-300 ${
                    activeIndex === index ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-650"
                }`}>
                    {faq.id}
                </span>

                <h3 className={`flex-1 text-sm md:text-2xl font-bold transition-colors duration-300 ${
                    activeIndex === index ? "text-slate-900" : "text-slate-700 group-hover:text-slate-950"
                }`}>
                  {faq.question}
                </h3>

                <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border transition-all duration-300 ${
                    activeIndex === index 
                        ? "bg-indigo-600 border-indigo-600 text-white rotate-180" 
                        : "border-slate-300 group-hover:border-slate-400 text-slate-600"
                }`}>
                    {activeIndex === index ? <Minus size={16} className="md:w-5 md:h-5" /> : <Plus size={16} className="md:w-5 md:h-5" />}
                </div>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="px-4 pb-4 md:px-8 md:pb-8 pt-0 pl-4 md:pl-[5.5rem] text-slate-600 text-xs md:text-lg leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeIndex === index && (
                <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none"></div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;