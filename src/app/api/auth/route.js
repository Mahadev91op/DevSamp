import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'; // Password security ke liye

export async function POST(request) {
  try {
    const { action, name, email, password, provider } = await request.json();
    await connectDB();

    // --- 1. SIGNUP (Account Create) ---
    if (action === 'signup') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists!" }, { status: 400 });
      }
      
      // Password ko Hash (Encrypt) karein
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ 
          name, 
          email, 
          password: hashedPassword, // Hashed password save hoga
          provider: "email" 
      });
      
      return NextResponse.json({ message: "Account created!", user: newUser }, { status: 201 });
    }

    // --- 2. LOGIN (Secure Login) ---
    if (action === 'login') {
      const user = await User.findOne({ email });
      if (!user) { 
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      // Password match check karein
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
         return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      // User data bina password ke bhejein
      const userData = { ...user._doc };
      delete userData.password;

      return NextResponse.json({ message: "Login successful!", user: userData }, { status: 200 });
    }

    // --- 3. FORGOT PASSWORD ---
    if (action === 'forgot') {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "No user found with this email" }, { status: 404 });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS
        }
      });

      // Note: Asli production mein yahan Reset Link bhejte hain, abhi demo ke liye hum user ko notify kar rahe hain.
      const mailOptions = {
        from: `"DevSamp Security" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Request',
        text: `Hello ${user.name},\n\nWe received a request to reset your password. Please contact admin to reset it securely.\n\nRegards,\nDevSamp Team`
      };

      try {
        if (process.env.EMAIL_USER) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log(`[DEMO] Email would be sent to: ${email}`);
        }
        return NextResponse.json({ message: "Reset info sent to your email!" }, { status: 200 });
      } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to send email. Check .env variables." }, { status: 500 });
      }
    }

    // --- 4. SOCIAL LOGIN (Demo) ---
    if (action === 'social') {
        let user = await User.findOne({ email });
        
        if (!user) {
            // Social login ke liye random secure password
            const randomPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPass, 10);

            user = await User.create({ 
                name, 
                email, 
                password: hashedPassword, 
                role: 'client',
                provider: provider 
            });
        }
        
        return NextResponse.json({ message: `Welcome ${name}!`, user }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}