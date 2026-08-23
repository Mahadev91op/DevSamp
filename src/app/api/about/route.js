import { CmsService } from "@/server/services/cms.service";
import { ApiResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await CmsService.getAboutPayload();
    return ApiResponse.success(payload, "About page payload retrieved successfully");
  } catch (error) {
    console.error("GET /api/about error:", error);
    return ApiResponse.internalError("Failed to fetch About page data");
  }
}
