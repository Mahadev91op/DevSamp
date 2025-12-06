import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/models/Review';

// 1. GET (Fetch All)
export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching reviews" }, { status: 500 });
  }
}

// 2. POST (Submit Review)
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    
    // Auto-assign random avatar if not provided
    if (!body.image) {
        const gender = Math.random() > 0.5 ? "men" : "women";
        const randomId = Math.floor(Math.random() * 99);
        body.image = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
    }

    await Review.create(body);
    return NextResponse.json({ message: "Review Submitted!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error submitting review" }, { status: 500 });
  }
}

// 3. DELETE (Remove Review)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ message: "Review Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting review" }, { status: 500 });
  }
}