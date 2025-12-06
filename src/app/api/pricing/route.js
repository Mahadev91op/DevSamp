import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Pricing from '@/models/Pricing';

// 1. GET (Fetch All)
export async function GET() {
  try {
    await connectDB();
    // Sort by priceMonthly so cheaper plans come first usually
    const pricing = await Pricing.find().sort({ priceMonthly: 1 }); 
    return NextResponse.json({ pricing }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching pricing" }, { status: 500 });
  }
}

// 2. POST (Add New)
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    await Pricing.create(body);
    return NextResponse.json({ message: "Plan Added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding plan" }, { status: 500 });
  }
}

// 3. PUT (Update)
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    await connectDB();
    await Pricing.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: "Plan Updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating plan" }, { status: 500 });
  }
}

// 4. DELETE (Remove)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Pricing.findByIdAndDelete(id);
    return NextResponse.json({ message: "Plan Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting plan" }, { status: 500 });
  }
}