// File: app/snippets/mine/SnippetList.jsx
"use client";

import React, { startTransition, useState, useTransition } from "react";
import moment from "moment";
import Modal from "@/app/components/Modal";
import EditSnippetForm from "@/app/components/MySnippetEditForm";
// import { updateMySnippet } from "../_actions/updateMySnippet";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
export default function SnippetList({
  snippets,
  editSnippetAction,
  deleteSnippetAction,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeSnippet, setActiveSnippet] = useState(null);
  const [isPending, startTransition] = useTransition();
  const defaultImage =
    "https://cdn.usegalileo.ai/stability/602d2985-3625-4fba-8aaf-1de4af6f2943.png";

  const openEditModal = (snippet) => {
    setActiveSnippet(snippet);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (snippet) => {
    setActiveSnippet(snippet);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setActiveSnippet(null);
  };

  const handleDelete = (snippetId) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("snippetId", snippetId);
      deleteSnippetAction(formData).then((result) => {
        if (result.success) {
          toast.success("Snippet deleted successfully");
          closeModal();
        } else {
          console.error(result.message);
          toast.error("Failed to delete snippet");
          // Handle error (e.g., show error message to user)
        }
      });
    });
  };

  //   const handleSaveEdit = async (editedSnippet) => {
  //     console.log("Edited snippet:", editedSnippet);

  //     // Here you would typically make an API call to update the snippet

  //     console.log("Saving edited snippet:", editedSnippet);
  //     // // Implement the API call to save changes
  //     // await updateMySnippet(editingSnippet);
  //     // After successful save, you might want to refetch the snippets or update the local state
  //     closeModal();
  //   };

  return (
    // <>
    //   {snippets.map((snippet) => (
    //     <div
    //       key={snippet._id}
    //       className="container mx-auto p-4 cursor-pointer hover:bg-slate-800"
    //     >
    //       <div className="flex items-center bg-[#111a22] p-4 pb-2 justify-between w-full">
    //         <div className="flex items-center gap-5 bg-[#111a22] px-3 min-h-[72px] py-2 w-full">
    //           <div className="flex flex-col rounded-full h-20 w-fit gap-1">
    //             <img
    //               className="h-14 w-14 rounded-full md:block sm:w-12 sm:h-12 ml-1"
    //               src={snippet.image || defaultImage}
    //               alt={snippet.userId.username}
    //             />
    //             <span className="mr-[12px]">{snippet.userId.username}</span>
    //           </div>
    //           <div className="flex flex-col pb-5 mr-auto">
    //             <p className="text-white text-base font-medium leading-normal line-clamp-1">
    //               {snippet.language}
    //             </p>
    //             <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
    //               {moment(snippet.createdAt).fromNow()}
    //             </p>
    //           </div>
    //           <div className="w-full flex-1">
    //             <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
    //               {snippet.code}
    //             </p>
    //           </div>
    //           <div className="ml-auto flex gap-2">
    //             <button
    //               onClick={() => openEditModal(snippet)}
    //               className="bg-blue-600 text-white font-bold py-1 px-2 rounded"
    //             >
    //               Edit
    //             </button>
    //             <button
    //               onClick={() => openDeleteModal(snippet)}
    //               className="bg-red-600 text-white font-bold py-1 px-2 rounded"
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}

    //   <Modal isOpen={isEditModalOpen} onClose={closeModal} title="Edit Snippet">
    //     {activeSnippet && (
    //       <EditSnippetForm
    //         snippet={activeSnippet}
    //         editSnippetAction={editSnippetAction}
    //         onCancel={closeModal}
    //       />
    //     )}
    //   </Modal>
    //   <Modal
    //     isOpen={isDeleteModalOpen}
    //     onClose={closeModal}
    //     title="Delete Snippet"
    //   >
    //     {activeSnippet && (
    //       <DeleteConfirmationModal
    //         snippet={activeSnippet}
    //         onConfirm={handleDelete}
    //         onCancel={closeModal}
    //       />
    //     )}
    //   </Modal>
    // </>
    <>
      {snippets.map((snippet) => (
        <div
          key={snippet._id}
          className="container mx-auto p-2 sm:p-4 cursor-pointer hover:bg-slate-800"
        >
          <div className="flex flex-col bg-[#111a22] p-3 sm:p-4 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full">
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                  src={snippet.image || defaultImage}
                  alt={snippet.userId.username}
                />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base text-white">
                    {snippet.userId.username}
                  </span>
                  <span className="text-xs text-[#93adc8]">
                    {moment(snippet.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm sm:text-base font-medium">
                  {snippet.language}
                </p>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 w-full">
              <p className="text-white text-xs sm:text-lg font-normal break-words whitespace-pre-wrap">
                {snippet.code}
              </p>
            </div>
            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z" />
                  </svg>
                  <span className="text-[#93adc8] text-xs">
                    {snippet.upvotes.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-12A100.11,100.11,0,0,1,132,224H47.67A15.69,15.69,0,0,1,32,208.33V124a100,100,0,0,1,200,0Zm-16,0a84,84,0,0,0-168,0v84h84A84.09,84.09,0,0,0,216,124Z" />
                  </svg>
                  <span className="text-[#93adc8] text-xs">
                    {snippet.comments.length}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0C142.22,58.36,158.55,48,178,48a46.06,46.06,0,0,1,46,46C224,147.69,146.26,196.16,128,206.8Z" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(snippet)}
                  className="bg-blue-600 text-xs sm:text-base text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(snippet)}
                  className="bg-red-600 text-xs sm:text-base text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Modal isOpen={isEditModalOpen} onClose={closeModal} title="Edit Snippet">
        {activeSnippet && (
          <EditSnippetForm
            snippet={activeSnippet}
            editSnippetAction={editSnippetAction}
            onCancel={closeModal}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        title="Delete Snippet"
      >
        {activeSnippet && (
          <DeleteConfirmationModal
            snippet={activeSnippet}
            onConfirm={handleDelete}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
