import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import PricingSettings from '@/models/PricingSettings';
import { verifyAdminSession } from '@/lib/auth';

const defaultSettings = {
  basePrice: 499,
  pricePerPage: 50,
  addons: [
    { name: "Interactive Dashboard", price: 200, enabled: true },
    { name: "Full SEO Optimization", price: 150, enabled: true },
    { name: "Secure Payment Gateway", price: 100, enabled: true }
  ]
};

// 1. GET Settings
export async function GET() {
  try {
    await connectDB();
    let settings = await PricingSettings.findOne();
    if (!settings) {
      // Seed initial default settings if empty
      settings = await PricingSettings.create(defaultSettings);
    }
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pricing settings:", error);
    return NextResponse.json({ message: "Error fetching pricing settings" }, { status: 500 });
  }
}

// 2. PUT Settings (Update)
export async function PUT(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await connectDB();
    
    // Find first document and update it, or create if it doesn't exist
    const settings = await PricingSettings.findOneAndUpdate(
      {},
      {
        basePrice: Number(body.basePrice),
        pricePerPage: Number(body.pricePerPage),
        addons: body.addons
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ message: "Settings Updated!", settings }, { status: 200 });
  } catch (error) {
    console.error("Error updating pricing settings:", error);
    return NextResponse.json({ message: "Error updating pricing settings" }, { status: 500 });
  }
}
