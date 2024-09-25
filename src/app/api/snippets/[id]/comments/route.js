import Snippet from "@/app/models/Snippet";
import Comment from "@/app/models/Comment";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    // Fetch the snippet regardless of session state
    // const snippet = await Snippet.findById(id).populate("comments");
    const snippet = await Snippet.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      })
      .lean();
    console.log("Snippet from database:", snippet);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    // Get the session (check if user is authenticated)
    const session = await getServerSession(authOptions);

    // Return the snippet data, can include user-specific data if authenticated
    return NextResponse.json(snippet.comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request, { params }) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { content } = await request.json();

    // Create the comment
    const comment = await Comment.create({
      content,
      author: session.user.id,
      snippet: id,
    });

    // Push the comment to the snippet's comments array
    await Snippet.findByIdAndUpdate(id, {
      $push: { comments: comment._id },
    });

    // Optionally, revalidate paths
    revalidatePath(`/snippets/${id}`);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
