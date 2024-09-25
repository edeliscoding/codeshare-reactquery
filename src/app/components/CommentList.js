import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import useEditComment from "../hooks/useSnippetHooks";
import { useSession } from "next-auth/react";

export default function CommentList({ comments, snippetId }) {
  console.log("comments from comment List", comments);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setIsEditingId] = useState(null);
  //   const [isOpen, setIsOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const { data: currentUser } = useSession();

  const currentUserId = currentUser?.user.id;

  const { editComment } = useEditComment();
  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };
  const handleUpdateComment = async (commentId, newContent) => {
    try {
      await editComment({ commentId, content: newContent });
      setIsEditingId(null); // Exit edit mode after successful update
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, [dropdownRef]);

  return (
    <div className="container mx-auto max-w-3xl">
      {comments &&
        comments?.map((comment) => (
          <div key={comment._id} className="mb-4" ref={dropdownRef}>
            <article className="relative p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    {comment.author.username}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate=""
                      dateTime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {moment(comment.createdAt).fromNow()}
                    </time>
                  </p>
                </div>
                {currentUserId === comment.author._id && (
                  <button
                    id={`dropdownButton${comment._id}`}
                    onClick={() => toggleDropdown(comment._id)}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                )}
                {/* Dropdown menu */}
                {/* <div
                id="dropdownComment1"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div> */}
                {openDropdownId === comment._id && (
                  <div
                    className="absolute left-[624px] top-[15px] z-10 mt-2 w-32 origin-center bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-600"
                    role="menu"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      role="none"
                    >
                      <li>
                        <button
                          // ref={useEditRef}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                          // onClick={() => setIsEditing(true)}
                          onClick={() => setIsEditingId(comment._id)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                          onClick={() => alert("Delete clicked")}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </footer>
              {isEditingId === comment._id ? (
                <input
                  type="text"
                  defaultValue={comment.content}
                  onBlur={(e) =>
                    handleUpdateComment(comment._id, e.target.value)
                  }
                  className="w-full text-gray-900 p-2"
                  onFocus={() => setOpenDropdownId(null)}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.content}
                </p>
              )}
            </article>
          </div>
        ))}
    </div>
  );
}
// <div className="flex items-center mt-4 space-x-4">
//    <button
//     type="button"
//     className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
//   >
//     <svg
//       className="mr-1.5 w-3.5 h-3.5"
//       aria-hidden="true"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 20 18"
//     >
//       <path
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
//       />
//     </svg>
//     Reply
//   </button>
// </div>
