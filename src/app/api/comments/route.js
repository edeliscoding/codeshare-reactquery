// app/api/comments/route.js
// import { NextResponse } from "next/server";
// import dbConnect from "../../lib/dbConnect";
// import Snippet from "../../models/Snippet";
// import Comment from "../../models/Comment";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Snippet from "@/app/models/Snippet";
import Comment from "@/app/models/Comment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { snippetId, comment } = await request.json();

    const commentCreated = await Comment.create({
      content: comment,
      author: session.user.id,
      snippet: snippetId,
    });

    await Snippet.findByIdAndUpdate(snippetId, {
      $push: { comments: comment._id },
    });
    // revalidatePath("/snippets/[id]");
    // revalidatePath("/");
    return NextResponse.json(commentCreated, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function POST(request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     await dbConnect();
//     const { snippetId, content } = await request.json();
//     console.log("from comments route", snippetId, content);

//     const comment = await Comment.create({
//       content,
//       author: session.user.id,
//       snippet: snippetId,
//     });

//     await Snippet.findByIdAndUpdate(snippetId, {
//       $push: { comments: comment._id },
//     });
//     // revalidatePath("/snippets/[id]");
//     // revalidatePath("/");
//     return NextResponse.json(comment, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
