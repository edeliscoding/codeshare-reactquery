"use server";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Snippet from "../models/Snippet";
import { revalidatePath } from "next/cache";

// export const editSnippet = async (formData) => {
//   const snippetId = formData.get("snippetId");
//   const code = formData.get("code");
//   console.log("code and snippet", snippetId, code);
//   await dbConnect();
//   const currentUser = await getServerSession(authOptions);

//   if (!currentUser) {
//     return [];
//   }

//   const snippet = await Snippet.findOneAndUpdate(
//     { _id: snippetId, userId: currentUser.user.id },
//     code,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   // console.log("Snippet updated", snippet);
//   if (!snippet) {
//     return [];
//   }
//   console.log("Updataed Snippet", snippet);
//   revalidatePath("/snippets/mine");
// };
export const editSnippet = async (formData) => {
  const snippetId = formData.get("snippetId");
  const code = formData.get("code");
  console.log("code and snippet", snippetId, code);

  await dbConnect();
  const currentUser = await getServerSession(authOptions);
  if (!currentUser) {
    console.log("No user found");
    return { success: false, message: "No user found" };
  }

  try {
    const snippet = await Snippet.findOneAndUpdate(
      { _id: snippetId, userId: currentUser.user.id },
      { $set: { code: code } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!snippet) {
      console.log("Snippet not found or user not authorized");
      return {
        success: false,
        message: "Snippet not found or user not authorized",
      };
    }

    console.log("Updated Snippet", snippet);
    revalidatePath("/snippets/mine");
    return { success: true, message: "Snippet updated successfully" };
  } catch (error) {
    console.error("Error updating snippet:", error);
    return { success: false, message: "Error updating snippet" };
  }
};
