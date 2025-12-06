import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

// 1. SERVICES LANA (GET)
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().sort({ createdAt: -1 });
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 });
  }
}

// 2. NEW SERVICE ADD KARNA (POST)
export async function POST(request) {
  try {
    const { title, desc, icon, color, gradient } = await request.json();
    await connectDB();
    await Service.create({ title, desc, icon, color, gradient });
    return NextResponse.json({ message: "Service Added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add service" }, { status: 500 });
  }
}

// 3. SERVICE DELETE KARNA (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Service Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}