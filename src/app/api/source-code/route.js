import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SourceCode from "@/models/SourceCode";
import { getSourceCodes } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const filterType = searchParams.get("type"); // "free", "paid", "all"
    const search = searchParams.get("search");

    const filters = {};
    if (category && category !== "All") filters.category = category;
    if (filterType === "free") filters.isFree = true;
    if (filterType === "paid") filters.isFree = false;
    if (search) filters.search = search;

    const sourceCodes = await getSourceCodes(filters);

    return NextResponse.json({
      success: true,
      data: sourceCodes,
      count: sourceCodes.length
    });
  } catch (error) {
    console.error("API /api/source-code error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load source code catalog" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.title || !body.slug || !body.githubUrl) {
      return NextResponse.json(
        { success: false, error: "Title, slug, and GitHub URL are mandatory" },
        { status: 400 }
      );
    }

    const newItem = await SourceCode.create(body);

    return NextResponse.json({
      success: true,
      message: "Source code package published successfully",
      data: newItem
    }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/source-code error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create source code item" },
      { status: 500 }
    );
  }
}
