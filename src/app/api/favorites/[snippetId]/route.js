import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Snippet from "@/app/models/Snippet";
import { revalidatePath } from "next/cache";

// export async function POST(request, { params }) {
//   const { snippetId } = params;
//   try {
//     await dbConnect();
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!snippetId) {
//       return NextResponse.json(
//         { error: "Snippet ID is required" },
//         { status: 400 }
//       );
//     }

//     const snippet = await Snippet.findById(snippetId);
//     if (!snippet) {
//       return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
//     }

//     const userId = session.user.id;
//     const userLikedIndex = snippet.likes.indexOf(userId);
//     let message;

//     if (userLikedIndex > -1) {
//       // User has already liked, so remove the like
//       snippet.likes.splice(userLikedIndex, 1);
//       message = "Like removed successfully";
//     } else {
//       // User hasn't liked, so add the like
//       snippet.likes.push(userId);
//       message = "Like added successfully";
//     }

//     await snippet.save();
//     revalidatePath("/snippets/[id]");
//     revalidatePath("/");

//     return NextResponse.json({ message }, { status: 200 });
//   } catch (error) {
//     console.error("Error in POST /api/favorites:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req, { params }) {
  const { snippetId } = params;
  const body = await req.json();

  console.log("Snippet ID:", snippetId);
  return NextResponse.json({
    message: `Snippet liked successfully is ${snippetId}`,
  });
}

export async function POST(request, { params }) {
  const { snippetId } = params;
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!snippetId) {
      return NextResponse.json(
        { error: "Snippet ID is required" },
        { status: 400 }
      );
    }

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const userLikedIndex = snippet.likes.indexOf(userId);
    let message;
    let hasFavorited;

    if (userLikedIndex > -1) {
      // User has already liked, so remove the like
      snippet.likes.splice(userLikedIndex, 1);
      message = "Like removed successfully";
      hasFavorited = false;
    } else {
      // User hasn't liked, so add the like
      snippet.likes.push(userId);
      message = "Like added successfully";
      hasFavorited = true;
    }

    await snippet.save();
    revalidatePath("/snippets/[id]");
    revalidatePath("/");

    return NextResponse.json(
      {
        message,
        hasFavorited,
        likesCount: snippet.likes.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/favorites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
