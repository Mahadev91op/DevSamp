import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { login } from '@/lib/auth'; // यह लाइन सबसे जरूरी है

export async function POST(request) {
  try {
    const { action, name, email, password, provider } = await request.json();
    await connectDB();

    // --- LOGIN ---
    if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

      // Session Create Karein
      const userData = { id: user._id, name: user.name, email: user.email, role: user.role };
      await login(userData); 

      return NextResponse.json({ message: "Login successful!", user: userData }, { status: 200 });
    }

    // --- SIGNUP ---
    if (action === 'signup') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists!" }, { status: 400 });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, provider: "email" });
      
      const userData = { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role };
      await login(userData);

      return NextResponse.json({ message: "Account created!", user: userData }, { status: 201 });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Auth Error:", error); // Terminal me error check karein
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}