import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { verifyAdminSession } from "@/lib/auth";

// 1. GET PRODUCTS
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");

    const query = { isActive: { $ne: false } };
    if (featured === "true") query.featured = true;
    if (status) query.status = status;

    const products = await Product.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products", error: error.message }, { status: 500 });
  }
}

// 2. ADD PRODUCT (POST - Admin only)
export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await connectDB();
    const product = await Product.create(body);
    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create product", error: error.message }, { status: 500 });
  }
}

// 3. UPDATE PRODUCT (PUT - Admin only)
export async function PUT(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id, ...data } = await request.json();
    await connectDB();
    const updated = await Product.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ message: "Product updated successfully", product: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update product", error: error.message }, { status: 500 });
  }
}

// 4. DELETE PRODUCT (DELETE - Admin only)
export async function DELETE(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete product", error: error.message }, { status: 500 });
  }
}
