import { successResponse, errorResponse } from "@/lib/api-response";
import connectDB from "@/lib/db";
import CaseStudy from "@/models/CaseStudy";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const featured = searchParams.get("featured");

    const query = { isActive: { $ne: false } };
    if (featured === "true") query.featured = true;

    const caseStudies = await CaseStudy.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    return successResponse({ caseStudies, total: caseStudies.length });
  } catch (error) {
    return errorResponse("INTERNAL_ERROR", "Failed to fetch case studies.", 500, { error: error.message });
  }
}
