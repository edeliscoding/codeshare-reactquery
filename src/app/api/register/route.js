import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import User from "@/app/models/User";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Note: In a real application, you should hash the password before storing it
    });

    await newUser.save();

    // Remove password from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return NextResponse.json(
      { message: "User registered successfully", user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
