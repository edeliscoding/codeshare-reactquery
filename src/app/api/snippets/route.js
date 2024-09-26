import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Snippet from "@/app/models/Snippet";
// import User from "../../models/User";
import { authOptions } from "../auth/[...nextauth]/route"; // Make sure this path points to your authOptions
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
export async function GET(req) {
  await dbConnect();

  try {
    // Get the session (check if user is authenticated)
    // const session = await getServerSession(authOptions);

    // let snippets;

    // if (session) {
    //   // If the user is authenticated, fetch their specific snippets
    //   snippets = await Snippet.find();
    // }
    const snippets = await Snippet.find().populate({
      path: "userId",
      select: "username",
    });
    if (!snippets) {
      return NextResponse.json({ error: "No snippets found" }, { status: 404 });
    }

    // Return the snippets based on session state
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate the user ID
    if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
      console.error("Invalid user ID:", session.user.id);
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const snippet = new Snippet({
      ...data,
      userId: userId,
    });

    await snippet.save();

    revalidatePath("/");
    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    console.error("Error creating snippet:", error);
    return NextResponse.json(
      { error: "Error creating snippet" },
      { status: 500 }
    );
  }
}
