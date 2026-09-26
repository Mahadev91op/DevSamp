import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import EcosystemItem from "@/models/EcosystemItem";
import { verifyAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const items = await EcosystemItem.find().sort({ order: 1 });
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
    const updated = await EcosystemItem.findByIdAndUpdate(targetId, data, { new: true });
    return NextResponse.json({ message: "Ecosystem node updated", item: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update ecosystem node", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await connectDB();
    await EcosystemItem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ecosystem node deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete ecosystem node", error: error.message }, { status: 500 });
  }
}
