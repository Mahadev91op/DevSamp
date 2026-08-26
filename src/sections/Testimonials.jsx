"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, Plus, X, Loader2, Send, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const Testimonials = ({ initialReviews = [], sectionData = null }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", rating: 5, text: "" });

  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const badge = sectionData?.badge || "Client Stories";
  const title = sectionData?.title || "Trusted by Builders & Industry Leaders";
  const description = sectionData?.description || "Real feedback from founders and engineering leaders building with the DevSamp ecosystem.";

  // Auto-scroll logic with pause on hover/touch
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const scroll = () => {
      if (!isPaused && scrollContainer) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 0.8;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", role: "", rating: 5, text: "" });
        setIsModalOpen(false);
        alert("Thanks for your feedback! It has been recorded.");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // If no reviews in database, render nothing
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const displayReviews = reviews.length < 5 ? [...reviews, ...reviews, ...reviews] : reviews;
  const loopedReviews = [...displayReviews, ...displayReviews];

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      
      <div className="ecosystem-container mb-10 md:mb-14 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3"
        >
          <Sparkles size={13} /> {badge}
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
          className="text-fluid-h2 font-black mb-2.5 tracking-tight leading-tight text-slate-950"
        >
          {title}
        </motion.h2>
        <p className="text-slate-600 text-fluid-lead font-normal mb-6 max-w-2xl mx-auto">
          {description}
        </p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-900 hover:bg-slate-950 hover:text-white hover:border-slate-950 font-bold text-xs sm:text-sm shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
          data-cursor="Review"
        >
          <Plus size={14} /> Write Feedback
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-6 px-4 md:px-0 pb-6 scrollbar-none items-stretch w-full"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loopedReviews.map((item, index) => (
          <div
            key={`${item._id}-${index}`}
            className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[420px] p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 flex flex-col justify-between hover:border-indigo-300 shadow-xs hover:shadow-lg transition-all duration-300 select-none min-w-0"
          >
            <div className="min-w-0">
              <Quote className="text-indigo-600 mb-3 opacity-50 shrink-0" size={26} />
              <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed mb-5 line-clamp-4">
                &quot;{item.text}&quot;
              </p>
            </div>
            
            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 min-w-0">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100">
                <Image 
                  src={item.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"} 
                  alt={item.name} 
                  fill 
                  sizes="44px"
                  className="object-cover" 
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">{item.name}</h4>
                <p className="text-xs text-slate-400 font-semibold truncate">{item.role}</p>
              </div>
              <div className="ml-auto flex gap-0.5 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white border border-slate-200 p-6 md:p-8 rounded-3xl w-full max-w-lg shadow-2xl text-slate-900">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-black tracking-tight text-slate-900">Share Client Feedback</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none text-xs sm:text-sm focus:bg-white focus:border-indigo-500 transition-all font-semibold" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" required />
                <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none text-xs sm:text-sm focus:bg-white focus:border-indigo-500 transition-all font-semibold" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Designation / Company" />
                
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs font-bold">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={`cursor-pointer transition-colors ${star <= form.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"}`}
                      onClick={() => setForm({...form, rating: star})}
                    />
                  ))}
                </div>

                <textarea className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none h-28 text-xs sm:text-sm focus:bg-white focus:border-indigo-500 transition-all font-semibold resize-none" value={form.text} onChange={e => setForm({...form, text: e.target.value})} placeholder="Write your experience..." required />
                
                <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md shadow-indigo-600/30 cursor-pointer">
                  {loading ? <Loader2 className="animate-spin" size={14} /> : <><Send size={14}/> Submit Feedback</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;