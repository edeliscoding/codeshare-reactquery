"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { set } from "mongoose";

const useFavorite = ({ snippetId, currentUser, initialLikesCount }) => {
  console.log(snippetId, currentUser, initialLikesCount);
  const router = useRouter();
  const [hasFavorited, setHasFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(Number(initialLikesCount) || 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const list = currentUser.favoriteSnippets || [];
      setHasFavorited(list.includes(snippetId));
    }
  }, [currentUser, snippetId]);

  useEffect(() => {
    setLikesCount(Number(initialLikesCount) || 0);
  }, [initialLikesCount]);

  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();
      if (!currentUser || isLoading) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/favorites/${snippetId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await response.json();
        setHasFavorited(data.hasFavorited);
        setLikesCount(data.likesCount);
        router.refresh();
        toast.success(data.message);
      } catch (error) {
        console.error("Error toggling favorite:", error);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [currentUser, snippetId, router, isLoading]
  );

  return {
    hasFavorited,
    toggleFavorite,
    isLoading,
    likesCount,
  };
};
export default useFavorite;
