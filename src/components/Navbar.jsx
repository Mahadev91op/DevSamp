"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detect karke background dark karne ka logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Optimized Mobile Menu Animation (No Lag)
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%", // Screen ke bahar right side
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      x: 0, // Screen par wapas
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        
        {/* LOGO - DevSamp */}
        <Link href="/" className="z-50 relative">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold tracking-tighter text-white"
            >
              DEV<span className="text-blue-500">SAMP</span>
            </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href} 
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            Start Project
          </motion.button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className="text-white focus:outline-none p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Full Screen Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                    <Link 
                        href={link.href} 
                        onClick={toggleMenu}
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 hover:to-blue-500 transition-all"
                    >
                    {link.name}
                    </Link>
                </motion.div>
              ))}
              
              <motion.button
                variants={linkVariants}
                custom={5}
                initial="closed"
                animate="open"
                className="mt-8 px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors"
              >
                Let's Talk
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;