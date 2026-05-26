"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, Plus, X, Loader2, Send } from "lucide-react";

// Props accepted
const Testimonials = ({ initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews); // Initial data from props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", rating: 5, text: "" });

  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic (Same as before)
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
    // POST request still happens client-side (interaction)
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
        setForm({ name: "", role: "", rating: 5, text: "" });
        setIsModalOpen(false);
        // Refresh karne ke liye hum manually fetch kar sakte hain agar naya review turant dikhana hai
        // ya bas alert dikha dein. Simple rakhte hain:
        alert("Thanks for your feedback! It will appear after approval.");
    }
    setLoading(false);
  };

  const displayReviews = reviews.length < 5 ? [...reviews, ...reviews, ...reviews] : reviews;
  const loopedReviews = [...displayReviews, ...displayReviews];

  return (
    <section className="py-10 md:py-24 bg-transparent text-slate-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] md:w-[600px] md:h-[300px] bg-indigo-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 text-center relative z-10">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-2 md:mb-4 tracking-tight"
        >
          Client <span className="text-indigo-600 font-extrabold">Stories</span>
        </motion.h2>
        <p className="text-slate-500 text-sm md:text-base font-semibold mb-6 md:mb-8">Don't just take our word for it.</p>
        
        <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 md:px-6 md:py-3 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-950 hover:text-white hover:border-slate-950 font-bold text-xs md:text-sm shadow-sm transition-all"
            data-cursor="Review"
        >
            <Plus size={14} className="md:w-4 md:h-4"/> Write a Review
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-8 px-4 md:px-0 pb-6 -mx-4 md:mx-0 scrollbar-hide items-stretch w-full"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loopedReviews.length > 0 ? (
            loopedReviews.map((item, index) => (
                <div
                key={`${item._id}-${index}`}
                className="flex-shrink-0 w-[85vw] md:w-[450px] p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-sm flex flex-col justify-between hover:bg-indigo-50/10 hover:border-indigo-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                data-cursor="Drag"
                >
                <div>
                    <Quote className="text-indigo-600 mb-3 md:mb-4 opacity-50" size={24} />
                    <p className="text-sm md:text-lg text-slate-700 font-medium leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">"{item.text}"</p>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                    <Image 
                        src={item.image || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                        alt={item.name} 
                        fill 
                        sizes="50px"
                        className="object-cover" 
                    />
                    </div>
                    <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 text-sm md:text-base truncate">{item.name}</h4>
                    <p className="text-xs md:text-sm text-slate-500 font-bold truncate">{item.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 md:gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`md:w-[14px] md:h-[14px] ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"}`} />
                        ))}
                    </div>
                </div>
                </div>
            ))
        ) : (
            <div className="w-full text-center text-slate-500 text-sm py-4">No reviews yet. Be the first!</div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white border border-slate-200 p-6 md:p-8 rounded-2xl md:rounded-3xl w-full max-w-lg shadow-2xl text-slate-900">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h3 className="text-lg md:text-2xl font-black tracking-tight text-slate-900">Share your Experience</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={20} className="md:w-6 md:h-6"/></button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                        <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none text-sm md:text-base focus:bg-white focus:border-indigo-500 transition-all font-medium" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" required />
                        <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none text-sm md:text-base focus:bg-white focus:border-indigo-500 transition-all font-medium" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Designation (e.g. CEO)" />
                        
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-slate-500 text-xs md:text-sm font-semibold">Rating:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                    key={star} 
                                    size={20} 
                                    className={`cursor-pointer transition-colors md:w-6 md:h-6 ${star <= form.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"}`}
                                    onClick={() => setForm({...form, rating: star})}
                                />
                            ))}
                        </div>

                        <textarea className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-900 outline-none h-24 md:h-32 text-sm md:text-base focus:bg-white focus:border-indigo-500 transition-all font-medium resize-none" value={form.text} onChange={e => setForm({...form, text: e.target.value})} placeholder="Write your feedback..." required />
                        
                        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 md:py-3 rounded-xl font-bold flex justify-center gap-2 text-sm md:text-base shadow-lg shadow-indigo-500/25">
                            {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} className="md:w-[18px] md:h-[18px]"/> Submit Review</>}
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