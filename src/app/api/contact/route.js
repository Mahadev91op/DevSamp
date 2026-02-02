import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import { sendEmail } from '@/lib/email';

// 1. DATA SAVE KARNA (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    // --- VALIDATION START ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required!" }, 
        { status: 400 }
      );
    }
    
    // Basic Email Regex Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid Email Address!" }, 
        { status: 400 }
      );
    }
    // --- VALIDATION END ---
    
    console.log("📨 New Lead Received:", name);

    await connectDB();
    
    // Database me save karo
    await Contact.create({ 
        name, 
        email, 
        service: service || "General Inquiry", 
        message,
        status: "New"
    });

    // Email Notification to Admin
    const adminEmailContent = `
      <h3>🚀 New Lead Received!</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service || "N/A"}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;
    
    // Admin ko email (Error handling included specifically for email)
    try {
        await sendEmail(
            process.env.EMAIL_USER, 
            `New Inquiry from ${name}`,
            `New lead from ${name}.`,
            adminEmailContent
        );

        // Client ko Thank You email
        await sendEmail(
            email,
            "We received your message! - DevSamp",
            `Hi ${name},\n\nThanks for reaching out. We have received your inquiry and will get back to you shortly.\n\nBest,\nDevSamp Team`
        );
    } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Email fail hone par bhi success return karein taaki user panic na kare, 
        // lekin server logs me error dikh jaye.
    }

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

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await connectDB();
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Lead Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, status } = await request.json();
    await connectDB();
    await Contact.findByIdAndUpdate(id, { status });
    return NextResponse.json({ message: "Status Updated!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update status" }, { status: 500 });
  }
}