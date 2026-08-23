import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import EcosystemItem from "@/models/EcosystemItem";
import { verifyAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const items = await EcosystemItem.find({ isActive: { $ne: false } }).sort({ order: 1 });
    return NextResponse.json({ ecosystem: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch ecosystem items", error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await connectDB();
    const item = await EcosystemItem.create(body);
    return NextResponse.json({ message: "Ecosystem node created", item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create ecosystem node", error: error.message }, { status: 500 });
  }
}
