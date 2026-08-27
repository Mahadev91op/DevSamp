"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Phone, Send, ChevronDown, Check, Loader2, Code2, Terminal, Play } from "lucide-react"; 

const smoothEase = [0.16, 1, 0.3, 1];

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

    setTimeout(() => {
      setLogs(prev => [...prev, "[PACK] Archiving configuration payload...", "[RESOLVE] Connecting to devsamp database DNS..."]);
    }, 500);

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
            }, 1200);
          }, 500);
        }, 1000);
      } else {
        setTimeout(() => {
          setLogs(prev => [...prev, "[ERROR] Server returned bad response state.", "[FAIL] Compilation failed!"]);
          setTimeout(() => {
            setStatus("error");
          }, 500);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLogs(prev => [...prev, "[ERROR] Connection timeout.", "[FAIL] Request failed!"]);
        setTimeout(() => {
          setStatus("error");
        }, 500);
      }, 1000);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-transparent text-slate-900 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center min-w-0">
          
          {/* LEFT SIDE: Heading details */}
          <div className="lg:col-span-5 min-w-0 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest"
            >
              Get in Touch
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-h2 font-black tracking-tight leading-tight text-slate-950"
            >
              Let&apos;s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 font-extrabold">
                extraordinary.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal max-w-lg leading-relaxed"
            >
              Have a digital idea or design specification? Initiate a connection parameter, and our core developers will compile it.
            </motion.p>

            <div className="space-y-3.5 pt-1">
                <div className="flex items-center gap-3 text-slate-705 group">
                    <div className="p-2.5 bg-white rounded-2xl border border-slate-200 text-indigo-600 group-hover:border-indigo-500/50 transition-colors shadow-xs">
                        <Mail size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">SMTP Host Link</p>
                        <a href={`mailto:devsamp1st@gmail.com?subject=${emailSubject}&body=${emailBody}`} className="text-sm sm:text-base font-bold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer" data-cursor="Email">
                            devsamp1st@gmail.com
                        </a>
                    </div>
                </div>

                <div onClick={handlePhoneClick} className="flex items-center gap-3 text-slate-705 group cursor-pointer">
                    <div className="p-2.5 bg-white rounded-2xl border border-slate-200 text-indigo-600 group-hover:border-indigo-500/50 transition-colors shadow-xs">
                        <Phone size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Cellular Hotspot</p>
                        <p className="text-sm sm:text-base font-bold text-slate-800 hover:text-indigo-600 transition-colors" data-cursor="Call">
                            +91 9330680642
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT SIDE (Interactive JSON Config Form - Light Theme) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="lg:col-span-7 bg-white border border-slate-200/90 p-5 md:p-8 rounded-3xl shadow-md relative overflow-hidden min-w-0"
          >
            {/* Terminal Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-slate-100/90 border-b border-slate-200/70 px-4 flex items-center justify-between select-none z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
                <Code2 size={13} className="text-indigo-600" />
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
                        <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-md text-white">
                            <Check size={28} strokeWidth={3} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Payload Compiled!</h3>
                        <p className="text-slate-500 text-xs sm:text-sm font-semibold">Deploying redirection parameters to terminal host...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Compilation Logs Screen */}
            <AnimatePresence>
                {status === "loading" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pt-11 z-20 bg-slate-950/95 backdrop-blur-md p-5 font-mono text-[11px] text-slate-300 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5 overflow-y-auto max-h-[280px] scrollbar-none">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-indigo-400">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="flex gap-2 items-center text-slate-400">
                        <Loader2 className="animate-spin" size={11} />
                        <span>Compiling project variables...</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-800 pt-2.5 flex justify-between text-[9px] text-slate-500 font-bold select-none">
                      <span>BUILD LOG STATUS: ACTIVE</span>
                      <span>STDOUT: 0.12s</span>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>

            {/* JSON Config Form */}
            <form className="space-y-4 pt-7 font-mono" onSubmit={handleSubmit}>
              
              <div className="space-y-3.5">
                {/* Field 1: Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-indigo-700 font-bold text-xs shrink-0 select-none">const <span className="text-sky-600">name</span> =</span>
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder='"Your Name"' 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium" 
                    required 
                  />
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-indigo-700 font-bold text-xs shrink-0 select-none">const <span className="text-sky-600">email</span> =</span>
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    type="email" 
                    placeholder='"your@email.com"' 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium" 
                    required 
                  />
                </div>

                {/* Field 3: Service Selector */}
                <div className="relative border-b border-slate-100 pb-2.5 select-none">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-indigo-700 font-bold text-xs shrink-0">const <span className="text-sky-600">service</span> =</span>
                    <div 
                      onClick={toggleDropdown} 
                      className="flex-1 flex justify-between items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 cursor-pointer text-xs sm:text-sm font-medium text-slate-900 focus:bg-white hover:border-slate-300 transition-all"
                      data-cursor="Dropdown"
                    >
                      <span className={formData.service ? "text-indigo-700 font-bold" : "text-slate-400 font-normal"}>
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
                        className="absolute z-50 left-0 md:left-24 w-full md:w-56 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden"
                      >
                        {servicesList.map((service, index) => (
                          <div 
                            key={index} 
                            onClick={() => handleSelect(service)} 
                            className="px-3.5 py-2.5 text-xs text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors font-bold flex items-center justify-between"
                          >
                            <span>{service}</span>
                            <span className="text-[9px] text-slate-400 font-mono">pkg</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Field 4: Message */}
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-indigo-700 font-bold text-xs select-none">const <span className="text-sky-600">message</span> = `</span>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows={3} 
                    placeholder='/* Tell us about your project specifications and requirements... */' 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm outline-none transition-all font-medium resize-none focus:bg-white focus:border-indigo-500 leading-relaxed" 
                    required
                  ></textarea>
                  <span className="text-indigo-700 font-bold text-xs select-none">`;</span>
                </div>
              </div>

              {/* Submit Trigger Styled as Run Build button */}
              <button 
                type="submit" 
                disabled={status === "loading"} 
                className="w-full mt-3 bg-slate-950 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs group disabled:opacity-75 disabled:cursor-not-allowed text-xs sm:text-sm uppercase tracking-wider cursor-pointer" 
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