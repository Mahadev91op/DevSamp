"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, Plus, X, Loader2, Send } from "lucide-react";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", rating: 5, text: "" });

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
        setForm({ name: "", role: "", rating: 5, text: "" });
        setIsModalOpen(false);
        fetchReviews(); // Refresh list
        alert("Thanks for your feedback!");
    }
    setLoading(false);
  };

  // Agar reviews kam hain to duplicate karo taaki infinite scroll smooth rahe
  const displayReviews = reviews.length < 5 ? [...reviews, ...reviews, ...reviews] : reviews;

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-12 text-center relative z-10">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
        >
          Client <span className="text-blue-500">Stories</span>
        </motion.h2>
        <p className="text-gray-400 mb-8">Don't just take our word for it.</p>
        
        <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 mx-auto text-sm font-bold"
        >
            <Plus size={16}/> Write a Review
        </button>
      </div>

      {/* --- INFINITE SCROLL WRAPPER --- */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        {reviews.length > 0 ? (
            <motion.div
            className="flex gap-8 w-max"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
            {[...displayReviews, ...displayReviews].map((item, index) => (
                <div
                key={index}
                className="w-[350px] md:w-[450px] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col justify-between"
                >
                <div>
                    <Quote className="text-blue-500 mb-4 opacity-50" size={40} />
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">"{item.text}"</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <Image src={item.image || "https://randomuser.me/api/portraits/lego/1.jpg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
                        ))}
                    </div>
                </div>
                </div>
            ))}
            </motion.div>
        ) : (
            <p className="text-center text-gray-500">No reviews yet. Be the first!</p>
        )}
      </div>

      {/* --- REVIEW MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#111] border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Share your Experience</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24}/></button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" required />
                        <input className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Designation (e.g. CEO)" />
                        
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-400 text-sm">Rating:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                    key={star} 
                                    size={24} 
                                    className={`cursor-pointer transition-colors ${star <= form.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`}
                                    onClick={() => setForm({...form, rating: star})}
                                />
                            ))}
                        </div>

                        <textarea className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none h-32" value={form.text} onChange={e => setForm({...form, text: e.target.value})} placeholder="Write your feedback..." required />
                        
                        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold flex justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" /> : <><Send size={18}/> Submit Review</>}
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