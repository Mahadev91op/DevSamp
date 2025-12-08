"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 container mx-auto max-w-4xl">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <div className="inline-block p-4 rounded-full bg-purple-600/10 mb-6">
                <FileText size={48} className="text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Terms of <span className="text-purple-500">Service</span></h1>
            <p className="text-gray-400">Please read these terms carefully before using our services.</p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
        >
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-500"/> Acceptance of Terms</h3>
                <p className="text-gray-400">By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="text-yellow-500"/> Intellectual Property</h3>
                <p className="text-gray-400">The Service and its original content, features, and functionality are and will remain the exclusive property of DevSamp and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of DevSamp.</p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Project Terms</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                    <li><strong>Quotations:</strong> All quotes are valid for 30 days.</li>
                    <li><strong>Payments:</strong> A 50% deposit is required before starting any project. The remaining balance is due upon completion.</li>
                    <li><strong>Revisions:</strong> We offer a set number of revisions as agreed upon in the initial contract. Additional revisions may incur extra costs.</li>
                </ul>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Limitation of Liability</h3>
                <p className="text-gray-400">In no event shall DevSamp, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}