// "use client";
import { getMySnippets } from "@/app/_actions/getMySnippets";
import React from "react";
import moment from "moment";
import EditDelete from "@/app/components/EditDelete";
import MySnippetList from "@/app/components/MySnippetList";
import { editSnippet } from "@/app/_actions/editMySnippet";
import { deleteSnippet } from "@/app/_actions/deleteMySnippet";

export default async function MySnippets() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingSnippet, setEditingSnippet] = useState(null);
  const mySnippets = await getMySnippets();

  const defaultImage =
    "https://cdn.usegalileo.ai/stability/602d2985-3625-4fba-8aaf-1de4af6f2943.png";

  // };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">My Snippets</h1>
      <MySnippetList
        snippets={mySnippets}
        editSnippetAction={editSnippet}
        deleteSnippetAction={deleteSnippet}
      />
    </div>
  );
}
