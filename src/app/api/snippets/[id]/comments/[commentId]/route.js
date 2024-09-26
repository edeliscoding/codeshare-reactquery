import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Comment from "@/app/models/Comment";
import Snippet from "@/app/models/Snippet";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id, commentId } = params;
  console.log("from delete route", id, commentId);
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const comment = await Comment.findOneAndDelete({
    _id: commentId,
  });

  await Snippet.findByIdAndUpdate(id, {
    $pull: { comments: commentId },
  });

  if (!comment) {
    return NextResponse.json({ error: "comment not found" }, { status: 404 });
  }
  revalidatePath(`/snippets/${id}`);
  return NextResponse.json({ message: "comment deleted successfully" });
}
