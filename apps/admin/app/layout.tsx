import type { Metadata } from "next";
import "./globals.css";
import AdminLayoutWrapper from "./components/AdminLayoutWrapper";

export const metadata: Metadata = {
  title: "Al-Arabi CMS Studio | Over-The-Air Content Studio",
  description: "Instant over-the-air lesson & exercise publishing for Conversational Fusha and Classical Grammar.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased min-h-screen bg-claude-bg text-claude-textMain flex flex-col font-sans">
        <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
      </body>
    </html>
  );
}
