import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// Components Imports
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Noise from "@/components/Noise";
import ScrollToTop from "@/components/ScrollToTop";

// New Features Imports
import Preloader from "@/components/Preloader";
import ProgressBar from "@/components/ProgressBar";
import WhatsAppBtn from "@/components/WhatsAppBtn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "DevSamp | Modern Web Agency",
  description: "Transforming ideas into digital reality.",
};

export default function RootLayout({ children }) {
  return (
    // FIX: suppressHydrationWarning add kiya
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <body 
        className={`${inter.variable} ${outfit.variable} bg-black text-white antialiased`}
        suppressHydrationWarning={true} // FIX: Ye line add karein
      >
        
        {/* --- GLOBAL FEATURES --- */}
        <Preloader />
        <ProgressBar />
        <WhatsAppBtn />
        
        <CustomCursor />
        <Noise />
        <ScrollToTop />
        
        {/* --- MAIN LAYOUT --- */}
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}