// app/page.js
import Link from "next/link";
import { ArrowUp, MessageSquare, Heart, Edit, Trash } from "lucide-react";
import moment from "moment";
import { getCurrentUser } from "@/lib/auth";
import SnippetList from "./components/SnippetList";

export default async function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <SnippetList />
    </div>
  );
}
