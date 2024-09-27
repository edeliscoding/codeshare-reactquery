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
    <>
      {snippets.map((snippet) => (
        <div
          key={snippet._id}
          className="container mx-auto p-4 cursor-pointer hover:bg-slate-800"
        >
          <div className="flex items-center bg-[#111a22] p-4 pb-2 justify-between w-full">
            <div className="flex items-center gap-5 bg-[#111a22] px-3 min-h-[72px] py-2 w-full">
              <div className="flex flex-col rounded-full h-20 w-fit gap-1">
                <img
                  className="h-14 w-14 rounded-full md:block sm:w-12 sm:h-12 ml-1"
                  src={snippet.image || defaultImage}
                  alt={snippet.userId.username}
                />
                <span className="mr-[12px]">{snippet.userId.username}</span>
              </div>
              <div className="flex flex-col pb-5 mr-auto">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">
                  {snippet.language}
                </p>
                <p className="text-[#93adc8] text-sm font-normal leading-normal line-clamp-2">
                  {moment(snippet.createdAt).fromNow()}
                </p>
              </div>
              <div className="w-full flex-1">
                <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
                  {snippet.code}
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => openEditModal(snippet)}
                  className="bg-blue-600 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(snippet)}
                  className="bg-red-600 text-white font-bold py-1 px-2 rounded"
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
