"use client";

import CommentForm from "@/app/components/CommentForm";
import CommentList from "@/app/components/CommentList";
import useFavorite from "@/app/hooks/useFavorite";
import { useQuery, useMutation, useQueryClient } from "react-query";
// import {
//   useAddComment,
//   useComments,
//   useSnippet,
//   useSnippetWithComments,
// } from "@/app/hooks/useSnippetHooks";
import { useUpvote } from "@/app/hooks/useUpvote";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
// import { getSnippetWithComments } from "../apiCalls/getSnippetWithComments";
// import CommentFormList from "./CommentFormList";

const fetchComments = async (snippetId) => {
  const res = await fetch(`/api/snippets/${snippetId}/comments`);
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
};
export default function SnippetSingle({ snippet }) {
  const queryClient = useQueryClient();
  const snippetID = snippet?._id;

  //   const commentsRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // Track client-side loading

  const { data: session, status } = useSession();

  const {
    upvotes,
    upvoteSnippet,
    error: upvoteError,
    loading: upvoteLoading,
  } = useUpvote(snippet?.upvotes, snippet?._id);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", snippet?._id],
    queryFn: () => fetchComments(snippet?._id),
  });

  const {
    hasFavorited,
    toggleFavorite,
    isLoading: favoriteLoading,
    likesCount,
  } = useFavorite({
    snippetId: snippet?._id,
    currentUser: session?.user,
    initialLikesCount: snippet?.likes?.length || 0,
  });

  const handleCommentBubbleClick = () => {
    setShowComments(!showComments);
    setTimeout(() => {
      commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
    // handleCommentButtonClick();
  };

  useEffect(() => {
    if (snippet) {
      setLoading(false);
    }
  }, [snippet]);

  if (loading) {
    return <div>Loading Snippet...</div>; // Replace this with a spinner or skeleton if desired
  }
  return (
    <div className="container mx-auto p-4">
      <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
      <div
        className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark justify-between group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div>
          <div className="flex items-center gap-4 bg-[#111a22] px-4 min-h-[72px] py-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/602d2985-3625-4fba-8aaf-1de4af6f2943.png")',
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-medium leading-normal line-clamp-1">
                React.js
              </p>
              <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
                1 week ago
              </p>
            </div>
          </div>
          <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
            {snippet.content}
          </p>
          <div className="flex flex-wrap gap-4 px-4 py-2  justify-between">
            <div
              className="flex items-center justify-center gap-2 px-3 py-2"
              onClick={upvoteSnippet}
            >
              <div
                className="text-[#93adc8] cursor-pointer"
                data-icon="ArrowUp"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z" />
                </svg>
              </div>
              <p className="text-[#93adc8] text-[13px] font-bold leading-normal tracking-[0.015em]">
                {upvotes.length}
              </p>
            </div>
            {/* Button to toggle comments */}
            <button onClick={handleShowComments}>
              {showComments ? "Hide Comments" : "Show Comments"}{" "}
              {snippet.comments.length}
            </button>

            <div
              className="flex items-center justify-center gap-2 px-3 py-2"
              onClick={toggleFavorite}
            >
              <div
                className="text-[#93adc8] cursor-pointer"
                data-icon="Heart"
                data-size="24px"
                data-weight="regular"
              >
                <span className="flex items-center">
                  <Heart
                    className={`${
                      hasFavorited ? "fill-rose-500" : "fill-neutral-500"
                    } w-4 h-4 mr-1`}
                    // onClick={() => handleFavorite(snippet?._id)}
                    onClick={toggleFavorite}
                    disabled={upvoteLoading}
                  />
                  {likesCount}
                </span>
              </div>
              <p className="text-[#93adc8] text-[13px] font-bold leading-normal tracking-[0.015em]">
                {/* {snippet.likes.length} */}
              </p>
            </div>
          </div>
        </div>
        {showComments && (
          <div>
            <CommentList comments={comments} />
            {/* {showComments && !loading && (
          <CommentForm snippetId={snippet._id} commentswithauthor={comments} />
        )} */}
            <CommentForm snippetId={snippet._id} />
          </div>
        )}
      </div>
    </div>
  );
}
