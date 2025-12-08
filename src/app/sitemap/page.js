"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Home, Briefcase, Layers, CreditCard, Mail, FileText, Shield, 
  Map, ArrowRight, Rss
} from "lucide-react";

const sitemapData = [
    { title: "Main", links: [
        { name: "Home", href: "/", icon: <Home size={18} /> },
        { name: "Services", href: "/#services", icon: <Layers size={18} /> },
        { name: "Pricing", href: "/#pricing", icon: <CreditCard size={18} /> },
        { name: "Contact", href: "/#contact", icon: <Mail size={18} /> },
    ]},
    { title: "Work & Content", links: [
        { name: "Portfolio", href: "/projects", icon: <Briefcase size={18} /> },
        { name: "Blog", href: "/blog", icon: <Rss size={18} /> },
    ]},
    { title: "Legal", links: [
        { name: "Privacy Policy", href: "/privacy", icon: <Shield size={18} /> },
        { name: "Terms of Service", href: "/terms", icon: <FileText size={18} /> },
    ]}
];

export default function SitemapPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 container mx-auto max-w-5xl">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <div className="inline-block p-4 rounded-full bg-white/5 mb-6 border border-white/10">
                <Map size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Site<span className="text-gray-500">map</span></h1>
            <p className="text-gray-400">An overview of our website structure.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sitemapData.map((section, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-all"
                >
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">{section.title}</h2>
                    <ul className="space-y-4">
                        {section.links.map((link, i) => (
                            <li key={i}>
                                <Link href={link.href} className="flex items-center gap-3 text-gray-400 hover:text-white hover:translate-x-2 transition-all group">
                                    <span className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {link.icon}
                                    </span>
                                    <span className="text-lg">{link.name}</span>
                                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}