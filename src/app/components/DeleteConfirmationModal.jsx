import React from "react";
// import { Button } from '@/components/ui/button';

const DeleteConfirmationModal = ({ snippet, onConfirm, onCancel }) => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this snippet?</p>
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel}>Cancel</button>
        <button
          onClick={() => onConfirm(snippet._id)}
          className="bg-red-600 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
