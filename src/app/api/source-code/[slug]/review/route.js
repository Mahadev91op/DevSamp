import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SourceCode from "@/models/SourceCode";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    if (!body.name || !body.comment || !body.rating) {
      return NextResponse.json(
        { success: false, error: "Name, rating (1-5), and feedback comment are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const item = await SourceCode.findOne({ slug, isActive: { $ne: false } });

    if (!item) {
      return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 });
    }

    const newReview = {
      name: body.name.trim(),
      role: body.role?.trim() || "Developer / Architect",
      company: body.company?.trim() || "Independent Organization",
      rating: Math.max(1, Math.min(5, Number(body.rating) || 5)),
      comment: body.comment.trim(),
      createdAt: new Date()
    };

    item.reviews = [newReview, ...(item.reviews || [])];
    item.reviewsCount = item.reviews.length;
    
    // Recalculate average rating
    const totalStars = item.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    item.rating = Number((totalStars / item.reviews.length).toFixed(1));

    await item.save();

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully!",
      data: newReview
    }, { status: 201 });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
