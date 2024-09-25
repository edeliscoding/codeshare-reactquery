// File: app/components/CreateSnippetForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useCreateSnippet } from "../hooks/useSnippetHooks";
export default function CreateSnippetForm() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createSnippet = useCreateSnippet();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to create snippet
    setIsLoading(true);
    setError("");

    if (!session) {
      setError("You must be signed in to create a post");
      setIsLoading(false);
      return;
    }
    const newSnippet = {
      title,
      code,
      language,
      isPublic,
      // userId: userId, // You'll need to get this from your auth system
    };
    createSnippet.mutate(newSnippet);
  };
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-400"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-400"
        >
          Code
        </label>
        {/* <SyntaxHighlighter
          language={language}
          style={docco}
          className="mt-1 p-4 rounded-md border border-gray-300"
          rows={10}
        >
          {code}
        </SyntaxHighlighter> */}
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          rows={10}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <h3 className="text-gray-400 mt-1">Preview:</h3>
        <SyntaxHighlighter
          language={language}
          style={docco}
          showLineNumbers={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          wrapLines={true}
        >
          {code || "// Your code preview will appear here"}
        </SyntaxHighlighter>
      </div>
      <div>
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-400"
        >
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          {/* Add more language options as needed */}
        </select>
      </div>
      <div>
        <label
          htmlFor="privacy"
          className="block text-sm font-medium text-gray-400"
        >
          Privacy
        </label>
        <select
          id="privacy"
          value={isPublic ? "public" : "private"}
          onChange={(e) => setIsPublic(e.target.value === "public")}
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Snippet
      </button>
    </form>
  );
}
