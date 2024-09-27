"use server";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Snippet from "../models/Snippet";
import { revalidatePath } from "next/cache";
export const deleteSnippet = async (formData) => {
  const snippetId = formData.get("snippetId");

  await dbConnect();
  const currentUser = await getServerSession(authOptions);
  if (!currentUser) {
    return { success: false, message: "No user found" };
  }

  try {
    const deletedSnippet = await Snippet.findOneAndDelete({
      _id: snippetId,
      userId: currentUser.user.id,
    });

    if (!deletedSnippet) {
      return {
        success: false,
        message: "Snippet not found or user not authorized",
      };
    }

    revalidatePath("/snippets/mine");
    return { success: true, message: "Snippet deleted successfully" };
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return { success: false, message: "Error deleting snippet" };
  }
};
