"use client";

import { useState } from "react";
import React from "react";
import { useAddComment, useSnippet } from "../hooks/useSnippetHooks";
import CommentList from "@/app/components/CommentList";
import { useMutation, useQueryClient, useQuery } from "react-query";

export default function CommentForm({ snippetId }) {
  // const [content, setContent] = useState("");
  // const addComment = useAddComment();
  const queryClient = useQueryClient();
  // const {
  //   data: comments,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["comments", snippetId],
  //   queryFn: () => fetchComments(snippetId),
  // });

  const [newComment, setNewComment] = useState("");
  // console.log("comments from useQuery", comments);
  const submitCommentMutation = useMutation({
    mutationFn: async (commentContent) => {
      const res = await fetch(`/api/snippets/${snippetId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", snippetId]);
      // queryClient.invalidateQueries(["snippets"]);
      setNewComment("");
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    submitCommentMutation.mutate(newComment);
  };

  const { data: snippet, isLoading: snippetLoading } = useSnippet(snippetId);

  if (snippetLoading) return <div>Loading...</div>;

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-12 antialiased divide">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({snippet?.comments.length})
          </h2>
        </div>
        {/* <CommentList snippetId={snippetId} comments={comments} /> */}
        <form className="mb-6" onSubmit={handleSubmitComment}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="content"
              rows={6}
              name="content"
              onChange={(e) => setNewComment(e.target.value)}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required=""
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        {/* <CommentList snippetId={snippetId} comments={snippet?.comments} /> */}
        {/* <CommentList snippetId={snippetId} comments={comments} /> */}
      </div>
    </section>
  );
}
