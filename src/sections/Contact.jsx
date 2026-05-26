"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Phone, Send, ChevronDown, Check, Loader2 } from "lucide-react"; 

const servicesList = [
  "Web Development",
  "App Development",
  "UI/UX Design",
  "SEO & Marketing",
  "Cloud Solutions",
  "Other"
];

const Contact = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSelect = (service) => {
    setFormData({ ...formData, service });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = "919330680642";
    if (isMobile) {
      window.location.href = `tel:+${phoneNumber}`;
    } else {
      window.open(`https://wa.me/${phoneNumber}`, "_blank");
    }
  };

  const emailSubject = "Inquiry regarding a Project - DevSamp";
  const emailBody = "Hello DevSamp Team,%0D%0A%0D%0AI am interested in your services.";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message) {
        alert("Please fill all fields!");
        return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
            router.push("/login");
        }, 1500);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-24 bg-transparent text-slate-900 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start md:items-center">
          
          {/* LEFT SIDE */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight"
            >
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                extraordinary.
              </span>
            </motion.h2>

            <p className="text-slate-500 text-sm md:text-lg mb-6 md:mb-10 max-w-md font-semibold">
              Have an idea? Let's discuss how DevSamp can help your business grow.
            </p>

            <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4 text-slate-700 group">
                    <div className="p-2 md:p-3 bg-slate-100 rounded-full border border-slate-200 text-indigo-600 group-hover:border-indigo-500/50 transition-colors shadow-sm">
                        <Mail size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">Email us at</p>
                        <a href={`mailto:devsamp1st@gmail.com?subject=${emailSubject}&body=${emailBody}`} className="text-base md:text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors" data-cursor="Email">
                            devsamp1st@gmail.com
                        </a>
                    </div>
                </div>

                <div onClick={handlePhoneClick} className="flex items-center gap-3 md:gap-4 text-slate-700 group cursor-pointer">
                    <div className="p-2 md:p-3 bg-slate-100 rounded-full border border-slate-200 text-purple-600 group-hover:border-purple-500/50 transition-colors shadow-sm">
                        <Phone size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-bold">Call or WhatsApp</p>
                        <p className="text-base md:text-lg font-bold text-slate-800 group-hover:text-purple-600 transition-colors" data-cursor="Call">
                            +91 9330680642
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT SIDE (FORM) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200/80 p-5 md:p-10 rounded-2xl md:rounded-3xl shadow-lg relative"
          >
            <AnimatePresence>
                {status === "success" && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center p-8"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-[0_4px_20px_rgba(34,197,94,0.4)] text-white">
                            <Check size={32} className="md:w-10 md:h-10" strokeWidth={3} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Details Received!</h3>
                        <p className="text-slate-500 text-sm md:text-base font-semibold">Redirecting to login...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm text-slate-500 font-bold ml-1">Your Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium" required />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm text-slate-500 font-bold ml-1">Your Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium" required />
                    </div>
                </div>

                <div className="space-y-1.5 md:space-y-2 relative">
                    <label className="text-xs md:text-sm text-slate-500 font-bold ml-1">Service Interested In</label>
                    <div onClick={toggleDropdown} className={`w-full bg-slate-50 border cursor-pointer rounded-xl px-4 py-3 md:px-5 md:py-4 text-slate-900 flex justify-between items-center transition-all ${isOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 hover:border-slate-300'}`} data-cursor="Dropdown">
                        <span className={`text-sm md:text-base font-medium ${formData.service ? "text-slate-800" : "text-slate-400"}`}>{formData.service || "Select a Service"}</span>
                        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 md:w-5 md:h-5 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
                                {servicesList.map((service, index) => (
                                    <div key={index} onClick={() => handleSelect(service)} className="px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base text-slate-700 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors font-medium">
                                        {service}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <label className="text-xs md:text-sm text-slate-500 font-bold ml-1">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about your project..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium resize-none" required></textarea>
                </div>

                <button type="submit" disabled={status === "loading"} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-750 hover:to-purple-750 text-white font-bold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 group disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base" data-cursor="Submit">
                    {status === "loading" ? (<>Processing... <Loader2 className="animate-spin md:w-5 md:h-5" size={16} /></>) : (<>Get Started <Send size={16} className="group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" /></>)}
                </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;