"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <div className="inline-block p-4 rounded-full bg-blue-600/10 mb-6">
                <Shield size={48} className="text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Privacy <span className="text-blue-500">Policy</span></h1>
            <p className="text-gray-400">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        {/* Content */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-12 text-gray-300 leading-relaxed"
        >
            <Section title="1. Information We Collect" icon={<Eye className="text-purple-500" />}>
                We collect information you provide directly to us, such as when you fill out our contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and project details.
            </Section>

            <Section title="2. How We Use Your Information" icon={<Lock className="text-pink-500" />}>
                We use the information we collect to:
                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-400">
                    <li>Provide, maintain, and improve our services.</li>
                    <li>Process your requests and send you related information, including invoices.</li>
                    <li>Respond to your comments, questions, and customer service requests.</li>
                    <li>Communicate with you about services, offers, and events.</li>
                </ul>
            </Section>

            <Section title="3. Data Security">
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration, and destruction. Your data is stored on secure servers with restricted access.
            </Section>

            <Section title="4. Sharing of Information">
                We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </Section>

            <Section title="5. Contact Us">
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:devsamp1st@gmail.com" className="text-blue-400 hover:underline">devsamp1st@gmail.com</a>.
            </Section>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

const Section = ({ title, children, icon }) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="text-lg">{children}</div>
    </div>
);