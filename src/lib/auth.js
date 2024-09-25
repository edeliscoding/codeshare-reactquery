// // File: lib/auth.ts
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }

// export async function getCurrentUser() {
//   const session = await getSession();
//   return session?.user;
// }

// File: lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import User from "../app/models/User"; // Assuming you have a Mongoose User model

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  // const session = await getSession();

  // if (!session?.user) return null;

  // // If OAuth user (OAuth providers like Google, GitHub)
  // if (session.user.email) {
  //   return session.user;
  // }

  // // If Credentials provider, find user in MongoDB using session information (like user ID or email)
  // const user = await User.findOne({ email: session.user.email }).lean();

  // if (!user) return null;

  // return {
  //   id: user._id,
  //   email: user.email,
  //   image: user.image,
  //   username: user.username,
  //   favoriteSnippets: user.favoriteSnippets,

  //   // Add any additional fields you may want to include
  // };
  const session = await getSession();
  if (!session?.user) return null;

  // The session now contains all the user information we need
  return {
    id: session.user.id,
    email: session.user.email,
    image: session.user.image,
    username: session.user.username,
    favoriteSnippets: session.user.favoriteSnippets,
  };
}
