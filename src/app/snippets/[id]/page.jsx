import SnippetSingle from "@/app/components/SnippetSingle";
import SnippetSinglev1 from "@/app/components/SnippetSinglev1";
import { notFound } from "next/navigation";

const Snippet = async ({ params }) => {
  const { id } = params;

  const data = await getSnippet(id);
  async function getSnippet() {
    const res = await fetch(`http://localhost:3000/api/snippets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return notFound();
    }
    return res.json();
  }

  return <SnippetSingle snippet={data} />;
};

export default Snippet;
