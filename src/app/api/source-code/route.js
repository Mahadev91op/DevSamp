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

    if (body.priceINR === 0 && body.priceUSD === 0) {
      body.isFree = true;
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

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, _id, ...data } = body;
    const targetId = id || _id;

    if (!targetId) {
      return NextResponse.json({ success: false, error: "Missing record ID" }, { status: 400 });
    }

    if (data.priceINR === 0 && data.priceUSD === 0) {
      data.isFree = true;
    }

    const updated = await SourceCode.findByIdAndUpdate(targetId, data, { new: true });

    return NextResponse.json({
      success: true,
      message: "Source code package updated successfully",
      data: updated
    }, { status: 200 });
  } catch (error) {
    console.error("API PUT /api/source-code error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update source code item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing record ID" }, { status: 400 });
    }

    await SourceCode.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Source code package deleted successfully"
    }, { status: 200 });
  } catch (error) {
    console.error("API DELETE /api/source-code error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete source code item" },
      { status: 500 }
    );
  }
}
