import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

// 1. DATA LANA (GET)
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching projects" }, { status: 500 });
  }
}

// 2. ADD PROJECT (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    await Project.create(body);
    return NextResponse.json({ message: "Project Added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding project" }, { status: 500 });
  }
}

// 3. EDIT PROJECT (PUT)
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    await connectDB();
    await Project.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: "Project Updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating project" }, { status: 500 });
  }
}

// 4. DELETE PROJECT (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting project" }, { status: 500 });
  }
}