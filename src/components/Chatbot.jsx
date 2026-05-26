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
    await new Promise(r => setTimeout(r, 800));

    try {
        // --- TOPIC: PRICING ---
        if (['price', 'cost', 'plan', 'rate', 'money', 'budget', 'expensive'].some(w => lowerText.includes(w))) {
            const res = await fetch("/api/pricing");
            const data = await res.json();
            const plans = data.pricing || [];
            if (plans.length > 0) {
                botResponse = "💰 **Our Pricing Plans:**\n\n" + plans.map(p => `🔹 **${p.name}** - $${p.priceMonthly}/mo\n   _${p.desc}_`).join("\n\n");
            } else {
                botResponse = "Pricing details are currently updating. Generally, our plans start from **$29/mo**.";
            }
        } 
        // --- TOPIC: SERVICES ---
        else if (['service', 'offer', 'work', 'do', 'web', 'app', 'design', 'seo'].some(w => lowerText.includes(w))) {
            const res = await fetch("/api/services");
            const data = await res.json();
            const services = data.services || [];
            if (services.length > 0) {
                botResponse = "🛠️ **We are experts in:**\n\n" + services.map(s => `✨ ${s.title}`).join("\n");
            } else {
                botResponse = "We offer **Web Development**, **App Development**, and **UI/UX Design**. Check our Services section!";
            }
        }
        // --- TOPIC: PORTFOLIO/PROJECTS ---
        else if (['project', 'portfolio', 'sample', 'built', 'case', 'show'].some(w => lowerText.includes(w))) {
            botResponse = "📂 We have built amazing projects! \nYou can check our **Portfolio page** above to see our latest work.";
        }
        // --- TOPIC: CONTACT/HIRE ---
        else if (['contact', 'email', 'hire', 'call', 'whatsapp', 'reach', 'address'].some(w => lowerText.includes(w))) {
            botResponse = "📞 **Let's Connect!**\n\n📧 devsamp1st@gmail.com\n📱 +91 9330680642\n\nOr just click the **WhatsApp button** on the left screen!";
        }
        // --- TOPIC: TECH STACK ---
        else if (['tech', 'stack', 'code', 'language', 'react', 'next', 'node'].some(w => lowerText.includes(w))) {
            botResponse = "💻 **Our Power Stack:**\n\n• Next.js 14 (App Router)\n• Tailwind CSS\n• MongoDB\n• Framer Motion\n• Node.js";
        }
        // --- TOPIC: GREETINGS/SMALL TALK ---
        else if (['hi', 'hello', 'hey', 'namaste', 'hola'].some(w => lowerText.includes(w))) {
            botResponse = "Hello there! 👋 How can I help you grow your business today?";
        }
        else if (['who', 'name', 'bot', 'human'].some(w => lowerText.includes(w))) {
            botResponse = "I am **DevSamp AI**, your virtual assistant. I live in the cloud ☁️ but I work hard!";
        }
        else if (['good', 'great', 'awesome', 'thanks', 'thank'].some(w => lowerText.includes(w))) {
            botResponse = "You're welcome! 💙 We love to help.";
        }
        // --- DEFAULT ---
        else {
            botResponse = "🤔 That's interesting! I'm mostly trained on DevSamp's business.\n\nTry asking:\n- *'What are your services?'*\n- *'How much does a website cost?'*";
        }

    } catch (error) {
        botResponse = "⚠️ My brain is having a connection hiccup. Please try again!";
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