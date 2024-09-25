"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

export default function ReactQueryProvider({ children }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
