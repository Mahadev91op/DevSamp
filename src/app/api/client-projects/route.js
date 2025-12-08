import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ClientProject from '@/models/ClientProject';

// 1. GET (Admin gets ALL, User gets THEIRS)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email'); // Agar email hai to user ka project, nahi to sabka (Admin)

    await connectDB();
    
    let projects;
    if (email) {
        projects = await ClientProject.findOne({ clientEmail: email }); // User specific
    } else {
        projects = await ClientProject.find().sort({ createdAt: -1 }); // Admin (All)
    }

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching projects" }, { status: 500 });
  }
}

// 2. POST (Admin Creates New Project)
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    await ClientProject.create(body);
    return NextResponse.json({ message: "Client Project Created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating project" }, { status: 500 });
  }
}

// 3. PUT (Admin Updates Project - Progress, Stages, Updates)
export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    await connectDB();
    await ClientProject.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: "Project Updated Successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating project" }, { status: 500 });
  }
}

// 4. DELETE
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await ClientProject.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting project" }, { status: 500 });
  }
}