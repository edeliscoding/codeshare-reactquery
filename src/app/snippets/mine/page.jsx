import { getMySnippets } from "@/app/_actions/getMySnippets";
import React from "react";
import moment from "moment";

export default async function MySnippets() {
  const mySnippets = await getMySnippets();
  const defaultImage =
    "https://cdn.usegalileo.ai/stability/602d2985-3625-4fba-8aaf-1de4af6f2943.png";
  return (
    <div className="container mx-auto p-4">
      <h1>My Snippets</h1>
      {mySnippets.map((snippet) => (
        <div
          key={snippet._id}
          className="container mx-auto p-4 cursor-pointer hover:bg-slate-800"
        >
          <link
            rel="icon"
            type="image/x-icon"
            href="data:image/x-icon;base64,"
          />

          <div>
            <div className="flex items-center bg-[#111a22] p-4 pb-2 justify-between">
              {/* <div className="flex w-12 items-center justify-end">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"></button>
            </div> */}
              <div className="flex items-center gap-5 bg-[#111a22] px-3 min-h-[72px] py-2">
                <div className="flex flex-col rounded-full h-20 w-fit gap-1">
                  <img
                    className="h-14 w-14 rounded-full md:block sm:w-12 sm:h-12 ml-1"
                    src={snippet.image || defaultImage}
                  />
                  <span className="mr-[12px">{snippet.userId.username}</span>
                </div>

                <div className="flex flex-col justify-center pb-5">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">
                    {snippet.language}
                  </p>
                  <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
                    {moment(snippet.createdAt).fromNow()}
                  </p>
                </div>
                <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
                  {snippet.code}
                </p>
              </div>

              {/* <div className="flex flex-wrap gap-4 px-4 py-2 py-2 justify-between">
              
            </div> */}
            </div>
            <div className="flex flex-wrap gap-4 px-4 py-2 justify-between">
              <div className="flex items-center justify-center gap-2 px-3 py-2">
                <div
                  className="text-[#93adc8]"
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
                  {snippet.upvotes.length}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 py-2">
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
              </div>
              <div className="flex items-center justify-center gap-2 px-3 py-2">
                <div
                  className="text-[#93adc8]"
                  data-icon="Heart"
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
                    <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z" />
                  </svg>
                </div>
                <p className="text-[#93adc8] text-[13px] font-bold leading-normal tracking-[0.015em]">
                  {snippet.likes.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
