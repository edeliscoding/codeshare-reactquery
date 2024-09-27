import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Snippet from "../models/Snippet";

export const getMySnippets = async () => {
  await dbConnect();
  const currentUser = await getServerSession(authOptions);
  console.log("currentUser", currentUser);

  if (!currentUser) {
    return [];
  }

  const snippets = await Snippet.find({ userId: currentUser.user.id });
  return snippets;
};
