import { CmsService } from "@/server/services/cms.service";
import { ApiResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await CmsService.getAboutPayload();
    return ApiResponse.success(payload, "About page CMS payload retrieved successfully");
  } catch (error) {
    console.error("GET /api/v1/cms/about error:", error);
    return ApiResponse.internalError("Failed to fetch About page CMS data");
  }
}
