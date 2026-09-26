import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getHomepageData } from "@/lib/data";
import HomepageSection from "@/models/HomepageSection";
import SiteSetting from "@/models/SiteSetting";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getHomepageData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch homepage data", error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (body.type === "site-setting") {
      const updated = await SiteSetting.findOneAndUpdate(
        { key: "main" },
        { $set: body.settings },
        { upsert: true, new: true }
      );
      return NextResponse.json({ success: true, message: "Site settings updated", data: updated });
    }

    if (body.type === "batch-sections" && Array.isArray(body.sections)) {
      const updates = body.sections.map((sec) =>
        HomepageSection.findOneAndUpdate(
          { key: sec.key },
          { $set: sec },
          { upsert: true, new: true }
        )
      );
      await Promise.all(updates);
      return NextResponse.json({ success: true, message: "All sections synchronized" });
    }

    if (body.key) {
      const updatedSection = await HomepageSection.findOneAndUpdate(
        { key: body.key },
        { $set: body },
        { upsert: true, new: true }
      );
      return NextResponse.json({ success: true, message: `Section [${body.key}] updated`, data: updatedSection });
    }

    return NextResponse.json({ success: false, error: "Invalid payload format" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/homepage error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update homepage CMS" }, { status: 500 });
  }
}

export async function PUT(request) {
  return POST(request);
}
