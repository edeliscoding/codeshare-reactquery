// // File: app/signin/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const SignInPage = () => {
//   const { data: session, status } = useSession();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleCredentialsSignIn = async (e) => {
//     e.preventDefault();

//     const result = await signIn("Credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result?.error) {
//       setError(result.error);
//     } else {
//       // Redirect to the homepage or wherever you'd like
//       router.push("/");
//     }
//   };

//   //   useEffect(() => {
//   //     // Redirect if the user is already logged in
//   //     if (status === "authenticated") {
//   //       router.push("/");
//   //     }
//   //   }, [status, router]);
//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-white text-center mb-6">
//           Sign In
//         </h1>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* OAuth SignIn */}
//         <div className="space-y-4">
//           <button
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition"
//             onClick={() => signIn("google")}
//           >
//             Sign in with Google
//           </button>
//           {/* Add other OAuth providers here */}
//         </div>

//         <div className="my-6 flex items-center justify-center">
//           <hr className="w-full border-gray-700" />
//           <span className="mx-4 text-gray-400">or</span>
//           <hr className="w-full border-gray-700" />
//         </div>

//         {/* Credentials SignIn */}
//         <form onSubmit={handleCredentialsSignIn} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition"
//           >
//             Sign in with Credentials
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <p className="text-gray-400">
//             Don't have an account?{" "}
//             <a href="/register" className="text-blue-500 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
// File: app/signin/page.js
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      // Handle error (e.g., show error message)
      console.error(result.error);
    } else {
      // Redirect to the desired page after successful sign-in
      router.push("/");
    }
  };

  return (
    // <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    //   <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
    //     <h1>Sign In</h1>
    //     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div>
    //         <label
    //           htmlFor="email"
    //           className="block text-sm font-medium text-gray-300"
    //         >
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>

    //       <div>
    //         <label
    //           htmlFor="password"
    //           className="block text-sm font-medium text-gray-300"
    //         >
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {/* <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Email"
    //         required
    //       />
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="Password"
    //         required
    //       />
    //       <button type="submit">Sign In with Credentials</button> */}

    //       <button
    //         type="submit"
    //         className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition"
    //       >
    //         Sign in with Credentials
    //       </button>
    //       <div className="my-6 flex items-center justify-center">
    //         <hr className="w-full border-gray-700" />
    //         <span className="mx-4 text-gray-400">or</span>
    //       </div>
    //       <button
    //         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition"
    //         onClick={() => signIn("google", { callbackUrl: "/" })}
    //       >
    //         Sign In with Google
    //       </button>
    //     </form>
    //     <div className="text-center mt-4">
    //       <p className="text-gray-400">
    //         Don't have an account?{" "}
    //         <a href="/register" className="text-blue-500 hover:underline">
    //           Sign up
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    //// old code
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Sign In
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* OAuth SignIn */}
        <div className="space-y-4">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transition"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign In with Google
          </button>
          {/* Add other OAuth providers here */}
        </div>

        <div className="my-6 flex items-center justify-center">
          <hr className="w-full border-gray-700" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="w-full border-gray-700" />
        </div>

        {/* Credentials SignIn */}
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition"
          >
            Sign in with Credentials
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            No account?
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
