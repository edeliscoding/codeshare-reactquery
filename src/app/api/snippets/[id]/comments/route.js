import Snippet from "@/app/models/Snippet";
import Comment from "@/app/models/Comment";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
// export async function POST(request, { params }) {
//   const { id } = params;

//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     await dbConnect();
//     const { snippetId, content } = await request.json();
//     console.log("from comments route", snippetId, comment);

//     const comment = await Comment.create({
//       content,
//       author: session.user.id,
//       snippet: snippetId,
//     });
//     console.log("New comment created:", comment);

//     await Snippet.findByIdAndUpdate(snippetId, {
//       $push: { comments: comment._id },
//     });
//     revalidatePath("/snippets/[id]");
//     revalidatePath("/");
//     return NextResponse.json(comment, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
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
