"use client";
import CommentForm from "@/app/components/CommentForm";
import useFavorite from "@/app/hooks/useFavorite";
import {
  useAddComment,
  useComments,
  useSnippet,
  useSnippetWithComments,
} from "@/app/hooks/useSnippetHooks";
import { useUpvote } from "@/app/hooks/useUpvote";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";

const Snippet = ({ params }) => {
  const { id } = params;
  const commentsRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const { data: snippet, isLoading } = useSnippet(id);
  const { data: session, status } = useSession();

  const { upvotes, upvoteSnippet, error, loading } = useUpvote(
    snippet?.upvotes,
    snippet?._id
  );

  //   const { data, isLoading: commentsLoading } = useComments(id, {
  //     enabled: showComments,
  //   });

  //   const { data: snippet, isLoading: snippetLoading } = useSnippet(id);
  //   const { data: comments, isLoading: commentsLoading } = useComments(id);

  //   const { data, fetchSnippetWithComments, isLoading } =
  //     useSnippetWithComments(id);

  //   // Destructure snippet and comments from the response
  //   const snippet = data?.snippet;
  //   const comments = data?.comments;

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
      <div
        className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark justify-between group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div>
          <div className="flex items-center bg-[#111a22] p-4 pb-2 justify-between">
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
              Home
            </h2>
            <div className="flex w-12 items-center justify-end">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                <div
                  className="text-white"
                  data-icon="MagnifyingGlass"
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
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
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
            <button onClick={() => setShowComments((prev) => !prev)}>
              {showComments ? "Hide Comments" : "Show Comments"}{" "}
              {snippet.comments.length}
            </button>
            {/* <div
              className="flex items-center justify-center gap-2 px-3 py-2 cursor-pointer hover:bg-slate-800"
              onClick={handleCommentBubbleClick}
            >
              <div
                className="text-[#93adc8]"
                data-icon="ChatTeardropText"
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
                  <path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-12A100.11,100.11,0,0,1,132,224H47.67A15.69,15.69,0,0,1,32,208.33V124a100,100,0,0,1,200,0Zm-16,0a84,84,0,0,0-168,0v84h84A84.09,84.09,0,0,0,216,124Z" />
                </svg>
              </div>
              <p className="text-[#93adc8] text-[13px] font-bold leading-normal tracking-[0.015em]">
                {snippet.comments.length}
              </p>
            </div> */}
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
                    disabled={isLoading}
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
        {showComments && <CommentForm snippetId={snippet._id} />}
      </div>
    </div>
  );
};

export default Snippet;
