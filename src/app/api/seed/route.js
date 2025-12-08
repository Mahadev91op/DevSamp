import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Pricing from '@/models/Pricing';

export async function GET() {
  try {
    await connectDB();
    
    // Step 1: Pehle purana data clear karenge taaki duplicate na ho
    await Pricing.deleteMany({});

    // Step 2: Naya Data (Dummy Plans)
    const pricingPlans = [
      {
        name: "Starter",
        desc: "Perfect for individuals and small projects needing a quick start.",
        priceMonthly: "29",
        priceYearly: "290",
        features: [
          "1 Project",
          "Basic Analytics",
          "24/7 Email Support",
          "Mobile Responsive Design",
          "Basic SEO Setup"
        ],
        missing: [
          "Custom Domain Integration",
          "Priority Phone Support",
          "Advanced Animations",
          "Database Integration"
        ],
        popular: false,
        gradient: "from-blue-500 to-cyan-500" // Blue Theme
      },
      {
        name: "Pro",
        desc: "Ideal for growing businesses that need more power and flexibility.",
        priceMonthly: "79",
        priceYearly: "790",
        features: [
          "5 Projects",
          "Advanced Analytics Dashboard",
          "Priority Email & Chat Support",
          "Custom Domain Integration",
          "Advanced SEO & Performance",
          "Database Integration",
          "CMS Access"
        ],
        missing: [
          "White Labeling",
          "Dedicated Account Manager"
        ],
        popular: true, // Ye plan highlight hoga (Most Popular)
        gradient: "from-purple-500 to-pink-500" // Purple Theme
      },
      {
        name: "Enterprise",
        desc: "For large scale organizations requiring top-tier solutions.",
        priceMonthly: "199",
        priceYearly: "1990",
        features: [
          "Unlimited Projects",
          "Real-time Custom Analytics",
          "24/7 Priority Phone Support",
          "White Labeling",
          "Dedicated Account Manager",
          "Custom API Access",
          "Cloud Infrastructure Setup",
          "Daily Backups"
        ],
        missing: [], // Sab kuch included hai
        popular: false,
        gradient: "from-orange-500 to-red-500" // Orange Theme
      }
    ];

    // Step 3: Database me insert karna
    await Pricing.insertMany(pricingPlans);

    return NextResponse.json({ message: "Pricing Plans Seeded Successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}