"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Boxes, Layers, Cpu, Terminal, Rss, Mail,
  LayoutDashboard, LogOut, ChevronDown, LogIn, Sparkles, ArrowUpRight
} from "lucide-react";

// Ecosystem Navigation Links
const navLinks = [
  { name: "Products", href: "/#products" },
  { name: "Services", href: "/#services" },
  { name: "Ecosystem", href: "/#ecosystem" },
  { name: "Developers", href: "/#developers" },
  { name: "Resources", href: "/blog" },
  { name: "Company", href: "/#why-devsamp" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // User session sync
  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    let active = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 25;
      if (isScrolled !== active) {
        active = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Floating Header (Desktop Navbar) */}
      <header className="fixed top-0 left-0 right-0 z-[1000] flex justify-center p-3 md:p-4 select-none pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full max-w-5xl rounded-full border transition-all duration-300 pointer-events-auto flex items-center justify-between px-5 md:px-6 py-2 ${
            scrolled 
              ? "bg-white/85 backdrop-blur-xl border-slate-200/90 shadow-md shadow-slate-900/5"
              : "bg-white/60 backdrop-blur-md border-slate-200/60 shadow-xs"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-650 flex items-center justify-center text-white font-black text-xs shadow-xs group-hover:scale-105 transition-transform">
              DS
            </div>
            <div className="text-lg font-black tracking-tight text-slate-900 flex items-center">
              <span>DEV</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 ml-0.5">SAMP</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 relative">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href} 
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors"
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredIndex === index && (
                  <motion.span 
                    layoutId="navCapsule"
                    className="absolute inset-0 bg-slate-100/90 rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          {/* Actions: User Auth & Contact / Demo CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/#contact">
              <button className="text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors px-2.5 py-1.5 flex items-center gap-1 cursor-pointer">
                <span>Book Demo</span> <ArrowUpRight size={13} />
              </button>
            </Link>

            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <motion.div 
                  className="flex items-center gap-2 cursor-pointer bg-slate-100 border border-slate-200 pl-2 pr-3 py-1 rounded-full transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-[10px] shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={12} className={`text-slate-500 transition-transform ${isProfileHovered ? "rotate-180" : ""}`} />
                </motion.div>

                <AnimatePresence>
                  {isProfileHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-[60] font-mono text-[11px]"
                    >
                      <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">session user</p>
                        <p className="text-slate-800 font-bold truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors font-bold">
                          <LayoutDashboard size={13} className="text-blue-500"/> Dashboard
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors font-bold text-left mt-0.5">
                          <LogOut size={13}/> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-slate-950 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-xs hover:bg-indigo-600 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Login</span> <LogIn size={12} />
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Right CTA */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/#contact" className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">
              Demo
            </Link>
            {user ? (
              <Link href="/dashboard" className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-[10px] shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link href="/login" className="p-1 text-slate-700">
                <LogIn size={16} />
              </Link>
            )}
          </div>
        </motion.nav>
      </header>

      {/* Floating Bottom App Dock (Mobile Navbar) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[999] flex justify-center select-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl border border-slate-200/80 py-2 px-5 rounded-full shadow-lg flex items-center justify-between w-full max-w-sm"
        >
          {[
            { icon: Boxes, href: "/#products", label: "Products" },
            { icon: Layers, href: "/#services", label: "Services" },
            { icon: Cpu, href: "/#ecosystem", label: "Ecosystem" },
            { icon: Terminal, href: "/#developers", label: "Devs" },
            { icon: Mail, href: "/#contact", label: "Contact" }
          ].map((item, idx) => (
            <Link 
              key={idx}
              href={item.href}
              className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-indigo-650 transition-colors"
            >
              <item.icon size={16} />
              <span className="text-[9px] font-bold">{item.label}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;