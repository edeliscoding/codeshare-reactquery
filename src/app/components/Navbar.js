"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();

  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold hidden md:block">
          Code Snippet App
        </Link>
        <div className="space-x-4">
          {/* <Link href="/snippets" className="text-gray-300 hover:text-white">
            MY Snippets
          </Link> */}
          {session ? (
            <>
              <Link
                href="/snippets/mine"
                className="text-gray-300 hover:text-white"
              >
                My Snippets
              </Link>
              <Link href="/create" className="text-gray-300 hover:text-white">
                Create Snippet
              </Link>
              <span className="text-gray-300">{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            // <button
            //   onClick={() => signIn("google")}
            //   className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            // >
            //   Sign In
            // </button>
            <span className="flex gap-2">
              <button
                onClick={() => router.push("/signin")}
                // onClick={() => signIn("credentials")}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/register")}
                // onClick={() => signIn("credentials")}
                className=" hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Register
              </button>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
