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
import moment from "moment";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useParams, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const snippetID = snippet?._id;

  //   const commentsRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // Track client-side loading

  const { data: session, status } = useSession();
  const defaultImage =
    "https://cdn.usegalileo.ai/stability/602d2985-3625-4fba-8aaf-1de4af6f2943.png";
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
            <div className="flex flex-col rounded-full h-20 w-fit gap-1 mt-4">
              <img
                className="h-14 w-14 rounded-full md:block sm:w-12 sm:h-12 ml-1"
                src={snippet.image || defaultImage}
              />
              <span className="mr-[12px]">{username}</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-medium leading-normal line-clamp-1">
                {snippet.language}
              </p>
              <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
                {moment(snippet?.createdAt).fromNow()}
              </p>
            </div>
            {/* <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              {snippet.code}
            </p> */}
          </div>
          <div className="p-4 text-gray-900">
            <SyntaxHighlighter
              language={snippet.language}
              style={docco}
              className="mt-1 p-4 rounded-md border border-gray-300"
              rows={10}
            >
              {snippet.code}
            </SyntaxHighlighter>
            {/* <textarea
              id="code"
              value={snippet.code}
              //   onChange={(e) => setCode(e.target.value)}
              required
              rows={6}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            /> */}
          </div>
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
            <CommentList comments={comments} snippetId={snippet._id} />

            <CommentForm snippetId={snippet._id} />
          </div>
        )}
      </div>
    </div>
  );
}
