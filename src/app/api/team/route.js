import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Team from '@/models/Team';

// 1. DATA LANA (GET)
export async function GET() {
  try {
    await connectDB();
    const team = await Team.find().sort({ createdAt: 1 });
    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching team" }, { status: 500 });
  }
}

// 2. ADD MEMBER (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    await Team.create(body);
    return NextResponse.json({ message: "Member Added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding member" }, { status: 500 });
  }
}

// 3. EDIT MEMBER (PUT)
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    await connectDB();
    await Team.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: "Member Updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating member" }, { status: 500 });
  }
}

// 4. DELETE MEMBER (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Team.findByIdAndDelete(id);
    return NextResponse.json({ message: "Member Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting member" }, { status: 500 });
  }
}