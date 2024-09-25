"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Create a custom hook that fetches snippet and comments together
export const useSnippetWithComments = (id) => {
  // Define the query function to fetch both snippet and comments
  const fetchSnippetWithComments = async () => {
    const { data } = await axios.get(`/api/snippets/${id}`);
    return data; // data contains both `snippet` and `comments`
  };

  // Use React Query's `useQuery` to fetch and cache the data
  return useQuery(["snippetWithComments", id], fetchSnippetWithComments);
};

export const useSnippets = () => {
  return useQuery("snippets", () =>
    axios.get("/api/snippets").then((res) => res.data)
  );
};

export const useSnippet = (id) => {
  return useQuery(["snippet", id], () =>
    axios.get(`/api/snippets/${id}`).then((res) => res.data)
  );
};

export const useCreateSnippet = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation((newSnippet) => axios.post("/api/snippets", newSnippet), {
    onSuccess: () => {
      queryClient.invalidateQueries("snippets");
      toast.success("Snippet created successfully!");
      router.push("/");
    },
  });
};

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, ...updateData }) => axios.put(`/api/snippets/${id}`, updateData),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["snippet", variables.id]);
        queryClient.invalidateQueries("snippets");
      },
    }
  );
};

export const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => axios.delete(`/api/snippets/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("snippets");
    },
  });
};

// Comment Hooks

export const useComments = (snippetId) => {
  return useQuery(["comments", snippetId], () =>
    axios.get(`/api/snippets/${snippetId}/comments`).then((res) => res.data)
  );
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ snippetId, content }) =>
      axios.post(`/api/snippets/${snippetId}/comments`, { snippetId, content }),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["comments", variables.snippetId]);
        queryClient.invalidateQueries(["snippet", variables.snippetId]);
        toast.success("Comment added successfully!");
      },
    }
  );
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ snippetId, commentId }) =>
      axios.delete(`/api/snippets/${snippetId}/comments/${commentId}`),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["comments", variables.snippetId]);
        queryClient.invalidateQueries(["snippet", variables.snippetId]);
      },
    }
  );
};
