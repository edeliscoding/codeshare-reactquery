"use client";

import { useState } from "react";
import React from "react";
import { useAddComment, useSnippet } from "../hooks/useSnippetHooks";
import CommentList from "./CommentList";

export default function CommentForm({ snippetId }) {
  const [content, setContent] = useState("");
  const addComment = useAddComment();
  const handleAddComment = (event) => {
    event.preventDefault();
    // const newComment = {
    //   content: comment,
    //   //   author: "current-user-id", // You'll need to get this from your auth system
    //   //   snippet: id,
    //   snippet: snippet,
    // };
    addComment.mutate({ snippetId: snippetId, content: content });
    event.target.reset();
  };
  const { data: snippet, isLoading: snippetLoading } = useSnippet(snippetId);

  if (snippet?.comments.length < 1 && snippetLoading)
    return <div>Loading...</div>;
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({snippet?.comments.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleAddComment}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="content"
              rows={6}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required=""
              value={content}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        <CommentList snippetId={snippetId} comments={snippet?.comments} />
      </div>
    </section>
  );
}
