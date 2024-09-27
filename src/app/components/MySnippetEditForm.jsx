// File: app/snippets/mine/EditSnippetForm.jsx
"use client";

import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";

const EditSnippetForm = ({ snippet, editSnippetAction, onCancel }) => {
  const [editedCode, setEditedCode] = useState(snippet.code);
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    startTransition(() => {
      editSnippetAction(new FormData(document.getElementById("editForm"))).then(
        (result) => {
          if (result.success) {
            toast.success("Snippet updated successfully");
            onCancel(); // Close the modal after successful edit
          } else {
            toast.error("Failed to update snippet");
          }
        }
      );
    });
  };
  return (
    // <form onSubmit={handleSubmit} className="space-y-4">
    <form action={handleSubmit} className="space-y-4" id="editForm">
      <input type="hidden" name="snippetId" value={snippet._id} />
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-white ">
          Edit Code
        </label>
        <textarea
          id="code"
          name="code"
          rows={6}
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={editedCode}
          onChange={(e) => setEditedCode(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2 text-white">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditSnippetForm;
