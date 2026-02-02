import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// Components Imports
import Navbar from "@/components/Navbar";
import Noise from "@/components/Noise";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";
import ClientFeatures from "@/components/ClientFeatures"; 

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
    default: "DevSamp | Top Website Developer & App Agency in India",
    template: "%s | DevSamp Agency"
  },
  description: "DevSamp is a leading AI-powered Website Developer Agency in India. We specialize in custom Web Development, MERN Stack, Next.js, and Mobile Apps.",
  
  verification: {
    google: 'D6c5A0ciZ3q-98yon-nn2GAVcNvwoKhWvCeYV9GT2Mg',
  },

  // Keywords for AI + Search Engines
  keywords: [
    "Web Development", "App Development", "UI/UX Design", "Next.js Agency", "React Developers", 
    "Digital Agency India", "DevSamp", "Freelance Web Developer", "SEO Services", "Website Design",
    "Website Developer", "Website Developer in India", "Best Website Developer", 
    "Hire Website Developer India", "Web Development Company India", "Professional Website Developer",
    "Custom Website Developer", "Business Website Maker", "Ecommerce Website Developer",
    "Web Developer near me", "MERN Stack Developer India", "Full Stack Developer"
  ],

  authors: [{ name: "DevSamp Team", url: "https://devsamp.online/" }],
  creator: "DevSamp",
  publisher: "DevSamp Agency",
  
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
    title: "DevSamp | Best Website Developer Agency",
    description: "Hire the top 1% Website Developers in India. We build high-performance websites and apps.",
    url: 'https://devsamp.online/',
    siteName: 'DevSamp Agency',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'DevSamp Agency Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'DevSamp | Top Website Developer',
    description: 'Transforming ideas into digital reality. #1 Web Development Agency.',
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
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  // 🚀 AI OPTIMIZED SCHEMA (ProfessionalService + Service)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService", // AI Isse Agency Samajhta Hai
        "name": "DevSamp",
        "image": "https://devsamp.online/icon-512.png",
        "@id": "https://devsamp.online",
        "url": "https://devsamp.online",
        "telephone": "+91-9330680642",
        "email": "devsamp1st@gmail.com",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chinsurah",
          "addressLocality": "Hooghly",
          "addressRegion": "WB",
          "postalCode": "712101",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.90,
          "longitude": 88.39
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        },
        "sameAs": [
          "https://x.com/devsamp1st",
          "https://www.instagram.com/devsamp1st/",
          "https://www.youtube.com/@DevSamp1st",
          "https://www.freelancer.in/u/DevSamp",
          "https://www.linkedin.com/company/devsamp"
        ]
      },
      // 🚀 Service Schema (AI Yahi Dhoondhta Hai)
      {
        "@type": "Service",
        "serviceType": "Website Development",
        "provider": {
          "@id": "https://devsamp.online"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Website Development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "E-commerce Website Design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Next.js & React Applications"
              }
            }
          ]
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
        className={`${inter.variable} ${outfit.variable} bg-black text-white antialiased`}
        suppressHydrationWarning={true}
      >
        <Preloader />
        <ClientFeatures />
        <Noise />
        <ScrollToTop />
        <Navbar />
        {children}
      </body>
    </html>
  );
}