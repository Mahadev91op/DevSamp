"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, ChevronRight, User, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

const Chatbot = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Admin panel par hide karein
  if (pathname && pathname.startsWith("/admin")) return null;

  // --- 1. SMART GREETING ON LOAD ---
  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Hello!";
    if (hour < 12) greeting = "Good Morning!";
    else if (hour < 18) greeting = "Good Afternoon!";
    else greeting = "Good Evening!";

    setMessages([
      { id: 1, type: "bot", text: `${greeting} I'm DevSamp AI. 🤖\nAsk me about our **Services**, **Pricing**, or **Tech Stack**!` }
    ]);
  }, []);

  // --- AUTO SCROLL TO BOTTOM ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen, loading]);

  // --- 2. ADVANCED BRAIN LOGIC 🧠 ---
  const processInput = async (text) => {
    const lowerText = text.toLowerCase();
    setLoading(true);
    let botResponse = "";

    // Thinking Delay (Natural feel ke liye)
    await new Promise(r => setTimeout(r, 900));

    try {
      // Helper function to check keywords (matches full words or sub-phrases)
      const matches = (words) => words.some(w => lowerText.includes(w));

      // --- TOPIC: PRICING (Price, Cost, Rates, Kharcha, Paisa, Budget) ---
      if (matches([
        'price', 'cost', 'plan', 'rate', 'money', 'budget', 'expensive', 'cheap', 'charges', 'billing',
        'paisa', 'pese', 'rupay', 'charges', 'kharcha', 'kitne me', 'pricing', 'sasta', 'mehenga'
      ])) {
        const res = await fetch("/api/pricing");
        const data = await res.json();
        const plans = data.pricing || [];
        if (plans.length > 0) {
          botResponse = "💰 **Here are our pricing blueprints:**\n\n" + 
            plans.map(p => `🔹 **${p.name}** - Starting at $${p.priceMonthly}/mo (or $${p.priceYearly}/yr)\n   _${p.desc}_\n   Key Features: ${p.features.slice(0, 3).join(", ")}`).join("\n\n") +
            "\n\n💡 _You can also use our **Interactive Scope Evaluator** on the page to customize your budget instantly!_";
        } else {
          botResponse = "💰 Generally, our custom websites start from **$499** depending on features. Contact us for a precise quote!";
        }
      } 
      // --- TOPIC: SERVICES (Web Dev, App Dev, UI/UX, SEO) ---
      else if (matches([
        'service', 'offer', 'work', 'do', 'web', 'app', 'design', 'seo', 'development',
        'kya kaam', 'kya karte ho', 'website banana', 'applications', 'coding', 'wireframe'
      ])) {
        const res = await fetch("/api/services");
        const data = await res.json();
        const services = data.services || [];
        if (services.length > 0) {
          botResponse = "🛠️ **Our core architectural capabilities include:**\n\n" + 
            services.map(s => `✨ **${s.title}**\n   _${s.desc}_`).join("\n\n") +
            "\n\n🚀 _We ensure 100/100 Lighthouse performance, absolute SEO structure, and MERN stack integrity!_";
        } else {
          botResponse = "🛠️ We specialize in **Next.js & React Web Apps**, **Custom MERN Stack Platforms**, **High-Fidelity UI/UX Design (Figma)**, and **PageSpeed & SEO Optimization**.";
        }
      }
      // --- TOPIC: PORTFOLIO/PROJECTS ---
      else if (matches([
        'project', 'portfolio', 'sample', 'built', 'case', 'show', 'work', 'experience',
        'kaam dikhao', 'purana kaam', 'example', 'site links', 'live links'
      ])) {
        const res = await fetch("/api/projects");
        const data = await res.json();
        const projects = data.projects || [];
        if (projects.length > 0) {
          botResponse = "📂 **Some of our selected masterpieces:**\n\n" + 
            projects.slice(0, 3).map(p => `🖥️ **${p.title}** (${p.category})\n   🔗 [Launch Demo](${p.link})\n   🛠️ Tech: ${p.tech.join(", ")}`).join("\n\n") +
            "\n\n👉 _Check out our full **Masterpiece Showcase** gallery on the page or navigate to our [Projects](/projects) index!_";
        } else {
          botResponse = "📂 We have successfully shipped 150+ projects worldwide! You can view them by scrolling to the **Portfolio Showcase** section on this page or clicking [Projects](/projects).";
        }
      }
      // --- TOPIC: TEAM ---
      else if (matches([
        'team', 'member', 'squad', 'developer', 'engineer', 'kaun kaun', 'owner', 'founder', 'mahadev',
        'who are you guys', 'who runs', 'team members'
      ])) {
        const res = await fetch("/api/team");
        const data = await res.json();
        const team = data.team || [];
        if (team.length > 0) {
          botResponse = "👥 **The DevSamp Engineering Team:**\n\n" + 
            team.map(t => `💻 **${t.name}**\n   _${t.role}_\n   _${t.desc}_`).join("\n\n");
        } else {
          botResponse = "👥 DevSamp is led by **Mahadev** (Lead Full Stack Architect) along with a squad of expert Next.js developers and Figma UI/UX designers.";
        }
      }
      // --- TOPIC: REVIEWS / RATINGS ---
      else if (matches([
        'review', 'rating', 'feedback', 'testimonial', 'client say',
        'public opinion', 'reviews', 'ratings'
      ])) {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        const reviews = data.reviews || [];
        if (reviews.length > 0) {
          botResponse = "⭐️ **Client Testimonials (Average: 4.9/5 stars):**\n\n" + 
            reviews.slice(0, 2).map(r => `💬 *"${r.text}"*\n   — **${r.name}**, ${r.role} (${"⭐️".repeat(r.rating)})`).join("\n\n");
        } else {
          botResponse = "⭐️ We maintain a **4.9/5 rating** across 48+ global clients. Check the **Client Stories** section to read active testimonials!";
        }
      }
      // --- TOPIC: TIME / DELIVERY ---
      else if (matches([
        'time', 'duration', 'day', 'week', 'month', 'speed', 'fast', 'deliver',
        'kitne din', 'kitna time', 'kab tak', 'timeline'
      ])) {
        botResponse = "⏱️ **Project Timelines:**\n\n• **Landing Pages & UI Mockups**: 4 to 7 days.\n• **Standard Business Platforms**: 2 to 4 weeks.\n• **Custom Web Applications (SaaS/E-commerce)**: 6 to 10 weeks.\n\n⚡ _We follow a rigid sprint structure with daily updates on the pipeline!_";
      }
      // --- TOPIC: CONTACT/HIRE/SUPPORT ---
      else if (matches([
        'contact', 'email', 'hire', 'call', 'whatsapp', 'reach', 'address', 'phone', 'number',
        'mobile', 'connect', 'gmail', 'office', 'help', 'support',
        'phone number', 'contact details', 'kaise contact'
      ])) {
        botResponse = "📞 **Let's kickstart your project!**\n\n• 📧 **Email**: devsamp1st@gmail.com\n• 📱 **WhatsApp / Call**: +91 9330680642\n• 🏢 **Location**: Hooghly, West Bengal, India\n\n💬 _You can directly click the **WhatsApp** floating button on the bottom left, or fill out the **Contact form** at the bottom of the page to schedule a 15-minute blueprint call!_";
      }
      // --- TOPIC: TECH STACK ---
      else if (matches([
        'tech', 'stack', 'code', 'language', 'react', 'next', 'node', 'mongodb', 'webpack',
        'kya use karte ho', 'konse framework', 'database'
      ])) {
        botResponse = "💻 **Our Modern Production Stack:**\n\n• **Core**: Next.js 15 & React 19\n• **Styling**: Tailwind CSS & Vanilla CSS\n• **Database**: MongoDB & Mongoose\n• **Animation**: Framer Motion & CSS Animations\n• **Backend**: Node.js microservices\n\n🔥 _We write strictly formatted, lint-checked, and hardware-accelerated code to guarantee top speed!_";
      }
      // --- TOPIC: GREETINGS/SMALL TALK ---
      else if (matches([
        'hi', 'hello', 'hey', 'namaste', 'hola', 'salam', 'ram ram', 'heyy', 'hello AI'
      ])) {
        botResponse = "Hello there! 👋 I am **DevSamp AI**, your virtual assistant. How can I help you grow your business today? \n\nAsk me about our **Services**, **Pricing**, or **Timeline**!";
      }
      else if (matches([
        'who are you', 'what is devsamp', 'devsamp kya hai', 'aap kaun ho', 'aap kaun hai'
      ])) {
        botResponse = "🤖 I am **DevSamp AI**, a virtual engineer designed to answer queries about our development agency. DevSamp is a premier digital agency building high-performance web applications.";
      }
      else if (matches([
        'thank', 'thanks', 'shukriya', 'dhanyawad', 'ok', 'okay', 'good', 'great', 'awesome'
      ])) {
        botResponse = "You're welcome! 💙 We are dedicated to providing the absolute best software services. Let me know if you need anything else!";
      }
      // --- DEFAULT ---
      else {
        botResponse = "🤔 That's a great question! I am trained on DevSamp's services, team, pricing, and project architecture.\n\nTry asking:\n• *\"How much does a website cost?\"*\n• *\"What is your tech stack?\"*\n• *\"Show me some projects.\"*\n• *\"How do I contact you?\"*";
      }

    } catch (error) {
      botResponse = "⚠️ My brain is having a connection hiccup. Please try again or email us directly at **devsamp1st@gmail.com**!";
    }

    setMessages(prev => [...prev, { id: Date.now(), type: "bot", text: botResponse }]);
    setLoading(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: inputValue }]);
    processInput(inputValue);
    setInputValue("");
  };

  const handleQuickOption = (option) => {
    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: option }]);
    processInput(option);
  };

  const quickOptions = ["View Pricing", "Our Services", "Contact Info", "Tech Stack"];

  return (
    <>
      {/* --- TOGGLE BUTTON (Z-Index Fixed: 9999) --- */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-24 right-6 md:right-8 z-[9999] p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] border border-indigo-500/20 transition-all flex items-center justify-center"
        data-cursor="Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {/* Tooltip */}
        <AnimatePresence>
            {isHovered && !isOpen && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute right-full mr-4 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap hidden md:block border border-slate-800"
                >
                    Chat with AI
                </motion.div>
            )}
        </AnimatePresence>
      </motion.button>

      {/* --- MAIN CHAT WINDOW (Z-Index Fixed: 9999) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-44 right-4 md:right-8 w-[92vw] md:w-96 h-[550px] max-h-[75vh] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl z-[9999] flex flex-col overflow-hidden text-slate-800"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg relative">
                    <Bot size={20} className="text-white" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">DevSamp AI <Sparkles size={12} className="text-yellow-500 fill-yellow-500"/></h3>
                    <p className="text-[10px] text-indigo-650 font-bold">Online & Ready</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="ml-auto text-slate-400 hover:text-slate-700 transition-colors"><X size={18}/></button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.type === 'bot' && (
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-2 mt-1 shrink-0 border border-slate-200/50">
                                <Bot size={12} className="text-slate-505"/>
                            </div>
                        )}
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.type === 'user' 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-slate-100 border border-slate-200/60 text-slate-800 rounded-bl-none'
                        }`}>
                            <p className="whitespace-pre-wrap">{msg.text.split("**").map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-slate-950 font-bold">{chunk}</strong> : chunk)}</p>
                        </div>
                        {msg.type === 'user' && (
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center ml-2 mt-1 shrink-0">
                                <User size={12} className="text-indigo-600"/>
                            </div>
                        )}
                    </motion.div>
                ))}
                
                {/* Typing Animation */}
                {loading && (
                    <div className="flex justify-start">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-2 shrink-0 border border-slate-200/50"><Bot size={12} className="text-slate-505"/></div>
                        <div className="bg-slate-100 border border-slate-200/60 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area (Footer) */}
            <div className="p-4 border-t border-slate-200/80 bg-white">
                
                {/* Quick Chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1">
                    {quickOptions.map((opt, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleQuickOption(opt)}
                            disabled={loading}
                            className="text-[10px] whitespace-nowrap bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-500/30 text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSend} className="flex gap-2 items-center relative">
                    <input 
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 font-medium"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        disabled={!inputValue.trim() || loading}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all disabled:opacity-0 disabled:scale-0"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;