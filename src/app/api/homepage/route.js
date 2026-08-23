import { NextResponse } from "next/server";
import { getHomepageData } from "@/lib/data";

export async function GET() {
  try {
    const data = await getHomepageData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch homepage data", error: error.message }, { status: 500 });
  }
}
