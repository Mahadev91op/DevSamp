import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

// 1. GET (Fetch All Blogs)
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Latest first
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}

// 2. POST (Add New Blog)
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    await Blog.create(body);
    return NextResponse.json({ message: "Blog Added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding blog" }, { status: 500 });
  }
}

// 3. PUT (Update Blog)
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    await connectDB();
    await Blog.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: "Blog Updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating blog" }, { status: 500 });
  }
}

// 4. DELETE (Remove Blog)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Blog Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting blog" }, { status: 500 });
  }
}