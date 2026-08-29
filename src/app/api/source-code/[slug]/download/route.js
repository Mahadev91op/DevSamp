import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SourceCode from "@/models/SourceCode";
import { incrementSourceCodeDownload } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Invalid slug" }, { status: 400 });
    }

    await connectDB();
    const item = await SourceCode.findOne({ slug, isActive: { $ne: false } }).lean();

    if (!item) {
      return NextResponse.json({ success: false, error: "Source code project not found" }, { status: 404 });
    }

    // Increment download metrics in MongoDB
    await incrementSourceCodeDownload(slug);

    // Resolve target GitHub download / clone URL
    const targetUrl = item.downloadUrl || `${item.githubUrl}/archive/refs/heads/main.zip`;

    // For Free items, redirect directly to GitHub archive or return download object
    const isDirectRedirect = request.nextUrl.searchParams.get("redirect") === "true";
    if (isDirectRedirect) {
      return NextResponse.redirect(targetUrl, 307);
    }

    return NextResponse.json({
      success: true,
      data: {
        title: item.title,
        slug: item.slug,
        isFree: item.isFree,
        githubUrl: item.githubUrl,
        downloadUrl: targetUrl,
        version: item.version,
        license: item.license
      }
    });
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json({ success: false, error: "Failed to process download" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    if (!slug) {
      return NextResponse.json({ success: false, error: "Invalid slug" }, { status: 400 });
    }

    await connectDB();
    const item = await SourceCode.findOne({ slug, isActive: { $ne: false } }).lean();

    if (!item) {
      return NextResponse.json({ success: false, error: "Source code not found" }, { status: 404 });
    }

    // Increment download analytics
    await incrementSourceCodeDownload(slug);

    const targetUrl = item.downloadUrl || `${item.githubUrl}/archive/refs/heads/main.zip`;

    return NextResponse.json({
      success: true,
      message: "Access granted via GitHub",
      data: {
        downloadUrl: targetUrl,
        githubUrl: item.githubUrl,
        licenseKey: `DS-LIC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        accessType: item.isFree ? "Free Community" : "Verified Commercial License"
      }
    });
  } catch (error) {
    console.error("POST download error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate access" }, { status: 500 });
  }
}
