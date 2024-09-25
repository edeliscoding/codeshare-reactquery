// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import Snippet from "../../../../models/Snippet";
// import dbConnect from "../../../../lib/dbConnect";
// import { revalidatePath } from "next/cache";
// export async function PATCH(req, { params }) {
//   await dbConnect();

//   const { id } = params;
//   const session = await getServerSession(req);

//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;

//   try {
//     const snippet = await Snippet.findById(id);
//     if (!snippet) {
//       return NextResponse.json(
//         { message: "Snippet not found" },
//         { status: 404 }
//       );
//     }

//     if (snippet.upvotes.includes(userId)) {
//       return NextResponse.json({ message: "Already upvoted" }, { status: 400 });
//     }

//     // Add user to upvotes array
//     snippet.upvotes.push(userId);
//     await snippet.save();

//     return NextResponse.json({
//       message: "Upvote added",
//       upvotes: snippet.upvotes.length,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating upvote", error },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Snippet from "@/app/models/Snippet";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  const { id: snippetId } = params;
  await dbConnect();
  // const session = await getServerSession(req);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      error: "You must be logged in to upvote a snippet",
      status: 401,
    });
  }

  const userId = session.user.id;
  // const userId = session.user.id;
  console.log("userId", userId);

  try {
    const snippet = await Snippet.findById(snippetId);

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found", status: 404 });
    }

    // Check if the user has already upvoted the snippet
    const hasUpvoted = snippet.upvotes.includes(userId);

    if (hasUpvoted) {
      return NextResponse.json({
        error: "User has already upvoted this snippet",
        status: 400,
      });
    }

    // Add user's id to the upvotes array
    snippet.upvotes.push(userId);

    await snippet.save();

    return NextResponse.json({
      message: "Snippet upvoted successfully",
      upvotes: snippet.upvotes.length,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
