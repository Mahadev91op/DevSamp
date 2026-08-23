import { CmsService } from "@/server/services/cms.service";
import { ApiResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await CmsService.getMissionPayload();
    return ApiResponse.success(payload, "Mission page payload retrieved successfully");
  } catch (error) {
    console.error("GET /api/mission error:", error);
    return ApiResponse.internalError("Failed to fetch Mission page data");
  }
}
