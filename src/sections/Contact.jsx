"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Phone, Send, ChevronDown, Check, Loader2, Code2, Terminal, Play } from "lucide-react"; 

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
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [logs, setLogs] = useState([]);

  // Check URL parameters for custom quote generator (from pricing cards)
  useEffect(() => {
    if (searchParams) {
      const customQuote = searchParams.get("customQuote");
      const pages = searchParams.get("pages");
      const chosenService = searchParams.get("service");
      const addons = searchParams.get("addons");

      let msg = "";
      let svc = "";

      if (customQuote && pages) {
        svc = "Web Development";
        const addonsList = addons ? decodeURIComponent(addons).split(',').join(', ') : '';
        const addonsLine = addonsList ? `\n- Chosen Add-ons: ${addonsList}` : '';
        msg = `Hi DevSamp team! I evaluated my project scope using your quote tool. Specifications:\n- Scale: ${pages} pages\n- Estimated Budget: $${customQuote}${addonsLine}\nI would like to discuss this config.`;
      } else if (chosenService) {
        svc = chosenService;
        msg = `Hi DevSamp team! I am interested in deploying the "${chosenService}" pricing configuration. Please reach out to me.`;
      }

      if (svc || msg) {
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            service: svc || prev.service,
            message: msg || prev.message
          }));
        }, 0);
      }
    }
  }, [searchParams]);

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
    setLogs(["[SYSTEM] Initializing compilation build...", "[LINT] Validating fields: name, email, service, message"]);

    // Slow down logs to look like real terminal compilation
    setTimeout(() => {
      setLogs(prev => [...prev, "[PACK] Archiving configuration payload...", "[RESOLVE] Connecting to devsamp database DNS..."]);
    }, 600);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setTimeout(() => {
          setLogs(prev => [...prev, "[SEND] Shipping request data packet...", "[COMPILE] Build: SUCCESS!"]);
          setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
              router.push("/login");
            }, 1500);
          }, 600);
        }, 1200);
      } else {
        setTimeout(() => {
          setLogs(prev => [...prev, "[ERROR] Server returned bad response state.", "[FAIL] Compilation failed!"]);
          setTimeout(() => {
            setStatus("error");
          }, 600);
        }, 1200);
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLogs(prev => [...prev, "[ERROR] Connection timeout.", "[FAIL] Request failed!"]);
        setTimeout(() => {
          setStatus("error");
        }, 600);
      }, 1200);
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-24 bg-transparent text-slate-900 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* LEFT SIDE: Heading details */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
              Get in Touch
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight"
            >
              Let&apos;s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-650 font-extrabold">
                extraordinary.
              </span>
            </motion.h2>

            <p className="text-slate-555 text-xs md:text-sm mb-8 max-w-md font-semibold leading-relaxed">
              Have a digital idea or design specification? Initiate a connection parameter, and our core developers will compile it.
            </p>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-705 group">
                    <div className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-indigo-650 group-hover:border-indigo-500/50 transition-colors shadow-sm">
                        <Mail size={15} />
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">SMTP Host Link</p>
                        <a href={`mailto:devsamp1st@gmail.com?subject=${emailSubject}&body=${emailBody}`} className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors" data-cursor="Email">
                            devsamp1st@gmail.com
                        </a>
                    </div>
                </div>

                <div onClick={handlePhoneClick} className="flex items-center gap-3 text-slate-705 group cursor-pointer">
                    <div className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-purple-600 group-hover:border-purple-500/50 transition-colors shadow-sm">
                        <Phone size={15} />
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Cellular Hotspot</p>
                        <p className="text-sm font-bold text-slate-800 hover:text-purple-600 transition-colors" data-cursor="Call">
                            +91 9330680642
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT SIDE (Interactive JSON Config Form - Light Theme) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white border border-slate-200/80 p-5 md:p-8 rounded-3xl shadow-lg relative overflow-hidden"
          >
            {/* Terminal Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-slate-100/80 border-b border-slate-200/60 px-4 flex items-center justify-between select-none z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                <Code2 size={11} className="text-indigo-500" />
                <span>project-specs.config.js</span>
              </div>
              <div className="w-8"></div>
            </div>

            {/* Success Overlay Screen */}
            <AnimatePresence>
                {status === "success" && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-8 select-none"
                    >
                        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-5 shadow-[0_4px_25px_rgba(22,163,74,0.15)] text-white">
                            <Check size={28} strokeWidth={3} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-850 mb-2">Payload Compiled!</h3>
                        <p className="text-slate-500 text-xs md:text-sm font-semibold">Deploying redirection parameters to terminal host...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Compilation Logs Screen */}
            <AnimatePresence>
                {status === "loading" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pt-11 z-20 bg-slate-950/95 backdrop-blur-md p-6 font-mono text-[10px] md:text-xs text-slate-350 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5 overflow-y-auto max-h-[300px] custom-scrollbar">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-indigo-400">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="flex gap-2 items-center text-slate-500">
                        <Loader2 className="animate-spin" size={10} />
                        <span>Compiling project variables...</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-900 pt-3 flex justify-between text-[9px] text-slate-600 font-bold select-none">
                      <span>BUILD LOG STATUS: ACTIVE</span>
                      <span>STDOUT: 0.12s</span>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* JSON Config Form */}
            <form className="space-y-5 pt-7 font-mono" onSubmit={handleSubmit}>
              
              <div className="space-y-4">
                {/* Field 1: Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="text-indigo-650 font-bold text-xs shrink-0 select-none">const <span className="text-purple-650">name</span> =</span>
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder='"Your Name"' 
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all font-bold" 
                    required 
                  />
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="text-indigo-650 font-bold text-xs shrink-0 select-none">const <span className="text-purple-650">email</span> =</span>
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    type="email" 
                    placeholder='"your@email.com"' 
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all font-bold" 
                    required 
                  />
                </div>

                {/* Field 3: Service Selector (IDE list style) */}
                <div className="relative border-b border-slate-100 pb-3 select-none">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-indigo-650 font-bold text-xs shrink-0">const <span className="text-purple-650">service</span> =</span>
                    <div 
                      onClick={toggleDropdown} 
                      className="flex-1 flex justify-between items-center bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 cursor-pointer text-xs md:text-sm font-bold text-slate-800 focus:bg-white hover:border-slate-300 transition-all"
                      data-cursor="Dropdown"
                    >
                      <span className={formData.service ? "text-indigo-650" : "text-slate-400"}>
                        {formData.service ? `"${formData.service}"` : '"Select a Service"'}
                      </span>
                      <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -5 }} 
                        className="absolute z-50 left-0 md:left-28 w-full md:w-60 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        {servicesList.map((service, index) => (
                          <div 
                            key={index} 
                            onClick={() => handleSelect(service)} 
                            className="px-4 py-2.5 text-[11px] md:text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors font-bold flex items-center justify-between"
                          >
                            <span>{service}</span>
                            <span className="text-[8px] text-slate-400 font-mono">pkg</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Field 4: Message */}
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-3">
                  <span className="text-indigo-650 font-bold text-xs select-none">const <span className="text-purple-650">message</span> = `</span>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows={4} 
                    placeholder='/* Tell us about your project specifications and requirements... */' 
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 text-xs md:text-sm outline-none transition-all font-semibold resize-none focus:bg-white focus:border-indigo-500 focus:ring-0 leading-relaxed" 
                    required
                  ></textarea>
                  <span className="text-indigo-650 font-bold text-xs select-none">`;</span>
                </div>
              </div>

              {/* Submit Trigger Styled as Run Build button */}
              <button 
                type="submit" 
                disabled={status === "loading"} 
                className="w-full mt-4 bg-slate-950 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm group disabled:opacity-75 disabled:cursor-not-allowed text-xs md:text-sm uppercase tracking-wider font-bold" 
                data-cursor="Submit"
              >
                <Play size={12} fill="currentColor" className="text-white group-hover:scale-110 transition-transform" />
                <span>yarn build --ship-specs</span>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;