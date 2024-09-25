// File: app/api/snippets/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "../../../../lib/dbConnect";
import Comment from "@/app/models/Comment"; // Add this line
import Snippet from "../../../models/Snippet";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Fetch the snippet regardless of session state
    const snippet = await Snippet.findById(id).populate("comments");
    console.log("Snippet from database:", snippet);

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Get the session (check if user is authenticated)
    const session = await getServerSession(authOptions);

    // Return the snippet data, can include user-specific data if authenticated
    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const snippet = await Snippet.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    data,
    { new: true, runValidators: true }
  );

  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }
  revalidatePath("/snippets");
  return NextResponse.json(snippet);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snippet = await Snippet.findOneAndDelete({
    _id: params.id,
    userId: session.user.id,
  });

  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }
  revalidatePath("/snippets");
  return NextResponse.json({ message: "Snippet deleted successfully" });
}
