import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';         // Database Connection import kiya
import Contact from '@/models/Contact';   // Data Model import kiya

// 1. DATA SAVE KARNA (POST) - Jab User Form Bharega
export async function POST(request) {
  try {
    const { name, email, service, message } = await request.json();
    
    // Terminal me dikhane ke liye ki data aaya
    console.log("📨 New Lead Received:", name);

    await connectDB();
    
    // Database me naya contact banao
    await Contact.create({ 
        name, 
        email, 
        service, 
        message,
        status: "New" // Default status
    });

    return NextResponse.json(
      { message: "Message Saved Successfully!" }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json(
      { message: "Failed to save message" }, 
      { status: 500 }
    );
  }
}

// 2. DATA LANA (GET) - Admin Panel ke liye
export async function GET() {
  try {
    await connectDB();
    
    // Saare contacts dhundo aur naye wale sabse upar rakho (createdAt: -1)
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({ contacts }, { status: 200 });

  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch contacts" }, 
      { status: 500 }
    );
  }
}

// 3. DATA DELETE KARNA (DELETE) - Admin Panel ke liye
export async function DELETE(request) {
  try {
    // URL se ID nikalna (e.g., api/contact?id=12345)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await connectDB();
    
    // Us ID wale ko delete karo
    await Contact.findByIdAndDelete(id);

    return NextResponse.json({ message: "Lead Deleted!" }, { status: 200 });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Failed to delete" }, 
      { status: 500 }
    );
  }
}

// 4. STATUS UPDATE KARNA (PUT) - Admin Panel ke liye
export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    await connectDB();

    // Status update karo
    await Contact.findByIdAndUpdate(id, { status });

    return NextResponse.json({ message: "Status Updated!" }, { status: 200 });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "Failed to update status" }, 
      { status: 500 }
    );
  }
}