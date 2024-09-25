import { useState } from "react";

export const useUpvote = (initialUpvotes = [], snippetId) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const upvoteSnippet = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/snippets/${snippetId}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred while upvoting the snippet");
        return;
      }

      // Update the local upvotes count
      setUpvotes((prevUpvotes) => [...prevUpvotes, "currentUserId"]); // Assuming you have the userId
    } catch (error) {
      setError("An error occurred while upvoting the snippet");
    } finally {
      setLoading(false);
    }
  };

  return {
    upvotes,
    upvoteSnippet,
    error,
    loading,
  };
};
