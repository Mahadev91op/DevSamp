import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function PUT(request) {
  try {
    const { email, name, currentPassword, newPassword } = await request.json();
    await connectDB();

    // 1. User ढूँढें
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2. अगर पासवर्ड बदलना है
    if (newPassword) {
      // पहले पुराना पासवर्ड चेक करें (Security)
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
      }
      // नया पासवर्ड हैश करें
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // 3. नाम अपडेट करें
    user.name = name;
    await user.save();

    // पासवर्ड हटाकर डेटा वापस भेजें (Frontend अपडेट के लिए)
    const updatedUser = { ...user._doc };
    delete updatedUser.password;

    return NextResponse.json({ message: "Profile updated successfully!", user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}