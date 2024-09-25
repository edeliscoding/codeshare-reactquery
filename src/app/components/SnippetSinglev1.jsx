// app/components/SnippetSingle.jsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchComments = async (snippetId) => {
  const res = await fetch(`/api/snippets/${snippetId}/comments`);
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
};

const SnippetSinglev1 = ({ snippet }) => {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", snippet._id],
    queryFn: () => fetchComments(snippet._id),
  });

  const submitCommentMutation = useMutation({
    mutationFn: async (commentContent) => {
      const res = await fetch(`/api/snippets/${snippet._id}/comments`, {
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
      queryClient.invalidateQueries(["comments", snippet._id]);
      setNewComment("");
    },
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    submitCommentMutation.mutate(newComment);
  };

  return (
    <div>
      <h1>{snippet.title}</h1>
      <pre>{snippet.content}</pre>

      <h2>Comments</h2>
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Error loading comments: {error.message}</p>}
      {comments && (
        <ul>
          {comments?.map((comment) => (
            <li key={comment._id}>
              {comment.content} - by {comment.author.username}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default SnippetSinglev1;
