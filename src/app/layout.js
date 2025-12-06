// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- Import kiya

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern Web Agency",
  description: "Best Web Development Agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}> {/* Black background set kiya */}
        <Navbar />  {/* <-- Yahan Navbar lagaya */}
        {children}
      </body>
    </html>
  );
}