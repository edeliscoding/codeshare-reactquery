import React from "react";

export default function EditDelete() {
  return (
    <div className="flex flex-col justify-center pb-5 gap-2 flex-1">
      <button
        //   onClick={() => openEditModal(snippet)}
        // onClick={() => openEditModal()}
        className="bg-blue-600 text-white font-bold py-1 px-2 rounded"
      >
        Edit
      </button>
      <button>Delete</button>{" "}
    </div>
  );
}
