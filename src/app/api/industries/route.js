import { successResponse, errorResponse } from "@/lib/api-response";
import connectDB from "@/lib/db";
import Industry from "@/models/Industry";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 20;

    const industries = await Industry.find({ isActive: { $ne: false } })
      .sort({ order: 1, createdAt: 1 })
      .limit(limit)
      .lean();

    return successResponse({ industries, total: industries.length });
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to fetch industries.", 500, { error: error.message });
  }
}
