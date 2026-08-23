import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// Components Imports
import Navbar from "@/components/Navbar";
import Noise from "@/components/Noise";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";
import ClientFeatures from "@/components/ClientFeatures"; 
import ThreeBackground from "@/components/ThreeBackground";
import TopProgressBar from "@/components/TopProgressBar";
import { Suspense } from "react";


const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap' 
});

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap' 
});

// --- SEO METADATA ---
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://devsamp.online'),
  title: {
    default: "DevSamp | Technology • Software Products • SaaS • Digital Ecosystem",
    template: "%s | DevSamp Ecosystem"
  },
  description: "DevSamp is a software engineering company powering modern enterprises with scalable software products, cloud SaaS platforms, and bespoke technology solutions.",
  
  verification: {
    google: 'D6c5A0ciZ3q-98yon-nn2GAVcNvwoKhWvCeYV9GT2Mg',
  },

  // Keywords for AI + Search Engines
  keywords: [
    "DevSamp", "Software Products", "SaaS Platform", "Next.js 15", "Technology Ecosystem",
    "Hospital ERP", "MedERP", "Multi-Tenant SaaS", "Web Development", "App Development", 
    "UI/UX Design", "Full Stack Engineering", "React Developers", "Developer APIs", 
    "Cloud Architecture", "Digital Solutions", "Custom Software India"
  ],

  authors: [{ name: "DevSamp Team", url: "https://devsamp.online/" }],
  creator: "DevSamp",
  publisher: "DevSamp Ecosystem",
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  manifest: "/manifest.json",
  icons: {
    icon: '/icon-192.png',
    shortcut: '/icon-192.png',
    apple: '/icon-192.png',
  },
  
  openGraph: {
    title: "DevSamp | Technology • Software Products • SaaS • Digital Ecosystem",
    description: "DevSamp powers modern enterprises with scalable software products, cloud platforms, and bespoke technology solutions.",
    url: 'https://devsamp.online/',
    siteName: 'DevSamp Ecosystem',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'DevSamp Ecosystem Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'DevSamp | Technology & Software Products Ecosystem',
    description: 'Transforming enterprises through modern software products, cloud engineering, and developer platforms.',
    images: ['/icon-512.png'], 
    creator: '@devsamp1st',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DevSamp",
  },

  other: {
    "geo.region": "IN", 
    "geo.placename": "India",
    "geo.position": "20.5937;78.9629",
    "ICBM": "20.5937, 78.9629"
  }
};

export const viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "DevSamp",
        "image": "https://devsamp.online/icon-512.png",
        "@id": "https://devsamp.online/#organization",
        "url": "https://devsamp.online",
        "telephone": "+91-9330680642",
        "email": "devsamp1st@gmail.com",
        "logo": "https://devsamp.online/icon-512.png",
        "sameAs": [
          "https://x.com/devsamp1st",
          "https://www.instagram.com/devsamp1st/",
          "https://www.youtube.com/@DevSamp1st",
          "https://www.freelancer.in/u/DevSamp",
          "https://www.linkedin.com/company/devsamp"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://devsamp.online/#website",
        "url": "https://devsamp.online",
        "name": "DevSamp Ecosystem",
        "publisher": {
          "@id": "https://devsamp.online/#organization"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "MedERP Pro",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Cloud",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${inter.variable} ${outfit.variable} text-slate-900 antialiased`}
        suppressHydrationWarning={true}
      >
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        <Preloader />
        <ThreeBackground />
        <ClientFeatures />
        <Noise />
        <ScrollToTop />
        <Navbar />
        {children}
      </body>

    </html>
  );
}