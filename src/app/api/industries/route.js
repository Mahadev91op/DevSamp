import { successResponse, errorResponse } from "@/lib/api-response";
import connectDB from "@/lib/db";
import Industry from "@/models/Industry";
import { verifyAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 50;

    const industries = await Industry.find()
      .sort({ order: 1, createdAt: 1 })
      .limit(limit)
      .lean();

    return successResponse({ industries, total: industries.length });
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to fetch industries.", 500, { error: error.message });
  }
}

export async function POST(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return errorResponse("UNAUTHORIZED", "Admin access required", 401);
    }
    const body = await request.json();
    await connectDB();
    const created = await Industry.create(body);
    return successResponse({ industry: created, message: "Industry domain created successfully" }, 201);
  } catch (error) {
    return errorResponse("CREATE_FAILED", "Failed to create industry", 500, { error: error.message });
  }
}

export async function PUT(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return errorResponse("UNAUTHORIZED", "Admin access required", 401);
    }
    const body = await request.json();
    const { id, _id, ...data } = body;
    const targetId = id || _id;

    await connectDB();
    const updated = await Industry.findByIdAndUpdate(targetId, data, { new: true });
    return successResponse({ industry: updated, message: "Industry domain updated successfully" });
  } catch (error) {
    return errorResponse("UPDATE_FAILED", "Failed to update industry", 500, { error: error.message });
  }
}

export async function DELETE(request) {
  try {
    const adminSession = await verifyAdminSession();
    if (!adminSession) {
      return errorResponse("UNAUTHORIZED", "Admin access required", 401);
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await connectDB();
    await Industry.findByIdAndDelete(id);
    return successResponse({ message: "Industry domain deleted successfully" });
  } catch (error) {
    return errorResponse("DELETE_FAILED", "Failed to delete industry", 500, { error: error.message });
  }
}
