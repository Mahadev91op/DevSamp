import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Service from '@/models/Service';
import { verifyAdminSession } from '@/lib/auth';

export const dynamic = "force-dynamic";

// 1. SERVICES LANA (GET)
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 });
  }
}

// 2. NEW SERVICE ADD KARNA (POST)
export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await connectDB();
    const created = await Service.create(body);
    return NextResponse.json({ message: "Service Added!", service: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add service", error: error.message }, { status: 500 });
  }
}

// 3. SERVICE UPDATE KARNA (PUT)
export async function PUT(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { id, _id, ...data } = body;
    const targetId = id || _id;

    await connectDB();
    const updated = await Service.findByIdAndUpdate(targetId, data, { new: true });
    return NextResponse.json({ message: "Service Updated!", service: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update service", error: error.message }, { status: 500 });
  }
}

// 4. SERVICE DELETE KARNA (DELETE)
export async function DELETE(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Service Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}