///version 4///////////
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            image: user.image,
            favoriteSnippets: user.favoriteSnippets,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      // Check if user exists in your database
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        // If user doesn't exist, create a new one
        dbUser = await User.create({
          username: user.username,
          email: user.email,
          image: user.image,
        });
      }
      // Attach the database user id to the user object
      user.id = dbUser._id.toString();
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.image = user.image;
        token.favoriteSnippets = user.favoriteSnippets;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.favoriteSnippets = token.favoriteSnippets;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
