// File: app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./components/ReactQueryProvider";

import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Snippet Sharing App",
  description: "Share and track your important code snippets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Toaster position="top-center" />
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
