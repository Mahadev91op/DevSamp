import { CmsService } from "@/server/services/cms.service";
import { ApiResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await CmsService.getVisionPayload();
    return ApiResponse.success(payload, "CMS Vision payload retrieved successfully");
  } catch (error) {
    console.error("GET /api/v1/cms/vision error:", error);
    return ApiResponse.internalError("Failed to fetch CMS Vision data");
  }
}
