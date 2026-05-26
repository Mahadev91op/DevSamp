"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown, LogIn } from "lucide-react";

// Nav Links
const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#work" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/#about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  // --- LOGIN CHECK LOGIC (FIXED) ---
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // Initial check
    checkUser();
    
    // Event listener for updates
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Force update for same tab
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    router.push("/login");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { x: "100%", transition: { duration: 0.4, ease: "easeInOut" } },
    open: { x: 0, transition: { duration: 0.4, ease: "easeInOut" } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.4 } })
  };

  return (
    <nav
      className={`fixed w-full z-[1000] top-0 start-0 transition-all duration-300 ${
        isOpen 
          ? "bg-slate-50 py-5 border-b border-slate-200"
          : scrolled
            ? "bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-sm"
            : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* LOGO */}
        <Link href="/" className="z-50 relative group">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-black tracking-tighter text-slate-900 flex items-center"
            >
              {/* DEV */}
              <span className="flex">
                {["D", "E", "V"].map((char, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ y: -4, color: "#2563eb" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="cursor-default"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              {/* SAMP */}
              <span className="flex text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-0.5">
                {["S", "A", "M", "P"].map((char, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="cursor-default"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              className="relative text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* USER PROFILE / LOGIN BUTTON */}
          {user ? (
             <div 
                className="relative"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
             >
                {/* Profile Trigger */}
                <motion.div 
                    className="flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200/60 px-3 py-1.5 rounded-full transition-all"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-slate-800 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`text-slate-500 transition-transform ${isProfileHovered ? "rotate-180" : ""}`} />
                </motion.div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isProfileHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-[60]"
                        >
                            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Signed in as</p>
                                <p className="text-sm text-slate-800 font-semibold truncate">{user.email}</p>
                            </div>
                            <div className="p-2">
                                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                                    <LayoutDashboard size={16} className="text-blue-500"/> Dashboard
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1">
                                    <LogOut size={16}/> Logout
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
          ) : (
             <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-950 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  Login <LogIn size={16} />
                </motion.button>
             </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className="text-slate-900 focus:outline-none p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-slate-50 z-40 flex flex-col items-center justify-start pt-32 pb-10 space-y-6 overflow-y-auto h-screen"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="shrink-0"
                >
                    <Link 
                        href={link.href} 
                        onClick={toggleMenu}
                        className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 hover:to-blue-600 transition-all block py-1"
                    >
                    {link.name}
                    </Link>
                </motion.div>
              ))}
              
              {/* MOBILE USER ACTIONS */}
              <motion.div 
                variants={linkVariants} 
                custom={6} 
                initial="closed" 
                animate="open" 
                className="flex flex-col items-center gap-4 mt-4 w-full px-6 max-w-sm shrink-0"
              >
                {user ? (
                    <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 shadow-lg">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{user.name}</h3>
                        <p className="text-slate-400 text-sm mb-6 truncate">{user.email}</p>
                        
                        <div className="flex flex-col gap-3">
                            <Link href="/dashboard" onClick={toggleMenu} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                                <LayoutDashboard size={18}/> Dashboard
                            </Link>
                            <button onClick={handleLogout} className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2 border border-red-200">
                                <LogOut size={18}/> Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link href="/login" onClick={toggleMenu} className="px-8 py-4 bg-slate-950 text-white font-bold rounded-full text-xl w-full text-center hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10">
                      Login <LogIn size={20} />
                    </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;